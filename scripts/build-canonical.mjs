import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_APEX = process.env.SITE_APEX || "toptier-electrical.com";
const SITE_WWW = process.env.SITE_WWW || "www.toptier-electrical.com";
const CANON_HOST = process.env.CANON_HOST === "www" ? "www" : "apex";
const URL_STYLE = process.env.URL_STYLE === "clean" ? "clean" : "html";

const canonicalHost = CANON_HOST === "www" ? SITE_WWW : SITE_APEX;
const secondaryHost = CANON_HOST === "www" ? SITE_APEX : SITE_WWW;

const skipDirs = new Set(["node_modules", ".git", "reports", "evidence"]);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(path.join(dir, entry.name));
    }
  }
};

walk(ROOT);

const replaceHosts = (content) => {
  const hostRegex = new RegExp(`https?:\\/\\/(${escapeRegExp(SITE_APEX)}|${escapeRegExp(SITE_WWW)})`, "g");
  return content.replace(hostRegex, `https://${canonicalHost}`);
};

const toClean = (content) => {
  const host = escapeRegExp(canonicalHost);
  let next = content
    .replace(new RegExp(`https?:\\/\\/${host}\\/index\\.html`, "g"), `https://${canonicalHost}/`)
    .replace(new RegExp(`https?:\\/\\/${host}\\/([a-z0-9-]+)\\.html`, "gi"), `https://${canonicalHost}/$1`)
    .replace(/href="\/index\.html"/g, 'href="/"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="\/([a-z0-9-]+)\.html"/gi, 'href="/$1"')
    .replace(/href="([a-z0-9-]+)\.html"/gi, 'href="$1"')
    .replace(/value="https?:\/\/[^"]+\/([a-z0-9-]+)\.html"/gi, `value="https://${canonicalHost}/$1"`);

  return next;
};

const applyUrlStyle = (content) => {
  let next = replaceHosts(content);
  if (URL_STYLE === "clean") {
    next = toClean(next);
  }
  return next;
};

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, "utf8");
  const updated = applyUrlStyle(content);
  if (updated !== content) {
    fs.writeFileSync(file, updated);
  }
}

const sitemapPath = path.join(ROOT, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, "utf8");
  let next = replaceHosts(content);
  if (URL_STYLE === "clean") {
    const host = escapeRegExp(canonicalHost);
    next = next
      .replace(new RegExp(`https?:\\/\\/${host}\\/index\\.html`, "g"), `https://${canonicalHost}/`)
      .replace(new RegExp(`https?:\\/\\/${host}\\/([a-z0-9-]+)\\.html`, "gi"), `https://${canonicalHost}/$1`);
  }
  if (next !== content) {
    fs.writeFileSync(sitemapPath, next);
  }
}

const redirectsPath = path.join(ROOT, "_redirects");
const pages = htmlFiles
  .filter((file) => path.dirname(file) === ROOT)
  .map((file) => path.basename(file))
  .filter((file) => file !== "404.html")
  .map((file) => file.replace(/\.html$/, ""));

const redirects = [];
redirects.push(`# Canonical host + HTTPS enforcement (${CANON_HOST})`);
redirects.push(`http://${SITE_APEX}/* https://${canonicalHost}/:splat 301!`);
redirects.push(`http://${SITE_WWW}/* https://${canonicalHost}/:splat 301!`);
if (secondaryHost !== canonicalHost) {
  redirects.push(`https://${secondaryHost}/* https://${canonicalHost}/:splat 301!`);
}

if (URL_STYLE === "html") {
  redirects.push("\n# Clean URL aliases -> .html");
  redirects.push(`/index / 301`);
  redirects.push(`/index.html / 301`);
  redirects.push(`/404 /404.html 301`);
  pages.forEach((page) => {
    if (page === "index") return;
    redirects.push(`/${page} /${page}.html 301`);
  });
} else {
  redirects.push("\n# .html URLs -> clean");
  redirects.push(`/index.html / 301`);
  redirects.push(`/404.html /404 301`);
  pages.forEach((page) => {
    if (page === "index") return;
    redirects.push(`/${page}.html /${page} 301`);
  });
}

redirects.push("\n# Legacy aliases");
redirects.push(`/home / 301`);
redirects.push(`/about ${URL_STYLE === "clean" ? "/services" : "/services.html"} 301`);
redirects.push(`/pricing ${URL_STYLE === "clean" ? "/services" : "/services.html"} 301`);

redirects.push("\n# Fallback 404");
redirects.push(`/* /404.html 404`);

fs.writeFileSync(redirectsPath, `${redirects.join("\n")}`);

console.log(`Canonical host: ${canonicalHost}`);
console.log(`URL style: ${URL_STYLE}`);
