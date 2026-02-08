#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const outputDir = process.env.PAGES_OUTPUT_DIR || '.';
const redirectsPath = path.join(process.cwd(), outputDir, '_redirects');

if (!fs.existsSync(redirectsPath)) {
  console.log(`[redirects] no ${redirectsPath} found (skipping).`);
  process.exit(0);
}

const content = fs.readFileSync(redirectsPath, 'utf8');
const invalidBangTokens = content.match(/\b\d{3}!\b/g);
if (invalidBangTokens?.length) {
  console.error(
    `[redirects] invalid status token(s): ${[...new Set(invalidBangTokens)].join(', ')}`,
  );
  process.exit(1);
}

let failed = false;
const lines = content.split(/\r?\n/);
for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (!line || line.startsWith('#')) continue;

  const parts = line.split(/\s+/);
  if (parts.length < 2 || parts.length > 3) {
    console.error(`[redirects] line ${index + 1} has invalid token count: "${lines[index]}"`);
    failed = true;
    continue;
  }

  if (parts.length === 3 && !/^\d{3}$/.test(parts[2])) {
    console.error(`[redirects] line ${index + 1} has invalid status code: "${lines[index]}"`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log('[redirects] OK');
