/* =============================================
   Global Navigation — shared-nav.js
   注入頂部系統切換列 + 內部後台左側邊欄
   ============================================= */
(function () {

  /* ── 頁面配置 ─────────────────────────────── */
  var NAV_CONFIG = {
    systems: [
      {
        id: 'internal',
        label: '內部後台',
        defaultUrl: 'home.html',
        pages: [
          {
            label: '首頁',
            group: true,
            url: 'home.html',
            match: function (p) {
              return p.file === 'home.html' ||
                     p.file === 'purchasing-home.html' ||
                     p.file === 'editorial-home.html' ||
                     (p.file === 'announcement.html' && p.view === 'admin' && p.sys !== 'store');
            },
            children: [
              {
                label: '首頁儀表板',
                url: 'home.html',
                match: function (p) { return p.file === 'home.html'; }
              },
              {
                label: '採購首頁',
                url: 'purchasing-home.html',
                hidden: true,
                match: function (p) { return p.file === 'purchasing-home.html'; }
              },
              {
                label: '美編首頁',
                url: 'editorial-home.html',
                hidden: true,
                match: function (p) { return p.file === 'editorial-home.html'; }
              },
              {
                label: '公告管理',
                url: 'announcement.html?view=admin&page=manage',
                match: function (p) {
                  return p.file === 'announcement.html' && p.view === 'admin' && p.page === 'manage' && p.sys !== 'store';
                }
              }
            ]
          },
          {
            label: '餐點管理',
            group: true,
            url: 'menu-items.html',
            match: function (p) {
              return p.file === 'menu-items.html' ||
                     p.file === 'price-change-log.html' ||
                     p.file === 'change-review.html';
            },
            children: [
              { label: '餐點管理',     url: 'menu-items.html',      match: function (p) { return p.file === 'menu-items.html'; } },
              { label: '餐點異動紀錄', url: 'price-change-log.html', match: function (p) { return p.file === 'price-change-log.html'; } },
              { label: '店家異動審核', url: 'change-review.html',    match: function (p) { return p.file === 'change-review.html'; } }
            ]
          },
          {
            label: '菜單管理',
            group: true,
            url: 'menu-schedule.html',
            match: function (p) {
              return p.file === 'menu-schedule.html' ||
                     p.file === 'menu-publish.html' ||
                     p.file === 'menu-schedule-log.html' ||
                     p.file === 'menu-template.html';
            },
            children: [
              { label: '菜單排程管理',     url: 'menu-schedule.html',     match: function (p) { return p.file === 'menu-schedule.html'; } },
              { label: '菜單發布管理',     url: 'menu-publish.html',      match: function (p) { return p.file === 'menu-publish.html'; } },
              { label: '菜單管理異動紀錄', url: 'menu-schedule-log.html', match: function (p) { return p.file === 'menu-schedule-log.html'; } },
              { label: '菜單模板管理',     url: 'menu-template.html',     match: function (p) { return p.file === 'menu-template.html'; } }
            ]
          },
          {
            label: '訂單管理',
            url: 'complaint.html?mode=admin&tab=orders',
            match: function (p) { return p.file === 'complaint.html' && p.mode === 'admin' && p.tab === 'orders'; }
          },
          {
            label: '客訴管理',
            url: 'complaint.html?mode=admin',
            match: function (p) { return p.file === 'complaint.html' && p.mode === 'admin' && p.tab !== 'orders'; }
          },
          {
            label: '點數 & 折價券管理',
            url: 'coupon.html',
            match: function (p) { return p.file === 'coupon.html'; }
          },
          {
            label: '帳號管理',
            url: 'permissions.html',
            match: function (p) { return p.file === 'permissions.html'; }
          },
          {
            label: '問題單&ECR',
            group: true,
            url: 'issue-and-ecr.html',
            match: function (p) { return p.file === 'issue-and-ecr.html'; },
            children: [
              { label: '📝 新增問題單', url: 'issue-and-ecr.html?tab=report',   tab: 'report'   },
              { label: '📋 問題清單',   url: 'issue-and-ecr.html?tab=list',     tab: 'list'     },
              { label: '🔄 新增 ECR',   url: 'issue-and-ecr.html?tab=ecr-form', tab: 'ecr-form' },
              { label: '📑 ECR 清單',   url: 'issue-and-ecr.html?tab=ecr-list', tab: 'ecr-list' },
              { label: '📖 填寫指南',   url: 'issue-and-ecr.html?tab=guide',    tab: 'guide'    }
            ]
          }
        ]
      },
      {
        id: 'store',
        label: '店家後台',
        defaultUrl: 'announcement.html?view=admin&page=notify&sys=store',
        pages: [
          {
            label: '公告通知',
            url: 'announcement.html?view=admin&page=notify&sys=store',
            match: function (p) { return p.file === 'announcement.html' && p.sys === 'store'; }
          },
          {
            label: '餐點管理',
            url: 'store-menu.html?sys=store',
            match: function (p) { return p.file === 'store-menu.html'; }
          },
          {
            label: '訂單明細',
            url: 'store-orders.html?sys=store',
            match: function (p) { return p.file === 'store-orders.html'; }
          }
        ]
      },
      {
        id: 'frontend',
        label: '訂餐前台',
        defaultUrl: 'announcement.html?view=frontend',
        pages: [
          {
            label: '公告通知',
            url: 'announcement.html?view=frontend',
            match: function (p) { return p.file === 'announcement.html' && p.view === 'frontend'; }
          },
          {
            label: '點餐',
            url: 'order.html',
            match: function (p) { return p.file === 'order.html'; }
          },
          {
            label: '點數 & 折價券',
            url: 'member-wallet.html',
            match: function (p) { return p.file === 'member-wallet.html'; }
          },
          {
            label: '訂閱方案',
            url: 'subscription.html',
            match: function (p) { return p.file === 'subscription.html'; }
          },
          {
            label: '我的訂單',
            url: 'complaint.html?mode=member&tab=orders',
            match: function (p) { return p.file === 'complaint.html' && p.mode === 'member' && p.tab === 'orders'; }
          },
          {
            label: '我的客訴',
            url: 'complaint.html?mode=member&tab=mylist',
            match: function (p) { return p.file === 'complaint.html' && p.mode === 'member' && p.tab === 'mylist'; }
          }
        ]
      }
    ]
  };

  /* ── 偵測目前頁面 ─────────────────────────── */
  function getPageInfo() {
    var pathname = window.location.pathname;
    var file = pathname.split('/').pop() || 'index.html';
    if (!file || file === '') file = 'index.html';
    var params = new URLSearchParams(window.location.search);
    return {
      file: file,
      view: params.get('view'),
      page: params.get('page'),
      mode: params.get('mode'),
      tab: params.get('tab'),
      sys: params.get('sys')
    };
  }

  function detectActive(pageInfo) {
    for (var si = 0; si < NAV_CONFIG.systems.length; si++) {
      var sys = NAV_CONFIG.systems[si];
      for (var pi = 0; pi < sys.pages.length; pi++) {
        var pg = sys.pages[pi];
        if (pg.match(pageInfo)) {
          return { system: sys, page: pg };
        }
      }
    }
    return { system: NAV_CONFIG.systems[0], page: null };
  }

  /* ── 群組展開狀態（sessionStorage）─────────── */
  var GN_GROUPS_KEY = 'gn_open_groups';
  function getOpenGroups() {
    try { return JSON.parse(sessionStorage.getItem(GN_GROUPS_KEY) || '{}'); } catch(e) { return {}; }
  }
  function setGroupOpen(groupLabel, isOpen) {
    try {
      var state = getOpenGroups();
      state[groupLabel] = isOpen;
      sessionStorage.setItem(GN_GROUPS_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  /* ── 功能需求章節內容常數 ─────────────────── */
  var FEATURE_HOME = (
    '<h2 class="gn-fp-h2">首頁儀表板</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>頂部可切換身份，畫面內容依所選身份顯示（此功能為 demo 展示用，實際上會依登入帳號自動判斷）</li>' +
      '<li><strong>KPI 數字卡</strong>：依身份自動顯示對應指標，例如採購看待審核異動、美編看待審圖片</li>' +
      '<li><strong>常用功能</strong>：依身份預設顯示常用頁面連結，可點「✦ 自訂版面」自行勾選想要顯示的項目</li>' +
      '<li><strong>公告區塊</strong>：分頁顯示全部 / 未讀 / 系統公告 / 活動資訊，點擊公告可展開內容並自動標記為已讀，部分公告只顯示給特定身份</li>' +
    '</ul>'
  );

  var FEATURE_ANNOUNCEMENT = (
    '<h2 class="gn-fp-h2">公告管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li><strong>新增公告</strong>：填寫標題、分類、要顯示給哪些系統（內部後台 / 店家後台 / 訂餐前台，可複選）、是否彈出通知、內文、圖片、附件</li>' +
      '<li>可設定發布時間與到期時間，讓公告自動上下架</li>' +
      '<li>公告狀態分為：發布中、草稿、排程待發、已到期</li>' +
      '<li>可搜尋標題，也可依分類、狀態、顯示位置篩選</li>' +
      '<li>支援編輯與刪除公告</li>' +
      '<li><strong>分類管理</strong>：可新增自訂分類、改名、刪除、拖移調整順序</li>' +
    '</ul>'
  );

  var FEATURE_STORE_ANN = (
    '<h2 class="gn-fp-h2">店家後台 — 公告通知</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>查看平台發送的系統公告</li>' +
      '<li>可篩選全部或只看未讀</li>' +
      '<li>點擊公告可標記已讀</li>' +
    '</ul>'
  );

  var FEATURE_MENU_ITEMS = (
    '<h2 class="gn-fp-h2">餐點管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>先選餐廳，餐廳旁會顯示抽成比例</li>' +
      '<li>分為「販售中」與「下架存檔區」兩個頁籤</li>' +
      '<li>可依分類篩選、搜尋品名或料號</li>' +
      '<li>支援清單與圖片兩種檢視方式切換</li>' +
      '<li><strong>店內價調整</strong>：可預約設定新價格與生效日，到期自動套用，調漲調降以紅綠色區分顯示</li>' +
      '<li>終端價可單獨設定，與店內價各自獨立</li>' +
      '<li><strong>圖片管理</strong>：支援單張上傳、批量上傳（檔名對應品名）、批量下載、圖片放大檢視，也可疊加標示圖（蛋奶素、僅供參考等）</li>' +
      '<li>新增 / 編輯品項：可填寫名稱、機台顯示名稱（最多 9 字）、英文名稱、介紹、分類、排序、備註、圖片</li>' +
      '<li>品項可下架移至存檔區，也可重新上架</li>' +
      '<li><strong>分類管理</strong>：各餐廳獨立分類，可新增、改名、刪除、拖移排序</li>' +
      '<li><strong>摩寶整合</strong>：可將品項上傳至摩寶系統，或更新已連結品項的資料</li>' +
      '<li>支援 Excel 匯入 / 匯出</li>' +
    '</ul>'
  );

  var FEATURE_PRICE_LOG = (
    '<h2 class="gn-fp-h2">餐點調價歷史紀錄</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>先選餐廳，再切換月份查看</li>' +
      '<li><strong>月份價格快照</strong>：顯示當月所有品項的完整價格清單，並標示各品項是「新增」、「有異動」、「已下架」還是「無異動」，附統計數量</li>' +
      '<li>系統會自動比對上個月的資料，產生異動說明（例如：店內價調漲、品名變更、新增品項等）</li>' +
      '<li><strong>異動流水帳</strong>：逐筆列出每次變動紀錄，顯示異動前後的數值、操作人員與時間，可依異動類型篩選，也可搜尋品名或料號</li>' +
    '</ul>'
  );

  var FEATURE_CHANGE_REVIEW = (
    '<h2 class="gn-fp-h2">店家異動審核</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>先選餐廳，分為「待審核」與「已處理」兩個頁籤</li>' +
      '<li>每筆異動以對照方式顯示修改前後的內容（舊值加刪除線、新值以綠色標示）</li>' +
      '<li>店家須附上紙本菜單照片作為佐證</li>' +
      '<li>核准時可指定生效日期；退回時需填寫退回原因，系統會通知店家</li>' +
      '<li>任何異動申請送出後會通知營運；審核通過或退回後也會通知營運</li>' +
      '<li>圖片類異動由美編審核，其餘（名稱 / 介紹 / 店內價）由採購審核</li>' +
      '<li>可依餐廳或異動類型（名稱 / 介紹 / 圖片 / 店內價）篩選</li>' +
      '<li>店家上傳菜單照片時，會以獨立通知顯示，供採購部確認是否需要建立異動申請</li>' +
    '</ul>'
  );

  var FEATURE_SCHEDULE = (
    '<h2 class="gn-fp-h2">菜單排程管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>以月曆方式顯示排程，可切換廠區與餐期（早餐 / 午餐 / 下午茶 / 晚餐 / 消夜）</li>' +
      '<li>點月份標籤可快速跳至指定月份，也可點「回到今日」</li>' +
      '<li>點月曆格子展開當天排程，可直接編輯各品項的價格、櫃位、數量，也可追加或移除品項 / 店家</li>' +
      '<li>新增店家時選擇餐廳與品項，設定終端價、預約數量等；有分店的餐廳需指定分店</li>' +
      '<li>系統會自動偵測衝突（同一天同餐廳排在多個廠區）及公休日，避免誤排</li>' +
      '<li>每間店家的排程卡片顯示發布狀態（未發布 / 已發布 / 已修改），可個別或批量發布；發布後若有修改可一鍵還原</li>' +
      '<li><strong>批次調整價格</strong>：可對整月排程以固定金額或百分比調整終端價，套用前先預覽，套用後可一鍵還原</li>' +
      '<li><strong>會議餐</strong>：可在任意日期新增會議餐，填寫人員、店家、品項數量等，月曆上以粉紅色標示區分</li>' +
      '<li>可一鍵複製整月排程到其他廠區，重複的會自動略過</li>' +
      '<li>支援匯入 / 匯出（CSV 與 JSON），也有「會議餐匯出」功能可選日期區間</li>' +
      '<li>販賣機操作：傳送訂單資料、傳送巡捕資料（功能開發中）</li>' +
      '<li><strong>餐廳管理</strong>：可設定各餐廳的供餐時段、固定公休日及不定期公休日期</li>' +
    '</ul>'
  );

  var FEATURE_COMPLAINT = (
    '<h2 class="gn-fp-h2">客訴管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li><strong>會員端</strong>：從我的訂單發起客訴，自動帶入訂單資訊；選擇類型、描述問題、可上傳照片；可查看自己所有客訴的狀態</li>' +
      '<li><strong>後台管理</strong>：' +
        '<ul>' +
          '<li>收到新客訴時會有通知提醒</li>' +
          '<li>可依據點、類型、狀態、日期篩選客訴清單</li>' +
          '<li>也可手動幫會員建立客訴</li>' +
          '<li>處理進度以步驟條呈現，可新增處理紀錄</li>' +
          '<li>補償方式可複選：折價券、退款，或同時兩者</li>' +
          '<li>退款時可設定是否扣款店家及扣款金額</li>' +
          '<li>後台回覆後會員端會收到通知</li>' +
        '</ul>' +
      '</li>' +
      '<li><strong>類型管理</strong>：可新增自訂客訴類型、改名、刪除、拖移排序</li>' +
    '</ul>'
  );

  var FEATURE_PERMISSIONS = (
    '<h2 class="gn-fp-h2">帳號管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li><strong>會員管理</strong>：查看訂餐會員清單，可搜尋、依公司 / 據點 / 狀態篩選；支援新增、編輯、凍結 / 解凍、刪除；新增時選公司後自動帶出對應據點，會員編號與註冊日期自動產生</li>' +
      '<li><strong>使用者管理</strong>：管理內部系統使用者，可指定一或多個角色；支援新增、編輯、刪除</li>' +
      '<li><strong>角色管理</strong>：' +
        '<ul>' +
          '<li>左欄列出所有角色，可新增、改名、刪除（有人在用時無法刪除）、拖移排序</li>' +
          '<li>右欄勾選各角色擁有的頁面與功能權限，儲存後會同步影響首頁儀表板的常用功能顯示</li>' +
        '</ul>' +
      '</li>' +
    '</ul>'
  );

  var FEATURE_ISSUE_ECR = (
    '<h2 class="gn-fp-h2">問題單與 ECR 請求</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>提交後會自動通知相關人員（IT 或主管），處理結果也會通知填寫人</li>' +
      '<li>支援儲存為範本，下次可快速套用常用欄位</li>' +
      '<li><strong>問題單</strong>：填寫部門、問題摘要、嚴重程度、問題類型、發生的頁面與時間、操作步驟、實際結果 vs 預期結果等，可附上截圖或錄影；IT 工程師可回填問題原因與修復方式</li>' +
      '<li><strong>問題單清單</strong>：可搜尋、依嚴重度與狀態篩選，顯示各狀態數量（待處理、處理中、已解決）</li>' +
      '<li><strong>ECR（變更請求）</strong>：填寫變更標題、類型、優先級、原因、現況說明、期望的變更結果、影響範圍與完成日期；主管可進行審核（核准 / 退回 / 需討論）</li>' +
      '<li><strong>ECR 清單</strong>：可搜尋、依優先級與狀態篩選；狀態包含草稿、待審核、已核准、實施中、已完成等</li>' +
      '<li><strong>變更類型管理</strong>：可新增自訂 ECR 變更類型、改名、刪除、拖移排序</li>' +
    '</ul>'
  );

  var FEATURE_STORE_MENU = (
    '<h2 class="gn-fp-h2">店家後台 — 餐點管理</h2>' +
    '<ul class="gn-fp-list">' +
      '<li>查看自家品項清單，分為「販售中」、「待審核」、「下架」三個頁籤</li>' +
      '<li>支援清單與圖片兩種檢視方式，圖片可點擊放大</li>' +
      '<li><strong>申請變更</strong>：可申請修改餐點名稱、介紹、圖片、店內價，送出後由採購部審核</li>' +
      '<li>可申請新增品項</li>' +
      '<li>可透過上傳實體菜單照片的方式申請異動</li>' +
      '<li>任何異動申請送出後會通知營運；審核通過或退回後也會通知營運</li>' +
      '<li>審核退回時會在待審核頁籤顯示退回原因，可直接點擊「編輯」重新送出</li>' +
    '</ul>'
  );

  /* ── 根據目前頁面取得對應章節 HTML ────────── */
  function getFeatureContent(pageInfo) {
    var file = pageInfo.file;
    var sys  = pageInfo.sys;
    if (file === 'index.html') return null;
    if (file === 'purchasing-home.html') return null;
    if (file === 'editorial-home.html') return null;
    if (file === 'home.html') return FEATURE_HOME;
    if (file === 'announcement.html') return (sys === 'store') ? FEATURE_STORE_ANN : FEATURE_ANNOUNCEMENT;
    if (file === 'menu-items.html') return FEATURE_MENU_ITEMS;
    if (file === 'price-change-log.html') return FEATURE_PRICE_LOG;
    if (file === 'change-review.html') return FEATURE_CHANGE_REVIEW;
    if (file === 'menu-schedule.html') return FEATURE_SCHEDULE;
    if (file === 'complaint.html') return FEATURE_COMPLAINT;
    if (file === 'permissions.html') return FEATURE_PERMISSIONS;
    if (file === 'issue-and-ecr.html') return FEATURE_ISSUE_ECR;
    if (file === 'store-menu.html') return FEATURE_STORE_MENU;
    return null;
  }

  /* ── 建構 HTML ────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildTopbar(activeSystem, featureContent) {
    var tabs = NAV_CONFIG.systems.map(function (sys) {
      var cls = 'gn-system-tab' + (sys.id === activeSystem.id ? ' gn-active' : '');
      return '<a class="' + cls + '" href="' + esc(sys.defaultUrl) + '">' + esc(sys.label) + '</a>';
    }).join('');

    var featureBtn = featureContent
      ? '<button class="gn-feature-btn" onclick="gnFeaturePanelToggle()" title="功能需求清單">&#x1F4CB; 功能清單</button>'
      : '';

    return (
      '<nav class="gn-topbar" id="gn-topbar">' +
        '<button class="gn-hamburger" id="gn-hamburger" onclick="gnNavToggle()" aria-label="開啟選單">&#9776;</button>' +
        '<a class="gn-logo" href="index.html">&#x1F371; Demo Sites</a>' +
        '<div class="gn-systems">' + tabs + '</div>' +
        '<button class="gn-reset-btn" onclick="gnResetData()" title="重製所有資料">重製資料</button>' +
        featureBtn +
      '</nav>'
    );
  }

  function buildFeaturePanel(featureContent) {
    if (!featureContent) return '';
    return (
      '<div class="gn-feature-panel" id="gn-feature-panel">' +
        '<div class="gn-feature-panel-header">' +
          '<span class="gn-feature-panel-title">&#x1F4CB; 功能需求</span>' +
          '<button class="gn-feature-panel-close" onclick="gnFeaturePanelClose()" aria-label="關閉">&#x2715;</button>' +
        '</div>' +
        '<div class="gn-feature-panel-body">' + featureContent + '</div>' +
      '</div>'
    );
  }

  function buildSidebar(activeSystem, activePage) {
    var pageInfo = getPageInfo();
    var activeTab = new URLSearchParams(window.location.search).get('tab');
    var openGroups = getOpenGroups();
    var items = activeSystem.pages.map(function (pg) {
      if (pg.group) {
        var isGroupActive = pg.match(pageInfo);
        /* 當前頁在此群組 → 強制展開；否則以 sessionStorage 記憶為準 */
        var isOpen = isGroupActive || openGroups[pg.label] === true;
        var headerCls = 'gn-nav-group-header' + (isOpen ? ' gn-open' : '');
        var childrenCls = 'gn-nav-group-items' + (isOpen ? ' gn-open' : '');
        var children = pg.children.filter(function (ch) { return !ch.hidden; }).map(function (ch) {
          var isActive = isGroupActive && (ch.match ? ch.match(pageInfo) : activeTab === ch.tab);
          var cls = 'gn-nav-child-item' + (isActive ? ' gn-active' : '');
          var clickAttr = ch.tab ? ' onclick="gnTabClick(event,\'' + esc(ch.tab) + '\')"' : '';
          return '<a class="' + cls + '" href="' + esc(ch.url) + '"' + clickAttr + '>' + esc(ch.label) + '</a>';
        }).join('');
        return (
          '<button class="' + headerCls + '" data-group="' + esc(pg.label) + '" onclick="gnGroupToggle(this)">' +
            esc(pg.label) + '<span class="gn-nav-arrow">▶</span>' +
          '</button>' +
          '<div class="' + childrenCls + '">' + children + '</div>'
        );
      }
      var cls = 'gn-nav-item' + (pg === activePage ? ' gn-active' : '');
      return '<a class="' + cls + '" href="' + esc(pg.url) + '">' + esc(pg.label) + '</a>';
    }).join('');
    return '<nav class="gn-sidebar" id="gn-sidebar">' + items + '</nav>';
  }

  function buildDrawer(activeSystem, activePage) {
    // System switcher
    var sysTabs = NAV_CONFIG.systems.map(function (sys) {
      var cls = 'gn-drawer-sys-tab' + (sys.id === activeSystem.id ? ' gn-active' : '');
      return '<a class="' + cls + '" href="' + esc(sys.defaultUrl) + '" onclick="gnNavClose()">' + esc(sys.label) + '</a>';
    }).join('');

    // Pages of active system
    var pageInfo2 = getPageInfo();
    var activeTab2 = new URLSearchParams(window.location.search).get('tab');
    var openGroups2 = getOpenGroups();
    var pages = activeSystem.pages.map(function (pg) {
      if (pg.group) {
        var isGroupActive = pg.match(pageInfo2);
        var isOpen2 = isGroupActive || openGroups2[pg.label] === true;
        var headerCls = 'gn-drawer-group-header' + (isOpen2 ? ' gn-open' : '');
        var childrenCls = 'gn-drawer-group-items' + (isOpen2 ? ' gn-open' : '');
        var children = pg.children.filter(function (ch) { return !ch.hidden; }).map(function (ch) {
          var isActive = isGroupActive && (ch.match ? ch.match(pageInfo2) : activeTab2 === ch.tab);
          var cls = 'gn-drawer-child-item' + (isActive ? ' gn-active' : '');
          return '<a class="' + cls + '" href="' + esc(ch.url) + '" onclick="gnNavClose()">' + esc(ch.label) + '</a>';
        }).join('');
        return (
          '<button class="' + headerCls + '" data-group="' + esc(pg.label) + '" onclick="gnGroupToggle(this)">' +
            esc(pg.label) + '<span class="gn-nav-arrow">▶</span>' +
          '</button>' +
          '<div class="' + childrenCls + '">' + children + '</div>'
        );
      }
      var cls = 'gn-drawer-nav-item' + (pg === activePage ? ' gn-active' : '');
      return '<a class="' + cls + '" href="' + esc(pg.url) + '" onclick="gnNavClose()">' + esc(pg.label) + '</a>';
    }).join('');

    return (
      '<div class="gn-drawer" id="gn-drawer">' +
        '<div class="gn-drawer-systems">' + sysTabs + '</div>' +
        '<div class="gn-drawer-pages">' +
          '<div class="gn-drawer-page-label">頁面</div>' +
          pages +
        '</div>' +
      '</div>'
    );
  }

  /* ── 注入 Body Padding ───────────────────── */
  function injectBodyStyle(hasSidebar) {
    if (document.getElementById('gn-body-style')) return; /* 已注入則跳過 */
    var style = document.createElement('style');
    style.id = 'gn-body-style';
    style.textContent = [
      'body {',
      '  padding-top: 48px !important;',
      hasSidebar ? '  padding-left: 200px !important;' : '',
      '}',
      '@media (max-width: 768px) {',
      '  body { padding-left: 0 !important; }',
      '}'
    ].filter(Boolean).join('\n');
    document.head.appendChild(style);
  }

  /* ── 注入 Nav ─────────────────────────────── */
  function injectNav() {
    var pageInfo = getPageInfo();
    var active = detectActive(pageInfo);
    var activeSystem = active.system;
    var activePage = active.page;
    var hasSidebar = activeSystem.id === 'internal' || activeSystem.id === 'frontend' || activeSystem.id === 'store';
    var featureContent = getFeatureContent(pageInfo);

    var html = buildTopbar(activeSystem, featureContent);
    if (hasSidebar) {
      html += buildSidebar(activeSystem, activePage);
    }
    html += buildDrawer(activeSystem, activePage);
    html += buildFeaturePanel(featureContent);
    html += '<div class="gn-overlay" id="gn-overlay" onclick="gnOverlayClick()"></div>';

    var root = document.createElement('div');
    root.id = 'gn-root';
    root.innerHTML = html;
    document.body.insertBefore(root, document.body.firstChild);

    injectBodyStyle(hasSidebar);
  }

  /* ── Hamburger 控制 ──────────────────────── */
  window.gnNavToggle = function () {
    var drawer = document.getElementById('gn-drawer');
    var overlay = document.getElementById('gn-overlay');
    if (!drawer) return;
    var isOpen = drawer.classList.contains('gn-open');
    if (isOpen) {
      drawer.classList.remove('gn-open');
      if (overlay) overlay.classList.remove('gn-open');
    } else {
      drawer.classList.add('gn-open');
      if (overlay) overlay.classList.add('gn-open');
    }
  };

  window.gnGroupToggle = function (header) {
    var items = header.nextElementSibling;
    var isOpen = header.classList.contains('gn-open');
    var groupLabel = header.getAttribute('data-group') || '';
    if (isOpen) {
      header.classList.remove('gn-open');
      if (items) items.classList.remove('gn-open');
      setGroupOpen(groupLabel, false);
    } else {
      header.classList.add('gn-open');
      if (items) items.classList.add('gn-open');
      setGroupOpen(groupLabel, true);
    }
  };

  window.gnTabClick = function (e, tab) {
    var linkHref = e.currentTarget ? e.currentTarget.getAttribute('href') : '';
    var linkFile = linkHref ? linkHref.split('?')[0].split('/').pop() : '';
    var curFile  = window.location.pathname.split('/').pop() || 'index.html';
    var onSamePage = linkFile === curFile;
    if (onSamePage && typeof switchTab === 'function') {
      e.preventDefault();
      switchTab(tab);
      // 更新 URL 不重新載入
      var url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      history.replaceState(null, '', url.toString());
      // 更新側邊欄 active 狀態
      document.querySelectorAll('.gn-nav-child-item').forEach(function (el) {
        el.classList.remove('gn-active');
        if (el.getAttribute('href') && el.getAttribute('href').indexOf('tab=' + tab) !== -1) {
          el.classList.add('gn-active');
        }
      });
    }
  };

  window.gnNavClose = function () {
    var drawer = document.getElementById('gn-drawer');
    var overlay = document.getElementById('gn-overlay');
    if (drawer) drawer.classList.remove('gn-open');
    if (overlay) overlay.classList.remove('gn-open');
  };

  /* ── 初始化 ──────────────────────────────── */
  /* 提前同步注入 body 樣式，防止頁面載入時閃爍位移 */
  (function () {
    var _info = getPageInfo();
    var _active = detectActive(_info);
    var _hasSidebar = _active.system.id === 'internal' || _active.system.id === 'frontend' || _active.system.id === 'store';
    injectBodyStyle(_hasSidebar);
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    injectNav();
  }

})();

function gnResetData() {
  sessionStorage.clear();
  location.reload();
}

window.gnOverlayClick = function () {
  var panel = document.getElementById('gn-feature-panel');
  if (panel && panel.classList.contains('gn-open')) {
    gnFeaturePanelClose();
  } else {
    gnNavClose();
  }
};

window.gnFeaturePanelToggle = function () {
  var panel = document.getElementById('gn-feature-panel');
  var overlay = document.getElementById('gn-overlay');
  if (!panel) return;
  if (panel.classList.contains('gn-open')) {
    panel.classList.remove('gn-open');
    if (overlay) overlay.classList.remove('gn-open');
  } else {
    gnNavClose();
    panel.classList.add('gn-open');
    if (overlay) overlay.classList.add('gn-open');
  }
};

window.gnFeaturePanelClose = function () {
  var panel = document.getElementById('gn-feature-panel');
  var overlay = document.getElementById('gn-overlay');
  if (panel) panel.classList.remove('gn-open');
  if (overlay) overlay.classList.remove('gn-open');
};
