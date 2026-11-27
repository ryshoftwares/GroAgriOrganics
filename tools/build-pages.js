/* GROAGRI ORGANICS – static page generator (SEO)
 *
 * Builds products.html and one page per product (coco-gold.html, root-max.html,
 * grovia.html, lf-21.html) from js/data.js + js/i18n.js, plus sitemap.xml.
 * The generated pages contain the full English content as plain HTML so search
 * engines can index it; js/main.js then enhances it (3D pack viewer, Tamil).
 *
 * Run after editing product data:   node tools/build-pages.js
 * Do not hand-edit the generated files – edit this script or js/data.js instead.
 */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var SITE = "https://www.groagriorganics.in/";
var BRAND = "GROAGRI ORGANICS";

/* ---------- load site data ---------- */
var ctx = {
  location: { search: "" },
  localStorage: { getItem: function () { return null; }, setItem: function () {} },
  document: { documentElement: { setAttribute: function () {} } },
  URLSearchParams: URLSearchParams
};
vm.createContext(ctx);
["js/data.js", "js/i18n.js"].forEach(function (f) {
  // top-level `var`s become properties of the context
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
});
var PRODUCTS = ctx.PRODUCTS, CROPS = ctx.CROPS, COMPANY = ctx.COMPANY;
var DIRECTIONS = ctx.DIRECTIONS, DIRECTIONS_FOLIAR = ctx.DIRECTIONS_FOLIAR, PRECAUTIONS = ctx.PRECAUTIONS;
var T = ctx.I18N.en;
function t(k, vars) { var s = T[k] || k; for (var v in vars || {}) s = s.replace("{" + v + "}", vars[v]); return s; }

/* icons: reuse the exact SVGs from main.js */
var mainJs = fs.readFileSync(path.join(ROOT, "js/main.js"), "utf8");
function icon(name) {
  var m = mainJs.match(new RegExp("\\n\\s+" + name + ": '(<svg[^']*</svg>)'"));
  if (!m) throw new Error("icon not found in main.js: " + name);
  return m[1];
}
var I = { drop: icon("drop"), clock: icon("clock"), root: icon("root"), spray: icon("spray"), arrow: icon("arrow"), wa: icon("wa") };

/* hero/banner photo per product */
var BANNER = {
  "coco-gold": "images/crops/coconut.jpg",
  "root-max": "images/crops/paddy.jpg",
  "grovia": "images/crops/grovia-crops.jpg",
  "lf-21": "images/crops/lf21-crops.jpg"
};

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function url(p) { return p.id + ".html"; }
function abs(rel) { return SITE + rel; }
function cropsFor(id) { return CROPS.filter(function (c) { return c.rows.some(function (r) { return r[0] === id; }); }); }
function jsonLd(obj) {
  return '  <script type="application/ld+json">\n' +
    JSON.stringify(obj, null, 2).replace(/<\//g, "<\\/").replace(/^/gm, "  ") + "\n  </script>\n";
}

/* ---------- shared head ---------- */
function head(o) {
  return '<!DOCTYPE html>\n<html lang="en" class="no-js">\n<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n' +
    "  <title>" + esc(o.title) + "</title>\n" +
    '  <meta name="description" content="' + esc(o.description) + '">\n' +
    '  <meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '  <link rel="canonical" href="' + abs(o.path) + '">\n' +
    '  <meta name="theme-color" content="#082a1f">\n' +
    '  <meta property="og:type" content="' + (o.ogType || "website") + '">\n' +
    '  <meta property="og:site_name" content="' + BRAND + '">\n' +
    '  <meta property="og:locale" content="en_IN">\n' +
    '  <meta property="og:url" content="' + abs(o.path) + '">\n' +
    '  <meta property="og:title" content="' + esc(o.ogTitle || o.title) + '">\n' +
    '  <meta property="og:description" content="' + esc(o.description) + '">\n' +
    '  <meta property="og:image" content="' + abs(o.image) + '">\n' +
    (o.imageAlt ? '  <meta property="og:image:alt" content="' + esc(o.imageAlt) + '">\n' : "") +
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <link rel="icon" href="images/logo.png">\n' +
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@500;600;700&display=swap" rel="stylesheet">\n' +
    (o.preload ? '  <link rel="preload" as="image" href="' + o.preload + '">\n' : "") +
    '  <link rel="stylesheet" href="css/style.css">\n' +
    (o.ld || []).map(jsonLd).join("") +
    "</head>\n";
}
var SCRIPTS = '<script src="js/data.js"></script>\n<script src="js/i18n.js"></script>\n<script src="js/main.js"></script>\n</body>\n</html>\n';

function breadcrumb(items) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map(function (it, i) { return { "@type": "ListItem", position: i + 1, name: it[0], item: abs(it[1]) }; })
  };
}
var MRP_NUM = COMPANY.mrp.replace(/[^\d.]/g, "");

/* ---------- product page ---------- */
function productPage(p) {
  var steps = DIRECTIONS.en.slice();
  if (p.method === "foliar") steps[1] = DIRECTIONS_FOLIAR.en;
  var crops = cropsFor(p.id);
  var method = t(p.method === "foliar" ? "method.foliar" : "method.soil");

  var ld = [
    {
      "@context": "https://schema.org", "@type": "Product",
      name: p.name,
      description: p.type.en + ". " + p.benefit.en,
      image: [abs(p.image)],
      sku: p.id,
      category: "Organic Fertilizer",
      brand: { "@type": "Brand", name: BRAND },
      manufacturer: { "@type": "Organization", name: COMPANY.manufacturer },
      offers: {
        "@type": "Offer", url: abs(url(p)), price: MRP_NUM, priceCurrency: "INR",
        availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: BRAND }
      }
    },
    breadcrumb([["Home", ""], ["Products", "products.html"], [p.name, url(p)]])
  ];

  var html = head({
    title: p.seo.title, description: p.seo.description, path: url(p), ogType: "product",
    ogTitle: p.name + " – " + p.type.en, image: p.image, imageAlt: p.name + " 1 L pack", preload: p.image, ld: ld
  });
  html += '<body data-page="products" data-product="' + p.id + '">\n\n<main>\n' +
    '  <section class="page-banner">\n' +
    '    <div class="bg" style="background-image:url(' + BANNER[p.id] + ')"></div>\n' +
    '    <div class="container">\n' +
    '      <span class="eyebrow">' + esc(p.tag.en) + "</span>\n" +
    "      <h1>" + esc(p.name) + "</h1>\n" +
    '      <p id="pd-lead">' + esc(p.type.en) + "</p>\n" +
    '      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html" data-i18n="nav.home">Home</a> / <a href="products.html" data-i18n="nav.products">Products</a> / <span aria-current="page">' + esc(p.name) + "</span></nav>\n" +
    "    </div>\n  </section>\n\n" +
    '  <nav class="subnav" aria-label="Products"><div class="container" id="subnav">' +
    PRODUCTS.map(function (q) {
      var cur = q.id === p.id;
      return '<a href="' + url(q) + '" style="--c:' + q.color + '"' + (cur ? ' class="active" aria-current="page"' : "") + "><i></i>" + esc(q.name) + "</a>";
    }).join("") + "</div></nav>\n\n" +
    '  <div id="product-list">\n' +
    '    <section class="product-detail" id="' + p.id + '" style="--c:' + p.color + '"><div class="container">\n' +
    '      <div class="viewer" style="--c:' + p.color + '"><img class="static-pack" src="' + p.image + '" alt="' + esc(p.name + " – " + p.type.en + ", 1 L pack") + '" width="250" height="360"></div>\n' +
    '      <div class="pd-info">\n' +
    '        <span class="tag">' + esc(p.tag.en) + "</span><h2>" + esc(p.name) + '</h2><div class="type">' + esc(p.type.en) + "</div>\n" +
    '        <div class="benefit"><b>' + t("prod.benefits") + ":</b> " + esc(p.benefit.en) + "</div>\n" +
    '        <div class="dose-cards">' +
    '<div class="dose-card">' + (p.method === "foliar" ? I.spray : I.root) + "<small>" + t("prod.method") + "</small><b>" + esc(method) + "</b></div>" +
    '<div class="dose-card">' + I.drop + "<small>" + t("prod.dosage") + "</small><b>" + p.dose + " ml " + esc(t("dose.per")) + "</b></div>" +
    '<div class="dose-card">' + I.clock + "<small>" + t("prod.interval") + "</small><b>" + esc(t("dose.every", { n: p.interval })) + "</b></div></div>\n" +
    '        <div class="pd-cols"><div class="pd-block"><h4>' + t("prod.directions") + '</h4><ol class="steps">' +
    steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" +
    '<div class="pd-block"><h4>' + t("prod.precautions") + '</h4><ul class="warn">' +
    PRECAUTIONS.en.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div></div>\n" +
    '        <table class="pack-table"><tbody>' +
    "<tr><th>" + t("prod.mrp") + '</th><td><span class="mrp">' + COMPANY.mrp + "</span> " + esc(t("prod.mrpShort")) + "</td></tr>" +
    "<tr><th>" + t("prod.netqty") + "</th><td>1 Litre / 1 L</td></tr>" +
    "<tr><th>" + t("prod.shelf") + "</th><td>" + esc(t("prod.shelfVal")) + "</td></tr>" +
    "<tr><th>" + t("prod.mfgBy") + "</th><td>" + esc(COMPANY.manufacturer) + "</td></tr>" +
    "<tr><th>" + t("prod.mktBy") + "</th><td>" + esc(COMPANY.marketer) + "</td></tr>" +
    "<tr><th>" + esc(t("prod.licence")) + "</th><td>" + esc(COMPANY.licence) + "</td></tr>" +
    "<tr><th>" + t("prod.care") + '</th><td><a href="' + COMPANY.phoneHref + '">' + esc(COMPANY.phone) + "</a></td></tr>" +
    "</tbody></table>\n" +
    '        <div class="pd-actions"><a class="btn btn-dark" href="contact.html?product=' + encodeURIComponent(p.name) + '">' + t("prod.enquire") + I.arrow + "</a>" +
    '<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/' + COMPANY.whatsapp + "?text=" + encodeURIComponent("Hello Groagri Organics, I would like to order " + p.name + " (1 L).") + '">' + I.wa + t("prod.wa") + "</a></div>\n" +
    "      </div>\n    </div></section>\n" +
    '    <section class="section pd-crops" style="--c:' + p.color + '"><div class="container">\n' +
    '      <div class="section-head"><h2>' + esc(t("prod.cropsFor", { name: p.name })) + "</h2></div>\n" +
    '      <div class="crop-uses">\n' +
    crops.map(function (c) {
      var row = c.rows.filter(function (r) { return r[0] === p.id; })[0];
      return '        <a class="crop-use" href="crop-guide.html#' + c.id + '"><img src="' + c.img + '" alt="' + esc(c.en) + '" loading="lazy" width="64" height="64"><div><h3>' + esc(c.en) + "</h3><p>" + esc(row[1].en) + "</p></div></a>\n";
    }).join("") +
    "      </div>\n    </div></section>\n" +
    "  </div>\n</main>\n\n" + SCRIPTS;
  return html;
}

/* ---------- products listing ---------- */
function productsPage() {
  var desc = "Coco Gold, Root Max, Grovia and LF-21 – liquid organic fertilizers from GROAGRI ORGANICS, Tamil Nadu, for coconut, paddy, banana, vegetables and flowers. Dosage, benefits and prices.";
  var ld = [
    {
      "@context": "https://schema.org", "@type": "ItemList",
      name: "GROAGRI ORGANICS liquid organic fertilizers",
      itemListElement: PRODUCTS.map(function (p, i) { return { "@type": "ListItem", position: i + 1, url: abs(url(p)), name: p.name }; })
    },
    breadcrumb([["Home", ""], ["Products", "products.html"]])
  ];
  var html = head({
    title: "Liquid Organic Fertilizers – Coco Gold, Root Max, Grovia, LF-21 | " + BRAND,
    description: desc, path: "products.html", image: "images/banner-range.jpg", ld: ld
  });
  html += '<body data-page="products" data-title="meta.title.products">\n\n<main>\n' +
    '  <section class="page-banner">\n' +
    '    <div class="bg" style="background-image:url(images/crops/lf21-crops.jpg)"></div>\n' +
    '    <div class="container">\n' +
    '      <span class="eyebrow" data-i18n="tagline">' + esc(T.tagline) + "</span>\n" +
    '      <h1 data-i18n="prod.banner.title">' + esc(T["prod.banner.title"]) + "</h1>\n" +
    '      <p data-i18n="prod.banner.lead">' + esc(T["prod.banner.lead"]) + "</p>\n" +
    '      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html" data-i18n="nav.home">Home</a> / <span data-i18n="nav.products" aria-current="page">Products</span></nav>\n' +
    "    </div>\n  </section>\n\n" +
    '  <section class="section section-cream">\n    <div class="container">\n' +
    '      <div class="section-head">\n' +
    '        <h2 data-i18n="range.title">' + esc(T["range.title"]) + "</h2>\n" +
    '        <p class="lead" data-i18n="range.lead">' + esc(T["range.lead"]) + "</p>\n" +
    "      </div>\n" +
    '      <div class="grid grid-4" id="range-grid">\n' +
    PRODUCTS.map(function (p) {
      return '        <a class="prod-card" style="--c:' + p.color + ";--a:" + p.accent + '" href="' + url(p) + '">' +
        '<div class="visual"><img src="' + p.image + '" alt="' + esc(p.name) + '" width="188" height="270"></div>' +
        '<div class="body"><span class="tag">' + esc(p.tag.en) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.type.en) + "</p>" +
        '<div class="chips"><span class="chip">' + (p.method === "foliar" ? I.spray : I.drop) + p.dose + " ml / 1 L</span>" +
        '<span class="chip">' + I.clock + esc(t("dose.days", { n: p.interval })) + "</span></div>" +
        '<span class="more">' + t("range.view") + I.arrow + "</span></div></a>\n";
    }).join("") +
    "      </div>\n" +
    '      <div style="text-align:center;margin-top:46px">\n' +
    '        <a href="crop-guide.html" class="btn btn-dark"><span data-i18n="nav.crops">Crop Guide</span>' + I.arrow + "</a>\n" +
    "      </div>\n    </div>\n  </section>\n</main>\n\n" + SCRIPTS;
  return html;
}

/* ---------- sitemap ---------- */
function sitemap() {
  var today = new Date().toISOString().slice(0, 10);
  var pages = [["", "1.0"], ["products.html", "0.9"]]
    .concat(PRODUCTS.map(function (p) { return [url(p), "0.9"]; }))
    .concat([["crop-guide.html", "0.8"], ["about.html", "0.6"], ["contact.html", "0.6"]]);
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(function (pg) {
      return "  <url><loc>" + abs(pg[0]) + "</loc><lastmod>" + today + "</lastmod><priority>" + pg[1] + "</priority></url>\n";
    }).join("") + "</urlset>\n";
}

function write(f, s) { fs.writeFileSync(path.join(ROOT, f), s); console.log("wrote " + f); }
PRODUCTS.forEach(function (p) { write(url(p), productPage(p)); });
write("products.html", productsPage());
write("sitemap.xml", sitemap());
