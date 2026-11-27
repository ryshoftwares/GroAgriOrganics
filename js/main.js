/* GROAGRI ORGANICS – site scripts */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var t = Lang.t, pick = Lang.pick;
  var PAGE = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- Icons ---------- */
  var I = {
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    root: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v9M12 12c-2 2-5 3-7 7M12 12c2 2 5 3 7 7M12 12v9M8 6c1.5 0 3 1 4 3 1-2 2.5-3 4-3"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></svg>',
    spray: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8h6v13H9z"/><path d="M10 8V5h4v3M14 5h3M19 3v.01M21 5v.01M19 7v.01"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.5-2.5 8-6 8-12V5l-8-3-8 3v5c0 6 2.5 9.5 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>',
    factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20V9l-6 4V9l-6 4V4H2z"/></svg>',
    plant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10M12 20v-9M12 11C12 7 9 5 5 5c0 4 3 6 7 6zM12 11c0-4 3-6 7-6 0 4-3 6-7 6z"/></svg>',
    wheat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8M12 8c-2-1-3-3-3-5 2 1 3 3 3 5zM12 8c2-1 3-3 3-5-2 1-3 3-3 5zM12 13c-2-1-4-2-4-5 2 1 4 2 4 5zM12 13c2-1 4-2 4-5-2 1-4 2-4 5zM12 18c-2-1-4-2-4-5 2 1 4 2 4 5zM12 18c2-1 4-2 4-5-2 1-4 2-4 5z"/></svg>',
    soil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14h20M4 18h16M7 22h10M12 14V6M12 9c-2 0-4-1-4-4 2 0 4 1 4 4zM12 8c2 0 4-1 4-4-2 0-4 1-4 4z"/></svg>',
    fb: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path fill="#1877F2" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><defs><radialGradient id="igGrad" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6.5" fill="url(#igGrad)"/><rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.3" cy="7.7" r="1" fill="#fff"/></svg>',
    yt: '<svg viewBox="0 0 34 24"><path fill="#FF0000" d="M33.3 3.75A4.27 4.27 0 0 0 30.3.73C27.65 0 17 0 17 0S6.35 0 3.7.73A4.27 4.27 0 0 0 .7 3.75C0 6.42 0 12 0 12s0 5.58.7 8.25a4.27 4.27 0 0 0 3 3.02C6.35 24 17 24 17 24s10.65 0 13.3-.73a4.27 4.27 0 0 0 3-3.02C34 17.58 34 12 34 12s0-5.58-.7-8.25z"/><path fill="#fff" d="M13.6 17.1V6.9l8.9 5.1z"/></svg>',
    earth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 4.5c1 2 0 3.5 1.5 4.5S13 9 13 11s-2 2-2 4 1 3 1 6M20 8c-2 0-3 1-3 3s2 2 2 4"/></svg>'
  };

  /* ---------- Shared layout ---------- */
  var NAV = [
    { href: "index.html", key: "nav.home", page: "home" },
    { href: "products.html", key: "nav.products", page: "products" },
    { href: "crop-guide.html", key: "nav.crops", page: "crops" },
    { href: "about.html", key: "nav.about", page: "about" },
    { href: "contact.html", key: "nav.contact", page: "contact" }
  ];

  function buildHeader() {
    var links = NAV.map(function (n) {
      return '<a class="nav-link' + (n.page === PAGE ? " active" : "") + '" href="' + n.href + '"' +
        (n.page === PAGE ? ' aria-current="page"' : "") + ' data-i18n="' + n.key + '"></a>';
    }).join("");
    var html =
      '<div class="scroll-progress" aria-hidden="true"></div>' +
      '<header class="site-header"><div class="container">' +
      '<a class="brand" href="index.html" aria-label="GROAGRI ORGANICS – Home"><span class="brand-badge"><img src="images/logo-tight.png" alt="GROAGRI ORGANICS" width="168" height="44"></span></a>' +
      '<nav class="nav" id="site-nav">' + links + "</nav>" +
      '<div class="header-actions">' +
      '<div class="lang-switch" role="group" data-i18n-aria="lang.label">' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>' +
      '<button type="button" data-lang="ta" aria-pressed="false" lang="ta">தமிழ்</button></div>' +
      '<a class="btn btn-gold btn-sm btn-call" href="' + COMPANY.phoneHref + '">' + I.phone + '<span data-i18n="nav.call"></span></a>' +
      '<button class="menu-toggle" type="button" aria-controls="site-nav" aria-expanded="false" data-i18n-aria="nav.menu"><span></span></button>' +
      "</div></div></header>";
    document.body.insertAdjacentHTML("afterbegin", html);

    var footer =
      '<footer class="site-footer"><div class="container footer-grid">' +
      '<div><a href="index.html" class="brand-badge"><img src="images/logo-tight.png" alt="GROAGRI ORGANICS" style="height:46px;width:auto"></a>' +
      '<p data-i18n="footer.about"></p>' +
      '<div class="socials">' +
      '<a class="s-fb" href="https://www.facebook.com/groagriorganics" target="_blank" rel="noopener" aria-label="Facebook">' + I.fb + '</a>' +
      '<a class="s-ig" href="https://www.instagram.com/groagriorganics" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + '</a>' +
      '<a class="s-yt" href="https://www.youtube.com/@groagriorganics" target="_blank" rel="noopener" aria-label="YouTube">' + I.yt + '</a>' +
      '</div></div>' +
      '<div><h4 data-i18n="footer.links"></h4><ul>' +
      NAV.map(function (n) { return '<li><a href="' + n.href + '" data-i18n="' + n.key + '"></a></li>'; }).join("") +
      "</ul></div>" +
      '<div><h4 data-i18n="footer.products"></h4><ul>' +
      PRODUCTS.map(function (p) { return '<li><a href="' + productUrl(p) + '">' + esc(p.name) + "</a></li>"; }).join("") +
      "</ul></div>" +
      '<div><h4 data-i18n="footer.contact"></h4><ul>' +
      '<li data-i18n-html="contact.addressVal"></li>' +
      '<li><a href="' + COMPANY.phoneHref + '">' + esc(COMPANY.phone) + "</a></li>" +
      '<li><a href="mailto:' + COMPANY.email + '">' + esc(COMPANY.email) + "</a></li>" +
      "</ul></div></div>" +
      '<div class="footer-bottom">© <span id="year"></span> GROAGRI ORGANICS. <span data-i18n="footer.rights"></span></div></footer>' +
      '<a href="https://wa.me/' + COMPANY.whatsapp + '" class="float-wa" target="_blank" rel="noopener" aria-label="WhatsApp">' + I.wa + "</a>";
    document.body.insertAdjacentHTML("beforeend", footer);
    $("#year").textContent = new Date().getFullYear();

    $all(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        if (l === Lang.get()) return;
        if (document.startViewTransition && !reduceMotion) document.startViewTransition(function () { Lang.set(l); });
        else Lang.set(l);
      });
    });

    var toggle = $(".menu-toggle");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $all(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); toggle.setAttribute("aria-expanded", "false"); });
    });

    var header = $(".site-header"), bar = $(".scroll-progress");
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 30);
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Shared bits ---------- */
  function methodLabel(p) { return t(p.method === "foliar" ? "method.foliar" : "method.soil"); }
  function doseLabel(p) { return p.dose + (Lang.get() === "ta" ? " மி.லி " : " ml ") + t("dose.per"); }
  function everyLabel(p) { return t("dose.every", { n: p.interval }); }
  function waLink(text) { return "https://wa.me/" + COMPANY.whatsapp + "?text=" + encodeURIComponent(text); }

  function packHTML(p) {
    var dir = DIRECTIONS[Lang.get()] || DIRECTIONS.en;
    var steps = dir.slice();
    if (p.method === "foliar") steps[1] = DIRECTIONS_FOLIAR[Lang.get()] || DIRECTIONS_FOLIAR.en;
    return (
      '<div class="pack" style="--c:' + p.color + ";--a:" + p.accent + '">' +
      '<div class="face front" role="img" aria-label="' + esc(p.name) + '" style="background-image:url(' + p.image + ')"></div>' +
      '<div class="face back"><div class="back-label">' +
      '<div class="bl-head">' + esc(p.name) + "</div>" +
      "<h5>" + esc(t("prod.benefits")) + "</h5><div>" + esc(pick(p.benefit)) + "</div>" +
      '<div class="bl-dose">' + esc(methodLabel(p)) + ": " + esc(doseLabel(p)) + "<br>" + esc(t("prod.interval")) + ": " + esc(everyLabel(p)) + "</div>" +
      "<h5>" + esc(t("prod.directions")) + "</h5><ol>" + steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
      '<div class="bl-foot"><b>' + esc(t("prod.mrp")) + ":</b> " + COMPANY.mrp + " " + esc(t("prod.mrpShort")) +
      "<br><b>" + esc(t("prod.netqty")) + ":</b> " + COMPANY.netQty + " · " + esc(COMPANY.web) + "</div>" +
      "</div></div>" +
      '<div class="face side right"><span>' + esc(p.name) + "<small>GROAGRI ORGANICS</small></span></div>" +
      '<div class="face side left"><span>GROAGRI<small>' + esc(p.tag.en) + "</small></span></div>" +
      '<div class="face top"></div><div class="face bottom"></div>' +
      "</div>"
    );
  }

  /* ---------- Reveal on scroll ---------- */
  var revealIO = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); revealIO.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function observeReveals(root) {
    $all(".reveal:not(.visible)", root).forEach(function (el) {
      if (revealIO) revealIO.observe(el); else el.classList.add("visible");
    });
  }

  /* ---------- 3D tilt ---------- */
  function bindTilt(root) {
    if (!finePointer || reduceMotion) return;
    $all(".tilt", root).forEach(function (el) {
      if (el._tilt) return; el._tilt = true;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = "perspective(1100px) rotateX(" + ((0.5 - y) * 10).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * 12).toFixed(2) + "deg) translateY(-6px)";
        el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Drag helper ---------- */
  function draggable(el, onMove, onEnd) {
    var down = false, lx = 0, ly = 0, moved = 0;
    el.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      down = true; moved = 0; lx = e.clientX; ly = e.clientY; el.classList.add("dragging");
    });
    addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      onMove(dx, dy);
    });
    addEventListener("pointerup", function () {
      if (!down) return; down = false; el.classList.remove("dragging"); onEnd && onEnd(moved);
    });
    return { wasDrag: function () { return moved > 6; } };
  }

  /* ---------- Hero 3D carousel ---------- */
  function initCarousel() {
    var stage = $("#stage"); if (!stage) return;
    var ring = $(".ring", stage), nameEl = $(".stage-caption .name", stage), typeEl = $(".stage-caption .type", stage), dots = $(".stage-dots", stage);
    var angle = 0, vel = 0, target = null, dragging = false, hover = false, visible = true, front = -1;
    var AUTO = reduceMotion ? 0 : -0.12;

    var slots = [], W = 196, spread = 1;
    function measure() { W = ring.offsetWidth || 196; spread = W < 170 ? 0.84 : 1; }
    function build() {
      ring.innerHTML = PRODUCTS.map(function (p, i) {
        return '<div class="slot" data-i="' + i + '"><div class="float">' + packHTML(p) + "</div></div>";
      }).join("");
      slots = $all(".slot", ring);
      measure();
      dots.innerHTML = PRODUCTS.map(function (p, i) { return '<button type="button" aria-label="' + esc(p.name) + '" data-i="' + i + '"></button>'; }).join("");
      $all("button", dots).forEach(function (b) {
        b.addEventListener("click", function () { goTo(+b.getAttribute("data-i")); });
      });
      front = -1; render();
    }
    function goTo(i) {
      var base = -i * 90, cur = angle;
      var k = Math.round((cur - base) / 360);
      target = base + k * 360;
    }
    function render() {
      var idx = ((Math.round(-angle / 90) % 4) + 4) % 4;
      // Coverflow layout: front pack centred, neighbours turned toward it, back pack faded out.
      slots.forEach(function (s, i) {
        var rel = ((i * 90 + angle) % 360 + 540) % 360 - 180;
        var t = rel / 90, a = Math.abs(t), c = Math.max(-1, Math.min(1, t));
        var x = (a <= 1 ? t : (t < 0 ? -1 : 1) * (1 + (a - 1) * 0.5)) * W * spread;
        var z = -Math.min(a, 1.6) * W * 0.8;
        var o = a <= 1 ? 1 : Math.max(0, 1 - (a - 1) / 0.55);
        s.style.transform = "translate3d(" + x.toFixed(1) + "px,0," + z.toFixed(1) + "px) rotateY(" + (-c * 34).toFixed(2) + "deg)";
        s.style.setProperty("--o", o.toFixed(3));
        s.style.pointerEvents = o < 0.2 ? "none" : "";
        s.firstChild.firstChild.style.setProperty("--shine", (50 + rel * 1.2) + "%");
      });
      if (idx !== front) {
        front = idx;
        var p = PRODUCTS[idx];
        nameEl.textContent = p.name;
        typeEl.textContent = pick(p.type);
        $all("button", dots).forEach(function (b, i) { b.setAttribute("aria-current", i === idx ? "true" : "false"); });
      }
    }
    function loop() {
      if (visible && !document.hidden) {
        if (target !== null) {
          var d = target - angle; angle += d * 0.08;
          if (Math.abs(d) < 0.1) { angle = target; target = null; }
        } else if (!dragging) {
          vel += ((hover ? 0 : AUTO) - vel) * 0.03;
          angle += vel;
        }
        render();
      }
      requestAnimationFrame(loop);
    }
    var drag = draggable(stage, function (dx) { dragging = true; target = null; vel = dx * 0.4; angle += dx * 0.4; },
      function () { dragging = false; });
    stage.addEventListener("pointerenter", function () { hover = true; });
    stage.addEventListener("pointerleave", function () { hover = false; });
    stage.addEventListener("click", function (e) {
      if (drag.wasDrag()) return;
      var slot = e.target.closest(".slot"); if (!slot) return;
      var i = +slot.getAttribute("data-i");
      if (i === front) location.href = productUrl(PRODUCTS[i]); else goTo(i);
    });
    stage.setAttribute("tabindex", "0");
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { goTo((front + 1) % 4); e.preventDefault(); }
      if (e.key === "ArrowLeft") { goTo((front + 3) % 4); e.preventDefault(); }
      if (e.key === "Enter") location.href = productUrl(PRODUCTS[front]);
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(stage);
    build();
    Lang.on(build);
    addEventListener("resize", measure);
    requestAnimationFrame(loop);
  }

  /* ---------- Particles (leaves + gold dust) ---------- */
  function initParticles() {
    var cv = $("#particles"); if (!cv || reduceMotion) return;
    var ctx = cv.getContext("2d"), dpr = Math.min(2, devicePixelRatio || 1), W, H, parts = [], running = true;
    function size() {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(initial) {
      var leaf = Math.random() < 0.32;
      return {
        leaf: leaf, x: Math.random() * W, y: initial ? Math.random() * H : (leaf ? -30 : H + 10),
        s: leaf ? 8 + Math.random() * 12 : 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.35, vy: leaf ? 0.25 + Math.random() * 0.45 : -(0.15 + Math.random() * 0.4),
        r: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.02, ph: Math.random() * 6.28,
        a: leaf ? 0.25 + Math.random() * 0.35 : 0.3 + Math.random() * 0.6,
        hue: Math.random() < 0.5 ? "#4caf50" : "#8bc34a"
      };
    }
    function init() {
      size(); var n = Math.round(Math.min(90, W * H / 16000));
      parts = []; for (var i = 0; i < n; i++) parts.push(spawn(true));
    }
    function drawLeaf(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a;
      var g = ctx.createLinearGradient(-p.s, 0, p.s, 0); g.addColorStop(0, "#1b5e20"); g.addColorStop(1, p.hue);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-p.s, 0);
      ctx.quadraticCurveTo(0, -p.s * 0.62, p.s, 0); ctx.quadraticCurveTo(0, p.s * 0.62, -p.s, 0); ctx.fill();
      ctx.strokeStyle = "rgba(225,192,106,.5)"; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(-p.s, 0); ctx.lineTo(p.s * 0.9, 0); ctx.stroke();
      ctx.restore();
    }
    function frame(time) {
      if (running && !document.hidden) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          p.ph += 0.01; p.x += p.vx + Math.sin(p.ph) * (p.leaf ? 0.5 : 0.15); p.y += p.vy; p.r += p.vr;
          if (p.leaf) drawLeaf(p);
          else {
            ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.ph * 3));
            ctx.fillStyle = "#efd994"; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
          }
          if (p.y > H + 40 || p.y < -40 || p.x < -40 || p.x > W + 40) parts[i] = spawn(false);
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(frame);
    }
    init(); addEventListener("resize", init);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { running = en[0].isIntersecting; }).observe(cv);
    requestAnimationFrame(frame);
  }

  /* ---------- Home: range cards ---------- */
  function renderRange() {
    var el = $("#range-grid"); if (!el) return;
    el.innerHTML = PRODUCTS.map(function (p, i) {
      return (
        '<a class="prod-card tilt reveal" style="--c:' + p.color + ";--a:" + p.accent + ";--rd:" + i * 0.08 + 's" href="' + productUrl(p) + '">' +
        '<div class="visual"><img src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy" width="188" height="270"></div>' +
        '<div class="body"><span class="tag">' + esc(p.tag.en) + "</span>" +
        "<h3>" + esc(p.name) + "</h3><p>" + esc(pick(p.type)) + "</p>" +
        '<div class="chips"><span class="chip">' + (p.method === "foliar" ? I.spray : I.drop) + esc(p.dose + " ml / 1 L") + "</span>" +
        '<span class="chip">' + I.clock + esc(t("dose.days", { n: p.interval })) + "</span></div>" +
        '<span class="more">' + esc(t("range.view")) + I.arrow + "</span></div></a>"
      );
    }).join("");
    observeReveals(el); bindTilt(el);
  }

  /* ---------- Home: plant explorer ---------- */
  var ZONES = { root: { p: "root-max", k: "plant.root" }, soil: { p: "grovia", k: "plant.soil" }, leaf: { p: "lf-21", k: "plant.leaf" }, nut: { p: "coco-gold", k: "plant.nut" } };
  var zoneNow = "root";
  function renderExplorer() {
    var panel = $("#explorer-panel"); if (!panel) return;
    var z = ZONES[zoneNow], p = getProduct(z.p);
    panel.style.setProperty("--c", p.color);
    panel.innerHTML =
      '<img src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy">' +
      '<div class="fade-swap"><div class="zone">' + esc(t(z.k)) + "</div><h3>" + esc(p.name) + '</h3><div class="type">' + esc(pick(p.type)) + "</div>" +
      "<p>" + esc(pick(p.benefit)) + "</p>" +
      '<div class="chips"><span class="chip">' + (p.method === "foliar" ? I.spray : I.drop) + esc(methodLabel(p)) + "</span>" +
      '<span class="chip">' + esc(p.dose + " ml / 1 L") + "</span>" +
      '<span class="chip">' + I.clock + esc(everyLabel(p)) + "</span></div>" +
      '<a class="btn btn-dark btn-sm" style="margin-top:18px" href="' + productUrl(p) + '">' + esc(t("range.view")) + I.arrow + "</a></div>";
    $all(".hotspot").forEach(function (h) { h.classList.toggle("active", h.getAttribute("data-zone") === zoneNow); });
  }
  function initExplorer() {
    if (!$("#explorer-panel")) return;
    $all(".hotspot").forEach(function (h) {
      function go() { zoneNow = h.getAttribute("data-zone"); renderExplorer(); }
      h.addEventListener("click", go);
      h.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    renderExplorer();
    Lang.on(renderExplorer);
  }

  /* ---------- Home: dosage calculator ---------- */
  var calc = { id: "root-max", litres: 15 };
  function renderCalc() {
    var root = $("#calc"); if (!root) return;
    var pickEl = $(".prod-pick", root);
    if (!pickEl.children.length) {
      pickEl.innerHTML = PRODUCTS.map(function (p) {
        return '<button type="button" data-id="' + p.id + '"><img src="' + p.image + '" alt="" loading="lazy">' + esc(p.name) + "</button>";
      }).join("");
      $all("button", pickEl).forEach(function (b) { b.addEventListener("click", function () { calc.id = b.getAttribute("data-id"); renderCalc(); }); });
    }
    $all("button", pickEl).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-id") === calc.id ? "true" : "false"); });
    var p = getProduct(calc.id), ml = Math.round(p.dose * calc.litres * 10) / 10;
    var big = ml >= 1000 ? (Math.round(ml / 100) / 10) + "<small> L</small>" : ml + "<small> " + esc(t("calc.ml")) + "</small>";
    $(".big", root).innerHTML = big;
    $(".sub", root).textContent = p.name + " · " + calc.litres + (Lang.get() === "ta" ? " லிட்டர் தண்ணீரில்" : " L water");
    $(".meta", root).innerHTML =
      '<span class="chip">' + (p.method === "foliar" ? I.spray : I.drop) + esc(methodLabel(p)) + "</span>" +
      '<span class="chip">' + I.clock + esc(everyLabel(p)) + "</span>";
  }
  function initCalc() {
    var root = $("#calc"); if (!root) return;
    var range = $("input[type=range]", root), num = $("input[type=number]", root);
    function setL(v) {
      v = Math.max(1, Math.min(1000, Math.round(+v || 1)));
      calc.litres = v; range.value = Math.min(v, +range.max); num.value = v; renderCalc();
    }
    range.addEventListener("input", function () { setL(range.value); });
    num.addEventListener("input", function () { if (num.value !== "") setL(num.value); });
    $all(".quick button", root).forEach(function (b) { b.addEventListener("click", function () { setL(b.getAttribute("data-l")); }); });
    setL(calc.litres);
    Lang.on(renderCalc);
  }

  /* ---------- Home: crop strip ---------- */
  function renderCropStrip() {
    var el = $("#crop-strip"); if (!el) return;
    var items = CROPS.map(function (c) {
      return '<a class="crop-pill" href="crop-guide.html#' + c.id + '"><img src="' + c.img + '" alt="' + esc(pick(c)) + '" loading="lazy">' +
        '<span class="cap"><b>' + esc(pick(c)) + "</b><small>" + c.rows.map(function (r) { return esc(getProduct(r[0]).name); }).join(" · ") + "</small></span></a>";
    }).join("");
    el.innerHTML = '<div class="marquee-track">' + items + items.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ') + "</div>";
  }

  /* ---------- Products page ---------- */
  function cropsFor(id) { return CROPS.filter(function (c) { return c.rows.some(function (r) { return r[0] === id; }); }); }

  var PRODUCT_ID = document.body.getAttribute("data-product");

  function renderProducts() {
    var list = $("#product-list"); if (!list) return;
    var lang = Lang.get();
    var shown = PRODUCT_ID ? [getProduct(PRODUCT_ID)] : PRODUCTS;
    $("#subnav").innerHTML = PRODUCTS.map(function (p) {
      var cur = p.id === PRODUCT_ID;
      return '<a href="' + productUrl(p) + '" style="--c:' + p.color + '"' + (cur ? ' class="active" aria-current="page"' : "") + "><i></i>" + esc(p.name) + "</a>";
    }).join("");
    if (PRODUCT_ID) {
      var cp = shown[0];
      document.title = lang === "ta" ? cp.name + " – " + cp.type.ta + " | GROAGRI ORGANICS" : cp.seo.title;
      var lead = $("#pd-lead"); if (lead) lead.textContent = pick(cp.type);
    }
    list.innerHTML = shown.map(function (p) {
      var steps = DIRECTIONS[lang].slice();
      if (p.method === "foliar") steps[1] = DIRECTIONS_FOLIAR[lang];
      var crops = cropsFor(p.id);
      return (
        '<section class="product-detail" id="' + p.id + '" style="--c:' + p.color + '"><div class="container">' +
        '<div class="viewer reveal" style="--c:' + p.color + '"><div class="hint">' + esc(t("prod.rotate")) + "</div>" +
        '<div class="spin">' + packHTML(p) + '</div><div class="floor"></div>' +
        '<div class="viewer-ui"><button type="button" data-v="0">' + esc(t("prod.front")) + '</button><button type="button" data-v="-90">' + esc(t("prod.side")) +
        '</button><button type="button" data-v="180">' + esc(t("prod.back")) + "</button></div></div>" +
        '<div class="pd-info reveal">' +
        '<span class="tag">' + esc(p.tag.en) + "</span><h2>" + esc(p.name) + '</h2><div class="type">' + esc(pick(p.type)) + "</div>" +
        '<div class="benefit"><b>' + esc(t("prod.benefits")) + ":</b> " + esc(pick(p.benefit)) + "</div>" +
        '<div class="dose-cards">' +
        '<div class="dose-card">' + (p.method === "foliar" ? I.spray : I.root) + "<small>" + esc(t("prod.method")) + "</small><b>" + esc(methodLabel(p)) + "</b></div>" +
        '<div class="dose-card">' + I.drop + "<small>" + esc(t("prod.dosage")) + "</small><b>" + esc(doseLabel(p)) + "</b></div>" +
        '<div class="dose-card">' + I.clock + "<small>" + esc(t("prod.interval")) + "</small><b>" + esc(everyLabel(p)) + "</b></div></div>" +
        '<div class="pd-cols"><div class="pd-block"><h4>' + esc(t("prod.directions")) + '</h4><ol class="steps">' +
        steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" +
        '<div class="pd-block"><h4>' + esc(t("prod.precautions")) + '</h4><ul class="warn">' +
        PRECAUTIONS[lang].map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div></div>" +
        '<table class="pack-table"><tbody>' +
        "<tr><th>" + esc(t("prod.mrp")) + '</th><td><span class="mrp">' + COMPANY.mrp + "</span> " + esc(t("prod.mrpShort")) + "</td></tr>" +
        "<tr><th>" + esc(t("prod.netqty")) + "</th><td>" + (lang === "ta" ? "1 லிட்டர் / 1 L" : "1 Litre / 1 L") + "</td></tr>" +
        "<tr><th>" + esc(t("prod.shelf")) + "</th><td>" + esc(t("prod.shelfVal")) + "</td></tr>" +
        "<tr><th>" + esc(t("prod.mfgBy")) + "</th><td>" + esc(COMPANY.manufacturer) + "</td></tr>" +
        "<tr><th>" + esc(t("prod.mktBy")) + "</th><td>" + esc(COMPANY.marketer) + "</td></tr>" +
        "<tr><th>" + esc(t("prod.licence")) + "</th><td>" + esc(COMPANY.licence) + "</td></tr>" +
        "</tbody></table>" +
        (PRODUCT_ID ? "" :
        '<div class="pd-block" style="margin-top:28px"><h4>' + esc(t("prod.crops")) + '</h4><div class="crop-tags">' +
        crops.map(function (c) { return '<a href="crop-guide.html#' + c.id + '"><img src="' + c.img + '" alt="" loading="lazy">' + esc(pick(c)) + "</a>"; }).join("") +
        "</div></div>") +
        "</div></div></section>" +
        (PRODUCT_ID ? cropUsesHTML(p, crops, lang) : "")
      );
    }).join("");
    observeReveals(list);
    $all(".viewer", list).forEach(initViewer);
  }

  /* Single product page: how the product helps each crop */
  function cropUsesHTML(p, crops, lang) {
    return '<section class="section pd-crops" style="--c:' + p.color + '"><div class="container">' +
      '<div class="section-head"><h2>' + esc(t("prod.cropsFor", { name: p.name })) + "</h2></div>" +
      '<div class="crop-uses">' + crops.map(function (c) {
        var row = c.rows.filter(function (r) { return r[0] === p.id; })[0];
        return '<a class="crop-use" href="crop-guide.html#' + c.id + '"><img src="' + c.img + '" alt="' + esc(c.en) + '" loading="lazy" width="64" height="64">' +
          "<div><h3>" + esc(c[lang]) + "</h3><p>" + esc(row[1][lang]) + "</p></div></a>";
      }).join("") + "</div></div></section>";
  }

  function initViewer(v) {
    var spin = $(".spin", v), ry = -18, rx = -6, target = null, dragging = false, visible = false, idle = 0;
    function render() { spin.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)"; }
    draggable(v, function (dx, dy) {
      dragging = true; target = null; idle = 0;
      ry += dx * 0.5; rx = Math.max(-35, Math.min(35, rx - dy * 0.3));
    }, function () { dragging = false; });
    $all(".viewer-ui button", v).forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var base = +b.getAttribute("data-v"), k = Math.round((ry - base) / 360);
        target = { y: base + k * 360, x: -6 }; idle = 0;
      });
    });
    function loop() {
      if (!v.isConnected) return;
      if (visible && !document.hidden) {
        if (target) {
          ry += (target.y - ry) * 0.09; rx += (target.x - rx) * 0.09;
          if (Math.abs(target.y - ry) < 0.1) { ry = target.y; target = null; }
        } else if (!dragging && !reduceMotion) {
          idle++;
          if (idle > 240) ry += 0.18;
          rx += (-6 - rx) * 0.02;
        }
        render();
      }
      requestAnimationFrame(loop);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(v); else visible = true;
    render(); requestAnimationFrame(loop);
  }

  /* ---------- Crop guide ---------- */
  var cg = { group: "all", product: "", q: "" };
  function renderCropGuide() {
    var grid = $("#crop-grid"); if (!grid) return;
    var lang = Lang.get();
    var prodSeg = $("#product-seg");
    prodSeg.innerHTML = '<button type="button" data-p="">' + esc(t("crops.any")) + "</button>" +
      PRODUCTS.map(function (p) { return '<button type="button" data-p="' + p.id + '" style="--c:' + p.color + '"><i></i>' + esc(p.name) + "</button>"; }).join("");
    $all("button", prodSeg).forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-p") === cg.product ? "true" : "false");
      b.addEventListener("click", function () { cg.product = b.getAttribute("data-p"); renderCropGuide(); });
    });
    $all("#group-seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-g") === cg.group ? "true" : "false"); });

    var q = cg.q.trim().toLowerCase();
    var shown = CROPS.filter(function (c) {
      if (cg.group !== "all" && c.group !== cg.group) return false;
      if (cg.product && !c.rows.some(function (r) { return r[0] === cg.product; })) return false;
      if (q && c.en.toLowerCase().indexOf(q) < 0 && c.ta.indexOf(q) < 0) return false;
      return true;
    });
    grid.innerHTML = shown.map(function (c) {
      return (
        '<article class="crop-card reveal" id="' + c.id + '"><div class="ph"><img src="' + c.img + '" alt="' + esc(c.en) + '" loading="lazy">' +
        '<div class="names"><b>' + esc(c[lang]) + "</b><small>" + esc(lang === "ta" ? c.en : c.ta) + "</small></div></div>" +
        '<div class="rows">' + c.rows.map(function (r) {
          var p = getProduct(r[0]);
          return '<div class="crow"><div class="hd"><a class="pbadge" style="--c:' + p.color + '" href="' + productUrl(p) + '">' + esc(p.name) + "</a>" +
            '<span class="dose">' + esc(p.dose + (lang === "ta" ? " மி.லி / 1 L · " : " ml / 1 L · ") + t(p.method === "foliar" ? "method.foliar.short" : "method.soil.short") + " · " + t("dose.days", { n: p.interval })) + "</span></div>" +
            "<p>" + esc(r[1][lang]) + "</p></div>";
        }).join("") + "</div></article>"
      );
    }).join("");
    $("#crop-count").textContent = t("crops.count", { n: shown.length });
    $("#crop-empty").style.display = shown.length ? "none" : "block";
    observeReveals(grid);
  }
  function initCropGuide() {
    if (!$("#crop-grid")) return;
    var pp = new URLSearchParams(location.search).get("product");
    if (pp && getProduct(pp)) cg.product = pp;
    $all("#group-seg button").forEach(function (b) {
      b.addEventListener("click", function () { cg.group = b.getAttribute("data-g"); renderCropGuide(); });
    });
    var s = $("#crop-search");
    s.addEventListener("input", function () { cg.q = s.value; renderCropGuide(); });
    renderCropGuide();
    Lang.on(renderCropGuide);
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) { el.classList.add("visible"); setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120); }
    }
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var el = $("#range-list"); if (!el) return;
    el.innerHTML = PRODUCTS.map(function (p, i) {
      return '<a class="range-item reveal" style="--c:' + p.color + ";--rd:" + i * 0.08 + 's" href="' + productUrl(p) + '"><img src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy">' +
        "<b>" + esc(p.name) + "</b><small>" + esc(pick(p.type)) + "</small></a>";
    }).join("");
    observeReveals(el);
  }

  /* ---------- Contact ---------- */
  function renderContactSelect() {
    var sel = $("#product"); if (!sel) return;
    var val = sel.value || new URLSearchParams(location.search).get("product") || "";
    sel.innerHTML = '<option value="">' + esc(t("form.general")) + "</option>" +
      PRODUCTS.map(function (p) { return '<option value="' + esc(p.name) + '">' + esc(p.name) + "</option>"; }).join("");
    sel.value = val;
  }
  function initContact() {
    var form = $("#enquiry-form"); if (!form) return;
    renderContactSelect(); Lang.on(renderContactSelect);
    var phone = $("#phone"), btn = form.querySelector('button[type="submit"]'),
        ok = $("#form-success"), err = $("#form-error");
    function checkPhone() {
      phone.setCustomValidity(/^[6-9]\d{9}$/.test(phone.value) ? "" : t("form.phone.err"));
    }
    phone.addEventListener("input", function () {
      // Keep digits only, drop a leading +91 / 0, cap at 10 digits
      var v = phone.value.replace(/\D/g, "");
      if (v.length > 10) v = v.replace(/^(91|0)/, "");
      phone.value = v.slice(0, 10);
      checkPhone();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      checkPhone();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var label = btn.querySelector("span");
      ok.style.display = err.style.display = "none";
      btn.disabled = true; label.textContent = t("form.sending");
      fetch("https://formsubmit.co/ajax/" + COMPANY.email, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "New enquiry from " + d.get("name") + " – GROAGRI ORGANICS website",
          _template: "table",
          _captcha: "false",
          Name: d.get("name"),
          Phone: "+91 " + d.get("phone"),
          Location: d.get("location") || "-",
          Product: d.get("product") || "General enquiry",
          Message: d.get("message") || "-"
        })
      }).then(function (r) { return r.json().then(function (j) {
        if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "Send failed");
      }); }).then(function () {
        ok.style.display = "block";
        form.reset();
      }).catch(function (ex) {
        console.error("Enquiry send failed:", ex);
        var why = ex && ex.message ? ex.message : "";
        if (location.protocol === "file:")
          why = "Open the site through a web server (http://localhost…), not as a file.";
        err.textContent = t("form.error") + (why ? " (" + why + ")" : "");
        err.style.display = "block";
      }).then(function () {
        btn.disabled = false; label.textContent = t("form.submit");
      });
    });
  }

  /* ---------- Boot ---------- */
  buildHeader();
  Lang.set(Lang.get(), true);

  renderRange(); Lang.on(renderRange);
  renderCropStrip(); Lang.on(renderCropStrip);
  initCarousel();
  initParticles();
  initExplorer();
  initCalc();
  renderProducts(); Lang.on(renderProducts);
  initCropGuide();
  renderAbout(); Lang.on(renderAbout);
  initContact();

  observeReveals(document);
  bindTilt(document);

  if (PAGE === "products" && !PRODUCT_ID && location.hash && getProduct(location.hash.slice(1))) {
    location.replace(productUrl(location.hash.slice(1)));
  }
})();
