#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .trim()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function resolveBaseRef() {
  const hasOriginMain = run('git rev-parse --verify origin/main').length > 0;
  if (hasOriginMain) {
    const base = run('git merge-base HEAD origin/main')[0];
    if (base) return base;
  }

  const prev = run('git rev-parse --verify HEAD~1')[0];
  return prev || null;
}

const imageExt = /\.(avif|gif|jpe?g|png|svg|webp)$/i;
const baseRef = resolveBaseRef();
const changedFromBase = baseRef
  ? run(`git diff --name-only --diff-filter=A ${baseRef}...HEAD -- assets/images`)
  : [];
const stagedOrUnstaged = run('git diff --name-only --diff-filter=A -- assets/images');
const untracked = run('git ls-files --others --exclude-standard -- assets/images');

const addedImages = [...new Set([...changedFromBase, ...stagedOrUnstaged, ...untracked])].filter(
  (p) => imageExt.test(p)
);

if (addedImages.length === 0) {
  console.log('No newly added image files detected under assets/images.');
  process.exit(0);
}

const sourcesPath = 'docs/IMAGE-SOURCES.md';
const sources = fs.existsSync(sourcesPath) ? fs.readFileSync(sourcesPath, 'utf8') : '';
const missing = addedImages.filter((img) => !sources.includes(`- Local file: ${img}`));

if (missing.length > 0) {
  console.error('Missing IMAGE-SOURCES entries for new image file(s):');
  missing.forEach((m) => console.error(`- ${m}`));
  console.error('\nAdd entries to docs/IMAGE-SOURCES.md using the Appendix A template.');
  process.exit(1);
}

console.log(`IMAGE-SOURCES check passed for ${addedImages.length} new image file(s).`);
