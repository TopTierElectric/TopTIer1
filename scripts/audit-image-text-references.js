#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "reports",
  "dist",
  "Past_work_webp",
]);
const HTML_EXT = ".html";
const CSS_EXT = ".css";
const MD_EXT = ".md";

const walkFiles = (startDir, extension) => {
  const out = [];
  const stack = [startDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          stack.push(fullPath);
        }
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(extension)) {
        out.push(fullPath);
      }
    }
  }

  return out.sort((a, b) => a.localeCompare(b));
};

const isSkippableRef = (value) => {
  if (!value) return true;
  const v = value.trim();
  return (
    v === "" ||
    v.startsWith("http://") ||
    v.startsWith("https://") ||
    v.startsWith("//") ||
    v.startsWith("data:") ||
    v.startsWith("blob:") ||
    v.startsWith("#")
  );
};

const safeDecode = (value) => {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
};

const cleanRef = (value) => value.split("#")[0].split("?")[0].trim();

const normalizeMarkdownRef = (value) => {
  const trimmed = value.trim();
  const angleMatch = trimmed.match(/^<([^>]+)>/);
  if (angleMatch) {
    return angleMatch[1].trim();
  }
  return trimmed.split(/\s+"[^"]*"\s*$/)[0].trim();
};

const resolveRef = (fromFile, ref) => {
  const cleaned = cleanRef(ref);
  if (isSkippableRef(cleaned)) return null;

  const decoded = safeDecode(cleaned);

  if (decoded.startsWith("/")) {
    return path.join(ROOT, decoded.replace(/^\//, ""));
  }
  return path.resolve(path.dirname(fromFile), decoded);
};

const parseAttributes = (tag) => {
  const attrs = {};
  const attrRe =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m;
  while ((m = attrRe.exec(tag)) !== null) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
};

const htmlFiles = walkFiles(ROOT, HTML_EXT);
const cssFiles = walkFiles(ROOT, CSS_EXT);
const mdFiles = walkFiles(ROOT, MD_EXT);

const missingReferences = [];
const missingReferenceKeys = new Set();
const missingAlt = [];
const emptyAlt = [];

const addMissingReference = (filePath, reference, type) => {
  const rel = path.relative(ROOT, filePath);
  const key = `${rel}|${type}|${reference}`;
  if (missingReferenceKeys.has(key)) return;
  missingReferenceKeys.add(key);
  missingReferences.push({
    file: rel,
    reference,
    type,
  });
};

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, "utf8");

  const imgTagRe = /<img\b[^>]*>/gi;
  let imgMatch;
  while ((imgMatch = imgTagRe.exec(content)) !== null) {
    const attrs = parseAttributes(imgMatch[0]);
    const src = attrs.src;
    if (src) {
      const resolved = resolveRef(filePath, src);
      if (resolved && !fs.existsSync(resolved)) {
        addMissingReference(filePath, src, "img[src]");
      }
    }

    const srcset = attrs.srcset;
    if (srcset) {
      for (const candidate of srcset.split(",")) {
        const ref = candidate.trim().split(/\s+/)[0];
        const resolvedSrcset = resolveRef(filePath, ref);
        if (resolvedSrcset && !fs.existsSync(resolvedSrcset)) {
          addMissingReference(filePath, ref, "img[srcset]");
        }
      }
    }

    const alt = attrs.alt;
    const role = (attrs.role || "").toLowerCase();
    const ariaHidden = (attrs["aria-hidden"] || "").toLowerCase();
    const decorative = role === "presentation" || ariaHidden === "true";
    if (alt === undefined) {
      missingAlt.push({ file: path.relative(ROOT, filePath), src: src || "" });
    } else if (alt.trim() === "" && !decorative) {
      emptyAlt.push({ file: path.relative(ROOT, filePath), src: src || "" });
    }
  }

  const sourceTagRe = /<source\b[^>]*>/gi;
  let sourceMatch;
  while ((sourceMatch = sourceTagRe.exec(content)) !== null) {
    const attrs = parseAttributes(sourceMatch[0]);
    const srcset = attrs.srcset;
    if (!srcset) continue;
    for (const candidate of srcset.split(",")) {
      const ref = candidate.trim().split(/\s+/)[0];
      const resolved = resolveRef(filePath, ref);
      if (resolved && !fs.existsSync(resolved)) {
        addMissingReference(filePath, ref, "source[srcset]");
      }
    }
  }
}

for (const filePath of cssFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const urlRe = /url\(([^)]+)\)/gi;
  let m;
  while ((m = urlRe.exec(content)) !== null) {
    const raw = m[1].trim().replace(/^['"]|['"]$/g, "");
    const resolved = resolveRef(filePath, raw);
    if (resolved && !fs.existsSync(resolved)) {
      addMissingReference(filePath, raw, "css[url()]");
    }
  }
}

for (const filePath of mdFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const markdownImageRe = /!\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = markdownImageRe.exec(content)) !== null) {
    const ref = normalizeMarkdownRef(m[1]);
    const resolved = resolveRef(filePath, ref);
    if (resolved && !fs.existsSync(resolved)) {
      addMissingReference(filePath, ref, "markdown image");
    }
  }
}

missingReferences.sort(
  (a, b) =>
    a.file.localeCompare(b.file) ||
    a.type.localeCompare(b.type) ||
    a.reference.localeCompare(b.reference),
);

missingAlt.sort(
  (a, b) => a.file.localeCompare(b.file) || a.src.localeCompare(b.src),
);
emptyAlt.sort(
  (a, b) => a.file.localeCompare(b.file) || a.src.localeCompare(b.src),
);

const reportLines = [];
reportLines.push("# Image/Text Reference Audit");
reportLines.push("");
reportLines.push(`- HTML files scanned: ${htmlFiles.length}`);
reportLines.push(`- CSS files scanned: ${cssFiles.length}`);
reportLines.push(`- Markdown files scanned: ${mdFiles.length}`);
reportLines.push(
  `- Missing image/file references: ${missingReferences.length}`,
);
reportLines.push(`- Image tags missing alt attribute: ${missingAlt.length}`);
reportLines.push(
  `- Image tags with empty alt (non-decorative): ${emptyAlt.length}`,
);
reportLines.push("");

if (missingReferences.length > 0) {
  reportLines.push("## Missing references");
  missingReferences.forEach((r) =>
    reportLines.push(`- ${r.file} (${r.type}): ${r.reference}`),
  );
  reportLines.push("");
}

if (missingAlt.length > 0) {
  reportLines.push("## Missing alt attributes");
  missingAlt.forEach((r) => reportLines.push(`- ${r.file}: ${r.src}`));
  reportLines.push("");
}

if (emptyAlt.length > 0) {
  reportLines.push("## Empty alt attributes (non-decorative)");
  emptyAlt.forEach((r) => reportLines.push(`- ${r.file}: ${r.src}`));
  reportLines.push("");
}

const reportPath = path.join(ROOT, "reports", "IMAGE_TEXT_REFERENCE_AUDIT.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
const reportMarkdown = reportLines.join("\n").replace(/\n+$/u, "\n");
fs.writeFileSync(reportPath, reportMarkdown);

if (missingReferences.length || missingAlt.length || emptyAlt.length) {
  console.error(
    `Image/text audit failed. See ${path.relative(ROOT, reportPath)}.`,
  );
  process.exit(1);
}

console.log(
  `Image/text audit passed. Report: ${path.relative(ROOT, reportPath)}`,
);
