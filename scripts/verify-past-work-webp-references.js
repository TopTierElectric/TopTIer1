#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, "Past_work_webp");
const EXTENSIONS = new Set([".html", ".css", ".md"]);
const SKIP_DIRS = new Set([".git", "node_modules", "dist"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (EXTENSIONS.has(ext)) out.push(path.join(dir, entry.name));
  }
  return out;
}

function decodeRef(ref) {
  let v = ref.split("#")[0].split("?")[0].trim();
  v = v.replace(/&quot;$/i, "");
  if (!v) return v;
  if (v.startsWith("http://") || v.startsWith("https://")) {
    try {
      v = new URL(v).pathname;
    } catch {}
  }
  if (v.includes("%")) {
    try {
      v = decodeURIComponent(v);
    } catch {}
  }
  return v.replace(/^\//, "");
}

function resolveCaseSensitive(absPath) {
  const rel = path.relative(ROOT, absPath);
  const parts = rel.split(path.sep);
  let cur = ROOT;
  for (const part of parts) {
    const names = fs.readdirSync(cur);
    if (!names.includes(part)) return false;
    cur = path.join(cur, part);
  }
  return true;
}

if (!fs.existsSync(TARGET_DIR)) {
  console.error("Past_work_webp directory is missing.");
  process.exit(1);
}

const files = walk(ROOT);
const problems = [];
const re = /Past_work_webp\/([^"'\s)<>]+)/g;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(text)) !== null) {
    const raw = `Past_work_webp/${m[1]}`;
    const decoded = decodeRef(raw);
    const abs = path.join(ROOT, decoded);
    if (!fs.existsSync(abs)) {
      problems.push({ file: path.relative(ROOT, file), ref: raw, decoded, reason: "missing" });
      continue;
    }
    if (!resolveCaseSensitive(abs)) {
      problems.push({ file: path.relative(ROOT, file), ref: raw, decoded, reason: "case-mismatch" });
    }
  }
}

if (problems.length) {
  console.error(`Found ${problems.length} Past_work_webp reference issue(s):`);
  for (const p of problems) {
    console.error(`- ${p.file}: ${p.ref} -> ${p.decoded} (${p.reason})`);
  }
  process.exit(1);
}

console.log(`Past_work_webp byte-level reference verification passed across ${files.length} files.`);
