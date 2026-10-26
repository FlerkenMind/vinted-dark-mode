// ==UserScript==
// @name         Vinted Dark Mode
// @namespace    https://github.com/?
// @version      1.1.0
// @description  Dark mode for Vinted (all extensions)
// @author       Vous
// @include      /^https?:\/\/([a-z0-9-]+\.)?vinted\.[a-z.]+(\/.*)?$/
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'darkModeEnabled';

  const CSS = `
    @media not print {
      html {
        background: #fff !important;
        filter: invert(1) hue-rotate(180deg) !important;
      }
      img, video, canvas, iframe, embed, object,
      [style*="background-image"],
      [style*="background: url"],
      [style*="background:url"] {
        filter: invert(1) hue-rotate(180deg) !important;
      }
      [style*="background-image"] img,
      [style*="background-image"] video,
      [style*="background-image"] canvas,
      [style*="background: url"] img,
      [style*="background:url"] img {
        filter: none !important;
      }
    }
  `;

  let enabled = true;
  try { enabled = GM_getValue(STORAGE_KEY, true); } catch (e) {}

  let styleEl = null;
  let sheet = null;

  function inject() {
    if (typeof GM_addStyle === 'function') {
      try {
        const el = GM_addStyle(CSS);
        if (el) { styleEl = el; return; }
      } catch (e) {}
    }
    try {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      return;
    } catch (e) {}
    styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    (document.head || document.documentElement).appendChild(styleEl);
  }

  function remove() {
    if (styleEl) { styleEl.remove(); styleEl = null; }
    if (sheet) {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet);
      sheet = null;
    }
  }

  function apply() {
    remove();
    if (enabled) inject();
  }

  function toggle() {
    enabled = !enabled;
    try { GM_setValue(STORAGE_KEY, enabled); } catch (e) {}
    apply();
  }

  apply();
  console.log('[Vinted Dark Mode] loaded, ON :', enabled);
  new MutationObserver(() => {
    if (enabled && styleEl && !styleEl.isConnected) apply();
  }).observe(document, { childList: true, subtree: true });

  try { GM_registerMenuCommand('Turn ON / off dark mode', toggle); } catch (e) {}

  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.code === 'KeyD') {
      e.preventDefault();
      toggle();
    }
  });
})();
