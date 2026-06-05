$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

$RuntimePython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (Test-Path $RuntimePython) {
  $Python = $RuntimePython
} else {
  $Documents = Join-Path $env:USERPROFILE "Documents"
  $Python = Get-ChildItem -Path $Documents -Recurse -Filter python.exe -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -like "*\.venv\Scripts\python.exe" } |
    Select-Object -First 1 -ExpandProperty FullName
}

if (-not $Python) {
  Write-Host "Python was not found."
  Read-Host "Press Enter to close"
  exit 1
}

Write-Host ""
Write-Host "Grid Trading Tool"
Write-Host "================="
Write-Host ""
Write-Host "Keep this window open."
Write-Host "Open this URL after 3 seconds:"
Write-Host "http://127.0.0.1:8788"
Write-Host ""

Start-Process "http://127.0.0.1:8788"
& $Python server.py --host 127.0.0.1 --port 8788

Write-Host ""
Read-Host "Server stopped. Press Enter to close"
