/* GROAGRI ORGANICS – site scripts */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var categoryLabel = { solid: "Organic Manure", liquid: "Liquid Organic", bio: "Bio-fertilizer" };

  // Featured products on home page
  var featured = document.getElementById("featured-products");
  if (featured && typeof PRODUCTS !== "undefined") {
    featured.innerHTML = PRODUCTS.slice(0, 6).map(function (p) {
      return (
        '<article class="product-card reveal">' +
        '<div class="thumb"><img src="' + p.image + '" alt="' + esc(p.name) + ' pack"></div>' +
        '<div class="body"><span class="tag">' + categoryLabel[p.category] + "</span>" +
        "<h3>" + esc(p.name) + "</h3><p>" + esc(p.description.split(". ")[0]) + ".</p>" +
        '<a class="btn btn-dark" href="products.html#' + p.id + '">View details</a></div></article>'
      );
    }).join("");
  }

  // Full product list on products page
  var list = document.getElementById("product-list");
  if (list && typeof PRODUCTS !== "undefined") {
    list.innerHTML = PRODUCTS.map(function (p) {
      return (
        '<article class="product-detail reveal" id="' + p.id + '" data-category="' + p.category + '">' +
        '<div class="thumb"><img src="' + p.image + '" alt="' + esc(p.name) + ' pack"></div>' +
        "<div>" +
        '<span class="tag">' + categoryLabel[p.category] + "</span>" +
        "<h2>" + esc(p.name) + '</h2><div class="sub">' + esc(p.sub) + "</div>" +
        "<p>" + esc(p.description) + "</p>" +
        '<div class="meta"><span><b>Form:</b> ' + esc(p.form) + "</span><span><b>Pack:</b> " + esc(p.pack) +
        "</span><span><b>Crops:</b> " + esc(p.crops) + "</span></div>" +
        '<div class="detail-cols"><div><h4>Key Benefits</h4><ul class="check-list">' +
        p.benefits.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
        "</ul></div><div><h4>Dosage &amp; Application</h4><p>" + esc(p.usage) + "</p>" +
        '<a class="btn btn-primary" style="margin-top:16px" href="contact.html?product=' + encodeURIComponent(p.name) + '">Enquire Now</a></div></div>' +
        '<div class="disclosure"><strong>Disclosure:</strong><p>' + esc(p.disclosure) + "</p></div>" +
        "</div></article>"
      );
    }).join("");

    // Filters
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        list.querySelectorAll(".product-detail").forEach(function (el) {
          el.style.display = f === "all" || el.getAttribute("data-category") === f ? "" : "none";
        });
      });
    });

    // Scroll to hash after render
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.classList.add("visible");
        setTimeout(function () { target.scrollIntoView(); }, 50);
      }
    }
  }

  // Contact page: product dropdown + WhatsApp submission
  var select = document.getElementById("product");
  if (select && typeof PRODUCTS !== "undefined") {
    PRODUCTS.forEach(function (p) {
      var o = document.createElement("option");
      o.value = p.name; o.textContent = p.name + " – " + p.sub;
      select.appendChild(o);
    });
    var pre = new URLSearchParams(location.search).get("product");
    if (pre) select.value = pre;
  }

  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg =
        "Hello GROAGRI ORGANICS,%0A%0A" +
        "Name: " + encodeURIComponent(d.get("name")) + "%0A" +
        "Phone: " + encodeURIComponent(d.get("phone")) + "%0A" +
        "Location: " + encodeURIComponent(d.get("location") || "-") + "%0A" +
        "Product: " + encodeURIComponent(d.get("product") || "General enquiry") + "%0A" +
        "Message: " + encodeURIComponent(d.get("message") || "-");
      window.open("https://wa.me/918925184969?text=" + msg, "_blank");
      document.getElementById("form-success").style.display = "block";
      form.reset();
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }
})();
