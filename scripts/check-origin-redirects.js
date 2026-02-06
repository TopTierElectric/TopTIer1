#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SKIP_DIRS = new Set([".git", "node_modules", "reports"]);
const TARGET_EXTENSIONS = new Set([".conf", ".php"]);
const TARGET_BASENAMES = new Set([
  ".htaccess",
  "_redirects",
  "nginx.conf",
  "apache2.conf",
  "httpd.conf",
]);

const FORBIDDEN_PATTERNS = [
  {
    label: "Nginx forced HTTPS redirect",
    regex: /return\s+301\s+https:\/\/\$host\$request_uri\s*;/i,
  },
  {
    label: "Apache forced HTTPS redirect",
    regex: /Redirect\s+permanent\s+\/\s+https:\/\//i,
  },
  {
    label: "PHP forced HTTPS Location header",
    regex: /header\s*\(\s*["']Location:\s*https:\/\//i,
  },
  {
    label: "Netlify/Cloudflare style host+protocol canonicalization at origin",
    regex: /^https?:\/\/[^\s]+\/\*\s+https:\/\/[^\s]+\/:splat\s+301!?/im,
  },
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
      continue;
    }
    const full = path.join(dir, entry.name);
    const ext = path.extname(entry.name);
    if (TARGET_EXTENSIONS.has(ext) || TARGET_BASENAMES.has(entry.name))
      out.push(full);
  }
  return out;
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

const files = walk(ROOT);
const failures = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const p of FORBIDDEN_PATTERNS) {
    const m = p.regex.exec(content);
    if (m) {
      failures.push({
        file: path.relative(ROOT, file),
        pattern: p.label,
        line: lineNumberAt(content, m.index),
        sample: m[0].split("\n")[0].trim(),
      });
    }
  }
}

if (failures.length) {
  console.error(
    "❌ Found origin-level redirect patterns that can conflict with Cloudflare edge redirects:\n",
  );
  for (const f of failures) {
    console.error(`- ${f.file}:${f.line} [${f.pattern}]`);
    console.error(`  ${f.sample}`);
  }
  process.exit(1);
}

console.log(
  `✅ No forbidden origin-level HTTPS/host redirect patterns found in ${files.length} config/source files.`,
);
