#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const configuredOutputDir = process.env.PAGES_OUTPUT_DIR?.trim();
const outputDir = configuredOutputDir
  ? path.resolve(repoRoot, configuredOutputDir)
  : repoRoot;
const redirectsPath = path.join(outputDir, "_redirects");

if (!fs.existsSync(redirectsPath)) {
  console.error(`❌ Missing _redirects file at: ${redirectsPath}`);
  process.exit(1);
}

const lines = fs.readFileSync(redirectsPath, "utf8").split(/\r?\n/);
const errors = [];
let checkedRules = 0;

for (const [index, rawLine] of lines.entries()) {
  const lineNumber = index + 1;
  const line = rawLine.trim();

  if (!line || line.startsWith("#")) {
    continue;
  }

  const tokens = line.split(/\s+/);

  if (tokens.length < 2 || tokens.length > 3) {
    errors.push(
      `Line ${lineNumber}: expected 2-3 tokens but found ${tokens.length} (${line})`,
    );
    continue;
  }

  if (/\b\d{3}!\b/.test(line)) {
    errors.push(`Line ${lineNumber}: force-redirect syntax is not allowed (${line})`);
  }

  if (tokens.length === 3 && !/^\d+$/.test(tokens[2])) {
    errors.push(
      `Line ${lineNumber}: status token must be numeric when present (${line})`,
    );
  }

  checkedRules += 1;
}

if (errors.length > 0) {
  console.error("❌ Cloudflare redirects validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `✅ Cloudflare redirects validation passed (${checkedRules} rules, ${path.relative(repoRoot, redirectsPath)}).`,
);
