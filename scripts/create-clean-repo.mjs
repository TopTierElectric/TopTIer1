#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const args = process.argv.slice(2);

const getArgValue = (flag, fallback) => {
  const index = args.indexOf(flag);
  if (index === -1 || index === args.length - 1) return fallback;
  return args[index + 1];
};

const OUT_DIR = path.resolve(ROOT, getArgValue('--out', 'dist/clean-repo'));
const INCLUDE_DOCS = args.includes('--include-docs');
const DRY_RUN = args.includes('--dry-run');
const ENABLE_DEDUPE = args.includes('--dedupe');
const INIT_GIT = args.includes('--init-git');

const ROOT_FILES_TO_KEEP = [
  '_headers',
  '_redirects',
  'package.json',
  'package-lock.json',
  'robots.txt',
  'sitemap.xml',
  '.gitignore',
  '.htmlvalidate.json',
  '.pa11yci',
  '.stylelintrc.json',
  'README.md',
  'readme.md',
  '404.html'
];

const ROOT_FILE_KEEP_PATTERNS = [/\.html$/i, /\.(png|jpe?g|webp|svg|ico|gif)$/i];

const ALWAYS_EXCLUDE_DIRS = new Set(['.git', 'node_modules', 'dist']);
const EXCLUDE_FILE_PATTERNS = [
  /AUDIT/i,
  /report/i,
  /PLAYBOOK/i,
  /_PLAN/i,
  /CHANGELOG/i,
  /TRACKER/i,
  /branches\.txt/i,
  /^TopTIer1-main$/i,
  /^bundle export$/i
];

const RELATIVE_LINK_PATTERN = /(?:href|src|content)\s*=\s*["']([^"'#?]+)["']/gi;
const CSS_LINK_PATTERN = /url\(\s*["']?([^"')?#]+)["']?\s*\)/gi;
const IMPORT_PATTERN = /@import\s+["']([^"']+)["']/gi;

const isLikelyRelative = (value) => {
  if (!value) return false;
  if (value.startsWith('http://') || value.startsWith('https://')) return false;
  if (value.startsWith('mailto:') || value.startsWith('tel:')) return false;
  if (value.startsWith('data:') || value.startsWith('javascript:')) return false;
  if (value.startsWith('//')) return false;
  return true;
};

const normalizePath = (fromFile, refPath) => {
  const cleanRef = refPath.split('?')[0].split('#')[0].trim();
  if (!cleanRef) return null;
  const raw = cleanRef.startsWith('/')
    ? path.join(ROOT, cleanRef.slice(1))
    : path.resolve(path.dirname(fromFile), cleanRef);
  if (!raw.startsWith(ROOT)) return null;
  return raw;
};

const fileExists = async (target) => {
  try {
    const stat = await fs.stat(target);
    return stat.isFile();
  } catch {
    return false;
  }
};

const ensureDir = async (target) => fs.mkdir(target, { recursive: true });

const listFilesRecursively = async (startDir) => {
  const collected = [];
  const stack = [startDir];
  while (stack.length) {
    const dir = stack.pop();
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(ROOT, full);
      if (entry.isDirectory()) {
        if (!ALWAYS_EXCLUDE_DIRS.has(entry.name)) stack.push(full);
      } else if (entry.isFile()) {
        collected.push({ full, rel });
      }
    }
  }
  return collected;
};

const extractRefs = (content, regex, fromFile, outputSet) => {
  regex.lastIndex = 0;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const ref = match[1];
    if (!isLikelyRelative(ref)) continue;
    const resolved = normalizePath(fromFile, ref);
    if (resolved) outputSet.add(resolved);
  }
};

const hashFile = async (file) => {
  const buffer = await fs.readFile(file);
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

const shouldExcludeFile = (rel) => EXCLUDE_FILE_PATTERNS.some((pattern) => pattern.test(rel));

const main = async () => {
  const allFiles = await listFilesRecursively(ROOT);
  const htmlFiles = allFiles.filter((f) => f.rel.endsWith('.html'));

  const queue = [...htmlFiles.map((f) => f.full)];
  const keep = new Set();

  for (const rootFile of ROOT_FILES_TO_KEEP) {
    const fullPath = path.join(ROOT, rootFile);
    if (await fileExists(fullPath)) keep.add(fullPath);
  }

  for (const f of allFiles) {
    if (!f.rel.includes(path.sep) && ROOT_FILE_KEEP_PATTERNS.some((p) => p.test(f.rel))) {
      keep.add(f.full);
    }
  }

  const visitedTextFiles = new Set();

  while (queue.length) {
    const current = queue.pop();
    if (visitedTextFiles.has(current) || !(await fileExists(current))) continue;
    visitedTextFiles.add(current);
    keep.add(current);

    const content = await fs.readFile(current, 'utf8');
    const foundRefs = new Set();
    extractRefs(content, RELATIVE_LINK_PATTERN, current, foundRefs);

    if (current.endsWith('.css')) {
      extractRefs(content, CSS_LINK_PATTERN, current, foundRefs);
      extractRefs(content, IMPORT_PATTERN, current, foundRefs);
    }

    if (current.endsWith('.js') || current.endsWith('.mjs')) {
      extractRefs(content, /["'`](\.\.?\/?[^"'`]+\.(?:css|html|png|jpe?g|webp|svg|json))["'`]/gi, current, foundRefs);
    }

    for (const candidate of foundRefs) {
      if (!(await fileExists(candidate))) continue;
      keep.add(candidate);
      if (/\.(html|css|js|mjs)$/i.test(candidate)) queue.push(candidate);
    }
  }

  if (await fileExists(path.join(ROOT, 'assets', 'favicon.ico'))) {
    keep.add(path.join(ROOT, 'assets', 'favicon.ico'));
  }

  if (INCLUDE_DOCS) {
    for (const f of allFiles) {
      if (f.rel.startsWith(`docs${path.sep}`)) keep.add(f.full);
    }
  }

  const keptRel = [...keep]
    .map((full) => path.relative(ROOT, full))
    .filter((rel) => rel && !shouldExcludeFile(rel))
    .sort();

  const duplicates = [];
  const hashMap = new Map();
  for (const rel of keptRel) {
    const full = path.join(ROOT, rel);
    const digest = await hashFile(full);
    if (!hashMap.has(digest)) {
      hashMap.set(digest, rel);
    } else {
      duplicates.push({ duplicate: rel, original: hashMap.get(digest) });
    }
  }

  const keptAfterDedupe = keptRel.filter((rel) => !duplicates.some((d) => d.duplicate === rel));

  const finalFiles = ENABLE_DEDUPE ? keptAfterDedupe : keptRel;

  const manifest = {
    generated_at: new Date().toISOString(),
    source_root: ROOT,
    output_dir: OUT_DIR,
    include_docs: INCLUDE_DOCS,
    dedupe_enabled: ENABLE_DEDUPE,
    total_files_selected: keptRel.length,
    total_files_exported: finalFiles.length,
    removed_duplicates: ENABLE_DEDUPE ? duplicates : []
  };

  if (!DRY_RUN) {
    await fs.rm(OUT_DIR, { recursive: true, force: true });
    await ensureDir(OUT_DIR);

    for (const rel of finalFiles) {
      const source = path.join(ROOT, rel);
      const destination = path.join(OUT_DIR, rel);
      await ensureDir(path.dirname(destination));
      await fs.copyFile(source, destination);
    }

    await fs.writeFile(path.join(OUT_DIR, 'clean-repo-manifest.json'), JSON.stringify(manifest, null, 2));

    if (INIT_GIT) {
      const { execFile } = await import('node:child_process');
      const run = (cmd, argv) =>
        new Promise((resolve, reject) => {
          execFile(cmd, argv, { cwd: OUT_DIR }, (error) => {
            if (error) reject(error);
            else resolve();
          });
        });

      await run('git', ['init']);
      await run('git', ['config', 'user.name', 'clean-repo-export']);
      await run('git', ['config', 'user.email', 'clean-repo-export@example.local']);
      await run('git', ['add', '.']);
      await run('git', ['commit', '-m', 'Initial clean export']);
    }
  }

  console.log(`Selected files: ${keptRel.length}`);
  console.log(`Exported files: ${finalFiles.length}`);
  if (ENABLE_DEDUPE) {
    console.log(`Duplicates removed: ${duplicates.length}`);
    if (duplicates.length) {
      console.log('\nDuplicate files removed:');
      for (const item of duplicates) {
        console.log(`- ${item.duplicate} (kept ${item.original})`);
      }
    }
  } else {
    console.log('Duplicates removed: 0 (dedupe disabled)');
  }
  if (DRY_RUN) console.log('\nDry run complete. No files copied.');
  else {
    console.log(`\nClean repo exported to: ${OUT_DIR}`);
    if (INIT_GIT) console.log('Initialized git repo and created initial commit.');
  }
};

main().catch((error) => {
  console.error('Failed to create clean repo export:', error.message);
  process.exit(1);
});
