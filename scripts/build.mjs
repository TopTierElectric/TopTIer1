import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { minify } from "html-minifier-terser";
import {
  emptyDir,
  readText,
  writeText,
  copyDir,
  walkFiles,
  exists,
} from "./lib/fs.mjs";
import { render } from "./lib/template.mjs";
import { extractMetaAndContent } from "./lib/meta.mjs";
import { filePathToRoute, routeToOutFile, canonicalUrl } from "./lib/urls.mjs";
import { buildImages } from "./lib/images.mjs";
import { strictVerifyDist } from "./lib/validate.mjs";
const PAGES_DIR = path.resolve("src/pages"),
  PARTIALS_DIR = path.resolve("src/partials"),
  INCLUDES_DIR = path.resolve("src/partials/includes"),
  DATA_DIR = path.resolve("src/data"),
  ASSETS_DIR = path.resolve("src/assets"),
  STATIC_DIR = path.resolve("src/static"),
  DIST_DIR = path.resolve("dist");
const BUILD_ID = process.env.BUILD_ID || String(Date.now());
const IS_PROD = process.env.NODE_ENV === "production";
const site = JSON.parse(await readText(path.join(DATA_DIR, "site.json")));
const req = (v, l) => {
  if (!v || String(v).trim() === "") throw new Error(`Config missing: ${l}`);
};
[
  "domain",
  "brand",
  "phone_e164",
  "phone_display",
  "email",
  "license_label",
  "license_number",
].forEach((k) => req(site[k], `site.${k}`));
req(site.gbp?.review_url, "site.gbp.review_url");
if (String(site.gbp.review_url).includes("__PASTE"))
  throw new Error(
    "site.gbp.review_url must be set to the real Google review link (no placeholders).",
  );
const layoutTpl = await readText(path.join(PARTIALS_DIR, "layout.html"));
const headerTpl = await readText(path.join(PARTIALS_DIR, "header.html"));
const footerTpl = await readText(path.join(PARTIALS_DIR, "footer.html"));
const makeLinks = (items, { wrapLi = false } = {}) =>
  !Array.isArray(items)
    ? ""
    : (wrapLi
        ? items.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`)
        : items.map((i) => `<a href="${i.href}">${i.label}</a>`)
      ).join("\n");
const buildBreadcrumbHtml = (meta) => {
  const b = Array.isArray(meta.breadcrumb) ? meta.breadcrumb : [];
  if (b.length <= 1) return "";
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${b.map((x, i) => (i === b.length - 1 ? `<li aria-current="page">${x.name}</li>` : `<li><a href="${x.url}">${x.name}</a></li>`)).join("")}</ol></nav>`;
};
const buildHead = (meta, route) => {
  const canonical = canonicalUrl(site.domain, route),
    robots = meta.indexable ? "index,follow" : "noindex,nofollow",
    ogImage = meta.ogImage || "/assets/img/og-default.jpg";
  const absoluteOgImage = `${site.domain.replace(/\/$/, "")}${ogImage}`;
  return [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta property="og:site_name" content="${site.brand}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="${site.locale || "en_US"}">`,
    `<meta property="og:title" content="${meta.title}">`,
    `<meta property="og:description" content="${meta.description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${absoluteOgImage}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${absoluteOgImage}">`,
    `<link rel="stylesheet" href="/assets/css/styles.css?v=${BUILD_ID}">`,
    `<script defer src="/assets/js/site.js?v=${BUILD_ID}"></script>`,
  ].join("\n");
};
const buildSchema = (meta, route) => {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Electrician",
      name: site.brand,
      url: site.domain,
      telephone: site.phone_e164,
      email: site.email,
      areaServed: (site.service_areas_short || []).map((c) => `${c}, MI`),
    },
  ];
  if (Array.isArray(meta.breadcrumb) && meta.breadcrumb.length > 1)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: meta.breadcrumb.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        item: canonicalUrl(site.domain, b.url),
      })),
    });
  if (Array.isArray(meta.faq) && meta.faq.length)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    });
  return schemas
    .map(
      (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`,
    )
    .join("\n");
};
const buildAnalytics = () => "";
const xmlEscape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
const generateSitemapXml = (siteDomain, manifest) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${manifest
    .filter((x) => x.indexable && x.sitemap)
    .map(
      (x) =>
        `  <url>\n    <loc>${xmlEscape(x.canonical)}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>${xmlEscape(x.sitemap.changefreq || "monthly")}</changefreq>\n    <priority>${(typeof x.sitemap.priority === "number" ? x.sitemap.priority : 0.5).toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`;
const generateRobotsTxt = (d) =>
  `User-agent: *\nAllow: /\nSitemap: ${d.replace(/\/$/, "")}/sitemap.xml\n`;
const generateRedirectsFile = () =>
  (site.redirects || [])
    .map((r) => `${r.from} ${r.to} ${r.status || 301}`)
    .join("\n") + "\n";
const generateHeadersFile = () =>
  `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/Past_work_webp/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  Cache-Control: public, max-age=${site.headers?.html_cache_seconds || 3600}\n`;
async function expandIncludes(content, data) {
  const re = /<!--\s*@include\s+([a-zA-Z0-9/_-]+)\s*-->/g;
  let m,
    out = "",
    last = 0;
  while ((m = re.exec(content)) !== null) {
    out += content.slice(last, m.index);
    out += render(
      await readText(path.join(INCLUDES_DIR, `${m[1]}.html`)),
      data,
      { strict: true },
    );
    last = re.lastIndex;
  }
  out += content.slice(last);
  return out;
}
async function copyAssetsWithoutRasterImages() {
  for (const e of await fs.readdir(ASSETS_DIR, { withFileTypes: true })) {
    const from = path.join(ASSETS_DIR, e.name),
      to = path.join(DIST_DIR, "assets", e.name);
    if (e.isDirectory()) {
      if (e.name === "img") continue;
      await copyDir(from, to);
    } else {
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.copyFile(from, to);
    }
  }
}
await emptyDir(DIST_DIR);
await copyAssetsWithoutRasterImages();
await buildImages({
  inDir: path.join(ASSETS_DIR, "img"),
  outDir: path.join(DIST_DIR, "assets", "img"),
  maxWidth: 1600,
});
if (await exists(STATIC_DIR)) await copyDir(STATIC_DIR, DIST_DIR);
const pageFiles = (await walkFiles(PAGES_DIR)).filter((f) =>
  f.endsWith(".html"),
);
const manifest = [];
const navPrimaryLinks = makeLinks(site.nav_primary || []),
  navFooterLinks = makeLinks(site.nav_footer || [], { wrapLi: true }),
  serviceAreasInline = (site.service_areas_short || []).join(" • "),
  year = new Date().getFullYear();
for (const filePath of pageFiles) {
  const raw = await readText(filePath),
    route = filePathToRoute(PAGES_DIR, filePath);
  const { meta, content: rawContent } = extractMetaAndContent(raw, filePath);
  if (
    !meta.title ||
    !meta.description ||
    !meta.pageType ||
    meta.indexable === undefined
  )
    throw new Error(`${filePath}: missing required meta`);
  if (!meta.service) meta.service = "none";
  if (!meta.city) meta.city = "none";
  const head = buildHead(meta, route),
    header = render(headerTpl, { site, navPrimaryLinks }, { strict: true }),
    footer = render(
      footerTpl,
      { site, year, serviceAreasInline, navFooterLinks },
      { strict: true },
    ),
    content = await expandIncludes(rawContent, { site, page: meta }),
    schema = buildSchema(meta, route);
  let html = render(
    layoutTpl,
    {
      site,
      page: meta,
      head,
      header,
      footer,
      breadcrumbHtml: buildBreadcrumbHtml(meta),
      content,
      schema,
      analytics: buildAnalytics(),
    },
    { strict: true },
  );
  if (IS_PROD)
    html = await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
    });
  await writeText(routeToOutFile(DIST_DIR, route), html);
  manifest.push({
    route,
    canonical: canonicalUrl(site.domain, route),
    indexable: Boolean(meta.indexable),
    sitemap: meta.sitemap || null,
    pageType: meta.pageType,
  });
}
await writeText(path.join(DIST_DIR, "_redirects"), generateRedirectsFile());
await writeText(path.join(DIST_DIR, "_headers"), generateHeadersFile());
await writeText(
  path.join(DIST_DIR, "_build_manifest.json"),
  JSON.stringify(manifest, null, 2),
);
await writeText(
  path.join(DIST_DIR, "sitemap.xml"),
  generateSitemapXml(site.domain, manifest),
);
if (!(await exists(path.join(DIST_DIR, "robots.txt"))))
  await writeText(
    path.join(DIST_DIR, "robots.txt"),
    generateRobotsTxt(site.domain),
  );
await strictVerifyDist({ distDir: DIST_DIR, site });
console.log("✅ Build complete (strict gates passed).");
