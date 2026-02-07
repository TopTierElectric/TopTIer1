#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const redirectsPath = path.join(ROOT, "_redirects");

const htmlFiles = fs
  .readdirSync(ROOT)
  .filter(
    (file) =>
      file.endsWith(".html") && fs.statSync(path.join(ROOT, file)).isFile(),
  )
  .sort();

const redirectsRaw = fs.existsSync(redirectsPath)
  ? fs.readFileSync(redirectsPath, "utf8").split(/\r?\n/)
  : [];

const redirects = [];
for (const line of redirectsRaw) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length < 3) continue;
  const [from, to, code] = parts;
  redirects.push({ from, to, code: Number(code), raw: trimmed });
}

const redirectMap = new Map();
const redirectIssues = [];
for (const rule of redirects) {
  if (redirectMap.has(rule.from)) {
    redirectIssues.push(`Duplicate redirect source "${rule.from}"`);
    continue;
  }
  redirectMap.set(rule.from, rule);

  if (![301, 302, 303, 307, 308, 200].includes(rule.code)) {
    redirectIssues.push(
      `Invalid redirect code for "${rule.from}": ${rule.code}`,
    );
  }

  if (rule.to.startsWith("/")) {
    const targetPath =
      rule.to === "/" ? "index.html" : rule.to.replace(/^\//, "");
    if (!fs.existsSync(path.join(ROOT, targetPath))) {
      redirectIssues.push(
        `Redirect target does not exist for "${rule.from}": ${rule.to}`,
      );
    }
  }
}

const fileExistsForHref = (href) => {
  if (!href || href.startsWith("#")) return true;
  if (/^(mailto:|tel:|javascript:|https?:)/i.test(href)) return true;

  const withoutHash = href.split("#")[0].split("?")[0];
  if (!withoutHash) return true;

  if (withoutHash.startsWith("/")) {
    if (withoutHash === "/") return true;
    const absolutePath = withoutHash;

    if (absolutePath.endsWith(".html")) {
      return fs.existsSync(path.join(ROOT, absolutePath.replace(/^\//, "")));
    }

    if (redirectMap.has(absolutePath)) return true;
    return fs.existsSync(path.join(ROOT, absolutePath.replace(/^\//, "")));
  }

  if (withoutHash.endsWith(".html")) {
    return fs.existsSync(path.join(ROOT, withoutHash));
  }

  return fs.existsSync(path.join(ROOT, withoutHash));
};

const navIssues = [];
let navLinksChecked = 0;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(path.join(ROOT, htmlFile), "utf8");
  const navBlocks = content.match(/<nav[\s\S]*?<\/nav>/gi) || [];

  if (!navBlocks.length) {
    navIssues.push(`${htmlFile}: no <nav> block found`);
    continue;
  }

  for (const navBlock of navBlocks) {
    const linkMatches =
      navBlock.match(/href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi) || [];

    for (const raw of linkMatches) {
      const hrefMatch = raw.match(
        /href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i,
      );
      const href =
        (hrefMatch && (hrefMatch[1] || hrefMatch[2] || hrefMatch[3])) || "";
      navLinksChecked += 1;
      if (!fileExistsForHref(href)) {
        navIssues.push(`${htmlFile}: broken nav href "${href}"`);
      }
    }
  }
}

if (redirectIssues.length || navIssues.length) {
  console.error("❌ Navigation/redirect simulation failed.");
  if (redirectIssues.length) {
    console.error("\nRedirect issues:");
    for (const issue of redirectIssues) console.error(`- ${issue}`);
  }
  if (navIssues.length) {
    console.error("\nNavigation issues:");
    for (const issue of navIssues) console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  `✅ Navigation and redirect simulation passed (${htmlFiles.length} pages, ${navLinksChecked} nav links, ${redirects.length} redirect rules).`,
);
