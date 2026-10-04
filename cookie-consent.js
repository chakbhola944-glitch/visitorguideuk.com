/* =========================================================
   Visitor Guide UK — Cookie Consent + Auto Attribution + AdSense
   ========================================================= */
(function(){
  "use strict";

  var STORAGE_KEY = "vguk_cookie_consent";
  var ADSENSE_CLIENT = "ca-pub-4810324099223465";

  /* =========================================================
     1) COOKIE CONSENT BANNER
     ========================================================= */
  function getConsent(){
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }
  function setConsent(value){
    try { localStorage.setItem(STORAGE_KEY, value); } catch(e){}
  }

  function showBanner(){
    if (getConsent()) return;

    var banner = document.createElement("div");
    banner.id = "vguk-cookie-banner";
    banner.innerHTML =
      '<div style="max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">' +
        '<div style="flex:1; min-width:240px;">' +
          '<strong style="display:block; font-family:Georgia,serif; font-size:15px; color:#fff; margin-bottom:4px;">We use cookies</strong>' +
          '<span style="font-size:13px; color:#C7D0DE; line-height:1.5;">We use cookies to analyse site traffic and to show relevant ads. See our <a href="/legal/cookie-policy.html" style="color:#E7C7C4; text-decoration:underline;">Cookie Policy</a>.</span>' +
        '</div>' +
        '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
          '<button id="vguk-cookie-accept" style="padding:10px 22px; border-radius:100px; border:none; background:#B23A32; color:#fff; font-weight:600; font-size:13.5px; cursor:pointer;">Accept</button>' +
          '<button id="vguk-cookie-decline" style="padding:10px 22px; border-radius:100px; border:1px solid rgba(255,255,255,.4); background:transparent; color:#fff; font-weight:600; font-size:13.5px; cursor:pointer;">Decline</button>' +
        '</div>' +
      '</div>';

    banner.style.cssText =
      "position:fixed; bottom:0; left:0; right:0; background:#0B1B33; padding:18px 20px; " +
      "z-index:9999; box-shadow:0 -4px 20px rgba(0,0,0,.3); " +
      "font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;";

    document.body.appendChild(banner);

    document.getElementById("vguk-cookie-accept").addEventListener("click", function(){
      setConsent("accepted");
      banner.remove();
      if (window.gtag){
        window.gtag("consent", "update", {
          "ad_storage": "granted",
          "ad_user_data": "granted",
          "ad_personalization": "granted",
          "analytics_storage": "granted"
        });
      }
      loadAdSense();
    });

    document.getElementById("vguk-cookie-decline").addEventListener("click", function(){
      setConsent("denied");
      banner.remove();
    });
  }

  /* =========================================================
     2) ADSENSE LOADER (صرف اجازت کے بعد)
     ========================================================= */
  var adsenseLoaded = false;
  function loadAdSense(){
    if (adsenseLoaded) return;
    if (getConsent() !== "accepted") return;
    adsenseLoaded = true;

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADSENSE_CLIENT;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }

  /* =========================================================
     3) AUTO ATTRIBUTION (Wikimedia Commons)
     ========================================================= */
  function addAttribution(){
    var footers = document.querySelectorAll(".footer-bottom");
    footers.forEach(function(footer){
      if (footer.querySelector(".vguk-attribution")) return;
      var span = document.createElement("span");
      span.className = "vguk-attribution";
      span.innerHTML = 'Images via <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener" style="color:#93A1B7; text-decoration:underline;">Wikimedia Commons</a> (CC BY-SA)';
      footer.appendChild(span);
    });
  }

  /* =========================================================
     4) INIT
     ========================================================= */
  function init(){
    showBanner();
    addAttribution();

    // اگر صارف نے پہلے اجازت دی ہے تو AdSense لوڈ کریں
    if (getConsent() === "accepted"){
      loadAdSense();
    }

    // Dynamic pages کے لیے
    var observer = new MutationObserver(function(){
      addAttribution();
    });
    if (document.body){
      observer.observe(document.body, { childList: true, subtree: true });
    }

    setTimeout(addAttribution, 3000);
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
