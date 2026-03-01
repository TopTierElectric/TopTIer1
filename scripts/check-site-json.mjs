#!/usr/bin/env node
import fs from "node:fs";

const FILE = "src/data/site.json";
const OUT = "reports/site_json_validation.md";

const placeholderPatterns = [
  /__[^_]+__/i,
  /\b(?:todo|tbd|changeme|placeholder)\b/i,
  /example\.com/i,
  /@example\./i,
];

function isPlaceholderLike(value) {
  if (typeof value !== "string") return false;
  return placeholderPatterns.some((pattern) => pattern.test(value.trim()));
}

function walk(obj, path = "", acc = []) {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => walk(item, `${path}[${index}]`, acc));
    return acc;
  }
  if (obj && typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      const next = path ? `${path}.${key}` : key;
      walk(value, next, acc);
    });
    return acc;
  }
  acc.push([path, obj]);
  return acc;
}

const raw = fs.readFileSync(FILE, "utf8");
const json = JSON.parse(raw);

const issues = [];
for (const [path, value] of walk(json)) {
  if (isPlaceholderLike(value)) {
    issues.push(`Placeholder-like value at \`${path}\`: \`${String(value)}\``);
  }
}

const reviewUrl = json?.gbp?.review_url;
const strictReviewPattern = /^https:\/\/g\.page\/r\/[A-Za-z0-9_-]{8,}\/review$/;
if (typeof reviewUrl !== "string" || !strictReviewPattern.test(reviewUrl)) {
  issues.push(
    "`gbp.review_url` must match `https://g.page/r/<place-id>/review` with a non-trivial place-id token.",
  );
}

const lines = [
  "# site.json validation",
  "",
  `- file: \`${FILE}\``,
  `- status: ${issues.length === 0 ? "PASS" : "FAIL"}`,
  `- issue_count: ${issues.length}`,
  "",
];
if (issues.length) {
  lines.push("## Issues", "");
  for (const issue of issues) lines.push(`- ${issue}`);
} else {
  lines.push("No issues found.");
}

fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync(OUT, `${lines.join("\n")}\n`);

if (issues.length) {
  console.error(lines.join("\n"));
  process.exit(1);
}

console.log(lines.join("\n"));
