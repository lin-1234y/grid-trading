from __future__ import annotations

import json
import sqlite3
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent


def find_stock_db() -> Path | None:
    candidates = [ROOT / "data" / "stock.db", ROOT.parent / "data" / "stock.db"]
    documents = Path.home() / "Documents"
    if documents.exists():
        candidates.extend(documents.glob("*/data/stock.db"))
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return None


class GridHandler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/quotes":
            query = parse_qs(parsed.query)
            symbol = query.get("symbol", [""])[0].strip()
            self._send_json(load_quotes(symbol))
            return
        super().do_GET()

    def log_message(self, format: str, *args: object) -> None:
        return

    def _send_json(self, payload: object, status: HTTPStatus = HTTPStatus.OK) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


def normalize_symbol(value: str) -> str:
    text = value.upper().strip()
    if "." in text:
        text = text.split(".", 1)[0]
    if text.startswith(("SH", "SZ", "BJ")):
        text = text[2:]
    digits = "".join(char for char in text if char.isdigit())
    return digits or text


def load_quotes(symbol: str) -> dict[str, object]:
    local_symbol = normalize_symbol(symbol)
    if not local_symbol:
        return {"symbol": symbol, "rows": [], "error": "empty symbol"}

    db_path = find_stock_db()
    if db_path is None:
        return {"symbol": local_symbol, "rows": [], "error": "stock.db not found"}

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute(
            """
            SELECT trade_date AS date, close
            FROM daily_quotes
            WHERE symbol = ? AND close IS NOT NULL
            ORDER BY trade_date
            """,
            (local_symbol,),
        ).fetchall()
    finally:
        conn.close()

    return {
        "symbol": local_symbol,
        "source": str(db_path),
        "rows": [{"date": row["date"], "close": row["close"]} for row in rows],
    }


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Run the local grid trading web tool.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8788)
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), GridHandler)
    print(f"Grid trading tool: http://127.0.0.1:{server.server_port}")
    print(f"Data source: {find_stock_db() or 'not found'}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
