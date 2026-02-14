import fs from "fs/promises";
import path from "path";
import { parse } from "node-html-parser";
import { exists } from "./fs.mjs";

function stripQueryAndHash(u) { return u.split("#")[0].split("?")[0]; }
function distRouteFromIndexHtml(distDir, indexFilePath) {
  const rel = path.relative(distDir, indexFilePath).replaceAll(path.sep, "/");
  const parts = rel.split("/");
  parts.pop();
  return parts.length === 0 ? "/" : "/" + parts.join("/");
}
function canonicalForRoute(domain, route) {
  const d = domain.replace(/\/$/, "");
  return route === "/" ? `${d}/` : `${d}${route}`;
}
function isExternal(href) { return href.startsWith("http://") || href.startsWith("https://"); }
function isSkippableProtocol(href) { return href.startsWith("tel:") || href.startsWith("sms:") || href.startsWith("mailto:") || href.startsWith("javascript:"); }
async function getIndexHtmlFiles(distDir) {
  const out = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && e.name === "index.html") out.push(full);
    }
  }
  await walk(distDir);
  return out;
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
function isDecorativeImage(img) {
  const ariaHidden = (img.getAttribute("aria-hidden") || "").toLowerCase() === "true";
  const role = (img.getAttribute("role") || "").toLowerCase();
  const decorativeFlag = (img.getAttribute("data-decorative") || "").toLowerCase() === "true";
  return ariaHidden || role === "presentation" || decorativeFlag;
}
function hasAccessibleLabel(root, inputEl) {
  const ariaLabel = (inputEl.getAttribute("aria-label") || "").trim();
  if (ariaLabel) return true;
  const ariaLabelledBy = (inputEl.getAttribute("aria-labelledby") || "").trim();
  if (ariaLabelledBy) {
    const ids = ariaLabelledBy.split(/\s+/).filter(Boolean);
    return ids.some(id => root.getElementById(id));
  }
  const id = (inputEl.getAttribute("id") || "").trim();
  if (!id) return false;
  return !!root.querySelector(`label[for="${id}"]`);
}

export async function strictVerifyDist({ distDir, site }) {
  const expectedLicense = String(site.license_number || "").trim();
  assert(/^\d+$/.test(expectedLicense), `license_number must be digits only; got: ${expectedLicense}`);

  assert(await exists(path.join(distDir, "_headers")), "Missing dist/_headers");
  assert(await exists(path.join(distDir, "_redirects")), "Missing dist/_redirects");
  assert(await exists(path.join(distDir, "sitemap.xml")), "Missing dist/sitemap.xml");
  assert(await exists(path.join(distDir, "robots.txt")), "Missing dist/robots.txt");

  const indexFiles = await getIndexHtmlFiles(distDir);
  for (const file of indexFiles) {
    const html = await fs.readFile(file, "utf8");
    const root = parse(html);

    for (const s of site.validation?.forbidden_strings || []) {
      if (s && html.includes(s)) throw new Error(`${file}: forbidden string found in output: "${s}"`);
    }

    const route = distRouteFromIndexHtml(distDir, file);
    const expectedCanonical = canonicalForRoute(site.domain, route);

    assert(root.querySelector("html")?.getAttribute("lang"), `${file}: <html lang="..."> required`);
    const title = root.querySelector("title")?.text?.trim() || "";
    const desc = root.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || "";
    assert(title.length >= 10, `${file}: missing/short <title>`);
    assert(desc.length >= 50, `${file}: missing/short meta description`);

    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() || "";
    assert(canonical === expectedCanonical, `${file}: canonical mismatch: "${canonical}" expected "${expectedCanonical}"`);
    assert((root.querySelector('meta[name="robots"]')?.getAttribute("content") || "").trim().length > 0, `${file}: missing meta robots`);
    assert(root.querySelectorAll("h1").length === 1, `${file}: must contain exactly ONE <h1>`);
    assert(!!root.querySelector('a.skip-link[href="#main"]'), `${file}: missing skip link to #main`);
    assert(!!root.querySelector("main#main"), `${file}: missing <main id="main">`);

    const m = root.text.match(new RegExp(`${site.license_label}\\s*#\\s*(\\d+)`, "i"));
    assert(m && m[1] === expectedLicense, `${file}: license mismatch or missing`);

    for (const link of root.querySelectorAll('link[rel="stylesheet"]')) {
      const href = stripQueryAndHash((link.getAttribute("href") || "").trim());
      if (!href.startsWith("/")) continue;
      assert(await exists(path.join(distDir, href.replace(/^\//, ""))), `${file}: missing stylesheet asset ${href}`);
    }
    for (const script of root.querySelectorAll("script")) {
      const src = stripQueryAndHash((script.getAttribute("src") || "").trim());
      if (!src || !src.startsWith("/")) continue;
      assert(await exists(path.join(distDir, src.replace(/^\//, ""))), `${file}: missing script asset ${src}`);
    }

    for (const img of root.querySelectorAll("img")) {
      const alt = (img.getAttribute("alt") ?? "").trim();
      if (alt.length === 0) assert(isDecorativeImage(img), `${file}: <img> alt="" but not marked decorative`);
    }

    for (const input of root.querySelectorAll("input, textarea, select")) {
      if ((input.getAttribute("type") || "").toLowerCase() === "hidden") continue;
      assert(hasAccessibleLabel(root, input), `${file}: form control missing label/aria-label`);
    }

    for (const a of root.querySelectorAll("a")) {
      const hrefRaw = (a.getAttribute("href") || "").trim();
      if (!hrefRaw || isExternal(hrefRaw) || isSkippableProtocol(hrefRaw) || hrefRaw.startsWith("#")) continue;
      const href = stripQueryAndHash(hrefRaw);
      if (!href.startsWith("/")) continue;
      if (/\.(css|js|png|jpg|jpeg|webp|avif|svg|pdf|ico)$/i.test(href)) {
        assert(await exists(path.join(distDir, href.replace(/^\//, ""))), `${file}: missing asset ${href}`);
      } else {
        const pagePath = href === "/" ? path.join(distDir, "index.html") : path.join(distDir, href.replace(/^\//, ""), "index.html");
        assert(await exists(pagePath), `${file}: broken internal link ${href}`);
      }
    }
  }

  const robotsTxt = await fs.readFile(path.join(distDir, "robots.txt"), "utf8");
  assert(robotsTxt.includes(`Sitemap: ${site.domain.replace(/\/$/, "")}/sitemap.xml`), "robots.txt missing Sitemap directive");
  console.log("✅ strictVerifyDist: all gates passed");
}
