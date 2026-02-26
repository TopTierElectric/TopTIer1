#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const htmlFiles = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name)
  .sort();

const issues = [];
const hrefRegex = /href\s*=\s*(["'])(.*?)\1/gi;

for (const file of htmlFiles) {
  const fullPath = path.join(ROOT, file);
  const content = fs.readFileSync(fullPath, "utf8");
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[2].trim();

    // Only enforce root-absolute internal links like /contact.html
    if (!href.startsWith("/")) continue;
    if (href.startsWith("//")) continue; // protocol-relative external
    if (/^\/(assets|css|images|img|js)\//i.test(href)) continue;
    if (!href.toLowerCase().endsWith(".html")) continue;

    const line = content.slice(0, match.index).split("\n").length;
    issues.push({ file, line, href });
  }
}

if (issues.length) {
  console.error(
    "❌ Found root-absolute .html links. Use extensionless canonical paths on Cloudflare Pages.",
  );
  for (const issue of issues) {
    console.error(`- ${issue.file}:${issue.line} -> ${issue.href}`);
  }
  process.exit(1);
}

console.log(
  `✅ Extensionless link check passed (${htmlFiles.length} HTML files scanned).`,
);
