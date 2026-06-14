const els = {
  tabs: document.querySelectorAll(".tab"),
  windows: document.querySelectorAll(".tool-window"),
  scenarioWindow: document.querySelector("#scenarioWindow"),
  scenarioTabs: document.querySelectorAll(".scenario-tab"),
  status: document.querySelector("#statusText"),
  symbol: document.querySelector("#symbolInput"),
  currentPrice: document.querySelector("#currentPriceInput"),
  holdingShares: document.querySelector("#holdingSharesInput"),
  costPrice: document.querySelector("#costPriceInput"),
  cash: document.querySelector("#cashInput"),
  lotSize: document.querySelector("#lotSizeInput"),
  loadSymbol: document.querySelector("#loadSymbolButton"),
  addGrid: document.querySelector("#addGridButton"),
  runScenario: document.querySelector("#runScenarioButton"),
  gridCards: document.querySelector("#gridCards"),
  template: document.querySelector("#gridTemplate"),
  upProfit: document.querySelector("#upProfit"),
  downCash: document.querySelector("#downCash"),
  downLoss: document.querySelector("#downLoss"),
  reboundProfit: document.querySelector("#reboundProfit"),
  upBox: document.querySelector("#upBox"),
  downBox: document.querySelector("#downBox"),
  reboundBox: document.querySelector("#reboundBox"),
  detailRows: document.querySelector("#detailRows"),
  detailSummary: document.querySelector("#detailSummary"),
  tDate: document.querySelector("#tDateInput"),
  tSymbol: document.querySelector("#tSymbolInput"),
  tName: document.querySelector("#tNameInput"),
  tSide: document.querySelector("#tSideInput"),
  tPrice: document.querySelector("#tPriceInput"),
  tShares: document.querySelector("#tSharesInput"),
  tFee: document.querySelector("#tFeeInput"),
  tCommissionPct: document.querySelector("#tCommissionPctInput"),
  tMinCommission: document.querySelector("#tMinCommissionInput"),
  tStampDutyPct: document.querySelector("#tStampDutyPctInput"),
  addTrade: document.querySelector("#addTradeButton"),
  brokerImportMode: document.querySelector("#brokerImportMode"),
  brokerImportFile: document.querySelector("#brokerImportFile"),
  brokerImportStatus: document.querySelector("#brokerImportStatus"),
  brokerImportSummary: document.querySelector("#brokerImportSummary"),
  brokerImportPreview: document.querySelector("#brokerImportPreview"),
  confirmBrokerImport: document.querySelector("#confirmBrokerImport"),
  clearBrokerImport: document.querySelector("#clearBrokerImport"),
  clearTrades: document.querySelector("#clearTradesButton"),
  tradeFlowRows: document.querySelector("#tradeFlowRows"),
  overviewRows: document.querySelector("#overviewRows"),
  overviewSummary: document.querySelector("#overviewSummary"),
  overviewSort: document.querySelector("#overviewSortInput"),
  currentFlowSymbol: document.querySelector("#currentFlowSymbol"),
  openFlowSymbolPicker: document.querySelector("#openFlowSymbolPicker"),
  tFilterSymbol: document.querySelector("#tFilterSymbolInput"),
  tStartDate: document.querySelector("#tStartDateInput"),
  tEndDate: document.querySelector("#tEndDateInput"),
  applyTradeFilter: document.querySelector("#applyTradeFilterButton"),
  currentQuerySymbol: document.querySelector("#currentQuerySymbol"),
  allMatchedProfit: document.querySelector("#allMatchedProfit"),
  openQuerySymbolPicker: document.querySelector("#openQuerySymbolPicker"),
  symbolModal: document.querySelector("#symbolModal"),
  symbolModalTitle: document.querySelector("#symbolModalTitle"),
  symbolModalChoices: document.querySelector("#symbolModalChoices"),
  closeSymbolModal: document.querySelector("#closeSymbolModal"),
  matchedRows: document.querySelector("#matchedRows"),
  unmatchedRows: document.querySelector("#unmatchedRows"),
  matchedSummary: document.querySelector("#matchedSummary"),
  unmatchedSummary: document.querySelector("#unmatchedSummary"),
  tMatchedProfit: document.querySelector("#tMatchedProfit"),
  tTotalFees: document.querySelector("#tTotalFees"),
  tTotalAmount: document.querySelector("#tTotalAmount"),
  tMatchedShares: document.querySelector("#tMatchedShares"),
  tOpenBuyShares: document.querySelector("#tOpenBuyShares"),
  tOpenSellShares: document.querySelector("#tOpenSellShares"),
  backupName: document.querySelector("#backupNameInput"),
  exportBackup: document.querySelector("#exportBackupButton"),
  importBackup: document.querySelector("#importBackupInput"),
};

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

let grids = [];
let scenarioRows = [];
let trades = [];
let pendingBrokerTrades = [];
let saveTimer = 0;
let flowFilterSymbol = "";
let symbolPickerMode = "query";
const STORAGE_KEY = "gridTradingToolState";
const STOCK_NAME_MAP = {
  "000001": "平安银行",
  "000333": "美的集团",
  "000651": "格力电器",
  "000792": "盐湖股份",
  "002594": "比亚迪",
  "300750": "宁德时代",
  "510300": "沪深300ETF",
  "510500": "中证500ETF",
  "512100": "中证1000ETF",
  "513050": "中概互联网ETF",
  "518880": "黄金ETF",
  "588000": "科创50ETF",
  "600033": "福建高速",
  "600519": "贵州茅台",
  "601318": "中国平安",
  "601766": "中国中车",
};

function ensureMatchedDetailModal() {
  const matchedPanel = document.querySelector("#matchedRows")?.closest(".panel");
  if (matchedPanel && !document.querySelector("#openMatchedModal")) {
    const button = document.createElement("button");
    button.id = "openMatchedModal";
    button.className = "detail-open-button";
    button.type = "button";
    button.textContent = "查看已匹配细节";
    matchedPanel.appendChild(button);
  }
  if (!document.querySelector("#matchedModal")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div id="matchedModal" class="modal" hidden>
        <div class="modal-backdrop" data-close-matched-modal></div>
        <section class="modal-card detail-modal-card" role="dialog" aria-modal="true" aria-labelledby="matchedModalTitle">
          <div class="modal-title">
            <h2 id="matchedModalTitle">已匹配细节</h2>
            <button id="closeMatchedModal" class="icon-button" type="button">×</button>
          </div>
          <div class="table-wrap tall">
            <table>
              <thead><tr><th>序号</th><th>代码</th><th>卖出日期</th><th>卖价</th><th>买入日期</th><th>买价</th><th>股数</th><th>成交金额</th><th>费用</th><th>盈亏</th></tr></thead>
              <tbody id="matchedModalRows"></tbody>
            </table>
          </div>
        </section>
      </div>
    `);
  }
}

function n(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function money(value) {
  return Number(value || 0).toLocaleString("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 });
}

function qty(value) {
  return Number(value || 0).toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

function fixed(value) {
  return Number(value || 0).toFixed(4);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function cell(label, value, className = "") {
  return `<td data-label="${esc(label)}"${className ? ` class="${className}"` : ""}>${value}</td>`;
}

function profitClass(value) {
  if (value > 0) return "profit-positive";
  if (value < 0) return "profit-negative";
  return "profit-flat";
}

function switchWindow(id, persist = true) {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.window === id));
  els.windows.forEach((win) => win.classList.toggle("active", win.id === id));
  if (persist) saveState();
}

function switchScenarioPane(id) {
  const pane = id.replace("scenario", "").replace("Pane", "").toLowerCase() || "setup";
  els.scenarioTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.scenarioPane === id));
  els.scenarioWindow.dataset.scenarioPane = pane;
  renderScenarioDetails();
}

function defaultGrids() {
  return [{
    id: uid(),
    lower: 3.4,
    upper: 4.8,
    buyStepType: "value",
    buyStep: 0.15,
    buyMode: "amount",
    buySize: 10000,
    sellStepType: "value",
    sellStep: 0.15,
    sellMode: "shares",
    sellSize: 1000,
  }];
}

function account() {
  return {
    symbol: els.symbol.value.trim().toUpperCase() || "GRID",
    currentPrice: n(els.currentPrice.value),
    holdingShares: Math.max(0, Math.floor(n(els.holdingShares.value))),
    costPrice: n(els.costPrice.value),
    cash: Math.max(0, n(els.cash.value)),
    lotSize: Math.max(1, Math.floor(n(els.lotSize.value, 100))),
    commissionPct: Math.max(0, n(els.tCommissionPct.value) / 100),
    minCommission: Math.max(0, n(els.tMinCommission.value)),
    stampDutyPct: Math.max(0, n(els.tStampDutyPct.value) / 100),
  };
}

function renderGrids() {
  els.gridCards.innerHTML = "";
  grids.forEach((grid, index) => {
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.dataset.id = grid.id;
    node.querySelector(".grid-title").textContent = `网格 ${index + 1}`;
    node.querySelectorAll("[data-field]").forEach((input) => {
      input.value = grid[input.dataset.field];
    });
    els.gridCards.appendChild(node);
  });
}

function collectState() {
  if (els.gridCards.children.length) readGrids();
  return {
    activeWindow: document.querySelector(".tab.active")?.dataset.window || "scenarioWindow",
    scenario: {
      symbol: els.symbol.value,
      currentPrice: els.currentPrice.value,
      holdingShares: els.holdingShares.value,
      costPrice: els.costPrice.value,
      cash: els.cash.value,
      lotSize: els.lotSize.value,
      grids,
    },
    tradeForm: {
      date: els.tDate.value,
      symbol: els.tSymbol.value,
      name: els.tName.value,
      side: els.tSide.value,
      price: els.tPrice.value,
      shares: els.tShares.value,
      fee: els.tFee.value,
    },
    settings: {
      commissionPct: els.tCommissionPct.value,
      minCommission: els.tMinCommission.value,
      stampDutyPct: els.tStampDutyPct.value,
      backupName: els.backupName.value,
    },
    query: {
      symbol: els.tFilterSymbol.value,
      startDate: els.tStartDate.value,
      endDate: els.tEndDate.value,
    },
    flow: {
      symbol: flowFilterSymbol,
    },
    trades,
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState()));
  } catch {
    els.status.textContent = "浏览器本地存储不可用，请导出备份保存。";
  }
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveState, 150);
}

function restoreState() {
  let state = null;
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    state = null;
  }
  if (!state) return;
  const sc = state.scenario || {};
  if (sc.symbol !== undefined) els.symbol.value = sc.symbol;
  if (sc.currentPrice !== undefined) els.currentPrice.value = sc.currentPrice;
  if (sc.holdingShares !== undefined) els.holdingShares.value = sc.holdingShares;
  if (sc.costPrice !== undefined) els.costPrice.value = sc.costPrice;
  if (sc.cash !== undefined) els.cash.value = sc.cash;
  if (sc.lotSize !== undefined) els.lotSize.value = sc.lotSize;
  if (Array.isArray(sc.grids) && sc.grids.length) grids = sc.grids;
  const tf = state.tradeForm || {};
  if (tf.date !== undefined) els.tDate.value = tf.date;
  if (tf.symbol !== undefined) els.tSymbol.value = tf.symbol;
  if (tf.name !== undefined) els.tName.value = tf.name;
  if (tf.side !== undefined) els.tSide.value = tf.side;
  if (tf.price !== undefined) els.tPrice.value = tf.price;
  if (tf.shares !== undefined) els.tShares.value = tf.shares;
  if (tf.fee !== undefined) els.tFee.value = tf.fee;
  const settings = state.settings || {};
  if (settings.commissionPct !== undefined) els.tCommissionPct.value = settings.commissionPct;
  if (settings.minCommission !== undefined) els.tMinCommission.value = settings.minCommission;
  if (settings.stampDutyPct !== undefined) els.tStampDutyPct.value = settings.stampDutyPct;
  if (settings.backupName !== undefined) els.backupName.value = settings.backupName;
  const query = state.query || {};
  if (query.symbol !== undefined) els.tFilterSymbol.value = query.symbol;
  if (query.startDate !== undefined) els.tStartDate.value = query.startDate;
  if (query.endDate !== undefined) els.tEndDate.value = query.endDate;
  const flow = state.flow || {};
  if (flow.symbol !== undefined) flowFilterSymbol = flow.symbol;
  if (Array.isArray(state.trades)) trades = state.trades;
  if (state.activeWindow) switchWindow(state.activeWindow, false);
}

function readGrids() {
  grids = Array.from(els.gridCards.querySelectorAll(".grid-card")).map((card) => {
    const grid = { id: card.dataset.id };
    card.querySelectorAll("[data-field]").forEach((input) => {
      grid[input.dataset.field] = input.tagName === "SELECT" ? input.value : n(input.value);
    });
    return grid;
  });
}

function addGrid(values = {}) {
  readGrids();
  grids.push({
    id: uid(),
    lower: values.lower ?? 3.4,
    upper: values.upper ?? 4.8,
    buyStepType: values.buyStepType ?? "value",
    buyStep: values.buyStep ?? 0.15,
    buyMode: values.buyMode ?? "amount",
    buySize: values.buySize ?? 10000,
    sellStepType: values.sellStepType ?? "value",
    sellStep: values.sellStep ?? 0.15,
    sellMode: values.sellMode ?? "shares",
    sellSize: values.sellSize ?? 1000,
  });
  renderGrids();
  saveState();
}

function stepPrice(price, grid, side) {
  const type = side === "buy" ? grid.buyStepType : grid.sellStepType;
  const step = side === "buy" ? grid.buyStep : grid.sellStep;
  return type === "percent" ? price * (step / 100) : step;
}

function roundLot(shares, lotSize) {
  return Math.floor(Math.max(0, shares) / lotSize) * lotSize;
}

function tradeFee(side, amount, acct = account()) {
  if (amount <= 0) return 0;
  const commission = Math.max(acct.minCommission, amount * acct.commissionPct);
  const stamp = side === "sell" ? amount * acct.stampDutyPct : 0;
  return commission + stamp;
}

function orderShares(price, grid, side, acct) {
  const mode = side === "buy" ? grid.buyMode : grid.sellMode;
  const size = side === "buy" ? grid.buySize : grid.sellSize;
  return mode === "shares" ? roundLot(size, acct.lotSize) : roundLot(size / price, acct.lotSize);
}

function buyEvents(acct, activeGrids) {
  const events = [];
  activeGrids.forEach((grid, gridIndex) => {
    let price = acct.currentPrice - stepPrice(acct.currentPrice, grid, "buy");
    for (let guard = 0; price >= grid.lower && price > 0 && guard < 500; guard += 1) {
      if (price <= grid.upper) {
        const shares = orderShares(price, grid, "buy", acct);
        const amount = shares * price;
        const fee = tradeFee("buy", amount, acct);
        if (shares > 0) events.push({ gridIndex, side: "买入", price, shares, amount, fee });
      }
      price -= stepPrice(price, grid, "buy");
    }
  });
  return events.sort((a, b) => b.price - a.price);
}

function sellEvents(acct, activeGrids) {
  const events = [];
  activeGrids.forEach((grid, gridIndex) => {
    let price = acct.currentPrice + stepPrice(acct.currentPrice, grid, "sell");
    for (let guard = 0; price <= grid.upper && guard < 500; guard += 1) {
      if (price >= grid.lower) {
        const shares = orderShares(price, grid, "sell", acct);
        const amount = shares * price;
        const fee = tradeFee("sell", amount, acct);
        if (shares > 0) events.push({ gridIndex, side: "卖出", price, shares, amount, fee });
      }
      price += stepPrice(price, grid, "sell");
    }
  });
  return events.sort((a, b) => a.price - b.price);
}

function scenarioRow(type, scenario, event, shares, amount, fee, note = "") {
  return { type, scenario, grid: `网格 ${event.gridIndex + 1}`, side: event.side, price: event.price, shares, amount, fee, note };
}

function renderScenarioDetails() {
  const pane = els.scenarioWindow.dataset.scenarioPane || "setup";
  const visible = ["up", "down", "rebound"].includes(pane) ? scenarioRows.filter((r) => r.type === pane) : scenarioRows;
  els.detailRows.innerHTML = visible.length ? visible.map((r, i) => `<tr class="scenario-${esc(r.type)}-row">${cell("序号", i + 1)}${cell("情形", esc(r.scenario), "tag-cell")}${cell("网格", esc(r.grid), "tag-cell")}${cell("方向", esc(r.side))}${cell("触发价", money(r.price))}${cell("股数", qty(r.shares))}${cell("成交金额", money(r.amount))}${cell("费用", money(r.fee))}${cell("说明", esc(r.note || "-"))}</tr>`).join("") : `<tr><td colspan="9" class="empty">没有触发任何网格。</td></tr>`;
  const label = { up: "单边上涨", down: "单边下跌", rebound: "先跌后涨" }[pane] || "全部";
  els.detailSummary.textContent = `${label} ${visible.length} 条触发明细`;
}

function runScenarios() {
  readGrids();
  const acct = account();
  if (acct.currentPrice <= 0 || !grids.length) {
    els.status.textContent = "请填写当前价，并至少保留一组网格。";
    return;
  }
  const upper = Math.max(acct.currentPrice, ...grids.map((g) => g.upper));
  const lower = Math.min(acct.currentPrice, ...grids.map((g) => g.lower));
  const originalCost = acct.holdingShares * acct.costPrice;

  let upShares = acct.holdingShares;
  let upCash = 0;
  const upRows = [];
  sellEvents(acct, grids).forEach((event) => {
    if (upShares <= 0) return;
    const sold = Math.min(event.shares, upShares);
    const amount = sold * event.price;
    const fee = tradeFee("sell", amount, acct);
    upShares -= sold;
    upCash += amount - fee;
    upRows.push(scenarioRow("up", "单边上涨", event, sold, amount, fee));
  });
  const upFinal = upShares * upper;
  const upProfit = upFinal + upCash - originalCost;

  let downShares = acct.holdingShares;
  let downCash = 0;
  const downRows = [];
  buyEvents(acct, grids).forEach((event) => {
    downShares += event.shares;
    downCash += event.amount + event.fee;
    downRows.push(scenarioRow("down", "单边下跌", event, event.shares, event.amount, event.fee));
  });
  const downValue = downShares * lower;
  const downLoss = originalCost + downCash - downValue;

  let reboundShares = acct.holdingShares;
  let reboundBuy = 0;
  let reboundSell = 0;
  const reboundRows = [];
  buyEvents(acct, grids).forEach((event) => {
    reboundShares += event.shares;
    reboundBuy += event.amount + event.fee;
    reboundRows.push(scenarioRow("rebound", "先跌后涨", event, event.shares, event.amount, event.fee, "下跌阶段"));
  });
  sellEvents({ ...acct, currentPrice: lower }, grids).forEach((event) => {
    if (reboundShares <= 0) return;
    const sold = Math.min(event.shares, reboundShares);
    const amount = sold * event.price;
    const fee = tradeFee("sell", amount, acct);
    reboundShares -= sold;
    reboundSell += amount - fee;
    reboundRows.push(scenarioRow("rebound", "先跌后涨", event, sold, amount, fee, "反弹阶段"));
  });
  const reboundProfit = reboundShares * upper + reboundSell - originalCost - reboundBuy;

  scenarioRows = [...upRows, ...downRows, ...reboundRows];
  els.upProfit.textContent = money(upProfit);
  els.downCash.textContent = money(downCash);
  els.downLoss.textContent = money(downLoss);
  els.reboundProfit.textContent = money(reboundProfit);
  els.upBox.innerHTML = boxRows([["到达价格", money(upper)], ["卖出现金", money(upCash)], ["剩余股数", `${qty(upShares)} 股`], ["剩余市值", money(upFinal)], ["总体收益", money(upProfit)]]);
  els.downBox.innerHTML = boxRows([["到达价格", money(lower)], ["总体补仓金额", money(downCash)], ["可用现金不足还需", money(Math.max(0, downCash - acct.cash))], ["最终股数", `${qty(downShares)} 股`], ["总体亏损", money(downLoss)]]);
  els.reboundBox.innerHTML = boxRows([["先跌到", money(lower)], ["再涨到", money(upper)], ["补仓金额", money(reboundBuy)], ["卖出现金", money(reboundSell)], ["总体盈利", money(reboundProfit)]]);
  renderScenarioDetails();
  els.status.textContent = `${acct.symbol} 已完成三种情形推演。`;
  saveState();
}

function boxRows(rows) {
  return rows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
}

async function loadSymbolData() {
  try {
    const response = await fetch(`/api/quotes?symbol=${encodeURIComponent(els.symbol.value.trim())}`, { cache: "no-store" });
    const payload = await response.json();
    const rows = payload.rows || [];
    if (!rows.length) {
      els.status.textContent = "没有找到本地行情，可以手动填写当前价。";
      return;
    }
    els.currentPrice.value = Number(rows[rows.length - 1].close).toFixed(3);
    els.status.textContent = `已加载最新价 ${els.currentPrice.value}`;
    runScenarios();
  } catch (err) {
    els.status.textContent = `行情加载失败：${err.message}`;
  }
}

function nameFromTradeNote(note = "") {
  const match = String(note).match(/^券商导入\s+(.+?)(?:\s+\d{2}:\d{2}:\d{2}|$)/);
  return match ? match[1].trim() : "";
}

function stockNameForSymbol(symbol) {
  const code = String(symbol || "").trim().toUpperCase();
  if (!code) return "";
  const knownTrade = [...trades].reverse().find((trade) => trade.symbol === code && (trade.name || nameFromTradeNote(trade.note)));
  if (knownTrade) return knownTrade.name || nameFromTradeNote(knownTrade.note);
  return STOCK_NAME_MAP[code] || "";
}

function autofillTradeName(force = false) {
  if (!els.tName) return;
  const symbol = els.tSymbol.value.trim().toUpperCase();
  if (!force && els.tName.value.trim()) return;
  const name = stockNameForSymbol(symbol);
  if (name) els.tName.value = name;
}

function tradeName(trade) {
  return trade?.name || stockNameForSymbol(trade?.symbol) || nameFromTradeNote(trade?.note) || "";
}

function symbolNameHtml(symbol, name = "") {
  const cleanSymbol = String(symbol || "").trim().toUpperCase();
  const cleanName = name || stockNameForSymbol(cleanSymbol);
  return `<strong class="symbol-code">${esc(cleanSymbol)}</strong>${cleanName ? `<small class="symbol-name">${esc(cleanName)}</small>` : ""}`;
}

function loadTrades() {
  try {
    trades = JSON.parse(localStorage.getItem("gridTradingTrades") || "[]");
  } catch {
    trades = [];
  }
}

function saveTrades() {
  localStorage.setItem("gridTradingTrades", JSON.stringify(trades));
  saveState();
}

function addTrade() {
  const symbol = els.tSymbol.value.trim().toUpperCase();
  const name = els.tName.value.trim() || stockNameForSymbol(symbol);
  const side = els.tSide.value;
  const price = n(els.tPrice.value);
  const shares = Math.floor(n(els.tShares.value));
  if (!symbol || price <= 0 || shares <= 0) {
    els.status.textContent = "新增交易需要填写代码、成交价和股数。";
    return;
  }
  const amount = price * shares;
  const fee = els.tFee.value.trim() ? Math.max(0, n(els.tFee.value)) : tradeFee(side, amount);
  trades.push({ id: uid(), date: els.tDate.value || todayIso(), symbol, name, side, price, shares, amount, fee, createdAt: Date.now() });
  saveTrades();
  els.tFee.value = "";
  renderAllTrades();
  renderOverview();
  renderQuery();
  switchWindow("flowWindow");
}

function cleanBrokerCell(value) {
  let text = String(value ?? "").trim().replace(/^\uFEFF/, "");
  if (text.startsWith("=")) text = text.slice(1).trim();
  if (text.startsWith('"') && text.endsWith('"')) text = text.slice(1, -1);
  return text.replace(/""/g, '"').trim();
}

function brokerNumber(value) {
  return Number(cleanBrokerCell(value).replace(/,/g, "")) || 0;
}

function brokerDate(value) {
  const raw = cleanBrokerCell(value).replace(/\D/g, "");
  if (raw.length === 8) return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  return "";
}

function normalizeBrokerSymbol(value) {
  return cleanBrokerCell(value).replace(/\D/g, "").padStart(6, "0").slice(-6);
}

function brokerCreatedAt(date, time, offset = 0) {
  const safeTime = /^\d{2}:\d{2}:\d{2}$/.test(time) ? time : "09:30:00";
  const stamp = Date.parse(`${date}T${safeTime}`);
  return Number.isFinite(stamp) ? stamp + offset : Date.now() + offset;
}

function isReverseRepoTrade(symbol, name) {
  const code = normalizeBrokerSymbol(symbol);
  const text = cleanBrokerCell(name).toUpperCase();
  if (text.includes("逆回购")) return true;
  if (/^GC\d{3}$/.test(text) || /^R-\d{3}$/.test(text)) return true;
  if (/^204\d{3}$/.test(code) || /^1318\d{2}$/.test(code)) return true;
  return false;
}

function isBrokerStockOrEtf(symbol) {
  const code = normalizeBrokerSymbol(symbol);
  return /^(000|001|002|003|300|301|600|601|603|605|688|689|159|510|511|512|513|515|516|517|518|520|560|561|562|563|588)\d{3}$/.test(code);
}

function shouldIgnoreBrokerTrade(symbol, name, sideText) {
  const text = `${cleanBrokerCell(name)} ${cleanBrokerCell(sideText)}`.toUpperCase();
  if (isReverseRepoTrade(symbol, name)) return true;
  if (
    text.includes("申购") ||
    text.includes("配号") ||
    text.includes("中签") ||
    text.includes("缴款") ||
    text.includes("分红") ||
    text.includes("红利") ||
    text.includes("股息") ||
    text.includes("派息") ||
    text.includes("送股") ||
    text.includes("转增") ||
    text.includes("配股") ||
    text.includes("股权登记") ||
    text.includes("除权") ||
    text.includes("除息")
  ) return true;
  return !isBrokerStockOrEtf(symbol);
}

function decodeBrokerFile(buffer, mode = "broker1") {
  const encodings = ["gb18030", "utf-8", "utf-16le"];
  const dateHeader = mode === "broker2" ? "成交日期" : "交易日期";
  for (const encoding of encodings) {
    try {
      const text = new TextDecoder(encoding).decode(buffer);
      if (text.includes(dateHeader) && text.includes("证券代码")) return text;
    } catch {
      // Try next encoding.
    }
  }
  return new TextDecoder().decode(buffer);
}

function brokerTradeKey(trade) {
  return [trade.date, trade.symbol, trade.side, Number(trade.price).toFixed(4), Number(trade.shares).toFixed(0), trade.note || ""].join("|");
}

function parseBrokerTrades(text, mode = "broker1") {
  const lines = String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const dateHeader = mode === "broker2" ? "成交日期" : "交易日期";
  const headerIndex = lines.findIndex((line) => line.includes(dateHeader) && line.includes("证券代码"));
  if (headerIndex < 0) return { trades: [], skipped: lines.length, reason: `没有找到${dateHeader}/证券代码表头` };

  const headers = lines[headerIndex].split("\t").map(cleanBrokerCell);
  const col = (name) => headers.findIndex((header) => header === name);
  const indexes = {
    date: col(dateHeader),
    time: col("成交时间"),
    symbol: col("证券代码"),
    name: col("证券名称"),
    side: col("买卖标志"),
    price: col("成交价格"),
    shares: col("成交数量"),
    dealNo: col("成交编号"),
  };
  if ([indexes.date, indexes.time, indexes.symbol, indexes.name, indexes.side, indexes.price, indexes.shares].some((index) => index < 0)) {
    return { trades: [], skipped: lines.length - headerIndex - 1, reason: "表头缺少日期、代码、名称、方向、价格或数量" };
  }

  const parsed = [];
  let skipped = 0;
  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const cells = lines[i].split("\t").map(cleanBrokerCell);
    const sideText = cells[indexes.side] || "";
    const isBuy = mode === "broker2" ? sideText.includes("买入") : sideText === "买入";
    const isSell = mode === "broker2" ? sideText.includes("卖出") : sideText === "卖出";
    if (!isBuy && !isSell) {
      skipped += 1;
      continue;
    }

    const date = brokerDate(cells[indexes.date]);
    const time = cleanBrokerCell(cells[indexes.time]);
    const symbol = normalizeBrokerSymbol(cells[indexes.symbol]);
    const name = cleanBrokerCell(cells[indexes.name]);
    const side = isBuy ? "buy" : "sell";
    const price = brokerNumber(cells[indexes.price]);
    const shares = Math.abs(brokerNumber(cells[indexes.shares]));
    const dealNo = indexes.dealNo >= 0 ? cleanBrokerCell(cells[indexes.dealNo]) : "";
    if (!date || !symbol || !name || price <= 0 || shares <= 0 || shouldIgnoreBrokerTrade(symbol, name, sideText)) {
      skipped += 1;
      continue;
    }

    const amount = price * shares;
    parsed.push({
      id: uid(),
      date,
      symbol,
      name,
      side,
      price,
      shares,
      amount,
      fee: tradeFee(side, amount),
      note: `券商导入 ${name}${time ? ` ${time}` : ""}${dealNo ? ` 编号${dealNo}` : ""}`,
      createdAt: brokerCreatedAt(date, time, parsed.length),
    });
  }
  return { trades: parsed, skipped, reason: "" };
}

function renderBrokerImportPreview(summary = {}) {
  els.confirmBrokerImport.disabled = pendingBrokerTrades.length === 0;
  els.brokerImportSummary.innerHTML = [
    ["可导入", `${pendingBrokerTrades.length} 笔`],
    ["重复跳过", `${summary.duplicates || 0} 笔`],
    ["忽略项目", `${summary.skipped || 0} 笔`],
  ].map(([label, value]) => `<article class="broker-stat"><span>${label}</span><strong>${value}</strong></article>`).join("");

  if (!pendingBrokerTrades.length) {
    els.brokerImportPreview.innerHTML = `<div class="empty">${summary.reason || "还没有可导入的买卖成交"}</div>`;
    return;
  }

  const previewRows = pendingBrokerTrades.slice(0, 12);
  els.brokerImportPreview.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>日期</th><th>代码</th><th>方向</th><th>价格</th><th>股数</th><th>金额</th><th>费用</th></tr></thead>
        <tbody>
          ${previewRows.map((t) => `<tr>${cell("日期", esc(t.date))}${cell("代码", esc(t.symbol))}${cell("方向", t.side === "buy" ? "买入" : "卖出")}${cell("价格", money(t.price))}${cell("股数", qty(t.shares))}${cell("金额", money(t.amount))}${cell("费用", money(t.fee))}</tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${pendingBrokerTrades.length > previewRows.length ? `<p class="broker-status">预览前 ${previewRows.length} 笔，确认后导入全部 ${pendingBrokerTrades.length} 笔。</p>` : ""}
  `;
}

function clearBrokerImportPreview() {
  pendingBrokerTrades = [];
  els.brokerImportFile.value = "";
  els.brokerImportStatus.textContent = "券商1保持原格式；券商2支持“成交日期、证券买入/证券卖出”。GC001、申购、配号、中签、分红送股等会忽略。";
  renderBrokerImportPreview();
}

function handleBrokerImportFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const mode = els.brokerImportMode.value || "broker1";
    const parsed = parseBrokerTrades(decodeBrokerFile(reader.result, mode), mode);
    const existingKeys = new Set(trades.map(brokerTradeKey));
    const seenKeys = new Set();
    let duplicates = 0;
    pendingBrokerTrades = parsed.trades.filter((trade) => {
      const key = brokerTradeKey(trade);
      if (existingKeys.has(key) || seenKeys.has(key)) {
        duplicates += 1;
        return false;
      }
      seenKeys.add(key);
      return true;
    });
    els.brokerImportStatus.textContent = parsed.reason ? `识别失败：${parsed.reason}` : `已读取 ${file.name}，费用将按当前设置重新计算。`;
    renderBrokerImportPreview({ skipped: parsed.skipped, duplicates, reason: parsed.reason });
  };
  reader.onerror = () => {
    pendingBrokerTrades = [];
    els.brokerImportStatus.textContent = "文件读取失败，请重新选择。";
    renderBrokerImportPreview({ reason: "文件读取失败" });
  };
  reader.readAsArrayBuffer(file);
}

function confirmBrokerImport() {
  if (!pendingBrokerTrades.length) return;
  if (!confirm(`确认导入 ${pendingBrokerTrades.length} 笔买卖成交吗？费用会按当前设置自动计算。`)) return;
  trades.push(...pendingBrokerTrades);
  saveTrades();
  clearBrokerImportPreview();
  renderAllTrades();
  renderOverview();
  renderQuery();
  switchWindow("flowWindow");
}

function renderAllTrades(editId = "") {
  renderFlowSymbolChoices();
  const visible = flowFilterSymbol ? trades.filter((t) => t.symbol === flowFilterSymbol) : trades;
  const sorted = [...visible].sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
  els.tradeFlowRows.innerHTML = sorted.length ? sorted.map((t, i) => {
    if (t.id === editId) {
      return `<tr data-id="${t.id}" class="edit-row">${cell("序号", i + 1, "seq-cell")}${cell("日期", `<input data-edit="date" type="date" value="${esc(t.date)}">`, "date-cell")}${cell("代码/名称", `<input data-edit="symbol" value="${esc(t.symbol)}"><input data-edit="name" value="${esc(tradeName(t))}" placeholder="名称">`, "symbol-cell")}${cell("方向", `<select data-edit="side"><option value="buy"${t.side === "buy" ? " selected" : ""}>买入</option><option value="sell"${t.side === "sell" ? " selected" : ""}>卖出</option></select>`, "side-cell")}${cell("价格", `<input data-edit="price" type="number" step="0.001" value="${t.price}">`, "price-cell")}${cell("股数", `<input data-edit="shares" type="number" step="100" value="${t.shares}">`, "shares-cell")}${cell("成交金额", money(t.amount), "amount-cell")}${cell("费用", `<input data-edit="fee" type="number" step="0.01" value="${t.fee}">`, "fee-cell")}${cell("操作", `<button data-action="save">保存</button><button data-action="cancel">取消</button>`, "action-cell")}</tr>`;
    }
    return `<tr data-id="${t.id}">${cell("序号", i + 1, "seq-cell")}${cell("日期", esc(t.date), "date-cell")}${cell("代码/名称", symbolNameHtml(t.symbol, tradeName(t)), "symbol-cell")}${cell("方向", t.side === "buy" ? "买入" : "卖出", "tag-cell side-cell")}${cell("价格", money(t.price), "price-cell")}${cell("股数", qty(t.shares), "shares-cell")}${cell("成交金额", money(t.amount), "amount-cell")}${cell("费用", money(t.fee), "fee-cell")}${cell("操作", `<button data-action="edit">编辑</button><button data-action="delete">删除</button>`, "action-cell")}</tr>`;
  }).join("") : `<tr><td colspan="9" class="empty">${flowFilterSymbol ? `没有 ${esc(flowFilterSymbol)} 的交易流水。` : "还没有交易流水。"}</td></tr>`;
}

function renderOverview() {
  const sortMode = els.overviewSort?.value || "lastDateDesc";
  const bySymbol = new Map();
  trades.forEach((trade) => {
    if (!trade.symbol) return;
    if (!bySymbol.has(trade.symbol)) {
      bySymbol.set(trade.symbol, { symbol: trade.symbol, name: tradeName(trade), count: 0, volume: 0, amount: 0, fee: 0, lastDate: "", rows: [] });
    }
    const row = bySymbol.get(trade.symbol);
    if (!row.name && tradeName(trade)) row.name = tradeName(trade);
    row.count += 1;
    row.volume += Number(trade.shares || 0);
    row.amount += Number(trade.amount || trade.price * trade.shares || 0);
    row.fee += Number(trade.fee || 0);
    row.lastDate = row.lastDate && row.lastDate > trade.date ? row.lastDate : trade.date;
    row.rows.push(trade);
  });
  const rows = [...bySymbol.values()].map((item) => {
    const { matched, unmatched } = matchTrades(item.rows.sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`)));
    return {
      ...item,
      profit: matched.reduce((sum, r) => sum + r.profit, 0),
      openBuy: unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0),
      openSell: unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0),
    };
  });
  const numberSort = (field, direction = "desc") => (a, b) => {
    const diff = Number(a[field] || 0) - Number(b[field] || 0);
    return (direction === "asc" ? diff : -diff) || a.symbol.localeCompare(b.symbol);
  };
  const sorters = {
    lastDateDesc: (a, b) => b.lastDate.localeCompare(a.lastDate) || a.symbol.localeCompare(b.symbol),
    profitDesc: numberSort("profit", "desc"),
    profitAsc: numberSort("profit", "asc"),
    amountDesc: numberSort("amount", "desc"),
    amountAsc: numberSort("amount", "asc"),
    volumeDesc: numberSort("volume", "desc"),
    volumeAsc: numberSort("volume", "asc"),
    countDesc: numberSort("count", "desc"),
    feeDesc: numberSort("fee", "desc"),
    openBuyDesc: numberSort("openBuy", "desc"),
    openSellDesc: numberSort("openSell", "desc"),
    symbolAsc: (a, b) => a.symbol.localeCompare(b.symbol),
  };
  rows.sort(sorters[sortMode] || sorters.lastDateDesc);
  const sortLabel = els.overviewSort?.selectedOptions?.[0]?.textContent || "最近交易";
  els.overviewSummary.textContent = `${rows.length} 只股票 · ${sortLabel}`;
  els.overviewRows.innerHTML = rows.length ? rows.map((r, i) => `<tr>${cell("序号", i + 1)}${cell("代码/名称", symbolNameHtml(r.symbol, r.name), "symbol-cell")}${cell("交易次数", qty(r.count))}${cell("成交股数", `${qty(r.volume)} 股`)}${cell("总成交金额", money(r.amount))}${cell("总费用", money(r.fee))}${cell("已匹配盈亏", money(r.profit), profitClass(r.profit))}${cell("未匹配买入", `${qty(r.openBuy)} 股`)}${cell("未匹配卖出", `${qty(r.openSell)} 股`)}${cell("最后交易日", esc(r.lastDate || "-"))}${cell("操作", `<button data-action="view-symbol" data-symbol="${esc(r.symbol)}">查看</button>`, "action-cell")}</tr>`).join("") : `<tr><td colspan="11" class="empty">还没有交易流水。</td></tr>`;
}

function editTradeFromRow(row) {
  const trade = trades.find((t) => t.id === row.dataset.id);
  if (!trade) return;
  const get = (name) => row.querySelector(`[data-edit="${name}"]`).value;
  trade.date = get("date");
  trade.symbol = get("symbol").trim().toUpperCase();
  trade.name = get("name").trim() || stockNameForSymbol(trade.symbol);
  trade.side = get("side");
  trade.price = n(get("price"));
  trade.shares = Math.floor(n(get("shares")));
  trade.amount = trade.price * trade.shares;
  trade.fee = Math.max(0, n(get("fee")));
  saveTrades();
  renderAllTrades();
  renderOverview();
  renderQuery();
}

function filteredTrades() {
  const symbol = els.tFilterSymbol.value.trim().toUpperCase();
  const start = els.tStartDate.value;
  const end = els.tEndDate.value;
  return trades.filter((t) => !symbol || t.symbol === symbol).filter((t) => !start || t.date >= start).filter((t) => !end || t.date <= end).sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
}

function tradeSymbols() {
  const counts = new Map();
  trades.forEach((trade) => {
    if (!trade.symbol) return;
    const row = counts.get(trade.symbol) || { symbol: trade.symbol, name: tradeName(trade), count: 0 };
    row.count += 1;
    if (!row.name && tradeName(trade)) row.name = tradeName(trade);
    counts.set(trade.symbol, row);
  });
  return [...counts.values()].sort((a, b) => a.symbol.localeCompare(b.symbol));
}

function symbolButtons(active) {
  const symbols = tradeSymbols();
  return symbols.length
    ? `<button class="symbol-chip${active ? "" : " active"}" data-symbol="" type="button">全部</button>${symbols.map((row) => `<button class="symbol-chip${active === row.symbol ? " active" : ""}" data-symbol="${esc(row.symbol)}" type="button">${symbolNameHtml(row.symbol, row.name)} <span>${row.count}</span></button>`).join("")}`
    : `<span class="empty-chip">还没有交易股票</span>`;
}

function renderSymbolChoices() {
  const active = els.tFilterSymbol.value.trim().toUpperCase();
  els.currentQuerySymbol.textContent = active ? `当前：${active}${stockNameForSymbol(active) ? ` ${stockNameForSymbol(active)}` : ""}` : "当前：全部股票";
}

function renderFlowSymbolChoices() {
  els.currentFlowSymbol.textContent = flowFilterSymbol ? `当前流水筛选：${flowFilterSymbol}${stockNameForSymbol(flowFilterSymbol) ? ` ${stockNameForSymbol(flowFilterSymbol)}` : ""}` : "当前流水筛选：全部股票";
}

function openSymbolModal(mode) {
  symbolPickerMode = mode;
  const active = mode === "flow" ? flowFilterSymbol : els.tFilterSymbol.value.trim().toUpperCase();
  els.symbolModalTitle.textContent = mode === "flow" ? "选择交易流水股票" : "选择查询股票";
  els.symbolModalChoices.innerHTML = symbolButtons(active);
  els.symbolModal.hidden = false;
}

function closeSymbolModal() {
  els.symbolModal.hidden = true;
}

function matchTrades(rows) {
  const matched = [];
  const unmatched = [];
  const bySymbol = new Map();
  rows.forEach((t) => {
    if (!bySymbol.has(t.symbol)) bySymbol.set(t.symbol, []);
    bySymbol.get(t.symbol).push({ ...t, remaining: t.shares, remainingFee: t.fee });
  });
  bySymbol.forEach((items, symbol) => {
    const open = [];
    items.forEach((trade) => {
      while (trade.remaining > 0) {
        const index = findOpposite(open, trade.side);
        if (index < 0) break;
        const other = open[index];
        const shares = Math.min(trade.remaining, other.remaining);
        const buy = trade.side === "buy" ? trade : other;
        const sell = trade.side === "sell" ? trade : other;
        const buyFee = buy.fee * (shares / buy.shares);
        const sellFee = sell.fee * (shares / sell.shares);
        matched.push({ symbol, name: tradeName(sell) || tradeName(buy), sellDate: sell.date, sellPrice: sell.price, buyDate: buy.date, buyPrice: buy.price, shares, amount: shares * ((buy.price + sell.price) / 2), fee: buyFee + sellFee, profit: (sell.price - buy.price) * shares - buyFee - sellFee });
        trade.remaining -= shares;
        other.remaining -= shares;
        trade.remainingFee = Math.max(0, trade.remainingFee - trade.fee * (shares / trade.shares));
        other.remainingFee = Math.max(0, other.remainingFee - other.fee * (shares / other.shares));
        if (other.remaining <= 0) open.splice(index, 1);
      }
      if (trade.remaining > 0) open.push(trade);
    });
    unmatched.push(...open.filter((t) => t.remaining > 0));
  });
  return { matched, unmatched };
}

function findOpposite(open, side) {
  for (let i = open.length - 1; i >= 0; i -= 1) {
    if (open[i].side !== side) return i;
  }
  return -1;
}

function renderQuery() {
  renderSymbolChoices();
  const rows = filteredTrades();
  const allMatched = matchTrades([...trades].sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`))).matched;
  const allProfit = allMatched.reduce((sum, r) => sum + r.profit, 0);
  const { matched, unmatched } = matchTrades(rows);
  const profit = matched.reduce((sum, r) => sum + r.profit, 0);
  const totalFees = rows.reduce((sum, r) => sum + Number(r.fee || 0), 0);
  const totalAmount = rows.reduce((sum, r) => sum + Number(r.amount || r.price * r.shares || 0), 0);
  const matchedShares = matched.reduce((sum, r) => sum + r.shares, 0);
  const openBuy = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0);
  const openSell = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0);
  els.allMatchedProfit.textContent = money(allProfit);
  els.allMatchedProfit.className = profitClass(allProfit);
  els.tMatchedProfit.textContent = money(profit);
  els.tMatchedProfit.className = profitClass(profit);
  els.tTotalFees.textContent = money(totalFees);
  els.tTotalAmount.textContent = money(totalAmount);
  els.tMatchedShares.textContent = `${qty(matchedShares)} 股`;
  els.tOpenBuyShares.textContent = `${qty(openBuy)} 股`;
  els.tOpenSellShares.textContent = `${qty(openSell)} 股`;
  els.matchedSummary.textContent = `${matched.length} 组匹配`;
  els.unmatchedSummary.textContent = `${unmatched.length} 条未匹配`;
  const matchedHtml = matched.length ? matched.map((r, i) => `<tr>${cell("序号", i + 1, "seq-cell")}${cell("代码/名称", symbolNameHtml(r.symbol, r.name), "symbol-cell")}${cell("卖出日期", esc(r.sellDate), "sell-date-cell")}${cell("卖价", money(r.sellPrice), "sell-price-cell")}${cell("买入日期", esc(r.buyDate), "buy-date-cell")}${cell("买价", money(r.buyPrice), "buy-price-cell")}${cell("股数", qty(r.shares), "shares-cell")}${cell("成交金额", money(r.amount), "amount-cell")}${cell("费用", money(r.fee), "fee-cell")}${cell("盈亏", money(r.profit), `${profitClass(r.profit)} profit-cell`)}</tr>`).join("") : `<tr><td colspan="10" class="empty">还没有可匹配的反向交易。</td></tr>`;
  els.matchedRows.innerHTML = matchedHtml;
  const matchedModalRows = document.querySelector("#matchedModalRows");
  if (matchedModalRows) matchedModalRows.innerHTML = matchedHtml;
  els.unmatchedRows.innerHTML = unmatched.length ? unmatched.map((r, i) => `<tr>${cell("序号", i + 1, "seq-cell")}${cell("日期", esc(r.date), "date-cell")}${cell("代码/名称", symbolNameHtml(r.symbol, tradeName(r)), "symbol-cell")}${cell("方向", r.side === "buy" ? "买入" : "卖出", "tag-cell side-cell")}${cell("价格", money(r.price), "price-cell")}${cell("剩余股数", qty(r.remaining), "shares-cell")}${cell("成交金额", money(r.remaining * r.price), "amount-cell")}${cell("剩余费用", money(r.remainingFee), "fee-cell")}</tr>`).join("") : `<tr><td colspan="8" class="empty">没有未匹配交易。</td></tr>`;
}

function exportBackup() {
  const name = (els.backupName.value.trim() || "网格交易-备份").includes("网格交易") ? els.backupName.value.trim() || "网格交易-备份" : `网格交易-${els.backupName.value.trim()}`;
  const payload = { ...collectState(), name, type: "grid-trading-backup", exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function importBackup(file) {
  if (!file) return;
  const payload = JSON.parse(await file.text());
  if (!Array.isArray(payload.trades)) {
    els.status.textContent = "备份文件不正确。";
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  trades = payload.trades;
  restoreState();
  renderGrids();
  runScenarios();
  renderAllTrades();
  renderOverview();
  renderQuery();
  saveTrades();
  els.status.textContent = `已导入备份：${payload.name || file.name}`;
}

function clearTrades() {
  if (!confirm("确认清空全部交易流水？")) return;
  trades = [];
  saveTrades();
  renderAllTrades();
  renderOverview();
  renderQuery();
  saveState();
}

els.tabs.forEach((tab) => tab.addEventListener("click", () => switchWindow(tab.dataset.window)));
els.scenarioTabs.forEach((tab) => tab.addEventListener("click", () => switchScenarioPane(tab.dataset.scenarioPane)));
els.addGrid.addEventListener("click", () => addGrid());
document.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) scheduleSave();
});
document.addEventListener("change", (event) => {
  if (event.target.matches("input, select")) {
    if (event.target === els.importBackup) return;
    saveState();
  }
});
els.gridCards.addEventListener("input", () => {
  readGrids();
  scheduleSave();
});
els.gridCards.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-grid");
  if (!button) return;
  button.closest(".grid-card").remove();
  readGrids();
  if (!grids.length) addGrid();
  saveState();
});
els.runScenario.addEventListener("click", runScenarios);
els.loadSymbol.addEventListener("click", loadSymbolData);
els.addTrade.addEventListener("click", addTrade);
els.tSymbol.addEventListener("change", () => autofillTradeName(true));
els.tSymbol.addEventListener("blur", () => autofillTradeName(true));
els.brokerImportFile.addEventListener("change", () => handleBrokerImportFile(els.brokerImportFile.files[0]));
els.confirmBrokerImport.addEventListener("click", confirmBrokerImport);
els.clearBrokerImport.addEventListener("click", clearBrokerImportPreview);
els.tradeFlowRows.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  const action = event.target.dataset.action;
  if (!row || !action) return;
  if (action === "edit") renderAllTrades(row.dataset.id);
  if (action === "cancel") renderAllTrades();
  if (action === "save") editTradeFromRow(row);
  if (action === "delete") {
    trades = trades.filter((t) => t.id !== row.dataset.id);
    saveTrades();
    renderAllTrades();
    renderOverview();
    renderQuery();
  }
});
els.overviewRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='view-symbol']");
  if (!button) return;
  els.tFilterSymbol.value = button.dataset.symbol || "";
  renderQuery();
  switchWindow("queryWindow");
  saveState();
});
els.overviewSort?.addEventListener("change", renderOverview);
document.querySelector("#overviewWindow thead")?.addEventListener("click", (event) => {
  const header = event.target.closest("[data-overview-sort]");
  if (!header || !els.overviewSort) return;
  els.overviewSort.value = header.dataset.overviewSort || "lastDateDesc";
  renderOverview();
});
els.openFlowSymbolPicker.addEventListener("click", () => openSymbolModal("flow"));
els.openQuerySymbolPicker.addEventListener("click", () => openSymbolModal("query"));
els.closeSymbolModal.addEventListener("click", closeSymbolModal);
els.symbolModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-symbol-modal]")) closeSymbolModal();
  const button = event.target.closest(".symbol-chip");
  if (!button) return;
  if (symbolPickerMode === "flow") {
    flowFilterSymbol = button.dataset.symbol || "";
    renderAllTrades();
  } else {
    els.tFilterSymbol.value = button.dataset.symbol || "";
    renderQuery();
  }
  closeSymbolModal();
  saveState();
});
document.addEventListener("click", (event) => {
  if (event.target.closest("#openMatchedModal")) {
    document.querySelector("#matchedModal").hidden = false;
  }
  if (event.target.closest("#closeMatchedModal") || event.target.matches("[data-close-matched-modal]")) {
    document.querySelector("#matchedModal").hidden = true;
  }
});
els.applyTradeFilter.addEventListener("click", () => {
  renderQuery();
  saveState();
});
els.exportBackup.addEventListener("click", exportBackup);
els.importBackup.addEventListener("change", () => importBackup(els.importBackup.files[0]).catch((err) => { els.status.textContent = err.message; }));
els.clearTrades.addEventListener("click", clearTrades);

grids = defaultGrids();
ensureMatchedDetailModal();
loadTrades();
restoreState();
if (!els.tDate.value) els.tDate.value = todayIso();
autofillTradeName();
renderGrids();
runScenarios();
renderAllTrades();
renderOverview();
renderQuery();
saveState();
