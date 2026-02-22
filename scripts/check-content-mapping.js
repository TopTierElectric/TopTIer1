#!/usr/bin/env node

import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const indexHtml = read("index.html");
const commercialProofBlockMatch = indexHtml.match(
  /<h3>Commercial Proof<\/h3>[\s\S]*?<\/div>\s*<\/div>/i,
);
if (!commercialProofBlockMatch) {
  failures.push('Could not find "Commercial Proof" section in index.html');
} else {
  const block = commercialProofBlockMatch[0];
  expect(
    !/led-shelf|led-shelfs|residential/i.test(block),
    "Commercial Proof section in index.html still contains residential/LED-shelf copy or asset mapping.",
  );
  expect(
    /commercial-control-panel-wiring\.jpg/i.test(block),
    "Commercial Proof section in index.html is not mapped to commercial-control-panel-wiring.jpg.",
  );
}

const commercialHtml = read("commercial.html");
const commercialProofCard = commercialHtml.match(
  /<div class="proof-grid">[\s\S]*?<\/div>/i,
);
if (!commercialProofCard) {
  failures.push("Could not find proof-grid section in commercial.html.");
} else {
  const block = commercialProofCard[0];
  expect(
    /commercial-control-panel-wiring\.jpg/i.test(block),
    "commercial.html proof-grid is not mapped to commercial-control-panel-wiring.jpg.",
  );
  expect(
    !/led-shelf|led-shelfs|residential/i.test(block),
    "commercial.html proof-grid still contains residential/LED-shelf copy or asset mapping.",
  );
}

const surgeHtml = read("blog-surge-protection.html");
expect(
  !/background-image:\s*url\(&quot;assets\//i.test(surgeHtml),
  "blog-surge-protection.html has a non-root-relative hero background image path (expected /assets/...).",
);
expect(
  !/Whole‑Home|whole‑home|Plug‑In/i.test(surgeHtml),
  "blog-surge-protection.html contains non-standard non-breaking hyphen characters in key headings/meta; use standard hyphen.",
);

const blogIndexHtml = read("blog.html");
const surgeCardMatch = blogIndexHtml.match(
  /<!--\s*Surge protection article\s*-->[\s\S]*?<article class="blog-card">[\s\S]*?<\/article>/i,
);
if (!surgeCardMatch) {
  failures.push("Could not find surge-protection blog card in blog.html.");
} else {
  const surgeCard = surgeCardMatch[0];
  expect(
    /blog-surge-protection/i.test(surgeCard),
    "Surge blog card does not link to blog-surge-protection.",
  );
  expect(
    /src="\/assets\/images\/projects\/control-cabinet\.jpg"/i.test(surgeCard),
    "blog.html surge-protection card is not mapped to control-cabinet.jpg.",
  );
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
  expect(
    !/background-image:\s*url\(&quot;assets\//i.test(html),
    `${file} has non-root-relative hero background image path.`,
  );
}

const servicePageMappings = [
  {
    file: "generators.html",
    expected: "generator-transfer-switch-install.jpg",
    forbidden: "led-shelves.jpg",
  },
  {
    file: "energy-consulting.html",
    expected: "service-panel-upgrade-detail.jpg",
    forbidden: "led-shelves.jpg",
  },
  {
    file: "energy-solutions.html",
    expected: "service-panel-upgrade-detail.jpg",
    forbidden: "led-shelves.jpg",
  },
];

for (const { file, expected, forbidden } of servicePageMappings) {
  const html = read(file);
  expect(
    new RegExp(expected.replace(".", "\\."), "i").test(html),
    `${file} does not reference expected mapped image: ${expected}.`,
  );
  expect(
    !new RegExp(forbidden.replace(".", "\\."), "i").test(html),
    `${file} still references forbidden mismapped image: ${forbidden}.`,
  );
}

if (failures.length > 0) {
  console.error("❌ Content mapping checks failed:");
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("✅ Content mapping checks passed.");
