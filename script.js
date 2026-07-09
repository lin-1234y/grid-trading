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
  etfStampDutyExempt: document.querySelector("#etfStampDutyExemptInput"),
  positionSymbol: document.querySelector("#positionSymbolInput"),
  positionName: document.querySelector("#positionNameInput"),
  positionShares: document.querySelector("#positionSharesInput"),
  positionCost: document.querySelector("#positionCostInput"),
  savePosition: document.querySelector("#savePositionButton"),
  positionList: document.querySelector("#positionList"),
  equityDate: document.querySelector("#equityDateInput"),
  equitySymbol: document.querySelector("#equitySymbolInput"),
  equityName: document.querySelector("#equityNameInput"),
  equityCash: document.querySelector("#equityCashInput"),
  equityBonus: document.querySelector("#equityBonusInput"),
  equityNote: document.querySelector("#equityNoteInput"),
  saveEquity: document.querySelector("#saveEquityButton"),
  equityList: document.querySelector("#equityList"),
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
  overviewStats: document.querySelector("#overviewStats"),
  overviewSort: document.querySelector("#overviewSortInput"),
  currentFlowSymbol: document.querySelector("#currentFlowSymbol"),
  openFlowSymbolPicker: document.querySelector("#openFlowSymbolPicker"),
  flowStartDate: document.querySelector("#flowStartDateInput"),
  flowEndDate: document.querySelector("#flowEndDateInput"),
  tFilterSymbol: document.querySelector("#tFilterSymbolInput"),
  tStartDate: document.querySelector("#tStartDateInput"),
  tEndDate: document.querySelector("#tEndDateInput"),
  applyTradeFilter: document.querySelector("#applyTradeFilterButton"),
  currentQuerySymbol: document.querySelector("#currentQuerySymbol"),
  allMatchedProfit: document.querySelector("#allMatchedProfit"),
  openAllProfitModal: document.querySelector("#openAllProfitModal"),
  allProfitModal: document.querySelector("#allProfitModal"),
  closeAllProfitModal: document.querySelector("#closeAllProfitModal"),
  allProfitModalSummary: document.querySelector("#allProfitModalSummary"),
  allProfitModalRows: document.querySelector("#allProfitModalRows"),
  clearedModal: document.querySelector("#clearedModal"),
  closeClearedModal: document.querySelector("#closeClearedModal"),
  clearedSearch: document.querySelector("#clearedSearchInput"),
  clearedModalSummary: document.querySelector("#clearedModalSummary"),
  clearedModalRows: document.querySelector("#clearedModalRows"),
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
  tOpenBuyAvg: document.querySelector("#tOpenBuyAvg"),
  tOpenSellShares: document.querySelector("#tOpenSellShares"),
  tOpenSellAvg: document.querySelector("#tOpenSellAvg"),
  tEstimatedShares: document.querySelector("#tEstimatedShares"),
  tPositionStatus: document.querySelector("#tPositionStatus"),
  tClearanceProfit: document.querySelector("#tClearanceProfit"),
  tClearanceHint: document.querySelector("#tClearanceHint"),
  tFinalProfit: document.querySelector("#tFinalProfit"),
  tFinalProfitHint: document.querySelector("#tFinalProfitHint"),
  tEquityDetails: document.querySelector("#tEquityDetails"),
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
let scenarioSkipRows = [];
let trades = [];
let pendingBrokerTrades = [];
let originalPositions = {};
let equityEvents = [];
let matchedCalendarRows = [];
let matchedCalendarMonth = "";
let matchedCalendarSelected = "";
let matchedCalendarAggregateBySymbol = false;
let calendarPeriodBaseRows = [];
let calendarPeriodFilterSymbol = "";
let calendarPeriodTitleText = "";
let localReviewData = null;
let localReviewSelectedDate = "";
let localReviewWindowStart = 0;
let localReviewWindowSize = 0;
let overviewRowsCache = [];
let saveTimer = 0;
let flowFilterSymbol = "";
let flowRenderLimit = 200;
let symbolPickerMode = "query";
const STORAGE_KEY = "gridTradingToolState";
const TRADE_DB_NAME = "gridTradingTradesDb";
const TRADE_DB_STORE = "kv";
const TRADE_DB_KEY = "trades";
const FLOW_RENDER_STEP = 200;
const IMPORT_CHUNK_SIZE = 500;
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

function ensureLocalReviewModal() {
  const queryPanel = document.querySelector("#queryWindow .compact-query-panel .symbol-filter");
  if (queryPanel && !document.querySelector("#openLocalReviewButton")) {
    queryPanel.insertAdjacentHTML("beforeend", `
      <button id="openLocalReviewButton" class="local-review-entry" type="button">无K线复盘</button>
    `);
  }
  if (document.querySelector("#localReviewModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="localReviewModal" class="modal" hidden>
      <div class="modal-backdrop" data-close-local-review></div>
      <section class="modal-card local-review-modal-card" role="dialog" aria-modal="true" aria-labelledby="localReviewTitle">
        <div class="modal-title">
          <div>
            <h2 id="localReviewTitle">无K线交易复盘</h2>
            <span id="localReviewSubtitle">使用本地交易、匹配、成本与分红送股生成</span>
          </div>
          <button id="closeLocalReviewModal" class="icon-button" type="button">×</button>
        </div>
        <p id="localReviewStatus" class="local-review-status">未加载行情。</p>
        <div class="local-review-legend">
          <span><i class="legend-bar"></i>magenta柱：仓位</span>
          <span><i class="legend-cost"></i>黄色曲线：成本</span>
          <span><i class="legend-buy"></i>▲ 买入</span>
          <span><i class="legend-sell"></i>▼ 卖出</span>
          <span><i class="legend-event"></i>◆ 分红送股</span>
        </div>
        <div class="local-review-controls">
          <label class="field"><span>区间开始</span><input id="localReviewStartInput" type="date"></label>
          <label class="field"><span>区间结束</span><input id="localReviewEndInput" type="date"></label>
          <button id="applyLocalReviewRange" type="button">应用区间</button>
          <button id="resetLocalReviewRange" class="ghost-button" type="button">显示全部</button>
        </div>
                <div class="local-review-axis-controls">
          <label><span>缩放日期数</span><input id="localReviewZoomInput" type="range" min="1" max="1" value="1"></label>
          <label><span>拉轴位置</span><input id="localReviewPanInput" type="range" min="0" max="0" value="0"></label>
          <em id="localReviewAxisLabel">显示全部本地日期</em>
        </div>
        <div id="localReviewChart" class="local-review-chart"></div>
        <div id="localReviewSummary" class="local-review-summary"></div>
        <div id="localReviewDetail" class="local-review-detail"></div>
      </section>
    </div>
  `);
}
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
          <div class="matched-calendar-shell">
            <div class="calendar-toolbar">
              <button id="matchedCalendarPrev" type="button">上月</button>
              <div class="calendar-title-picker">
                <strong id="matchedCalendarTitle">-</strong>
                <select id="matchedCalendarYearSelect" aria-label="选择年度"></select>
              </div>
              <button id="matchedCalendarNext" type="button">下月</button>
            </div>
            <div class="calendar-weekdays">
              <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span>
            </div>
            <div id="matchedCalendarGrid" class="matched-calendar-grid"></div>
            <div class="calendar-total-grid">
              <article><span>本月匹配盈亏</span><strong id="matchedMonthProfit">-</strong><em>成交金额 <b id="matchedMonthAmount">-</b></em></article>
              <article><span>本年匹配盈亏</span><strong id="matchedYearProfit">-</strong><em>成交金额 <b id="matchedYearAmount">-</b></em></article>
              <article><span>全部匹配盈亏</span><strong id="matchedAllProfit">-</strong><em>成交金额 <b id="matchedAllAmount">-</b></em></article>
              <article id="openMatchedYearSummary"><span>各年度匹配盈亏</span><strong>查看</strong><em>按年度查询</em></article>
            </div>
          </div>
          <div class="table-wrap tall daily-match-detail">
            <table>
              <thead id="matchedModalHead"><tr><th>卖出日期</th><th>卖价</th><th>买入日期</th><th>买价</th><th>股数</th><th>成交金额</th><th>费用</th><th>盈亏</th></tr></thead>
              <tbody id="matchedModalRows"></tbody>
            </table>
          </div>
        </section>
      </div>
    `);
  }
  if (!document.querySelector("#calendarPeriodModal")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div id="calendarPeriodModal" class="modal" hidden>
        <div class="modal-backdrop" data-close-calendar-period-modal></div>
        <section class="modal-card calendar-period-modal-card" role="dialog" aria-modal="true" aria-labelledby="calendarPeriodModalTitle">
          <div class="modal-title">
            <h2 id="calendarPeriodModalTitle">个股匹配盈亏</h2>
            <button id="closeCalendarPeriodModal" class="icon-button" type="button">×</button>
          </div>
          <div id="calendarPeriodSummary" class="modal-small-summary"></div>
          <div id="calendarPeriodFilter" class="calendar-period-filter" hidden>
            <div>
              <span>筛选股票</span>
              <strong id="calendarPeriodFilterLabel">全部股票</strong>
            </div>
            <button id="toggleCalendarPeriodSymbolFilter" type="button">选择股票</button>
            <button id="clearCalendarPeriodSymbolFilter" type="button">全部</button>
            <div id="calendarPeriodSymbolChoices" class="calendar-period-symbol-choices" hidden></div>
          </div>
          <div class="table-wrap tall">
            <table>
              <thead id="calendarPeriodHead"><tr><th>代码/名称</th><th>匹配盈亏</th><th>匹配股数</th><th>成交金额</th><th>费用</th><th>匹配组数</th><th>买卖明细</th></tr></thead>
              <tbody id="calendarPeriodRows"></tbody>
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

function plainInteger(value) {
  return Number(value || 0).toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

function calendarInteger(value) {
  return Math.round(Number(value || 0));
}

function fixed(value) {
  return Number(value || 0).toFixed(4);
}

function priceText(value) {
  return Number(value || 0).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 3 });
}

function signedPriceText(value) {
  const number = Number(value || 0);
  return `${number > 0 ? "+" : ""}${priceText(number)}`;
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
    etfStampDutyExempt: Boolean(els.etfStampDutyExempt?.checked),
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

function collectState(options = {}) {
  const includeTrades = options.includeTrades !== false;
  if (els.gridCards.children.length) readGrids();
  const state = {
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
      etfStampDutyExempt: Boolean(els.etfStampDutyExempt?.checked),
      backupName: els.backupName.value,
    },
    query: {
      symbol: els.tFilterSymbol.value,
      startDate: els.tStartDate.value,
      endDate: els.tEndDate.value,
    },
    flow: {
      symbol: flowFilterSymbol,
      startDate: els.flowStartDate.value,
      endDate: els.flowEndDate.value,
    },
    originalPositions,
    equityEvents,
  };
  if (includeTrades) state.trades = trades;
  return state;
}

function saveState() {
  try {
    localStorage.removeItem("gridTradingTrades");
    const payload = JSON.stringify(collectState({ includeTrades: false }));
    localStorage.setItem(STORAGE_KEY, payload);
    if (localStorage.getItem(STORAGE_KEY) !== payload) {
      throw new Error("保存校验失败");
    }
  } catch (error) {
    const message = error?.name === "QuotaExceededError"
      ? "浏览器本地存储空间不足，新增数据可能没有保存。请先导出备份，再减少流水或改用更大的存储方案。"
      : "浏览器本地存储不可用，新增数据可能没有保存。请导出备份保存。";
    els.status.textContent = message;
    window.alert(message);
  }
}

async function migrateLegacyTradeStorage() {
  try {
    const stateHasTrades = (() => {
      try {
        const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        return Array.isArray(state?.trades) && state.trades.length > 0;
      } catch {
        return false;
      }
    })();
    if (trades.length && (localStorage.getItem("gridTradingTrades") !== null || stateHasTrades)) {
      await saveTradesToDb(trades);
      saveState();
    }
  } catch (error) {
    showStorageError(error, "迁移");
  }
}

function openTradeDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("当前浏览器不支持 IndexedDB"));
      return;
    }
    const request = indexedDB.open(TRADE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(TRADE_DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB 打开失败"));
  });
}

function tradeDbRequest(mode, action) {
  return openTradeDb().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(TRADE_DB_STORE, mode);
    const store = tx.objectStore(TRADE_DB_STORE);
    const request = action(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB 操作失败"));
    tx.oncomplete = () => db.close();
    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error("IndexedDB 事务失败"));
    };
  }));
}

function loadTradesFromDb() {
  return tradeDbRequest("readonly", (store) => store.get(TRADE_DB_KEY));
}

function saveTradesToDb(rows) {
  return tradeDbRequest("readwrite", (store) => store.put(rows, TRADE_DB_KEY));
}

function deleteTradesFromDb() {
  return tradeDbRequest("readwrite", (store) => store.delete(TRADE_DB_KEY));
}

function showStorageError(error, action = "保存") {
  const message = `${action}交易流水失败：${error?.message || error || "浏览器本地数据库不可用"}。请先导出备份保存。`;
  els.status.textContent = message;
  window.alert(message);
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
  if (settings.etfStampDutyExempt !== undefined && els.etfStampDutyExempt) els.etfStampDutyExempt.checked = Boolean(settings.etfStampDutyExempt);
  if (settings.backupName !== undefined) els.backupName.value = settings.backupName;
  const query = state.query || {};
  if (query.symbol !== undefined) els.tFilterSymbol.value = query.symbol;
  if (query.startDate !== undefined) els.tStartDate.value = query.startDate;
  if (query.endDate !== undefined) els.tEndDate.value = query.endDate;
  const flow = state.flow || {};
  if (flow.symbol !== undefined) flowFilterSymbol = flow.symbol;
  if (flow.startDate !== undefined) els.flowStartDate.value = flow.startDate;
  if (flow.endDate !== undefined) els.flowEndDate.value = flow.endDate;
  originalPositions = state.originalPositions && typeof state.originalPositions === "object" ? state.originalPositions : {};
  equityEvents = Array.isArray(state.equityEvents) ? state.equityEvents : [];
  if (Array.isArray(state.trades) && !trades.length) trades = state.trades;
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

function isEtfTrade(symbol = "", name = "") {
  const code = String(symbol || "").trim().toUpperCase();
  const text = String(name || "").trim().toUpperCase();
  return text.includes("ETF") || /^(15|16|51|52|56|58)\d{4}$/.test(code);
}

function tradeFee(side, amount, acct = account(), symbol = acct.symbol, name = "") {
  if (amount <= 0) return 0;
  const commission = Math.max(acct.minCommission, amount * acct.commissionPct);
  const exemptStamp = acct.etfStampDutyExempt && side === "sell" && isEtfTrade(symbol, name);
  const stamp = side === "sell" && !exemptStamp ? amount * acct.stampDutyPct : 0;
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
    if (grid.upper < grid.lower) return;
    if (stepPrice(acct.currentPrice, grid, "buy") <= 0) return;
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
    if (grid.upper < grid.lower) return;
    if (stepPrice(acct.currentPrice, grid, "sell") <= 0) return;
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
  return { type, scenario, gridIndex: event.gridIndex, grid: `网格 ${event.gridIndex + 1}`, side: event.side, price: event.price, shares, amount, fee, note };
}

function buyNoTriggerReason(acct, grid) {
  if (grid.upper < grid.lower) return "网格上限低于下限";
  const step = stepPrice(acct.currentPrice, grid, "buy");
  if (step <= 0) return "买入步长为空或为 0";
  if (acct.currentPrice <= grid.lower) return "当前价已低于或等于网格下限，单边下跌不会触发该网格";
  const probePrice = Math.min(Math.max(grid.lower, acct.currentPrice - step), grid.upper);
  if (orderShares(probePrice, grid, "buy", acct) <= 0) return "每格买入不足一手";
  return "下跌路径没有进入该网格区间";
}

function sellNoTriggerReason(acct, grid) {
  if (grid.upper < grid.lower) return "网格上限低于下限";
  const step = stepPrice(acct.currentPrice, grid, "sell");
  if (step <= 0) return "卖出步长为空或为 0";
  if (acct.currentPrice >= grid.upper) return "当前价已高于或等于网格上限，单边上涨不会触发该网格";
  const probePrice = Math.max(Math.min(grid.upper, acct.currentPrice + step), grid.lower);
  if (orderShares(probePrice, grid, "sell", acct) <= 0) return "每格卖出不足一手";
  return "上涨路径没有进入该网格区间";
}

function buildScenarioSkipRows(acct, activeGrids, rowsByType, lowerPrice) {
  const labels = { up: "单边上涨", down: "单边下跌", rebound: "先跌后涨" };
  return ["up", "down", "rebound"].flatMap((type) => activeGrids
    .map((grid, gridIndex) => {
      if (rowsByType[type].some((row) => row.gridIndex === gridIndex)) return null;
      let note = "";
      if (type === "up") note = sellNoTriggerReason(acct, grid);
      if (type === "down") note = buyNoTriggerReason(acct, grid);
      if (type === "rebound") {
        const buyReason = buyNoTriggerReason(acct, grid);
        const sellReason = sellNoTriggerReason({ ...acct, currentPrice: lowerPrice }, grid);
        note = `下跌：${buyReason}；反弹：${sellReason}`;
      }
      return {
        type,
        scenario: labels[type],
        gridIndex,
        grid: `网格 ${gridIndex + 1}`,
        side: "未触发",
        price: 0,
        shares: 0,
        amount: 0,
        fee: 0,
        note,
      };
    })
    .filter(Boolean));
}

function renderScenarioDetails() {
  const pane = els.scenarioWindow.dataset.scenarioPane || "setup";
  const visible = ["up", "down", "rebound"].includes(pane) ? scenarioRows.filter((r) => r.type === pane) : scenarioRows;
  const skipped = ["up", "down", "rebound"].includes(pane) ? scenarioSkipRows.filter((r) => r.type === pane) : scenarioSkipRows;
  const triggeredHtml = visible.map((r, i) => `<tr class="scenario-${esc(r.type)}-row">${cell("序号", i + 1)}${cell("情形", esc(r.scenario), "tag-cell")}${cell("网格", esc(r.grid), "tag-cell")}${cell("方向", esc(r.side))}${cell("触发价", money(r.price))}${cell("股数", qty(r.shares))}${cell("成交金额", money(r.amount))}${cell("费用", money(r.fee))}${cell("说明", esc(r.note || "-"))}</tr>`).join("");
  const skippedHtml = skipped.map((r) => `<tr class="scenario-skip-row">${cell("序号", "-")}${cell("情形", esc(r.scenario), "tag-cell")}${cell("网格", esc(r.grid), "tag-cell")}${cell("方向", esc(r.side))}${cell("触发价", "-")}${cell("股数", "-")}${cell("成交金额", "-")}${cell("费用", "-")}${cell("说明", esc(r.note || "-"))}</tr>`).join("");
  els.detailRows.innerHTML = triggeredHtml || skippedHtml ? `${triggeredHtml}${skippedHtml}` : `<tr><td colspan="9" class="empty">没有触发任何网格。</td></tr>`;
  const label = { up: "单边上涨", down: "单边下跌", rebound: "先跌后涨" }[pane] || "全部";
  els.detailSummary.textContent = `${label} ${visible.length} 条触发明细${skipped.length ? `，${skipped.length} 个网格未触发` : ""}`;
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
  const upFinalTotal = upFinal + upCash;
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
  const downTotalCost = originalCost + downCash;
  const downAvgCost = downShares > 0 ? downTotalCost / downShares : 0;
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
  const reboundFinalValue = reboundShares * upper;
  const reboundFinalTotal = reboundFinalValue + reboundSell;
  const reboundAvgCost = reboundShares > 0 ? (originalCost + reboundBuy) / reboundShares : 0;

  scenarioRows = [...upRows, ...downRows, ...reboundRows];
  scenarioSkipRows = buildScenarioSkipRows(acct, grids, { up: upRows, down: downRows, rebound: reboundRows }, lower);
  els.upProfit.textContent = money(upProfit);
  const upProfitCard = els.upProfit.closest(".metric");
  setMetricNote(upProfitCard, `${qty(acct.holdingShares)} 股 -> ${qty(upShares)} 股 · 最终金额 ${money(upFinalTotal)}`);
  const downCashCard = els.downCash.closest(".metric");
  const downLossCard = els.downLoss.closest(".metric");
  downCashCard.querySelector("span").textContent = "原始持仓金额";
  downLossCard.querySelector("span").textContent = "最终金额";
  els.downCash.textContent = money(originalCost);
  els.downLoss.textContent = money(downValue);
  setMetricNote(downCashCard, `${qty(acct.holdingShares)} 股 · 原始成本 ${money(acct.costPrice)}`);
  setMetricNote(downLossCard, `${qty(downShares)} 股 · 最终成本 ${money(downAvgCost)}`);
  els.reboundProfit.textContent = money(reboundProfit);
  const reboundProfitCard = els.reboundProfit.closest(".metric");
  setMetricNote(reboundProfitCard, `${qty(reboundShares)} 股 · 最终金额 ${money(reboundFinalTotal)}`);
  els.upBox.innerHTML = boxRows([
    ["到达价格", money(upper)],
    ["原始持仓金额", money(originalCost), `${qty(acct.holdingShares)} 股 · 原始成本 ${money(acct.costPrice)}`],
    ["卖出现金", money(upCash)],
    ["最终金额", money(upFinalTotal), `${qty(upShares)} 股 · 到达价格 ${money(upper)}`],
    ["总体收益", money(upProfit)],
  ]);
  els.downBox.innerHTML = boxRows([
    ["到达价格", money(lower)],
    ["原始持仓金额", money(originalCost), `${qty(acct.holdingShares)} 股 · 原始成本 ${money(acct.costPrice)}`],
    ["总体补仓金额", money(downCash)],
    ["最终金额", money(downValue), `${qty(downShares)} 股 · 最终成本 ${money(downAvgCost)}`],
    ["总体亏损", money(downLoss)],
  ]);
  els.reboundBox.innerHTML = boxRows([
    ["先跌到", money(lower)],
    ["再涨到", money(upper)],
    ["原始持仓金额", money(originalCost), `${qty(acct.holdingShares)} 股 · 原始成本 ${money(acct.costPrice)}`],
    ["补仓金额", money(reboundBuy)],
    ["卖出现金", money(reboundSell)],
    ["最终金额", money(reboundFinalTotal), `${qty(reboundShares)} 股 · 最终成本 ${money(reboundAvgCost)}`],
    ["总体盈利", money(reboundProfit)],
  ]);
  renderScenarioDetails();
  els.status.textContent = `${acct.symbol} 已完成三种情形推演。`;
  saveState();
}

function boxRows(rows) {
  return rows.map(([label, value, detail]) => `<div><span>${label}${detail ? `<em>${detail}</em>` : ""}</span><strong>${value}</strong></div>`).join("");
}

function setMetricNote(metric, note) {
  let noteEl = metric.querySelector("em.metric-note");
  if (!noteEl) {
    noteEl = document.createElement("em");
    noteEl.className = "metric-note";
    metric.appendChild(noteEl);
  }
  noteEl.textContent = note;
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
  if (originalPositions[code]?.name) return originalPositions[code].name;
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

function normalizeSymbol(value) {
  return String(value || "").trim().toUpperCase();
}

function saveOriginalPosition() {
  const symbol = normalizeSymbol(els.positionSymbol.value);
  if (!symbol) {
    els.status.textContent = "请先填写股票代码。";
    return;
  }
  const shares = Math.max(0, Math.floor(n(els.positionShares.value)));
  const cost = Math.max(0, n(els.positionCost.value));
  const name = els.positionName.value.trim() || stockNameForSymbol(symbol);
  originalPositions[symbol] = { symbol, name, shares, cost };
  els.positionSymbol.value = "";
  els.positionName.value = "";
  els.positionShares.value = "";
  els.positionCost.value = "";
  renderOriginalPositions();
  renderSymbolChoices();
  renderQuery();
  saveState();
  els.status.textContent = `已保存 ${symbol}${name ? ` ${name}` : ""} 的原始持仓。`;
}

function renderOriginalPositions() {
  const positions = Object.values(originalPositions).sort((a, b) => a.symbol.localeCompare(b.symbol));
  if (!positions.length) {
    els.positionList.innerHTML = `<div class="empty position-empty">还没有保存原始持仓。</div>`;
    return;
  }
  els.positionList.innerHTML = positions.map((pos) => `
    <article class="position-row" data-symbol="${esc(pos.symbol)}">
      <div class="position-main">${symbolNameHtml(pos.symbol, pos.name)}</div>
      <div class="position-meta">
        <span>原始股数 <b>${qty(pos.shares)} 股</b></span>
        <span>成本 <b>${money(pos.cost)}</b></span>
      </div>
      <div class="position-actions">
        <button type="button" data-action="load-position">载入</button>
        <button type="button" data-action="delete-position">删除</button>
      </div>
    </article>
  `).join("");
}

function loadOriginalPosition(symbol) {
  const pos = originalPositions[symbol];
  if (!pos) return;
  els.positionSymbol.value = pos.symbol;
  els.positionName.value = pos.name || "";
  els.positionShares.value = pos.shares || "";
  els.positionCost.value = pos.cost || "";
}

function autofillPositionName() {
  if (els.positionName.value.trim()) return;
  const name = stockNameForSymbol(normalizeSymbol(els.positionSymbol.value));
  if (name) els.positionName.value = name;
}

function deleteOriginalPosition(symbol) {
  delete originalPositions[symbol];
  renderOriginalPositions();
  renderQuery();
  saveState();
}

function equityEventSort(a, b) {
  return `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`);
}

function equityEventsForSymbol(symbol, throughDate = "") {
  const code = normalizeSymbol(symbol);
  return equityEvents
    .filter((event) => event.symbol === code && (!throughDate || event.date <= throughDate))
    .sort(equityEventSort);
}

function adjustedPriceForEquity(price, event) {
  const cash = Math.max(0, Number(event.cash || 0));
  const factor = 1 + (Math.max(0, Number(event.bonusPer10 || 0)) / 10);
  return Math.max(0, (Number(price || 0) - cash) / factor);
}

function adjustedSharesForEquity(shares, event) {
  const factor = 1 + (Math.max(0, Number(event.bonusPer10 || 0)) / 10);
  return Math.max(0, Math.round(Number(shares || 0) * factor));
}

function applyEquityEventToOpen(open, event) {
  open.forEach((item) => {
    item.price = adjustedPriceForEquity(item.price, event);
    item.remaining = adjustedSharesForEquity(item.remaining, event);
    item.shares = adjustedSharesForEquity(item.shares, event);
    item.amount = item.price * item.shares;
    item.equityAdjusted = true;
  });
}

function adjustedOriginalPosition(symbol, throughDate = todayIso()) {
  const code = normalizeSymbol(symbol);
  const pos = originalPositions[code];
  if (!pos) return { symbol: code, name: stockNameForSymbol(code), shares: 0, cost: 0, hasPosition: false };
  return equityEventsForSymbol(code, throughDate).reduce((current, event) => ({
    ...current,
    shares: adjustedSharesForEquity(current.shares, event),
    cost: adjustedPriceForEquity(current.cost, event),
  }), { ...pos, hasPosition: true });
}

function saveEquityEvent() {
  const symbol = normalizeSymbol(els.equitySymbol.value);
  const date = els.equityDate.value || todayIso();
  const cash = Math.max(0, n(els.equityCash.value));
  const bonusPer10 = Math.max(0, n(els.equityBonus.value));
  if (!symbol || (!cash && !bonusPer10)) {
    els.status.textContent = "请填写股票代码，并至少填写现金分红或送转数量。";
    return;
  }
  const name = els.equityName.value.trim() || stockNameForSymbol(symbol);
  equityEvents.push({ id: uid(), date, symbol, name, cash, bonusPer10, note: els.equityNote.value.trim(), createdAt: Date.now() });
  els.equityCash.value = "";
  els.equityBonus.value = "";
  els.equityNote.value = "";
  renderEquityEvents();
  renderOverview();
  renderQuery();
  saveState();
  els.status.textContent = `已保存 ${symbol}${name ? ` ${name}` : ""} 的分红送股规则。`;
}

function renderEquityEvents() {
  const rows = [...equityEvents].sort((a, b) => equityEventSort(b, a));
  if (!rows.length) {
    els.equityList.innerHTML = `<div class="empty position-empty">还没有分红送股记录。</div>`;
    return;
  }
  els.equityList.innerHTML = rows.map((event) => `
    <article class="position-row equity-row" data-id="${esc(event.id)}">
      <div class="position-main">${symbolNameHtml(event.symbol, event.name)}</div>
      <div class="position-meta">
        <span>日期 <b>${esc(event.date)}</b></span>
        <span>现金 <b>${priceText(event.cash || 0)}</b></span>
        <span>送转 <b>10 股送转 ${priceText(event.bonusPer10 || 0)}</b></span>
        ${event.note ? `<span>备注 <b>${esc(event.note)}</b></span>` : ""}
      </div>
      <div class="position-actions">
        <button type="button" data-action="delete-equity">删除</button>
      </div>
    </article>
  `).join("");
}

function autofillEquityName() {
  if (els.equityName.value.trim()) return;
  const name = stockNameForSymbol(normalizeSymbol(els.equitySymbol.value));
  if (name) els.equityName.value = name;
}

function deleteEquityEvent(id) {
  equityEvents = equityEvents.filter((event) => event.id !== id);
  renderEquityEvents();
  renderOverview();
  renderQuery();
  saveState();
}

function renderPositionEstimate(activeSymbol, openBuy, openSell, matchedProfit = 0, totalBuyAmount = 0, totalSellAmount = 0) {
  if (!activeSymbol) {
    els.tEstimatedShares.textContent = "-";
    els.tPositionStatus.textContent = "选择股票后判断";
    els.tEstimatedShares.className = "";
    return null;
  }
  const pos = adjustedOriginalPosition(activeSymbol, els.tEndDate.value || todayIso());
  const baseShares = Number(pos?.shares || 0);
  const estimated = baseShares + openBuy - openSell;
  const isCleared = pos.hasPosition ? (openSell === baseShares && openBuy === 0) : estimated === 0;
  const absShares = `${estimated < 0 ? "-" : ""}${qty(Math.abs(estimated))} 股`;
  els.tEstimatedShares.textContent = absShares;
  els.tEstimatedShares.className = estimated === 0 ? "profit-flat" : estimated > 0 ? "profit-positive" : "profit-negative";
  const hasKnownCost = pos.hasPosition && Number(pos.cost || 0) > 0;
  const currentCost = estimated > 0
    ? (hasKnownCost ? ((pos.cost * baseShares) + totalBuyAmount - totalSellAmount) / estimated : (totalBuyAmount - totalSellAmount) / estimated)
    : null;
  const costChange = currentCost !== null ? (hasKnownCost ? currentCost - pos.cost : currentCost) : null;
  if (isCleared) {
    els.tPositionStatus.textContent = hasKnownCost ? `已清仓 · 底仓成本 ${priceText(pos.cost)} · 变化 ${signedPriceText(costChange)}/股` : "已清仓 · 无底仓成本";
  } else if (estimated > 0) {
    if (currentCost !== null) {
      els.tPositionStatus.textContent = `现在成本 ${priceText(currentCost)} · 变化 ${signedPriceText(costChange)}/股`;
    } else {
      els.tPositionStatus.textContent = `现在成本 ${priceText(currentCost)} · 无底仓成本 · (总买入-总卖出)/现在股数`;
    }
  } else {
    els.tPositionStatus.textContent = hasKnownCost ? `净卖出 ${qty(Math.abs(estimated))} 股 · 底仓成本 ${priceText(pos.cost)}` : `净卖出 ${qty(Math.abs(estimated))} 股 · 无底仓成本`;
  }
  return { estimated, hasPosition: Boolean(pos.hasPosition), baseShares, isCleared, currentCost, costChange };
}

function renderClearanceProfit(activeSymbol, positionEstimate, matchedProfit, openBuyAmount, openSellAmount) {
  if (!activeSymbol) {
    els.tClearanceProfit.textContent = "-";
    els.tClearanceProfit.className = "";
    els.tClearanceHint.textContent = "选择股票后计算";
    els.tFinalProfit.textContent = "-";
    els.tFinalProfit.className = "";
    els.tFinalProfitHint.textContent = "选择股票后计算";
    return;
  }
  if (!positionEstimate?.isCleared) {
    els.tClearanceProfit.textContent = "-";
    els.tClearanceProfit.className = "";
    els.tClearanceHint.textContent = positionEstimate?.hasPosition ? "未匹配卖出数未等于原始持仓，暂不按清仓计算" : "初始持仓按 0 股处理，估算持仓不为 0";
    els.tFinalProfit.textContent = money(matchedProfit);
    els.tFinalProfit.className = profitClass(matchedProfit);
    els.tFinalProfitHint.textContent = "未清仓，仅显示已匹配盈亏";
    return;
  }
  const clearanceProfit = openSellAmount - openBuyAmount;
  const finalProfit = matchedProfit + clearanceProfit;
  els.tClearanceProfit.textContent = money(clearanceProfit);
  els.tClearanceProfit.className = profitClass(clearanceProfit);
  els.tClearanceHint.textContent = `未匹配卖出额 ${money(openSellAmount)} - 未匹配买入额 ${money(openBuyAmount)}`;
  els.tFinalProfit.textContent = money(finalProfit);
  els.tFinalProfit.className = profitClass(finalProfit);
  els.tFinalProfitHint.textContent = "已匹配盈亏 + 清仓匹配盈亏";
}

function renderQueryEquityDetails(activeSymbol, throughDate) {
  if (!els.tEquityDetails) return;
  if (!activeSymbol) {
    els.tEquityDetails.innerHTML = `<span class="empty-equity-detail">选择股票后显示</span>`;
    return;
  }
  const rows = equityEventsForSymbol(activeSymbol, throughDate);
  if (!rows.length) {
    els.tEquityDetails.innerHTML = `<span class="empty-equity-detail">没有分红送股记录</span>`;
    return;
  }
  els.tEquityDetails.innerHTML = rows.map((event) => {
    const cash = Number(event.cash || 0);
    const bonus = Number(event.bonusPer10 || 0);
    const parts = [];
    if (cash) parts.push(`现金 ${priceText(cash)}/股`);
    if (bonus) parts.push(`每10股送转 ${qty(bonus)}`);
    if (!parts.length) parts.push("仅备注");
    return `
      <div class="equity-detail-item">
        <strong>${esc(event.date)}</strong>
        <span>${parts.join(" · ")}</span>
        ${event.note ? `<em>${esc(event.note)}</em>` : ""}
      </div>
    `;
  }).join("");
}

async function loadTrades() {
  try {
    const stored = await loadTradesFromDb();
    if (Array.isArray(stored)) {
      trades = stored;
      return;
    }
  } catch (error) {
    els.status.textContent = `IndexedDB 读取失败，尝试读取旧数据：${error?.message || error}`;
  }
  try {
    const legacy = JSON.parse(localStorage.getItem("gridTradingTrades") || "[]");
    if (Array.isArray(legacy) && legacy.length) {
      trades = legacy;
      await saveTradesToDb(trades);
      localStorage.removeItem("gridTradingTrades");
    }
  } catch (error) {
    trades = [];
    showStorageError(error, "读取");
  }
}

function saveTrades() {
  saveState();
  saveTradesToDb(trades).catch((error) => showStorageError(error, "保存"));
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
  const fee = els.tFee.value.trim() ? Math.max(0, n(els.tFee.value)) : tradeFee(side, amount, account(), symbol, name);
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
      fee: tradeFee(side, amount, account(), symbol, name),
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
        <thead><tr><th>日期</th><th>代码/名称</th><th>方向</th><th>价格</th><th>股数</th><th>金额</th><th>费用</th></tr></thead>
        <tbody>
          ${previewRows.map((t) => `<tr>${cell("日期", esc(t.date))}${cell("代码/名称", symbolNameHtml(t.symbol, tradeName(t)), "symbol-cell")}${cell("方向", t.side === "buy" ? "买入" : "卖出")}${cell("价格", money(t.price))}${cell("股数", qty(t.shares))}${cell("金额", money(t.amount))}${cell("费用", money(t.fee))}</tr>`).join("")}
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

function waitForUi() {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}

async function appendTradesInChunks(rows) {
  for (let i = 0; i < rows.length; i += IMPORT_CHUNK_SIZE) {
    const chunk = rows.slice(i, i + IMPORT_CHUNK_SIZE);
    chunk.forEach((trade) => trades.push(trade));
    els.brokerImportStatus.textContent = `正在导入 ${Math.min(i + chunk.length, rows.length)} / ${rows.length} 笔，请稍等...`;
    await waitForUi();
  }
}

async function confirmBrokerImport() {
  if (!pendingBrokerTrades.length) return;
  if (!confirm(`确认导入 ${pendingBrokerTrades.length} 笔买卖成交吗？费用会按当前设置自动计算。`)) return;
  const importCount = pendingBrokerTrades.length;
  els.confirmBrokerImport.disabled = true;
  await appendTradesInChunks(pendingBrokerTrades);
  saveTrades();
  pendingBrokerTrades = [];
  els.brokerImportFile.value = "";
  els.brokerImportStatus.textContent = `已导入 ${importCount} 笔成交。交易流水先显示最新 ${FLOW_RENDER_STEP} 笔，可继续加载更多。`;
  renderBrokerImportPreview({ reason: "已完成导入" });
  flowRenderLimit = FLOW_RENDER_STEP;
  renderAllTrades();
  switchWindow("flowWindow", false);
}

function renderAllTrades(editId = "") {
  renderFlowSymbolChoices();
  const startDate = els.flowStartDate.value;
  const endDate = els.flowEndDate.value;
  const visible = trades
    .filter((trade) => !flowFilterSymbol || trade.symbol === flowFilterSymbol)
    .filter((trade) => !startDate || trade.date >= startDate)
    .filter((trade) => !endDate || trade.date <= endDate);
  const sorted = [...visible].sort((a, b) => `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`));
  const rowsToRender = sorted.slice(0, flowRenderLimit);
  const rowsHtml = rowsToRender.map((t, i) => {
    if (t.id === editId) {
      return `<tr data-id="${t.id}" class="edit-row">${cell("序号", i + 1, "seq-cell")}${cell("日期", `<input data-edit="date" type="date" value="${esc(t.date)}">`, "date-cell")}${cell("代码/名称", `<input data-edit="symbol" value="${esc(t.symbol)}"><input data-edit="name" value="${esc(tradeName(t))}" placeholder="名称">`, "symbol-cell")}${cell("方向", `<select data-edit="side"><option value="buy"${t.side === "buy" ? " selected" : ""}>买入</option><option value="sell"${t.side === "sell" ? " selected" : ""}>卖出</option></select>`, "side-cell")}${cell("价格", `<input data-edit="price" type="number" step="0.001" value="${t.price}">`, "price-cell")}${cell("股数", `<input data-edit="shares" type="number" step="100" value="${t.shares}">`, "shares-cell")}${cell("成交金额", money(t.amount), "amount-cell")}${cell("费用", `<input data-edit="fee" type="number" step="0.01" value="${t.fee}">`, "fee-cell")}${cell("操作", `<button data-action="save">保存</button><button data-action="cancel">取消</button>`, "action-cell")}</tr>`;
    }
    return `<tr data-id="${t.id}" class="flow-${t.side}">${cell("序号", i + 1, "seq-cell")}${cell("日期", esc(t.date), "date-cell")}${cell("代码/名称", symbolNameHtml(t.symbol, tradeName(t)), "symbol-cell")}${cell("方向", t.side === "buy" ? "买入" : "卖出", `tag-cell side-cell side-${t.side}`)}${cell("价格", money(t.price), "price-cell")}${cell("股数", qty(t.shares), "shares-cell")}${cell("成交金额", money(t.amount), "amount-cell")}${cell("费用", money(t.fee), "fee-cell")}${cell("操作", `<button data-action="edit">编辑</button><button data-action="delete">删除</button>`, "action-cell")}</tr>`;
  }).join("");
  const moreHtml = sorted.length > rowsToRender.length
    ? `<tr class="load-more-row"><td colspan="9"><button type="button" data-action="load-flow-more">显示更多 ${Math.min(FLOW_RENDER_STEP, sorted.length - rowsToRender.length)} 笔</button><span>已显示 ${rowsToRender.length} / ${sorted.length} 笔</span></td></tr>`
    : "";
  const filterLabel = [
    flowFilterSymbol ? `${esc(flowFilterSymbol)}` : "",
    startDate || endDate ? `${startDate || "最早"} 至 ${endDate || "最新"}` : "",
  ].filter(Boolean).join(" · ");
  els.tradeFlowRows.innerHTML = sorted.length ? rowsHtml + moreHtml : `<tr><td colspan="9" class="empty">${filterLabel ? `没有符合“${filterLabel}”的交易流水。` : "还没有交易流水。"}</td></tr>`;
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
    const { matched, unmatched } = matchTrades(item.rows.sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`)), todayIso());
    const openBuy = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0);
    const openSell = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0);
    const openBuyAmount = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining * r.price, 0);
    const openSellAmount = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining * r.price, 0);
    const pos = adjustedOriginalPosition(item.symbol, todayIso());
    const baseShares = Number(pos?.shares || 0);
    const estimatedShares = baseShares + openBuy - openSell;
    const isCleared = pos.hasPosition ? (openSell === baseShares && openBuy === 0) : estimatedShares === 0;
    const profit = matched.reduce((sum, r) => sum + r.profit, 0);
    const clearanceProfit = isCleared ? openSellAmount - openBuyAmount : 0;
    return {
      ...item,
      profit,
      openBuy,
      openSell,
      estimatedShares,
      isCleared,
      clearanceProfit,
      totalProfit: profit + clearanceProfit,
      status: isCleared ? "清仓" : "持仓",
    };
  });
  const numberSort = (field, direction = "desc") => (a, b) => {
    const diff = Number(a[field] || 0) - Number(b[field] || 0);
    return (direction === "asc" ? diff : -diff) || a.symbol.localeCompare(b.symbol);
  };
  const sorters = {
    lastDateDesc: (a, b) => b.lastDate.localeCompare(a.lastDate) || a.symbol.localeCompare(b.symbol),
    totalProfitDesc: numberSort("totalProfit", "desc"),
    totalProfitAsc: numberSort("totalProfit", "asc"),
    statusOpen: (a, b) => Number(a.isCleared) - Number(b.isCleared) || b.totalProfit - a.totalProfit || a.symbol.localeCompare(b.symbol),
    statusCleared: (a, b) => Number(b.isCleared) - Number(a.isCleared) || b.totalProfit - a.totalProfit || a.symbol.localeCompare(b.symbol),
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
  overviewRowsCache = rows;
  const sortLabel = els.overviewSort?.selectedOptions?.[0]?.textContent || "最近交易";
  const clearedCount = rows.filter((r) => r.isCleared).length;
  const openCount = rows.length - clearedCount;
  const totalProfit = rows.reduce((sum, r) => sum + r.totalProfit, 0);
  const matchedProfitTotal = rows.reduce((sum, r) => sum + r.profit, 0);
  els.overviewSummary.textContent = `${rows.length} 只股票 · ${sortLabel}`;
  if (els.overviewStats) {
    els.overviewStats.innerHTML = `
      <article><span>持仓股票</span><strong>${qty(openCount)}</strong></article>
      <article><span>清仓股票</span><button id="openClearedModal" class="profit-link overview-count-link stat-view-link" type="button"><strong>${qty(clearedCount)}</strong><em>查看</em></button></article>
      <article><span>总盈亏</span><strong class="${profitClass(totalProfit)}">${money(totalProfit)}</strong></article>
      <article><span>已匹配实现盈亏</span><button id="openOverviewMatchedCalendar" class="profit-link overview-profit-link stat-view-link" type="button"><strong class="${profitClass(matchedProfitTotal)}">${money(matchedProfitTotal)}</strong><em>查看</em></button></article>
    `;
  }
  els.overviewRows.innerHTML = rows.length ? rows.map((r) => `<tr class="${r.isCleared ? "overview-cleared" : "overview-open"}">${cell("代码/名称", symbolNameHtml(r.symbol, r.name), "symbol-cell overview-symbol-cell")}${cell("状态", `<span class="status-pill ${r.isCleared ? "cleared" : "open"}">${r.status}</span>`)}${cell("总盈亏", money(r.totalProfit), profitClass(r.totalProfit))}${cell("已匹配", money(r.profit), profitClass(r.profit))}${cell("估算持仓", `${r.estimatedShares < 0 ? "-" : ""}${qty(Math.abs(r.estimatedShares))} 股`)}${cell("未匹配买入", `${qty(r.openBuy)} 股`)}${cell("未匹配卖出", `${qty(r.openSell)} 股`)}${cell("总成交额", money(r.amount))}${cell("操作", `<button data-action="view-symbol" data-symbol="${esc(r.symbol)}">查看</button>`, "action-cell")}</tr>`).join("") : `<tr><td colspan="9" class="empty">还没有交易流水。</td></tr>`;
}

function renderClearedModal() {
  const keyword = (els.clearedSearch?.value || "").trim().toLowerCase();
  const cleared = overviewRowsCache
    .filter((row) => row.isCleared)
    .filter((row) => !keyword || row.symbol.toLowerCase().includes(keyword) || String(row.name || "").toLowerCase().includes(keyword));
  const allClearedCount = overviewRowsCache.filter((row) => row.isCleared).length;
  const totalProfit = cleared.reduce((sum, row) => sum + row.totalProfit, 0);
  els.clearedModalSummary.innerHTML = `清仓股票 ${cleared.length} / ${allClearedCount} 只 · 总盈亏 <strong class="${profitClass(totalProfit)}">${money(totalProfit)}</strong>`;
  els.clearedModalRows.innerHTML = cleared.length ? cleared.map((row) => `
    <tr class="overview-cleared">
      ${cell("代码/名称", symbolNameHtml(row.symbol, row.name), "symbol-cell overview-symbol-cell")}
      ${cell("总盈亏", money(row.totalProfit), profitClass(row.totalProfit))}
      ${cell("已匹配", money(row.profit), profitClass(row.profit))}
      ${cell("总成交额", money(row.amount), "amount-cell")}
      ${cell("最后交易", esc(row.lastDate || "-"), "date-cell")}
      ${cell("操作", `<button data-action="view-symbol" data-symbol="${esc(row.symbol)}">查看</button>`, "action-cell")}
    </tr>
  `).join("") : `<tr><td colspan="6" class="empty">没有找到符合条件的清仓股票。</td></tr>`;
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

function symbolPositionSummary(symbol) {
  const rows = trades.filter((trade) => trade.symbol === symbol).sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
  const { unmatched } = matchTrades(rows, todayIso());
  const openBuy = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0);
  const openSell = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0);
  const pos = adjustedOriginalPosition(symbol, todayIso());
  const baseShares = Number(pos?.shares || 0);
  const estimated = baseShares + openBuy - openSell;
  const isCleared = pos.hasPosition ? (openSell === baseShares && openBuy === 0) : estimated === 0;
  return { openBuy, openSell, baseShares, estimated, isCleared };
}

function symbolButtons(active) {
  const symbols = tradeSymbols();
  if (!symbols.length) return `<span class="empty-chip">还没有交易股票</span>`;
  const activeRows = [];
  const clearedRows = [];
  symbols.forEach((row) => {
    const summary = symbolPositionSummary(row.symbol);
    const item = { ...row, summary };
    if (summary.isCleared) clearedRows.push(item);
    else activeRows.push(item);
  });
  const chip = (row) => `<button class="symbol-chip${active === row.symbol ? " active" : ""}${row.summary.isCleared ? " cleared" : ""}" data-symbol="${esc(row.symbol)}" type="button">${symbolNameHtml(row.symbol, row.name)} <span>${row.count}</span></button>`;
  const activeHtml = activeRows.length ? activeRows.map(chip).join("") : `<span class="empty-chip">当前没有持仓股票</span>`;
  const clearedHtml = clearedRows.length ? clearedRows.map(chip).join("") : `<span class="empty-chip">还没有清仓股票</span>`;
  return `
    <button class="symbol-chip all-chip${active ? "" : " active"}" data-symbol="" type="button">全部</button>
    <section class="symbol-section">
      <div class="symbol-section-title">持仓股票 <b>${activeRows.length}</b></div>
      <div class="symbol-grid symbol-grid-inner">${activeHtml}</div>
    </section>
    <details class="symbol-section cleared-section">
      <summary>清仓股票 <b>${clearedRows.length}</b></summary>
      <div class="symbol-grid symbol-grid-inner">${clearedHtml}</div>
    </details>
  `;
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

function matchTrades(rows, throughDate = todayIso()) {
  const matched = [];
  const unmatched = [];
  const bySymbol = new Map();
  rows.forEach((t) => {
    if (!bySymbol.has(t.symbol)) bySymbol.set(t.symbol, []);
    bySymbol.get(t.symbol).push({ ...t, remaining: t.shares, remainingFee: t.fee });
  });
  bySymbol.forEach((items, symbol) => {
    const open = [];
    const sortedItems = items.sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`));
    const events = equityEventsForSymbol(symbol, throughDate);
    let eventIndex = 0;
    const applyEventsUntil = (date) => {
      while (eventIndex < events.length && events[eventIndex].date <= date) {
        applyEquityEventToOpen(open, events[eventIndex]);
        eventIndex += 1;
      }
    };
    sortedItems.forEach((trade) => {
      applyEventsUntil(trade.date);
      while (trade.remaining > 0) {
        const index = findNearestOpposite(open, trade);
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
    applyEventsUntil(throughDate || todayIso());
    unmatched.push(...open.filter((t) => t.remaining > 0));
  });
  return { matched, unmatched };
}

function findNearestOpposite(open, trade) {
  for (let i = open.length - 1; i >= 0; i -= 1) {
    const other = open[i];
    if (other.side === trade.side) continue;
    return i;
  }
  return -1;
}

function matchedEventDate(row) {
  return row.sellDate > row.buyDate ? row.sellDate : row.buyDate;
}

function allMatchedRows() {
  const bySymbol = new Map();
  trades.forEach((trade) => {
    if (!trade.symbol) return;
    if (!bySymbol.has(trade.symbol)) bySymbol.set(trade.symbol, []);
    bySymbol.get(trade.symbol).push(trade);
  });
  return [...bySymbol.values()].flatMap((rows) => {
    const sorted = [...rows].sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`));
    return matchTrades(sorted, todayIso()).matched;
  });
}

function allMatchedRowsForSymbol(symbol) {
  const code = normalizeSymbol(symbol);
  if (!code) return allMatchedRows();
  const rows = trades
    .filter((trade) => trade.symbol === code)
    .sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`));
  return matchTrades(rows, todayIso()).matched;
}

function isWithinDateRange(date, start, end) {
  return (!start || date >= start) && (!end || date <= end);
}

function periodMatchedRows(start = "", end = "") {
  return allMatchedRows()
    .filter((row) => isWithinDateRange(matchedEventDate(row), start, end));
}

function monthKey(date) {
  return String(date || "").slice(0, 7);
}

function shiftMonth(key, delta) {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function matchedDayRows(date) {
  return matchedCalendarRows.filter((row) => matchedEventDate(row) === date);
}

function renderDailyMatchedRows(rows) {
  if (!rows.length) return `<tr><td colspan="8" class="empty">当天没有匹配明细。</td></tr>`;
  return rows.map((r) => `<tr>${cell("卖出日期", esc(r.sellDate), "sell-date-cell")}${cell("卖价", money(r.sellPrice), "sell-price-cell")}${cell("买入日期", esc(r.buyDate), "buy-date-cell")}${cell("买价", money(r.buyPrice), "buy-price-cell")}${cell("股数", qty(r.shares), "shares-cell")}${cell("成交金额", money(r.amount), "amount-cell")}${cell("费用", money(r.fee), "fee-cell")}${cell("盈亏", money(r.profit), `${profitClass(r.profit)} profit-cell`)}</tr>`).join("");
}

function renderCalendarPeriodDetailItems(rows) {
  const sorted = [...rows].sort((a, b) => {
    const dateCompare = matchedEventDate(b).localeCompare(matchedEventDate(a));
    if (dateCompare) return dateCompare;
    return Number(b.profit || 0) - Number(a.profit || 0);
  });
  return `<div class="period-match-detail-list">${sorted.map((row) => `
    <div class="period-match-detail">
      <div><span>卖出</span><strong>${esc(row.sellDate)}</strong><em>${money(row.sellPrice)}</em></div>
      <div><span>买入</span><strong>${esc(row.buyDate)}</strong><em>${money(row.buyPrice)}</em></div>
      <div><span>股数</span><strong>${qty(row.shares)}</strong><em>${money(row.amount)}</em></div>
      <div><span>盈亏</span><strong class="${profitClass(row.profit)}">${plainInteger(row.profit)}</strong><em>费 ${money(row.fee)}</em></div>
    </div>
  `).join("")}</div>`;
}

function renderDailySymbolProfitRows(rows) {
  if (!rows.length) return `<tr><td colspan="7" class="empty">当天没有匹配盈亏。</td></tr>`;
  const bySymbol = new Map();
  rows.forEach((row) => {
    const item = bySymbol.get(row.symbol) || {
      symbol: row.symbol,
      name: row.name || stockNameForSymbol(row.symbol),
      profit: 0,
      shares: 0,
      amount: 0,
      fee: 0,
      count: 0,
      rows: [],
    };
    if (!item.name && row.name) item.name = row.name;
    item.profit += Number(row.profit || 0);
    item.shares += Number(row.shares || 0);
    item.amount += Number(row.amount || 0);
    item.fee += Number(row.fee || 0);
    item.count += 1;
    item.rows.push(row);
    bySymbol.set(row.symbol, item);
  });
  return [...bySymbol.values()]
    .sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit) || a.symbol.localeCompare(b.symbol))
    .map((row) => `<tr class="calendar-period-symbol-row">${cell("代码/名称", symbolNameHtml(row.symbol, row.name), "symbol-cell")}${cell("匹配盈亏", `<strong class="${profitClass(row.profit)}">${plainInteger(row.profit)}</strong>`, "profit-cell")}${cell("匹配股数", `${qty(row.shares)} 股`, "shares-cell")}${cell("成交金额", money(row.amount), "amount-cell")}${cell("费用", money(row.fee), "fee-cell")}${cell("匹配组数", `${row.count} 组`, "count-cell")}${cell("买卖明细", renderCalendarPeriodDetailItems(row.rows), "period-detail-cell")}</tr>`)
    .join("");
}

function setCalendarPeriodHead(mode = "symbol") {
  const head = document.querySelector("#calendarPeriodHead");
  if (!head) return;
  head.innerHTML = mode === "year"
    ? `<tr><th>年度</th><th>匹配盈亏</th><th>成交金额</th><th>费用</th><th>匹配组数</th><th>操作</th></tr>`
    : `<tr><th>代码/名称</th><th>匹配盈亏</th><th>匹配股数</th><th>成交金额</th><th>费用</th><th>匹配组数</th><th>买卖明细</th></tr>`;
}

function calendarYearSummaries() {
  const byYear = new Map();
  matchedCalendarRows.forEach((row) => {
    const year = matchedEventDate(row).slice(0, 4);
    if (!year) return;
    const item = byYear.get(year) || { year, profit: 0, amount: 0, fee: 0, count: 0 };
    item.profit += Number(row.profit || 0);
    item.amount += Number(row.amount || 0);
    item.fee += Number(row.fee || 0);
    item.count += 1;
    byYear.set(year, item);
  });
  return [...byYear.values()].sort((a, b) => b.year.localeCompare(a.year));
}

function renderCalendarYearRows() {
  const years = calendarYearSummaries();
  if (!years.length) return `<tr><td colspan="6" class="empty">还没有年度匹配盈亏。</td></tr>`;
  return years.map((row) => `<tr class="calendar-year-row">${cell("年度", `<strong>${esc(row.year)}</strong>`, "year-cell")}${cell("匹配盈亏", `<strong class="${profitClass(row.profit)}">${plainInteger(row.profit)}</strong>`, "profit-cell")}${cell("成交金额", money(row.amount), "amount-cell")}${cell("费用", money(row.fee), "fee-cell")}${cell("匹配组数", `${row.count} 组`, "count-cell")}${cell("操作", `<button type="button" data-calendar-year="${esc(row.year)}">查看</button>`, "action-cell")}</tr>`).join("");
}

function calendarPeriodSymbols(rows) {
  const bySymbol = new Map();
  rows.forEach((row) => {
    if (!row.symbol) return;
    const item = bySymbol.get(row.symbol) || {
      symbol: row.symbol,
      name: row.name || stockNameForSymbol(row.symbol),
      count: 0,
      profit: 0,
    };
    if (!item.name && row.name) item.name = row.name;
    item.count += 1;
    item.profit += Number(row.profit || 0);
    bySymbol.set(row.symbol, item);
  });
  return [...bySymbol.values()].sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit) || a.symbol.localeCompare(b.symbol));
}

function renderCalendarPeriodFilter() {
  const wrapper = document.querySelector("#calendarPeriodFilter");
  const label = document.querySelector("#calendarPeriodFilterLabel");
  const choices = document.querySelector("#calendarPeriodSymbolChoices");
  if (!wrapper || !label || !choices) return;
  const symbols = calendarPeriodSymbols(calendarPeriodBaseRows);
  wrapper.hidden = false;
  const activeName = calendarPeriodFilterSymbol ? stockNameForSymbol(calendarPeriodFilterSymbol) : "";
  label.textContent = calendarPeriodFilterSymbol ? `${calendarPeriodFilterSymbol}${activeName ? ` ${activeName}` : ""}` : "全部股票";
  choices.innerHTML = `
    <button class="calendar-period-symbol-chip${calendarPeriodFilterSymbol ? "" : " active"}" data-calendar-period-symbol="" type="button">全部</button>
    ${symbols.map((row) => `<button class="calendar-period-symbol-chip${calendarPeriodFilterSymbol === row.symbol ? " active" : ""}" data-calendar-period-symbol="${esc(row.symbol)}" type="button">${symbolNameHtml(row.symbol, row.name)} <span>${row.count}组</span></button>`).join("")}
  `;
}

function renderCalendarPeriodContent() {
  const title = document.querySelector("#calendarPeriodModalTitle");
  const summary = document.querySelector("#calendarPeriodSummary");
  const body = document.querySelector("#calendarPeriodRows");
  if (!title || !summary || !body) return;
  const rows = calendarPeriodFilterSymbol
    ? calendarPeriodBaseRows.filter((row) => row.symbol === calendarPeriodFilterSymbol)
    : calendarPeriodBaseRows;
  const profit = rows.reduce((sum, row) => sum + Number(row.profit || 0), 0);
  const amount = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const fee = rows.reduce((sum, row) => sum + Number(row.fee || 0), 0);
  const symbols = new Set(rows.map((row) => row.symbol).filter(Boolean));
  title.textContent = calendarPeriodTitleText;
  summary.innerHTML = `${symbols.size} 只股票 · ${rows.length} 组匹配 · 盈亏 <strong class="${profitClass(profit)}">${money(profit)}</strong> · 成交金额 ${money(amount)} · 费用 ${money(fee)}`;
  setCalendarPeriodHead("symbol");
  renderCalendarPeriodFilter();
  body.innerHTML = renderDailySymbolProfitRows(rows);
}

function openCalendarYearSummaryModal() {
  if (!matchedCalendarRows.length) return;
  const modal = document.querySelector("#calendarPeriodModal");
  const title = document.querySelector("#calendarPeriodModalTitle");
  const summary = document.querySelector("#calendarPeriodSummary");
  const body = document.querySelector("#calendarPeriodRows");
  if (!modal || !title || !summary || !body) return;
  const years = calendarYearSummaries();
  const profit = years.reduce((sum, row) => sum + Number(row.profit || 0), 0);
  const amount = years.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const fee = years.reduce((sum, row) => sum + Number(row.fee || 0), 0);
  title.textContent = "各年度匹配盈亏";
  summary.innerHTML = `${years.length} 个年度 · 盈亏 <strong class="${profitClass(profit)}">${money(profit)}</strong> · 成交金额 ${money(amount)} · 费用 ${money(fee)}`;
  const filter = document.querySelector("#calendarPeriodFilter");
  if (filter) filter.hidden = true;
  setCalendarPeriodHead("year");
  body.innerHTML = renderCalendarYearRows();
  modal.hidden = false;
}

function openCalendarPeriodModal(period) {
  if (!matchedCalendarMonth || !matchedCalendarRows.length) return;
  const year = matchedCalendarMonth.slice(0, 4);
  const isMonth = period === "month";
  const isDay = period === "day";
  const label = isDay ? matchedCalendarSelected : isMonth ? matchedCalendarMonth : `${year}年`;
  const rows = matchedCalendarRows.filter((row) => {
    const date = matchedEventDate(row);
    if (isDay) return date === matchedCalendarSelected;
    return isMonth ? monthKey(date) === matchedCalendarMonth : date.startsWith(`${year}-`);
  });
  const modal = document.querySelector("#calendarPeriodModal");
  if (!modal) return;
  calendarPeriodBaseRows = rows;
  calendarPeriodFilterSymbol = "";
  calendarPeriodTitleText = `${label}个股匹配盈亏`;
  renderCalendarPeriodContent();
  modal.hidden = false;
}

function setMatchedModalDetailMode(summaryMode) {
  const head = document.querySelector("#matchedModalHead");
  if (!head) return;
  head.innerHTML = summaryMode
    ? `<tr><th>代码/名称</th><th>匹配盈亏</th><th>匹配股数</th><th>成交金额</th><th>费用</th><th>匹配组数</th><th>买卖明细</th></tr>`
    : `<tr><th>卖出日期</th><th>卖价</th><th>买入日期</th><th>买价</th><th>股数</th><th>成交金额</th><th>费用</th><th>盈亏</th></tr>`;
}

function calendarDailyTotals(rows, aggregateBySymbol = false) {
  const byDate = new Map();
  if (aggregateBySymbol) {
    const byDateSymbol = new Map();
    rows.forEach((row) => {
      const date = matchedEventDate(row);
      const key = `${date}|${row.symbol || ""}`;
      const item = byDateSymbol.get(key) || { date, profit: 0, amount: 0, count: 0 };
      item.profit += row.profit;
      item.amount += row.amount;
      item.count += 1;
      byDateSymbol.set(key, item);
    });
    byDateSymbol.forEach((item) => {
      const day = byDate.get(item.date) || { profit: 0, amount: 0, count: 0 };
      day.profit += calendarInteger(item.profit);
      day.amount += calendarInteger(item.amount);
      day.count += item.count;
      byDate.set(item.date, day);
    });
    return byDate;
  }
  rows.forEach((row) => {
    const date = matchedEventDate(row);
    const item = byDate.get(date) || { profit: 0, amount: 0, count: 0 };
    item.profit += row.profit;
    item.amount += row.amount;
    item.count += 1;
    byDate.set(date, item);
  });
  return byDate;
}

function renderMatchedCalendar(matched, options = {}) {
  matchedCalendarAggregateBySymbol = Boolean(options.aggregateBySymbol);
  matchedCalendarRows = [...matched].sort((a, b) => matchedEventDate(b).localeCompare(matchedEventDate(a)));
  const grid = document.querySelector("#matchedCalendarGrid");
  const title = document.querySelector("#matchedCalendarTitle");
  const yearSelect = document.querySelector("#matchedCalendarYearSelect");
  const modalRows = document.querySelector("#matchedModalRows");
  if (!grid || !title || !modalRows) return;
  setMatchedModalDetailMode(matchedCalendarAggregateBySymbol);
  if (!matchedCalendarRows.length) {
    matchedCalendarMonth = "";
    matchedCalendarSelected = "";
    title.textContent = "-";
    if (yearSelect) yearSelect.innerHTML = "";
    grid.innerHTML = `<div class="calendar-empty">还没有已匹配记录。</div>`;
    modalRows.innerHTML = `<tr><td colspan="${matchedCalendarAggregateBySymbol ? 7 : 8}" class="empty">还没有可匹配的反向交易。</td></tr>`;
    ["matchedMonthProfit", "matchedMonthAmount", "matchedYearProfit", "matchedYearAmount", "matchedAllProfit", "matchedAllAmount"].forEach((id) => {
      const node = document.querySelector(`#${id}`);
      if (node) node.textContent = "-";
    });
    return;
  }
  const latestDate = matchedEventDate(matchedCalendarRows[0]);
  if (!matchedCalendarMonth) matchedCalendarMonth = monthKey(latestDate);
  const availableYears = [...new Set(matchedCalendarRows.map((row) => matchedEventDate(row).slice(0, 4)).filter(Boolean))].sort((a, b) => b.localeCompare(a));
  if (yearSelect) {
    const currentYear = matchedCalendarMonth.slice(0, 4);
    yearSelect.innerHTML = availableYears.map((item) => `<option value="${esc(item)}"${item === currentYear ? " selected" : ""}>${esc(item)}年</option>`).join("");
  }
  if (!matchedCalendarSelected || monthKey(matchedCalendarSelected) !== matchedCalendarMonth) {
    const firstInMonth = matchedCalendarRows.find((row) => monthKey(matchedEventDate(row)) === matchedCalendarMonth);
    matchedCalendarSelected = firstInMonth ? matchedEventDate(firstInMonth) : `${matchedCalendarMonth}-01`;
  }
  const [year, month] = matchedCalendarMonth.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const offset = Math.min(firstWeekday, 5);
  const byDate = calendarDailyTotals(matchedCalendarRows, matchedCalendarAggregateBySymbol);
  const cells = Array.from({ length: offset }, () => `<div class="calendar-day muted"></div>`);
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${matchedCalendarMonth}-${String(day).padStart(2, "0")}`;
    const weekday = new Date(year, month - 1, day).getDay();
    if (weekday === 0 || weekday === 6) continue;
    const data = byDate.get(date);
    cells.push(`<button class="calendar-day${date === matchedCalendarSelected ? " active" : ""}${data ? " has-match" : ""}" data-date="${date}" type="button"><span>${day}</span>${data ? `<strong class="${profitClass(data.profit)}">${plainInteger(data.profit)}</strong><em>${plainInteger(data.amount)}</em>` : ""}</button>`);
  }
  title.textContent = matchedCalendarMonth;
  grid.innerHTML = cells.join("");
  const monthRows = matchedCalendarRows.filter((row) => monthKey(matchedEventDate(row)) === matchedCalendarMonth);
  const yearRows = matchedCalendarRows.filter((row) => matchedEventDate(row).startsWith(`${year}-`));
  const monthProfit = monthRows.reduce((sum, row) => sum + row.profit, 0);
  const monthAmount = monthRows.reduce((sum, row) => sum + row.amount, 0);
  const yearProfit = yearRows.reduce((sum, row) => sum + row.profit, 0);
  const yearAmount = yearRows.reduce((sum, row) => sum + row.amount, 0);
  const allProfit = matchedCalendarRows.reduce((sum, row) => sum + row.profit, 0);
  const allAmount = matchedCalendarRows.reduce((sum, row) => sum + row.amount, 0);
  document.querySelector("#matchedMonthProfit").textContent = money(monthProfit);
  document.querySelector("#matchedMonthProfit").className = profitClass(monthProfit);
  document.querySelector("#matchedMonthAmount").textContent = money(monthAmount);
  document.querySelector("#matchedYearProfit").textContent = money(yearProfit);
  document.querySelector("#matchedYearProfit").className = profitClass(yearProfit);
  document.querySelector("#matchedYearAmount").textContent = money(yearAmount);
  document.querySelector("#matchedAllProfit").textContent = money(allProfit);
  document.querySelector("#matchedAllProfit").className = profitClass(allProfit);
  document.querySelector("#matchedAllAmount").textContent = money(allAmount);
  const selectedRows = matchedDayRows(matchedCalendarSelected);
  modalRows.innerHTML = matchedCalendarAggregateBySymbol ? renderDailySymbolProfitRows(selectedRows) : renderDailyMatchedRows(selectedRows);
}

function selectMatchedCalendarYear(year) {
  const targetYear = String(year || "").slice(0, 4);
  if (!targetYear || !matchedCalendarRows.length) return;
  const currentMonth = matchedCalendarMonth.slice(5, 7) || "01";
  let targetMonth = `${targetYear}-${currentMonth}`;
  const hasSameMonth = matchedCalendarRows.some((row) => monthKey(matchedEventDate(row)) === targetMonth);
  if (!hasSameMonth) {
    const firstInYear = matchedCalendarRows.find((row) => matchedEventDate(row).startsWith(`${targetYear}-`));
    if (!firstInYear) return;
    targetMonth = monthKey(matchedEventDate(firstInYear));
  }
  matchedCalendarMonth = targetMonth;
  matchedCalendarSelected = "";
  renderMatchedCalendar(matchedCalendarRows, { aggregateBySymbol: matchedCalendarAggregateBySymbol });
}

function renderMatchedDetailRows(matched) {
  if (!matched.length) return `<tr><td colspan="8" class="empty">还没有可匹配的反向交易。</td></tr>`;
  const day = 24 * 60 * 60 * 1000;
  const latestTime = Math.max(...matched.map((row) => new Date(matchedEventDate(row)).getTime()).filter(Number.isFinite));
  const cutoff = latestTime - (6 * day);
  const recent = [];
  const historical = [];
  matched.forEach((row) => {
    const time = new Date(matchedEventDate(row)).getTime();
    if (Number.isFinite(time) && time >= cutoff) recent.push(row);
    else historical.push(row);
  });
  const detailRows = recent.map((r) => `<tr>${cell("卖出日期", esc(r.sellDate), "sell-date-cell")}${cell("卖价", money(r.sellPrice), "sell-price-cell")}${cell("买入日期", esc(r.buyDate), "buy-date-cell")}${cell("买价", money(r.buyPrice), "buy-price-cell")}${cell("股数", qty(r.shares), "shares-cell")}${cell("成交金额", money(r.amount), "amount-cell")}${cell("费用", money(r.fee), "fee-cell")}${cell("盈亏", money(r.profit), `${profitClass(r.profit)} profit-cell`)}</tr>`);
  const groups = new Map();
  historical.forEach((row) => {
    const stage = matchedEventDate(row).slice(0, 7);
    const group = groups.get(stage) || { stage, start: matchedEventDate(row), end: matchedEventDate(row), count: 0, shares: 0, amount: 0, fee: 0, profit: 0 };
    const date = matchedEventDate(row);
    group.start = date < group.start ? date : group.start;
    group.end = date > group.end ? date : group.end;
    group.count += 1;
    group.shares += row.shares;
    group.amount += row.amount;
    group.fee += row.fee;
    group.profit += row.profit;
    groups.set(stage, group);
  });
  const stageRows = [...groups.values()].sort((a, b) => b.stage.localeCompare(a.stage)).map((g) => `<tr class="stage-summary-row">${cell("阶段", esc(g.stage), "stage-cell")}${cell("期间", `${esc(g.start)} - ${esc(g.end)}`, "stage-range-cell")}${cell("匹配", `${qty(g.count)} 组`, "stage-count-cell")}${cell("均价", "-")}${cell("股数", qty(g.shares), "shares-cell")}${cell("成交金额", money(g.amount), "amount-cell")}${cell("费用", money(g.fee), "fee-cell")}${cell("阶段盈亏", money(g.profit), `${profitClass(g.profit)} profit-cell`)}</tr>`);
  return [...detailRows, ...stageRows].join("");
}

function renderUnmatchedGroups(unmatched) {
  if (!unmatched.length) return `<tr><td colspan="8" class="empty">没有未匹配交易。</td></tr>`;
  const sorted = [...unmatched].sort((a, b) => `${b.date}-${b.createdAt || ""}`.localeCompare(`${a.date}-${a.createdAt || ""}`));
  const renderSide = (side, title, className) => {
    const rows = sorted.filter((row) => row.side === side);
    const totalShares = rows.reduce((sum, row) => sum + row.remaining, 0);
    const totalAmount = rows.reduce((sum, row) => sum + row.remaining * row.price, 0);
    const avgPrice = totalShares ? totalAmount / totalShares : 0;
    const chips = rows.length ? rows.map((row) => `<span class="unmatched-chip ${className}" tabindex="0" data-date="${esc(row.date)}" title="${esc(row.date)}">${priceText(row.price)}*${side === "sell" ? "-" : ""}${qty(row.remaining)}</span>`).join("") : `<span class="empty-chip">没有${title}</span>`;
    return `
      <section class="unmatched-group ${className}">
        <div class="unmatched-group-title">
          <strong>${title}</strong>
          <span>${qty(totalShares)} 股 · 均价 ${avgPrice ? priceText(avgPrice) : "-"}</span>
        </div>
        <div class="unmatched-chip-grid">${chips}</div>
      </section>
    `;
  };
  return `<tr class="unmatched-group-row"><td colspan="8">${renderSide("buy", "未匹配买入", "buy")}${renderSide("sell", "未匹配卖出", "sell")}</td></tr>`;
}

function symbolPositionStatus(symbol, throughDate = todayIso()) {
  const rows = trades
    .filter((trade) => trade.symbol === symbol)
    .filter((trade) => trade.date <= throughDate)
    .sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
  const { unmatched } = matchTrades(rows, throughDate);
  const openBuy = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0);
  const openSell = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0);
  const pos = adjustedOriginalPosition(symbol, throughDate);
  const baseShares = Number(pos?.shares || 0);
  const estimatedShares = baseShares + openBuy - openSell;
  const isCleared = pos.hasPosition ? (openSell === baseShares && openBuy === 0) : estimatedShares === 0;
  return {
    isCleared,
    estimatedShares,
    label: isCleared ? "清仓" : "持仓",
  };
}

function buildAllProfitRows() {
  const start = els.tStartDate.value;
  const end = els.tEndDate.value;
  const throughDate = end || todayIso();
  const matched = periodMatchedRows(start, end);
  const bySymbol = new Map();
  matched.forEach((row) => {
    const item = bySymbol.get(row.symbol) || {
      symbol: row.symbol,
      name: row.name || stockNameForSymbol(row.symbol),
      profit: 0,
      shares: 0,
      amount: 0,
      fee: 0,
      count: 0,
    };
    if (!item.name && row.name) item.name = row.name;
    item.profit += Number(row.profit || 0);
    item.shares += Number(row.shares || 0);
    item.amount += Number(row.amount || 0);
    item.fee += Number(row.fee || 0);
    item.count += 1;
    bySymbol.set(row.symbol, item);
  });
  return [...bySymbol.values()]
    .map((row) => ({ ...row, position: symbolPositionStatus(row.symbol, throughDate) }))
    .sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit) || a.symbol.localeCompare(b.symbol));
}

function renderAllProfitModal() {
  const rows = buildAllProfitRows();
  const totalProfit = rows.reduce((sum, row) => sum + row.profit, 0);
  const totalAmount = rows.reduce((sum, row) => sum + row.amount, 0);
  const totalFee = rows.reduce((sum, row) => sum + row.fee, 0);
  const start = els.tStartDate.value || "全部";
  const end = els.tEndDate.value || "今天";
  els.allProfitModalSummary.innerHTML = [
    ["日期阶段", `${start} - ${end}`],
    ["股票数量", `${rows.length} 只`],
    ["阶段盈亏", money(totalProfit)],
    ["成交金额", money(totalAmount)],
    ["总费用", money(totalFee)],
    ["匹配次数", `${rows.reduce((sum, row) => sum + row.count, 0)} 组`],
  ].map(([label, value]) => `<article><span>${label}</span><strong class="${label.includes("盈亏") ? profitClass(totalProfit) : ""}">${value}</strong></article>`).join("");
  els.allProfitModalRows.innerHTML = rows.length ? rows.map((row) => `
    <tr class="all-profit-row">
      ${cell("代码/名称", symbolNameHtml(row.symbol, row.name), "symbol-cell")}
      ${cell("状态", `<span class="status-pill ${row.position.isCleared ? "cleared" : ""}">${row.position.label}</span><small>${qty(Math.abs(row.position.estimatedShares))} 股</small>`, "tag-cell")}
      ${cell("匹配盈亏", `<strong class="${profitClass(row.profit)}">${plainInteger(row.profit)}</strong>`, "profit-cell")}
      ${cell("匹配股数", `${qty(row.shares)} 股`, "shares-cell")}
      ${cell("成交金额", money(row.amount), "amount-cell")}
      ${cell("费用", money(row.fee), "fee-cell")}
      ${cell("交易次数", `${row.count} 组`, "count-cell")}
    </tr>
  `).join("") : `<tr><td colspan="7" class="empty">这个日期阶段还没有匹配盈亏。</td></tr>`;
}

function renderQuery() {
  renderSymbolChoices();
  const activeSymbol = normalizeSymbol(els.tFilterSymbol.value);
  const rows = filteredTrades();
  const start = els.tStartDate.value;
  const end = els.tEndDate.value;
  const throughDate = els.tEndDate.value || todayIso();
  const positionRows = trades
    .filter((trade) => !activeSymbol || trade.symbol === activeSymbol)
    .filter((trade) => trade.date <= throughDate)
    .sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
  const allMatched = periodMatchedRows(start, end);
  const allProfit = allMatched.reduce((sum, r) => sum + r.profit, 0);
  const matched = allMatchedRowsForSymbol(activeSymbol)
    .filter((row) => isWithinDateRange(matchedEventDate(row), start, end));
  const { unmatched } = matchTrades(positionRows, throughDate);
  const profit = matched.reduce((sum, r) => sum + r.profit, 0);
  const totalFees = rows.reduce((sum, r) => sum + Number(r.fee || 0), 0);
  const totalAmount = rows.reduce((sum, r) => sum + Number(r.amount || r.price * r.shares || 0), 0);
  const matchedShares = matched.reduce((sum, r) => sum + r.shares, 0);
  const openBuy = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining, 0);
  const openSell = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining, 0);
  const openBuyAmount = unmatched.filter((r) => r.side === "buy").reduce((sum, r) => sum + r.remaining * r.price, 0);
  const openSellAmount = unmatched.filter((r) => r.side === "sell").reduce((sum, r) => sum + r.remaining * r.price, 0);
  const totalBuyAmount = positionRows.filter((r) => r.side === "buy").reduce((sum, r) => sum + Number(r.amount || r.price * r.shares || 0), 0);
  const totalSellAmount = positionRows.filter((r) => r.side === "sell").reduce((sum, r) => sum + Number(r.amount || r.price * r.shares || 0), 0);
  els.allMatchedProfit.textContent = money(allProfit);
  els.allMatchedProfit.className = profitClass(allProfit);
  els.tMatchedProfit.textContent = money(profit);
  els.tMatchedProfit.className = profitClass(profit);
  els.tTotalFees.textContent = money(totalFees);
  els.tTotalAmount.textContent = money(totalAmount);
  els.tMatchedShares.textContent = `${qty(matchedShares)} 股`;
  els.tOpenBuyShares.textContent = `${qty(openBuy)} 股`;
  els.tOpenBuyAvg.textContent = openBuy ? priceText(openBuyAmount / openBuy) : "-";
  els.tOpenSellShares.textContent = `${qty(openSell)} 股`;
  els.tOpenSellAvg.textContent = openSell ? priceText(openSellAmount / openSell) : "-";
  const positionEstimate = renderPositionEstimate(activeSymbol, openBuy, openSell, profit, totalBuyAmount, totalSellAmount);
  renderClearanceProfit(activeSymbol, positionEstimate, profit, openBuyAmount, openSellAmount);
  renderQueryEquityDetails(activeSymbol, throughDate);
  els.matchedSummary.textContent = `${matched.length} 组匹配 · 最近 7 天明细`;
  els.unmatchedSummary.textContent = `${unmatched.length} 条未匹配`;
  const matchedHtml = renderMatchedDetailRows(matched);
  els.matchedRows.innerHTML = matchedHtml;
  els.unmatchedRows.innerHTML = renderUnmatchedGroups(unmatched);
}

function defaultReviewRange(symbol) {
  const code = normalizeSymbol(symbol);
  const dates = trades
    .filter((trade) => trade.symbol === code)
    .map((trade) => trade.date)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  return { start: dates[0] || todayIso(), end: dates.at(-1) || todayIso() };
}

function localReviewBounds(symbol, start = "", end = "") {
  const fallback = defaultReviewRange(symbol);
  return { start: start || fallback.start, end: end || fallback.end };
}

function positionSnapshotForDate(symbol, date, matchedProfit = 0) {
  const code = normalizeSymbol(symbol);
  const rows = trades
    .filter((trade) => trade.symbol === code && trade.date <= date)
    .sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`));
  const { unmatched } = matchTrades(rows, date);
  const openBuy = unmatched.filter((row) => row.side === "buy").reduce((sum, row) => sum + row.remaining, 0);
  const openSell = unmatched.filter((row) => row.side === "sell").reduce((sum, row) => sum + row.remaining, 0);
  const pos = adjustedOriginalPosition(code, date);
  const baseShares = Number(pos?.shares || 0);
  const shares = baseShares + openBuy - openSell;
  const totalBuyAmount = rows.filter((row) => row.side === "buy").reduce((sum, row) => sum + Number(row.amount || row.price * row.shares || 0), 0);
  const totalSellAmount = rows.filter((row) => row.side === "sell").reduce((sum, row) => sum + Number(row.amount || row.price * row.shares || 0), 0);
  const firstTradeCost = firstTradePriceForSymbol(code);
  const hasKnownCost = Boolean(pos?.hasPosition && Number(pos.cost || 0) > 0);
  const originalCost = hasKnownCost ? Number(pos.cost || 0) : firstTradeCost;
  const matchedProfitToDate = allMatchedRowsForSymbol(code)
    .filter((row) => matchedEventDate(row) <= date)
    .reduce((sum, row) => sum + Number(row.profit || 0), 0);
  const currentCost = shares > 0
    ? (hasKnownCost
      ? ((originalCost * baseShares) + totalBuyAmount - totalSellAmount) / shares
      : (originalCost ? originalCost - (matchedProfitToDate / shares) : null))
    : (originalCost || null);
  const costChange = currentCost === null ? null : (originalCost ? currentCost - originalCost : null);
  return { shares, currentCost, costChange, hasKnownCost, originalCost, openBuy, openSell, unmatched, matchedProfit };
}

function aggregateTradesForReview(rows, side) {
  const filtered = rows.filter((row) => row.side === side);
  const shares = filtered.reduce((sum, row) => sum + row.shares, 0);
  const amount = filtered.reduce((sum, row) => sum + Number(row.amount || row.price * row.shares || 0), 0);
  return { count: filtered.length, shares, amount, avg: shares ? amount / shares : 0 };
}

function localReviewMatchedForDate(matches, date) {
  return matches.filter((row) => matchedEventDate(row) === date);
}

function firstTradePriceForSymbol(symbol) {
  const first = trades
    .filter((trade) => trade.symbol === normalizeSymbol(symbol) && Number(trade.price || 0) > 0)
    .sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`))[0];
  return Number(first?.price || 0);
}

function normalizeLocalReviewWindow(data) {
  const total = data?.rows?.length || 0;
  if (!total) {
    localReviewWindowStart = 0;
    localReviewWindowSize = 0;
    return;
  }
  if (!localReviewWindowSize || localReviewWindowSize > total) localReviewWindowSize = total;
  localReviewWindowSize = Math.max(1, Math.min(total, Math.round(localReviewWindowSize)));
  localReviewWindowStart = Math.max(0, Math.min(total - localReviewWindowSize, Math.round(localReviewWindowStart || 0)));
}

function localReviewVisibleRows(data) {
  normalizeLocalReviewWindow(data);
  if (!data?.rows?.length) return [];
  return data.rows.slice(localReviewWindowStart, localReviewWindowStart + localReviewWindowSize);
}

function syncLocalReviewAxisControls(data) {
  const zoom = document.querySelector("#localReviewZoomInput");
  const pan = document.querySelector("#localReviewPanInput");
  const label = document.querySelector("#localReviewAxisLabel");
  const total = data?.rows?.length || 0;
  normalizeLocalReviewWindow(data);
  if (zoom) {
    zoom.min = total ? "1" : "0";
    zoom.max = String(Math.max(1, total));
    zoom.value = String(localReviewWindowSize || total || 0);
    zoom.disabled = total <= 1;
  }
  if (pan) {
    pan.min = "0";
    pan.max = String(Math.max(0, total - (localReviewWindowSize || total || 0)));
    pan.value = String(localReviewWindowStart || 0);
    pan.disabled = total <= 1 || Number(pan.max) <= 0;
  }
  if (label) {
    const visible = localReviewVisibleRows(data);
    label.textContent = visible.length && total
      ? `显示 ${visible.length}/${total} 个本地日期 · ${visible[0].date} 至 ${visible.at(-1).date}`
      : "没有可显示日期";
  }
}

function buildLocalReviewData(symbol, start = "", end = "") {
  const code = normalizeSymbol(symbol);
  const { start: rangeStart, end: rangeEnd } = localReviewBounds(code, start, end);
  const name = stockNameForSymbol(code) || tradeName(trades.find((trade) => trade.symbol === code) || {}) || "";
  const symbolTrades = trades
    .filter((trade) => trade.symbol === code)
    .sort((a, b) => `${a.date}-${a.createdAt || 0}`.localeCompare(`${b.date}-${b.createdAt || 0}`));
  const visibleTrades = symbolTrades.filter((trade) => isWithinDateRange(trade.date, rangeStart, rangeEnd));
  const allMatches = allMatchedRowsForSymbol(code);
  const visibleMatches = allMatches.filter((row) => isWithinDateRange(matchedEventDate(row), rangeStart, rangeEnd));
  const visibleEvents = equityEventsForSymbol(code, rangeEnd).filter((event) => isWithinDateRange(event.date, rangeStart, rangeEnd));
  const dateSet = new Set();
  visibleTrades.forEach((trade) => dateSet.add(trade.date));
  visibleMatches.forEach((row) => dateSet.add(matchedEventDate(row)));
  visibleEvents.forEach((event) => dateSet.add(event.date));
  const dates = [...dateSet].filter(Boolean).sort((a, b) => a.localeCompare(b));
  const rows = dates.map((date) => {
    const dayTrades = visibleTrades.filter((trade) => trade.date === date);
    const prices = dayTrades.map((trade) => Number(trade.price || 0)).filter((value) => value > 0);
    const dayMatches = localReviewMatchedForDate(visibleMatches, date);
    const dayProfit = dayMatches.reduce((sum, row) => sum + row.profit, 0);
    const snapshot = positionSnapshotForDate(code, date, dayProfit);
    const fallbackPrice = prices.at(-1) || snapshot.currentCost || 0;
    return {
      date,
      open: prices[0] || fallbackPrice,
      high: prices.length ? Math.max(...prices) : fallbackPrice,
      low: prices.length ? Math.min(...prices) : fallbackPrice,
      close: prices.at(-1) || fallbackPrice,
      trades: dayTrades,
      buy: aggregateTradesForReview(dayTrades, "buy"),
      sell: aggregateTradesForReview(dayTrades, "sell"),
      matches: dayMatches,
      events: visibleEvents.filter((event) => event.date === date),
      snapshot,
    };
  });
  const endRows = symbolTrades.filter((trade) => trade.date <= rangeEnd);
  const endMatch = matchTrades(endRows, rangeEnd);
  const unmatched = endMatch.unmatched;
  const unmatchedBySide = (side) => {
    const lots = unmatched.filter((row) => row.side === side);
    const shares = lots.reduce((sum, row) => sum + Number(row.remaining || 0), 0);
    const amount = lots.reduce((sum, row) => sum + Number(row.remaining || 0) * Number(row.price || 0), 0);
    return { lots, shares, amount, avg: shares ? amount / shares : 0 };
  };
  const unmatchedBuySummary = unmatchedBySide("buy");
  const unmatchedSellSummary = unmatchedBySide("sell");
  const unmatchedBuy = unmatchedBuySummary.shares;
  const unmatchedSell = unmatchedSellSummary.shares;
  const unmatchedSide = unmatchedSell > 0 ? "待买回卖出" : unmatchedBuy > 0 ? "待卖出买入" : "无";
  const unmatchedSummary = unmatchedSell > 0
    ? { ...unmatchedSellSummary, label: "待买回卖出", side: "sell" }
    : unmatchedBuy > 0
      ? { ...unmatchedBuySummary, label: "待卖出买入", side: "buy" }
      : { lots: [], shares: 0, amount: 0, avg: 0, label: "无", side: "flat" };
  const matchedShares = visibleMatches.reduce((sum, row) => sum + Number(row.shares || 0), 0);
  const matchedProfit = visibleMatches.reduce((sum, row) => sum + Number(row.profit || 0), 0);
  const matchedAmount = visibleMatches.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const matchedFee = visibleMatches.reduce((sum, row) => sum + Number(row.fee || 0), 0);
  return {
    symbol: code,
    name,
    start: rangeStart,
    end: rangeEnd,
    rows,
    trades: visibleTrades,
    matches: visibleMatches,
    events: visibleEvents,
    unmatched,
    unmatchedSide,
    unmatchedSummary,
    buyPointCount: visibleTrades.filter((trade) => trade.side === "buy").length,
    sellPointCount: visibleTrades.filter((trade) => trade.side === "sell").length,
    matchedShares,
    matchedProfit,
    matchedAmount,
    matchedFee,
    profit: matchedProfit,
    amount: matchedAmount,
    fee: matchedFee,
  };
}

function renderLocalReviewSummary(data) {
  const latest = data.rows.at(-1)?.snapshot;
  return `
    <article><span>数据模式</span><strong>无K线复盘</strong></article>
    <article><span>当前区间</span><strong>${esc(data.start)} 至 ${esc(data.end)}</strong></article>
    <article><span>本地日期</span><strong>${qty(data.rows.length)} 天</strong></article>
    <article><span>买点</span><strong>${qty(data.buyPointCount)}</strong></article>
    <article><span>卖点</span><strong>${qty(data.sellPointCount)}</strong></article>
    <article class="local-review-period-match"><span>区间匹配</span><strong>${qty(data.matchedShares || 0)} 股</strong><em>${money(data.matchedProfit || 0)} · ${money(data.matchedAmount || 0)}</em></article>
    <article class="local-review-unmatched-summary"><span>未匹配</span><strong>${esc(data.unmatchedSummary?.label || data.unmatchedSide)} · ${qty(data.unmatchedSummary?.shares || 0)} 股</strong><em>均价 ${data.unmatchedSummary?.avg ? priceText(data.unmatchedSummary.avg) : "-"}</em></article>
    <article><span>最新持仓</span><strong>${latest ? `${qty(latest.shares)} 股` : "-"}</strong></article>
  `;
}

function renderLocalReviewChart(data, selectedDate = "") {
  const rows = localReviewVisibleRows(data);
  if (!rows.length) return `<div class="empty">这个区间没有本地交易、匹配或分红送股记录。</div>`;
  const width = 760;
  const height = 560;
  const pad = { left: 54, right: 22, top: 24, bottom: 42 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const prices = rows.flatMap((row) => [row.open, row.high, row.low, row.close, row.snapshot.currentCost]).filter((value) => Number(value) > 0);
  if (!prices.length) prices.push(1);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = Math.max(0.01, max - min);
  const yMin = Math.max(0, min - span * 0.12);
  const yMax = max + span * 0.12;
  const xFor = (index) => pad.left + (rows.length <= 1 ? plotW / 2 : (index / (rows.length - 1)) * plotW);
  const yFor = (value) => pad.top + ((yMax - Number(value || 0)) / (yMax - yMin)) * plotH;
  const maxShares = Math.max(1, ...rows.map((row) => Math.max(0, Number(row.snapshot.shares || 0))));
  const barW = Math.max(5, Math.min(18, plotW / Math.max(1, rows.length) * 0.7));
  const baseY = height - pad.bottom;
  const bars = rows.map((row, index) => {
    const shares = Math.max(0, Number(row.snapshot.shares || 0));
    const barH = Math.max(2, shares / maxShares * Math.min(62, plotH * 0.22));
    return `<rect class="local-review-position-bar" x="${xFor(index) - barW / 2}" y="${baseY - barH}" width="${barW}" height="${barH}" />`;
  }).join("");
  const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = pad.top + ratio * plotH;
    const price = yMax - ratio * (yMax - yMin);
    return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" /><text x="8" y="${y + 4}">${priceText(price)}</text>`;
  }).join("");
  const closeLine = rows.map((row, index) => `${xFor(index)},${yFor(row.close)}`).join(" ");
  const costLine = rows.filter((row) => Number(row.snapshot.currentCost) > 0).map((row) => `${xFor(rows.indexOf(row))},${yFor(row.snapshot.currentCost)}`).join(" ");
  const tooltipText = (lines) => esc(lines.filter(Boolean).join("\n"));
  const tooltipAttr = (lines) => `data-local-review-tooltip="${tooltipText(lines)}"`;
  const dayTooltip = (row) => tooltipAttr([
    row.date,
    `\u6536\u76d8 ${priceText(row.close)} \u00b7 \u6210\u672c ${row.snapshot.currentCost ? priceText(row.snapshot.currentCost) : "-"}`,
    `\u6301\u4ed3 ${qty(row.snapshot.shares || 0)} \u80a1`,
    row.buy?.count ? `\u4e70\u5165 ${qty(row.buy.shares)} \u80a1 \u00b7 \u5747\u4ef7 ${priceText(row.buy.avg)} \u00b7 ${money(row.buy.amount)}` : "",
    row.sell?.count ? `\u5356\u51fa ${qty(row.sell.shares)} \u80a1 \u00b7 \u5747\u4ef7 ${priceText(row.sell.avg)} \u00b7 ${money(row.sell.amount)}` : "",
    row.matches.length ? `\u5339\u914d ${qty(row.matches.reduce((sum, item) => sum + Number(item.shares || 0), 0))} \u80a1 \u00b7 \u76c8\u4e8f ${money(row.matches.reduce((sum, item) => sum + Number(item.profit || 0), 0))}` : "",
    row.events.length ? `\u5206\u7ea2\u9001\u80a1 ${qty(row.events.length)} \u6761` : "",
  ]);
  const unmatchedLots = data.unmatched || [];
  const point = (row, index, side) => {
    const agg = row[side];
    if (!agg?.count) return "";
    const price = agg.avg || row.close;
    const x = xFor(index);
    const y = yFor(price);
    const relatedUnmatched = unmatchedLots.filter((lot) => {
      if (lot.side !== side || lot.date !== row.date) return false;
      const lotPrice = Number(lot.price || 0);
      return !price || !lotPrice || Math.abs(lotPrice - price) <= Math.max(0.01, price * 0.006);
    });
    const isUnmatched = relatedUnmatched.length > 0;
    const label = side === "buy" ? `▲买${agg.count > 1 ? `×${agg.count}` : ""}` : `▼卖${agg.count > 1 ? `×${agg.count}` : ""}`;
    const text = `${label}${isUnmatched ? "未" : ""}`;
    const tx = x - (isUnmatched ? 20 : 14);
    const ty = side === "buy" ? y + 18 : y - 8;
    const unmatchedShares = relatedUnmatched.reduce((sum, lot) => sum + Number(lot.remaining || 0), 0);
    const unmatchedAmount = relatedUnmatched.reduce((sum, lot) => sum + Number(lot.remaining || 0) * Number(lot.price || 0), 0);
    const pointTitle = tooltipAttr([
      row.date,
      `${side === "buy" ? "\u4e70\u5165" : "\u5356\u51fa"} \u00b7 ${qty(agg.count)} \u7b14`,
      `\u80a1\u6570 ${qty(agg.shares)} \u80a1`,
      `\u5747\u4ef7 ${priceText(agg.avg)} \u00b7 \u91d1\u989d ${money(agg.amount)}`,
      isUnmatched ? `\u672a\u5339\u914d ${qty(unmatchedShares)} \u80a1 \u00b7 \u5747\u4ef7 ${unmatchedShares ? priceText(unmatchedAmount / unmatchedShares) : "-"}` : "",
    ]);
    const highlight = isUnmatched ? `
      <g class="local-review-unmatched-hit ${side}" ${pointTitle}>
        <circle cx="${x}" cy="${y}" r="14" />
        <rect x="${tx - 4}" y="${ty - 15}" width="${Math.max(38, text.length * 12)}" height="19" rx="5" />
      </g>` : "";
    return `${highlight}<text class="local-review-point ${side}${isUnmatched ? " unmatched" : ""}" ${pointTitle} x="${tx}" y="${ty}">${text}</text>`;
  };
  const matchPins = rows.map((row, index) => row.matches.length ? `<circle class="local-review-match-pin ${row.date === selectedDate ? "active" : ""}" ${tooltipAttr([row.date, `\u5339\u914d ${qty(row.matches.reduce((sum, item) => sum + Number(item.shares || 0), 0))} \u80a1`, `\u76c8\u4e8f ${money(row.matches.reduce((sum, item) => sum + Number(item.profit || 0), 0))}`, `\u6210\u4ea4\u989d ${money(row.matches.reduce((sum, item) => sum + Number(item.amount || 0), 0))}`])} cx="${xFor(index)}" cy="${yFor(row.close)}" r="${row.date === selectedDate ? 8 : 5}" />` : "").join("");
  const events = rows.map((row, index) => row.events.length ? `<text class="local-review-event" ${tooltipAttr([row.date, `\u5206\u7ea2\u9001\u80a1 ${qty(row.events.length)} \u6761`])} x="${xFor(index) - 6}" y="${pad.top + 12}">\u25c6</text>` : "").join("");
  const hitAreas = rows.map((row, index) => `<rect class="local-review-hit" ${dayTooltip(row)} data-local-review-date="${esc(row.date)}" x="${xFor(index) - Math.max(12, plotW / rows.length / 2)}" y="${pad.top}" width="${Math.max(24, plotW / rows.length)}" height="${plotH}" />`).join("");
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(data.name || data.symbol)} 无K线交易复盘图">
      <rect x="0" y="0" width="${width}" height="${height}" class="local-review-bg" />
      <g class="local-review-grid">${grid}</g>
      <line x1="${pad.left}" y1="${baseY}" x2="${width - pad.right}" y2="${baseY}" class="local-review-axis" />
      ${bars}
      <polyline class="local-review-price-line" points="${closeLine}" />
      ${costLine ? `<polyline class="local-review-cost-line" points="${costLine}" />` : ""}
      ${hitAreas}
      ${rows.map((row, index) => point(row, index, "buy")).join("")}
      ${rows.map((row, index) => point(row, index, "sell")).join("")}
      ${events}
      ${matchPins}
      <text x="${pad.left}" y="${height - 12}" class="local-review-date-label">${esc(rows[0].date.slice(5))}</text>
      <text x="${width - pad.right - 42}" y="${height - 12}" class="local-review-date-label">${esc(rows.at(-1).date.slice(5))}</text>
    </svg>
    <div id="localReviewLocator" class="local-review-locator" hidden></div>
    <div id="localReviewTooltip" class="local-review-tooltip" hidden></div>
  `;
}


function localReviewTooltipLines(text = "") {
  return String(text || "").split("\n").filter(Boolean);
}

function showLocalReviewTooltipFromText(text, event) {
  const chart = document.querySelector("#localReviewChart");
  const tooltip = chart?.querySelector("#localReviewTooltip");
  const locator = chart?.querySelector("#localReviewLocator");
  if (!chart || !tooltip || !text) return;
  const lines = localReviewTooltipLines(text);
  tooltip.innerHTML = lines.map((line, index) => `<span class="${index === 0 ? "main" : ""}">${esc(line)}</span>`).join("");
  tooltip.hidden = false;
  if (locator) locator.hidden = false;
  const rect = chart.getBoundingClientRect();
  const pointer = event?.touches?.[0] || event?.changedTouches?.[0] || event || {};
  const clientX = Number(pointer.clientX ?? (rect.left + rect.width / 2));
  const clientY = Number(pointer.clientY ?? (rect.top + rect.height / 2));
  const locateX = Math.max(0, Math.min(rect.width, clientX - rect.left));
  if (locator) locator.style.left = `${locateX}px`;
  const width = tooltip.offsetWidth || 220;
  const height = tooltip.offsetHeight || 92;
  const left = Math.max(8, Math.min(rect.width - width - 8, clientX - rect.left + 12));
  const top = Math.max(8, Math.min(rect.height - height - 8, clientY - rect.top - height - 12));
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function hideLocalReviewTooltip() {
  const tooltip = document.querySelector("#localReviewTooltip");
  const locator = document.querySelector("#localReviewLocator");
  if (tooltip) tooltip.hidden = true;
  if (locator) locator.hidden = true;
}

function showLocalReviewTooltipForTarget(target, event) {
  const tooltipTarget = target?.closest?.("[data-local-review-tooltip]");
  if (!tooltipTarget) {
    hideLocalReviewTooltip();
    return false;
  }
  showLocalReviewTooltipFromText(tooltipTarget.dataset.localReviewTooltip || "", event);
  return true;
}

function localReviewNearestHit(event) {
  const chart = event?.target?.closest?.("#localReviewChart") || document.querySelector("#localReviewChart");
  if (!chart) return null;
  const pointer = event?.touches?.[0] || event?.changedTouches?.[0] || event || {};
  const clientX = Number(pointer.clientX);
  if (!Number.isFinite(clientX)) return null;
  const hits = [...chart.querySelectorAll("[data-local-review-date]")];
  if (!hits.length) return null;
  return hits.reduce((best, hit) => {
    const rect = hit.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(center - clientX);
    return !best || distance < best.distance ? { hit, distance } : best;
  }, null)?.hit || null;
}

function updateLocalReviewFromPointer(event) {
  if (!localReviewData) return false;
  const hit = localReviewNearestHit(event);
  if (!hit) return showLocalReviewTooltipForTarget(event.target, event);
  showLocalReviewTooltipFromText(hit.dataset.localReviewTooltip || "", event);
  const date = hit.dataset.localReviewDate || "";
  if (date && date !== localReviewSelectedDate) {
    localReviewSelectedDate = date;
    const detail = document.querySelector("#localReviewDetail");
    if (detail) detail.innerHTML = renderLocalReviewDetail(localReviewData, date);
  }
  return true;
}

function renderLocalReviewDetail(data, date = "") {
  const visibleRows = localReviewVisibleRows(data);
  const row = visibleRows.find((item) => item.date === date) || visibleRows.at(-1) || data.rows.at(-1);
  if (!row) return `<div class="empty">没有可显示的日期。</div>`;
  const allIndex = data.rows.indexOf(row);
  const previous = data.rows[allIndex - 1]?.snapshot;
  const costBefore = previous?.currentCost ?? row.snapshot.currentCost;
  const costAfter = row.snapshot.currentCost;
  const costDiff = costBefore !== null && costAfter !== null ? costAfter - costBefore : null;
  const tradeList = row.trades.length ? row.trades.map((trade) => `
    <li class="${trade.side}"><b>${trade.side === "buy" ? "买入" : "卖出"}</b><span>${qty(trade.shares)}股 @${priceText(trade.price)}</span><em>${money(trade.amount || trade.price * trade.shares)}</em></li>
  `).join("") : `<li>当天没有原始交易。</li>`;
  const matchList = row.matches.length ? row.matches.map((match) => `
    <li>
      <b>${qty(match.shares)}股</b>
      <span>${esc(match.buyDate)} ${priceText(match.buyPrice)} → ${esc(match.sellDate)} ${priceText(match.sellPrice)}</span>
      <strong class="${profitClass(match.profit)}">${plainInteger(match.profit)}</strong>
      <em>费 ${money(match.fee)}</em>
    </li>
  `).join("") : `<li>当天没有完成匹配。</li>`;
  const dayUnmatched = row.snapshot.unmatched.filter((lot) => lot.date === row.date);
  const unmatchedList = dayUnmatched.length ? dayUnmatched.map((lot) => `
    <li class="${lot.side}"><b>${lot.side === "buy" ? "未匹配买入" : "未匹配卖出"}</b><span>${priceText(lot.price)}*${lot.side === "sell" ? "-" : ""}${qty(lot.remaining)}</span></li>
  `).join("") : `<li>当天没有新增未匹配点。</li>`;
  const eventList = row.events.length ? row.events.map((event) => `<li><b>${esc(event.date)}</b><span>现金 ${priceText(event.cash || 0)}/股 · 每10股送转 ${priceText(event.bonusPer10 || 0)}</span>${event.note ? `<em>${esc(event.note)}</em>` : ""}</li>`).join("") : `<li>当天没有分红送股。</li>`;
  const matchProfit = row.matches.reduce((sum, match) => sum + match.profit, 0);
  const matchShares = row.matches.reduce((sum, match) => sum + match.shares, 0);
  return `
    <section class="local-review-day-card">
      <div class="local-review-day-head">
        <h3>${esc(row.date)}</h3>
        <span class="${profitClass(matchProfit)}">匹配盈亏 ${plainInteger(matchProfit)}</span>
      </div>
      <div class="local-review-day-metrics">
        <article><span>当天持仓</span><strong>${qty(row.snapshot.shares)} 股</strong></article>
        <article><span>成本变化</span><strong>${costDiff === null ? "-" : `${signedPriceText(costDiff)}/股`}</strong><em>${costBefore ? priceText(costBefore) : "-"} → ${costAfter ? priceText(costAfter) : "-"}</em></article>
        <article><span>匹配股数</span><strong>${qty(matchShares)} 股</strong></article>
        <article><span>成交参考</span><strong>${priceText(row.close)}</strong><em>高 ${priceText(row.high)} / 低 ${priceText(row.low)}</em></article>
      </div>
      <div class="local-review-detail-grid">
        <div><h4>当天交易</h4><ul>${tradeList}</ul></div>
        <div><h4>匹配盈亏</h4><ul>${matchList}</ul></div>
        <div><h4>未匹配</h4><ul>${unmatchedList}</ul></div>
        <div><h4>分红送股</h4><ul>${eventList}</ul></div>
      </div>
    </section>
  `;
}

function renderLocalReviewModal(data = localReviewData) {
  if (!data) return;
  const modal = document.querySelector("#localReviewModal");
  if (!modal) return;
  const visibleRows = localReviewVisibleRows(data);
  const selected = visibleRows.some((row) => row.date === localReviewSelectedDate) ? localReviewSelectedDate : (visibleRows.at(-1)?.date || data.rows.at(-1)?.date || "");
  localReviewSelectedDate = selected;
  document.querySelector("#localReviewTitle").textContent = `${data.name || data.symbol} ${data.symbol} 无K线交易复盘`;
  document.querySelector("#localReviewSubtitle").textContent = `${data.start} 至 ${data.end} · 区间共 ${data.rows.length} 个本地日期`;
  document.querySelector("#localReviewStatus").textContent = "未加载行情。使用本地交易、匹配、成本和分红送股生成。";
  document.querySelector("#localReviewStartInput").value = data.start;
  document.querySelector("#localReviewEndInput").value = data.end;
  syncLocalReviewAxisControls(data);
  document.querySelector("#localReviewSummary").innerHTML = renderLocalReviewSummary(data);
  document.querySelector("#localReviewChart").innerHTML = renderLocalReviewChart(data, selected);
  document.querySelector("#localReviewDetail").innerHTML = renderLocalReviewDetail(data, selected);
  modal.hidden = false;
}

function openLocalReview() {
  const symbol = normalizeSymbol(els.tFilterSymbol.value);
  if (!symbol) {
    window.alert("请先选择一只股票，再打开无K线复盘。");
    return;
  }
  localReviewData = buildLocalReviewData(symbol, "", "");
  localReviewWindowStart = Math.max(0, localReviewData.rows.length - Math.min(localReviewData.rows.length || 0, 60));
  localReviewWindowSize = Math.min(localReviewData.rows.length || 0, 60);
  localReviewSelectedDate = localReviewData.rows.at(-1)?.date || "";
  renderLocalReviewModal(localReviewData);
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
  let payload;
  try {
    els.status.textContent = `正在读取备份：${file.name}`;
    payload = JSON.parse(await file.text());
    if (!Array.isArray(payload.trades)) {
      throw new Error("备份文件不正确。");
    }
    els.status.textContent = `正在导入备份：${payload.trades.length} 笔交易`;
    trades = payload.trades;
    await saveTradesToDb(trades);
    const lightweightPayload = { ...payload };
    delete lightweightPayload.trades;
    const serialized = JSON.stringify(lightweightPayload);
    localStorage.removeItem("gridTradingTrades");
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, serialized);
    if (localStorage.getItem(STORAGE_KEY) !== serialized) {
      throw new Error("备份导入校验失败。");
    }
  } catch (error) {
    const message = error?.name === "QuotaExceededError"
      ? "浏览器本地存储空间不足，备份没有导入。请先换用电脑浏览器或减少流水后再导入。"
      : error?.message || "备份导入失败。";
    els.status.textContent = message;
    window.alert(message);
    els.importBackup.value = "";
    return;
  }
  restoreState();
  renderOriginalPositions();
  renderEquityEvents();
  renderGrids();
  runScenarios();
  renderAllTrades();
  renderOverview();
  renderQuery();
  saveState();
  els.importBackup.value = "";
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

els.tabs.forEach((tab) => tab.addEventListener("click", () => {
  const targetWindow = tab.dataset.window;
  if (targetWindow === "flowWindow") renderAllTrades();
  if (targetWindow === "overviewWindow") renderOverview();
  if (targetWindow === "queryWindow") renderQuery();
  switchWindow(targetWindow);
}));
els.scenarioTabs.forEach((tab) => tab.addEventListener("click", () => switchScenarioPane(tab.dataset.scenarioPane)));
els.addGrid.addEventListener("click", () => addGrid());
document.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) scheduleSave();
});
document.addEventListener("change", (event) => {
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
els.positionSymbol.addEventListener("change", autofillPositionName);
els.positionSymbol.addEventListener("blur", autofillPositionName);
els.savePosition.addEventListener("click", saveOriginalPosition);
els.positionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  const row = event.target.closest(".position-row");
  if (!button || !row) return;
  if (button.dataset.action === "load-position") loadOriginalPosition(row.dataset.symbol);
  if (button.dataset.action === "delete-position") deleteOriginalPosition(row.dataset.symbol);
});
els.equitySymbol.addEventListener("change", autofillEquityName);
els.equitySymbol.addEventListener("blur", autofillEquityName);
els.saveEquity.addEventListener("click", saveEquityEvent);
els.equityList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='delete-equity']");
  const row = event.target.closest(".equity-row");
  if (!button || !row) return;
  deleteEquityEvent(row.dataset.id);
});
els.tradeFlowRows.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  const action = event.target.dataset.action;
  if (action === "load-flow-more") {
    flowRenderLimit += FLOW_RENDER_STEP;
    renderAllTrades();
    return;
  }
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
function viewSymbolDetail(symbol) {
  els.tFilterSymbol.value = symbol || "";
  renderQuery();
  switchWindow("queryWindow");
  saveState();
}

els.overviewRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='view-symbol']");
  if (!button) return;
  viewSymbolDetail(button.dataset.symbol || "");
});
els.overviewSort?.addEventListener("change", renderOverview);
document.querySelector("#overviewWindow thead")?.addEventListener("click", (event) => {
  const header = event.target.closest("[data-overview-sort]");
  if (!header || !els.overviewSort) return;
  els.overviewSort.value = header.dataset.overviewSort || "lastDateDesc";
  renderOverview();
});
els.openFlowSymbolPicker.addEventListener("click", () => openSymbolModal("flow"));
const refreshFlowDateFilter = () => {
  flowRenderLimit = FLOW_RENDER_STEP;
  renderAllTrades();
  saveState();
};
els.flowStartDate.addEventListener("change", refreshFlowDateFilter);
els.flowEndDate.addEventListener("change", refreshFlowDateFilter);
els.openQuerySymbolPicker.addEventListener("click", () => openSymbolModal("query"));
els.closeSymbolModal.addEventListener("click", closeSymbolModal);
els.symbolModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-symbol-modal]")) closeSymbolModal();
  const button = event.target.closest(".symbol-chip");
  if (!button) return;
  if (symbolPickerMode === "flow") {
    flowFilterSymbol = button.dataset.symbol || "";
    flowRenderLimit = FLOW_RENDER_STEP;
    renderAllTrades();
  } else {
    els.tFilterSymbol.value = button.dataset.symbol || "";
    renderQuery();
  }
  closeSymbolModal();
  saveState();
});
document.addEventListener("click", (event) => {
  if (event.target.closest("#openLocalReviewButton")) {
    openLocalReview();
  }
  if (event.target.closest("#closeLocalReviewModal") || event.target.matches("[data-close-local-review]")) {
    const modal = document.querySelector("#localReviewModal");
    if (modal) modal.hidden = true;
  }
  if (event.target.closest("#applyLocalReviewRange")) {
    const symbol = normalizeSymbol(els.tFilterSymbol.value);
    localReviewData = buildLocalReviewData(symbol, document.querySelector("#localReviewStartInput")?.value || "", document.querySelector("#localReviewEndInput")?.value || "");
    localReviewWindowStart = Math.max(0, localReviewData.rows.length - Math.min(localReviewData.rows.length || 0, 60));
    localReviewWindowSize = Math.min(localReviewData.rows.length || 0, 60);
    localReviewSelectedDate = localReviewData.rows.at(-1)?.date || "";
    renderLocalReviewModal(localReviewData);
  }
  if (event.target.closest("#resetLocalReviewRange")) {
    const symbol = normalizeSymbol(els.tFilterSymbol.value);
    localReviewData = buildLocalReviewData(symbol, "", "");
    localReviewWindowStart = 0;
    localReviewWindowSize = localReviewData.rows.length;
    localReviewSelectedDate = localReviewData.rows.at(-1)?.date || "";
    renderLocalReviewModal(localReviewData);
  }
  const localReviewHit = event.target.closest("[data-local-review-date]");
  if (localReviewHit && localReviewData) {
    updateLocalReviewFromPointer(event);
  }
  const viewButton = event.target.closest("#clearedModal [data-action='view-symbol']");
  if (viewButton) {
    els.clearedModal.hidden = true;
    viewSymbolDetail(viewButton.dataset.symbol || "");
  }
  if (event.target.closest("#openClearedModal")) {
    if (!overviewRowsCache.length && trades.length) renderOverview();
    if (els.clearedSearch) els.clearedSearch.value = "";
    renderClearedModal();
    els.clearedModal.hidden = false;
  }
  if (event.target.closest("#closeClearedModal") || event.target.matches("[data-close-cleared-modal]")) {
    els.clearedModal.hidden = true;
  }
  if (event.target.closest(".all-profit-line")) {
    renderAllProfitModal();
    els.allProfitModal.hidden = false;
  }
  if (event.target.closest("#closeAllProfitModal") || event.target.matches("[data-close-all-profit-modal]")) {
    els.allProfitModal.hidden = true;
  }
  if (event.target.closest("#openMatchedModal")) {
    const activeSymbol = normalizeSymbol(els.tFilterSymbol.value);
    matchedCalendarMonth = "";
    matchedCalendarSelected = "";
    renderMatchedCalendar(allMatchedRowsForSymbol(activeSymbol), { aggregateBySymbol: !activeSymbol });
    const title = document.querySelector("#matchedModalTitle");
    if (title) title.textContent = activeSymbol ? "已匹配细节" : "全部股票已匹配日历";
    document.querySelector("#matchedModal").hidden = false;
  }
  if (event.target.closest("#openOverviewMatchedCalendar")) {
    matchedCalendarMonth = "";
    matchedCalendarSelected = "";
    renderMatchedCalendar(allMatchedRows(), { aggregateBySymbol: true });
    const title = document.querySelector("#matchedModalTitle");
    if (title) title.textContent = "全部股票已匹配日历";
    document.querySelector("#matchedModal").hidden = false;
  }
  if (event.target.closest("#closeMatchedModal") || event.target.matches("[data-close-matched-modal]")) {
    document.querySelector("#matchedModal").hidden = true;
  }
  const calendarTotalCard = event.target.closest(".calendar-total-grid article");
  if (calendarTotalCard?.querySelector("#matchedMonthProfit")) {
    openCalendarPeriodModal("month");
  }
  if (calendarTotalCard?.querySelector("#matchedYearProfit")) {
    openCalendarPeriodModal("year");
  }
  if (event.target.closest("#openMatchedYearSummary")) {
    openCalendarYearSummaryModal();
  }
  const calendarYearButton = event.target.closest("[data-calendar-year]");
  if (calendarYearButton) {
    const year = calendarYearButton.dataset.calendarYear || "";
    document.querySelector("#calendarPeriodModal").hidden = true;
    selectMatchedCalendarYear(year);
    openCalendarPeriodModal("year");
  }
  if (event.target.closest("#closeCalendarPeriodModal") || event.target.matches("[data-close-calendar-period-modal]")) {
    document.querySelector("#calendarPeriodModal").hidden = true;
  }
  if (event.target.closest("#toggleCalendarPeriodSymbolFilter")) {
    const choices = document.querySelector("#calendarPeriodSymbolChoices");
    if (choices) choices.hidden = !choices.hidden;
  }
  if (event.target.closest("#clearCalendarPeriodSymbolFilter")) {
    calendarPeriodFilterSymbol = "";
    const choices = document.querySelector("#calendarPeriodSymbolChoices");
    if (choices) choices.hidden = true;
    renderCalendarPeriodContent();
  }
  const periodSymbolButton = event.target.closest("[data-calendar-period-symbol]");
  if (periodSymbolButton) {
    calendarPeriodFilterSymbol = periodSymbolButton.dataset.calendarPeriodSymbol || "";
    const choices = document.querySelector("#calendarPeriodSymbolChoices");
    if (choices) choices.hidden = true;
    renderCalendarPeriodContent();
  }
  const dayButton = event.target.closest(".calendar-day[data-date]");
  if (dayButton) {
    matchedCalendarSelected = dayButton.dataset.date;
    matchedCalendarMonth = monthKey(matchedCalendarSelected);
    renderMatchedCalendar(matchedCalendarRows, { aggregateBySymbol: matchedCalendarAggregateBySymbol });
    openCalendarPeriodModal("day");
  }
  if (event.target.closest("#matchedCalendarPrev") && matchedCalendarMonth) {
    matchedCalendarMonth = shiftMonth(matchedCalendarMonth, -1);
    matchedCalendarSelected = "";
    renderMatchedCalendar(matchedCalendarRows, { aggregateBySymbol: matchedCalendarAggregateBySymbol });
  }
  if (event.target.closest("#matchedCalendarNext") && matchedCalendarMonth) {
    matchedCalendarMonth = shiftMonth(matchedCalendarMonth, 1);
    matchedCalendarSelected = "";
    renderMatchedCalendar(matchedCalendarRows, { aggregateBySymbol: matchedCalendarAggregateBySymbol });
  }
});
document.addEventListener("change", (event) => {
  if (event.target.matches("#matchedCalendarYearSelect")) {
    selectMatchedCalendarYear(event.target.value);
  }
});
els.tStartDate.addEventListener("change", () => {
  renderQuery();
  if (!els.allProfitModal?.hidden) renderAllProfitModal();
  saveState();
});
els.tEndDate.addEventListener("change", () => {
  renderQuery();
  if (!els.allProfitModal?.hidden) renderAllProfitModal();
  saveState();
});
els.applyTradeFilter?.addEventListener("click", () => {
  renderQuery();
  if (!els.allProfitModal?.hidden) renderAllProfitModal();
  saveState();
});
document.addEventListener("input", (event) => {
  if (event.target.matches("#localReviewZoomInput") && localReviewData) {
    localReviewWindowSize = Math.max(1, Number(event.target.value) || 1);
    normalizeLocalReviewWindow(localReviewData);
    renderLocalReviewModal(localReviewData);
  }
  if (event.target.matches("#localReviewPanInput") && localReviewData) {
    localReviewWindowStart = Math.max(0, Number(event.target.value) || 0);
    normalizeLocalReviewWindow(localReviewData);
    renderLocalReviewModal(localReviewData);
  }
});
els.clearedSearch?.addEventListener("input", renderClearedModal);

document.addEventListener("pointermove", (event) => {
  if (event.target.closest?.("#localReviewChart")) {
    event.preventDefault();
    updateLocalReviewFromPointer(event);
  }
}, { passive: false });
document.addEventListener("pointerdown", (event) => {
  const chart = event.target.closest?.("#localReviewChart");
  if (chart) {
    event.preventDefault();
    chart.setPointerCapture?.(event.pointerId);
    updateLocalReviewFromPointer(event);
  }
}, { passive: false });
document.addEventListener("pointerout", (event) => {
  if (event.target.closest?.("#localReviewChart") && !event.relatedTarget?.closest?.("#localReviewChart")) {
    hideLocalReviewTooltip();
  }
});
els.exportBackup.addEventListener("click", exportBackup);
els.importBackup.addEventListener("click", () => {
  els.importBackup.value = "";
});
els.importBackup.addEventListener("change", () => importBackup(els.importBackup.files[0]).catch((err) => { els.status.textContent = err.message; }));
els.clearTrades.addEventListener("click", clearTrades);

async function initializeApp() {
  grids = defaultGrids();
  ensureMatchedDetailModal();
  ensureLocalReviewModal();
  await loadTrades();
  restoreState();
  await migrateLegacyTradeStorage();
  if (!els.tDate.value) els.tDate.value = todayIso();
  if (!els.equityDate.value) els.equityDate.value = todayIso();
  autofillTradeName();
  renderOriginalPositions();
  renderEquityEvents();
  renderGrids();
  runScenarios();
  renderAllTrades();
  renderOverview();
  renderQuery();
  saveState();
}

initializeApp().catch((error) => showStorageError(error, "启动读取"));
