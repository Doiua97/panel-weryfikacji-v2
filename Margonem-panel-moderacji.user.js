// ==UserScript==
// @name         Margonem — Centrum Moderacji v2
// @namespace    https://github.com/Doiua97/panel-moderacji-weryfikacji
// @version      3.5.0
// @description  Lokalne centrum moderacji i dokumentowania weryfikacji w Margonem.
// @author       Doiua
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://margonem.pl/*
// @exclude      https://www.margonem.pl/*
// @exclude      https://new.margonem.pl/*
// @exclude      https://forum.margonem.pl/*
// @exclude      https://commons.margonem.pl/*
// @exclude      https://dev-commons.margonem.pl/*
// @exclude      https://margonem.com/*
// @exclude      https://www.margonem.com/*
// @run-at       document-idle
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      github.com
// @connect      www.margonem.pl
// @connect      www.margonem.com
// @downloadURL  https://github.com/Doiua97/panel-weryfikacji-v2/raw/refs/heads/main/Margonem-panel-moderacji.user.js
// @updateURL    https://github.com/Doiua97/panel-weryfikacji-v2/raw/refs/heads/main/Margonem-panel-moderacji.user.js
// ==/UserScript==

(async () => {
  const base = "https://github.com/Doiua97/panel-weryfikacji-v2/raw/refs/heads/main/src";
  const version = GM_info.script.version;

  const get = url => new Promise((resolve, reject) =>
    GM_xmlhttpRequest({
      method: "GET",
      url: `${url}?v=${version}`,
      onload: r => r.status < 400 ? resolve(r.responseText) : reject(new Error(`HTTP ${r.status}`)),
      onerror: reject
    })
  );

  try {
    const style = document.createElement("style");
    style.id = "margo-moderation-center-styles";
    style.textContent = await get(`${base}/panel.css`);
    document.head.appendChild(style);

    const js = await get(`${base}/panel.js`);
    new Function("GM_xmlhttpRequest", "unsafeWindow", "version", js)(
      GM_xmlhttpRequest,
      unsafeWindow,
      version
    );
  } catch (error) {
    console.error("[Centrum Moderacji]", error);
  }
})();
