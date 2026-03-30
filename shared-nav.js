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
        defaultUrl: 'purchasing-home.html',
        pages: [
          {
            label: '首頁&公告',
            url: 'announcement.html?view=admin&page=notify',
            match: function (p) {
              return p.file === 'announcement.html' && p.view === 'admin' && p.page !== 'manage' && p.sys !== 'store';
            }
          },
          {
            label: '公告管理',
            url: 'announcement.html?view=admin&page=manage',
            _exactMatch: true,
            match: function (p) {
              return p.file === 'announcement.html' && p.view === 'admin' && p.page === 'manage' && p.sys !== 'store';
            }
          },
          {
            label: '採購首頁',
            url: 'purchasing-home.html',
            match: function (p) { return p.file === 'purchasing-home.html'; }
          },
          {
            label: '餐點管理',
            url: 'menu-items.html',
            match: function (p) { return p.file === 'menu-items.html'; }
          },
          {
            label: '餐點異動紀錄',
            url: 'price-change-log.html',
            match: function (p) { return p.file === 'price-change-log.html'; }
          },
          {
            label: '店家異動審核',
            url: 'change-review.html',
            match: function (p) { return p.file === 'change-review.html'; }
          },
          {
            label: '客訴管理',
            url: 'complaint.html?mode=admin',
            match: function (p) { return p.file === 'complaint.html' && p.mode === 'admin'; }
          },
          {
            label: '問題單&ECR',
            url: 'issue-and-ecr.html',
            match: function (p) { return p.file === 'issue-and-ecr.html'; }
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

  /* ── 建構 HTML ────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildTopbar(activeSystem) {
    var tabs = NAV_CONFIG.systems.map(function (sys) {
      var cls = 'gn-system-tab' + (sys.id === activeSystem.id ? ' gn-active' : '');
      return '<a class="' + cls + '" href="' + esc(sys.defaultUrl) + '">' + esc(sys.label) + '</a>';
    }).join('');

    return (
      '<nav class="gn-topbar" id="gn-topbar">' +
        '<button class="gn-hamburger" id="gn-hamburger" onclick="gnNavToggle()" aria-label="開啟選單">&#9776;</button>' +
        '<a class="gn-logo" href="index.html">&#x1F371; Demo Sites</a>' +
        '<div class="gn-systems">' + tabs + '</div>' +
      '</nav>'
    );
  }

  function buildSidebar(activeSystem, activePage) {
    var items = activeSystem.pages.map(function (pg) {
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
    var pages = activeSystem.pages.map(function (pg) {
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

    var html = buildTopbar(activeSystem);
    if (hasSidebar) {
      html += buildSidebar(activeSystem, activePage);
    }
    html += buildDrawer(activeSystem, activePage);
    html += '<div class="gn-overlay" id="gn-overlay" onclick="gnNavClose()"></div>';

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

  window.gnNavClose = function () {
    var drawer = document.getElementById('gn-drawer');
    var overlay = document.getElementById('gn-overlay');
    if (drawer) drawer.classList.remove('gn-open');
    if (overlay) overlay.classList.remove('gn-open');
  };

  /* ── 初始化 ──────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    injectNav();
  }

})();
