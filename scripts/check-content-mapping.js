#!/usr/bin/env node

import fs from "node:fs";

const failures = [];

const indexHtml = fs.readFileSync("index.html", "utf8");
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

const surgeHtml = fs.readFileSync("blog-surge-protection.html", "utf8");
if (/background-image:\s*url\(&quot;assets\//i.test(surgeHtml)) {
  failures.push(
    "blog-surge-protection.html has a non-root-relative hero background image path (expected /assets/...).",
  );
}

if (failures.length > 0) {
  console.error("❌ Content mapping checks failed:");
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("✅ Content mapping checks passed.");
