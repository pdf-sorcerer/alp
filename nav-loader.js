// nav-loader.js — inlined nav, no fetch
// Usage: <script src="nav-loader.js" data-page="pagename" data-title="Page Title"></script>
(function () {

  const BANNER_ACTIVE = false;
  const BANNER_MESSAGE = "Work in progress.";

  if (BANNER_ACTIVE) {
    const banner = document.createElement('div');
    banner.id = 'site-banner';
    banner.innerHTML = BANNER_MESSAGE;
    const s = document.createElement('style');
    s.textContent = `#site-banner{position:fixed;top:0;left:0;width:100%;z-index:9999;background:#FF6B00;padding:9px 28px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#fff;}body{padding-top:38px!important;}`;
    document.head.appendChild(s);
    document.body.insertBefore(banner, document.body.firstChild);
  }

  const NAV_HTML = `
<div class="nav-logo">ALL-LLLM POD</div>
<div class="nav-section-label">Pages</div>
<a href="https://pdf-sorcerer.github.io/alp/welcome.html" class="nav-item" data-page="welcome">1. Welcome</a>
<a href="https://pdf-sorcerer.github.io/alp/architecture.html" class="nav-item" data-page="architecture">2. Architecture</a>
<a href="https://pdf-sorcerer.github.io/alp/metrics.html" class="nav-item" data-page="performance">3. Model Performance</a>
<a href="https://pdf-sorcerer.github.io/alp/about.html" class="nav-item" data-page="about">4. About</a>
<a href="https://pdf-sorcerer.github.io/alp/uix.html" class="nav-item" data-page="uix">5. UiX</a>
<div class="nav-section-label">Side Quests</div>
<a href="https://pdf-sorcerer.github.io/alp/clownfish.html" class="nav-item" data-page="clownfish">• Speaker labeling</a>
<a href="https://pdf-sorcerer.github.io/alp/heuristics.html" class="nav-item" data-page="heuristics">• Transcript Forensics</a>
<a href="https://pdf-sorcerer.github.io/alp/chasing_ghosts.html" class="nav-item" data-page="chasing-ghosts">• Ghost Audio</a>
<a href="https://pdf-sorcerer.github.io/alp/arguments.html" class="nav-item" data-page="argument_pipeline">• Argument Pipeline</a>
`;

  const style = document.createElement('style');
  style.textContent = `
    /* ── STICKY TOP BAR (mobile + desktop) ── */
    #nav-topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 44px;
      background: #ffffff;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 10003;
    }

    #nav-topbar-title {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1a1a1a;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60%;
    }

    #nav-topbar-logo {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0A84FF;
      text-decoration: none;
    }

    #nav-hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: transparent;
      border: 1px solid #e4e4e4;
      border-radius: 6px;
      cursor: pointer;
      flex-shrink: 0;
    }

    #nav-hamburger span {
      display: block;
      width: 14px;
      height: 2px;
      background: #1a1a1a;
      border-radius: 2px;
      position: relative;
    }

    #nav-hamburger span::before,
    #nav-hamburger span::after {
      content: '';
      display: block;
      width: 14px;
      height: 2px;
      background: #1a1a1a;
      border-radius: 2px;
      position: absolute;
      left: 0;
    }

    #nav-hamburger span::before { top: -5px; }
    #nav-hamburger span::after  { top: 5px; }

    /* push body down to clear topbar */
    body { padding-top: 44px; }

    /* ── DESKTOP NAV ── */
    #shared-nav {
      position: sticky;
      top: 44px;
      height: calc(100vh - 44px);
      width: 220px;
      flex-shrink: 0;
      background: #ffffff;
      border-right: 1px solid #e4e4e4;
      display: flex;
      flex-direction: column;
      padding: 32px 0;
      overflow-y: auto;
    }

    #shared-nav .nav-logo {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0A84FF;
      padding: 0 24px 28px;
      border-bottom: 1px solid #e4e4e4;
    }

    #shared-nav .nav-section-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #8c8c8c;
      padding: 18px 24px 8px;
    }

    #shared-nav .nav-item {
      display: block;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #6b6b6b;
      text-decoration: none;
      padding: 7px 24px;
      border-left: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s, background 0.15s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #shared-nav .nav-item:hover {
      color: #1a1a1a;
      background: #f9f9f9;
      border-left-color: #e4e4e4;
    }

    #shared-nav .nav-item.active {
      color: #0A84FF;
      border-left-color: #0A84FF;
      background: rgba(10,132,255,0.12);
    }

    /* ── GLOBAL ACCORDIONS ── */
    .accordion-block {
      max-width: 760px;
      margin: 28px 0 36px;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      overflow: hidden;
      background: #ffffff;
    }

    .accordion-block summary {
      cursor: pointer;
      padding: 12px 16px;
      list-style: none;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0A84FF;
      background: transparent;
      border-bottom: 1px solid #e4e4e4;
    }

    .accordion-block summary::-webkit-details-marker { display: none; }
    .accordion-block summary::before { content: "▸"; margin-right: 8px; color: #0A84FF; }
    .accordion-block[open] summary::before { content: "▾"; }

    /* ── MOBILE ── */
    @media (max-width: 768px) {
      #shared-nav,
      nav#shared-nav {
        display: flex !important;
        position: fixed !important;
        top: 44px !important;
        left: 0 !important;
        height: calc(100vh - 44px) !important;
        width: 260px !important;
        z-index: 10001 !important;
        transform: translateX(-100%) !important;
        transition: transform 0.25s ease !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        box-shadow: 2px 0 12px rgba(0,0,0,0.12) !important;
        flex-direction: column !important;
        padding: 32px 0 !important;
        flex-shrink: 0 !important;
      }

      #shared-nav.open,
      nav#shared-nav.open {
        transform: translateX(0) !important;
      }

      #nav-overlay {
        display: none;
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 10000;
      }

      #nav-overlay.open { display: block; }

      main {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
      }

      body { overflow-x: hidden !important; }

      /* hide desktop nav logo on mobile since topbar has it */
      #shared-nav .nav-logo { display: none; }
    }

    /* ── DESKTOP: hide hamburger, topbar still shows title ── */
    @media (min-width: 769px) {
      #nav-hamburger { display: none !important; }
      #nav-overlay { display: none !important; }
      #nav-topbar-logo { display: none; }
    }
  `;
  document.head.appendChild(style);

  const script = document.currentScript;
  const currentPage = script ? script.getAttribute('data-page') : null;
  const dataTitle = script ? script.getAttribute('data-title') : null;

  // resolve page title: data-title > <title> tag > fallback
  const rawTitle = dataTitle || document.title || 'ALL-LLLM POD';
  // strip site prefix like "ALL-LLLM POD | " for cleaner display
  const displayTitle = rawTitle.replace(/^ALL-LLLM POD\s*[\|·]\s*/i, '').trim() || 'ALL-LLLM POD';

  // ── BUILD TOPBAR ──
  const topbar = document.createElement('div');
  topbar.id = 'nav-topbar';

  const hamburger = document.createElement('button');
  hamburger.id = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span></span>';

  const titleEl = document.createElement('div');
  titleEl.id = 'nav-topbar-title';
  titleEl.textContent = displayTitle;

  const logoEl = document.createElement('a');
  logoEl.id = 'nav-topbar-logo';
  logoEl.href = 'https://pdf-sorcerer.github.io/alp/welcome.html';
  logoEl.textContent = 'ALL-LLLM POD';

  // spacer to balance hamburger on right
  const spacer = document.createElement('div');
  spacer.style.cssText = 'width:32px;flex-shrink:0;';

  topbar.appendChild(hamburger);
  topbar.appendChild(titleEl);
  topbar.appendChild(spacer);

  document.body.insertBefore(topbar, document.body.firstChild);

  // ── BUILD OVERLAY ──
  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  // ── POPULATE NAV ──
  const nav = document.getElementById('shared-nav');

  if (nav) {
    nav.innerHTML = NAV_HTML;

    if (currentPage) {
      nav.querySelectorAll('.nav-item[data-page]').forEach(function(a) {
        if (a.getAttribute('data-page') === currentPage) {
          a.classList.add('active');
        }
      });
    }

    if (window.NAV_ANCHORS && window.NAV_ANCHORS.length) {
      var label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = 'On This Page';
      nav.appendChild(label);

      window.NAV_ANCHORS.forEach(function(item) {
        var a = document.createElement('a');
        a.href = item.href;
        a.className = 'nav-item';
        a.textContent = item.label;
        nav.appendChild(a);
      });
    }
  }

  // ── NAV OPEN/CLOSE ──
  function openNav() {
    if (nav) nav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (nav) nav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function() {
    nav && nav.classList.contains('open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  if (nav) {
    nav.querySelectorAll('.nav-item').forEach(function(a) {
      a.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeNav();
  });

})();
