/* =========================================================
   Visitor Guide UK — Cookie Consent Banner
   Include on every page with:
   <script src="/cookie-consent.js" defer></script>
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "vguk_cookie_consent"; // "accepted" | "rejected"

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  // Already decided — nothing to show
  if (getConsent()) return;

  function injectStyles() {
    var css = [
      "#vguk-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;",
      "background:#0B1B33;color:#DCE3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;",
      "padding:18px 20px;box-shadow:0 -8px 30px rgba(0,0,0,.25);",
      "display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;",
      "border-top:1px solid rgba(255,255,255,.12);transform:translateY(110%);transition:transform .35s ease;}",

      "#vguk-cookie-banner.vguk-show{transform:translateY(0);}",

      "#vguk-cookie-banner .vguk-text{flex:1 1 380px;max-width:720px;font-size:13.5px;line-height:1.55;color:#DCE3EE;}",
      "#vguk-cookie-banner .vguk-text a{color:#fff;text-decoration:underline;}",

      "#vguk-cookie-banner .vguk-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;flex:0 0 auto;}",

      "#vguk-cookie-banner button{font-family:inherit;font-size:13.5px;font-weight:600;padding:10px 20px;",
      "border-radius:100px;border:1px solid transparent;cursor:pointer;transition:background .15s ease,border-color .15s ease;white-space:nowrap;}",

      "#vguk-cookie-banner .vguk-accept{background:#B23A32;color:#fff;}",
      "#vguk-cookie-banner .vguk-accept:hover{background:#96302A;}",

      "#vguk-cookie-banner .vguk-reject{background:transparent;color:#DCE3EE;border-color:rgba(255,255,255,.35);}",
      "#vguk-cookie-banner .vguk-reject:hover{border-color:#fff;color:#fff;}",

      "@media (max-width:600px){",
      "#vguk-cookie-banner{padding:16px;flex-direction:column;align-items:stretch;text-align:center;}",
      "#vguk-cookie-banner .vguk-actions{justify-content:center;}",
      "#vguk-cookie-banner button{flex:1;}",
      "}"
    ].join("");

    var style = document.createElement("style");
    style.id = "vguk-cookie-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function injectBanner() {
    var banner = document.createElement("div");
    banner.id = "vguk-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");

    banner.innerHTML =
      '<p class="vguk-text">We use cookies to run this site and, with your consent, for analytics and advertising. ' +
      'See our <a href="/legal/cookie-policy.html">Cookie Policy</a> for details.</p>' +
      '<div class="vguk-actions">' +
        '<button type="button" class="vguk-reject">Reject Non-Essential</button>' +
        '<button type="button" class="vguk-accept">Accept All</button>' +
      "</div>";

    document.body.appendChild(banner);

    // Trigger slide-up animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add("vguk-show"); });
    });

    banner.querySelector(".vguk-accept").addEventListener("click", function () {
      setConsent("accepted");
      updateGoogleConsent("granted");
      hideBanner(banner);
    });
    banner.querySelector(".vguk-reject").addEventListener("click", function () {
      setConsent("rejected");
      updateGoogleConsent("denied");
      hideBanner(banner);
    });
  }

  function updateGoogleConsent(state) {
    if (typeof window.gtag !== "function") return;
    window.gtag("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state
    });
  }

  function hideBanner(banner) {
    banner.classList.remove("vguk-show");
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
  }

  function init() {
    injectStyles();
    injectBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
