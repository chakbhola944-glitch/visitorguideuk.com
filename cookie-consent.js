/* =========================================================
   Visitor Guide UK — Cookie Consent + Attribution + AdSense + Auto Menu + Editorial Policy
   ========================================================= */
(function(){
  "use strict";

  var STORAGE_KEY = "vguk_cookie_consent";
  var ADSENSE_CLIENT = "ca-pub-4810324099223465";

  /* تمام ٹولز کی مکمل لسٹ */
  var ALL_TOOLS = [
    { href:"/travel/trip-cost-calculator.html", label:"Trip Cost Calculator" },
    { href:"/travel/hotel-cost-estimator.html", label:"Hotel Cost Estimator" },
    { href:"/travel/bucket-list.html", label:"UK Bucket List" },
    { href:"/travel/route-planner.html", label:"Route Planner" },
    { href:"/travel/journey-time-calculator.html", label:"Journey Time Calculator" },
    { href:"/travel/journey-cost-estimator.html", label:"Journey Cost Estimator" },
    { href:"/travel/train-ticket-price-calculator.html", label:"Train Ticket Prices" },
    { href:"/travel/tipping-calculator.html", label:"Tipping Calculator" },
    { href:"/travel/sim-esim-finder.html", label:"SIM & eSIM Finder" },
    { href:"/travel/uk-weather-by-month.html", label:"Weather by Month" },
    { href:"/travel/uk-weather.html", label:"UK Weather Guide" },
    { href:"/travel/itinerary-generator.html", label:"Itinerary Generator" },
    { href:"/travel/packing-list-generator.html", label:"Packing List Generator" },
    { href:"/travel/bank-holidays.html", label:"Bank Holidays" },
    { href:"/travel/free-museums-map.html", label:"Free Museums Map" },
    { href:"/travel/uk-time-now.html", label:"UK Time & Weather" },
    { href:"/travel/visa-eta-checker.html", label:"Visa & ETA Checker" }
  ];

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
    banner.style.cssText = "position:fixed; bottom:0; left:0; right:0; background:#0B1B33; padding:18px 20px; z-index:9999; box-shadow:0 -4px 20px rgba(0,0,0,.3); font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;";
    document.body.appendChild(banner);

    document.getElementById("vguk-cookie-accept").addEventListener("click", function(){
      setConsent("accepted");
      banner.remove();
      if (window.gtag){
        window.gtag("consent", "update", {
          "ad_storage": "granted", "ad_user_data": "granted",
          "ad_personalization": "granted", "analytics_storage": "granted"
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
     2) ADSENSE LOADER
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
    document.querySelectorAll(".footer-bottom").forEach(function(footer){
      if (footer.querySelector(".vguk-attribution")) return;
      var span = document.createElement("span");
      span.className = "vguk-attribution";
      span.innerHTML = 'Images via <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener" style="color:#93A1B7; text-decoration:underline;">Wikimedia Commons</a> (CC BY-SA)';
      footer.appendChild(span);
    });
  }

  /* =========================================================
     4) MOBILE MENU SCROLL FIX
     ========================================================= */
  function fixMobileNav(){
    var mobileNav = document.getElementById("mobileNav");
    if (!mobileNav) return;
    mobileNav.style.overflowY = "auto";
    mobileNav.style.maxHeight = "100vh";
    mobileNav.style.webkitOverflowScrolling = "touch";
  }

  /* =========================================================
     5) AUTO-INJECT ALL TOOL LINKS
     ========================================================= */
  function injectToolLinks(){
    // ڈیسک ٹاپ Tools مینو
    document.querySelectorAll(".nav-dropdown-menu").forEach(function(menu){
      ALL_TOOLS.forEach(function(tool){
        if (menu.querySelector('a[href="' + tool.href + '"]')) return;
        var newLink = document.createElement("a");
        newLink.href = tool.href;
        newLink.textContent = tool.label;
        menu.appendChild(newLink);
      });
    });

    // موبائل مینو — تمام Tools
    document.querySelectorAll(".mobile-nav nav").forEach(function(nav){
      var existingHrefs = [];
      nav.querySelectorAll("a").forEach(function(a){
        var h = a.getAttribute("href");
        if (h) existingHrefs.push(h);
      });

      var hasToolsHeader = false;
      nav.querySelectorAll("p").forEach(function(p){
        if (p.textContent.trim() === "Tools") hasToolsHeader = true;
      });
      if (!hasToolsHeader){
        var toolsHeader = document.createElement("p");
        toolsHeader.style.cssText = "font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:#8FA0BD; margin:20px 0 4px;";
        toolsHeader.textContent = "Tools";
        nav.appendChild(toolsHeader);
      }

      ALL_TOOLS.forEach(function(tool){
        if (existingHrefs.indexOf(tool.href) !== -1) return;
        var newLink = document.createElement("a");
        newLink.href = tool.href;
        newLink.textContent = tool.label;
        newLink.className = "mnav-link";
        newLink.style.cssText = "font-size:17px; padding:9px 0;";
        nav.appendChild(newLink);
      });
    });

    // Footer Travel Tools
    document.querySelectorAll(".footer-col").forEach(function(col){
      var heading = col.querySelector("h4");
      if (!heading || heading.textContent.trim() !== "Travel Tools") return;
      var ul = col.querySelector("ul");
      if (!ul) return;
      ALL_TOOLS.forEach(function(tool){
        if (ul.querySelector('a[href="' + tool.href + '"]')) return;
        var newLi = document.createElement("li");
        var newA = document.createElement("a");
        newA.href = tool.href;
        newA.textContent = tool.label;
        newLi.appendChild(newA);
        ul.appendChild(newLi);
      });
    });
  }

  /* =========================================================
     6) AUTO-INJECT EDITORIAL POLICY LINK
     ========================================================= */
  function injectEditorialPolicy(){
    document.querySelectorAll(".footer-col").forEach(function(col){
      var heading = col.querySelector("h4");
      if (!heading || heading.textContent.trim() !== "Company") return;
      var ul = col.querySelector("ul");
      if (!ul) return;
      if (ul.querySelector('a[href="/legal/editorial-policy.html"]')) return;
      
      var newLi = document.createElement("li");
      var newA = document.createElement("a");
      newA.href = "/legal/editorial-policy.html";
      newA.textContent = "Editorial Policy";
      newLi.appendChild(newA);
      
      var contactLink = ul.querySelector('a[href="/legal/contact.html"]');
      if (contactLink){
        var parentLi = contactLink.closest("li");
        if (parentLi && parentLi.nextSibling){
          ul.insertBefore(newLi, parentLi.nextSibling);
        } else {
          ul.appendChild(newLi);
        }
      } else {
        ul.appendChild(newLi);
      }
    });
  }

  /* =========================================================
     7) INIT
     ========================================================= */
  function init(){
    showBanner();
    addAttribution();
    fixMobileNav();
    injectToolLinks();
    injectEditorialPolicy();

    if (getConsent() === "accepted"){
      loadAdSense();
    }

    var observer = new MutationObserver(function(){
      addAttribution();
      fixMobileNav();
      injectToolLinks();
      injectEditorialPolicy();
    });
    if (document.body){
      observer.observe(document.body, { childList: true, subtree: true });
    }
    setTimeout(function(){ 
      addAttribution(); 
      fixMobileNav(); 
      injectToolLinks(); 
      injectEditorialPolicy(); 
    }, 3000);
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
