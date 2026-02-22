#!/usr/bin/env node

import fs from "node:fs";

const failures = [];

const read = (file) => fs.readFileSync(file, "utf8");

const indexHtml = read("index.html");
const commercialProofBlockMatch = indexHtml.match(
  /<h3>Commercial Proof<\/h3>[\s\S]*?<\/div>\s*<\/div>/i,
);
if (!commercialProofBlockMatch) {
  failures.push('Could not find "Commercial Proof" section in index.html');
} else {
  const block = commercialProofBlockMatch[0];
  if (/led-shelf|led-shelfs|residential/i.test(block)) {
    failures.push(
      "Commercial Proof section in index.html still contains residential/LED-shelf copy or asset mapping.",
    );
  }
}

const surgeHtml = read("blog-surge-protection.html");
if (/background-image:\s*url\(&quot;assets\//i.test(surgeHtml)) {
  failures.push(
    "blog-surge-protection.html has a non-root-relative hero background image path (expected /assets/...).",
  );
}
if (/Whole‑Home|whole‑home/.test(surgeHtml)) {
  failures.push(
    "blog-surge-protection.html contains non-standard non-breaking hyphen characters in key headings/meta; use standard hyphen.",
  );
}

const blogIndexHtml = read("blog.html");
const surgeCardMatch = blogIndexHtml.match(
  /<!--\s*Surge protection article\s*-->[\s\S]*?<article class="blog-card">[\s\S]*?<\/article>/i,
);
if (!surgeCardMatch) {
  failures.push("Could not find surge-protection blog card in blog.html.");
} else {
  const surgeCard = surgeCardMatch[0];
  if (!/blog-surge-protection/i.test(surgeCard)) {
    failures.push("Surge blog card does not link to blog-surge-protection.");
  }
  if (
    !/src="\/assets\/images\/projects\/control-cabinet\.jpg"/i.test(surgeCard)
  ) {
    failures.push(
      "blog.html surge-protection card is not mapped to control-cabinet.jpg.",
    );
  }
}

for (const file of [
  "blog.html",
  "blog-electrical-safety.html",
  "blog-panel-upgrade-signs.html",
  "blog-right-electrician.html",
  "blog-ev-charging.html",
  "blog-generator-readiness.html",
  "blog-surge-protection.html",
]) {
  const html = read(file);
  if (/background-image:\s*url\(&quot;assets\//i.test(html)) {
    failures.push(`${file} has non-root-relative hero background image path.`);
  }
}

if (failures.length > 0) {
  console.error("❌ Content mapping checks failed:");
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("✅ Content mapping checks passed.");
