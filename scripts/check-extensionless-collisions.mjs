#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const entries = fs.readdirSync(root, { withFileTypes: true });
const htmlStems = new Set(
  entries
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => e.name.slice(0, -5)),
);

const collisions = [];
for (const entry of entries) {
  if (!entry.isFile()) continue;
  const name = entry.name;
  if (name.endsWith('.html')) continue;
  if (name.startsWith('.')) continue;
  if (!htmlStems.has(name)) continue;

  const fullPath = path.join(root, name);
  const size = fs.statSync(fullPath).size;
  collisions.push({ name, size });
}

if (collisions.length) {
  console.error('❌ Found extensionless filename collisions with .html pages:');
  for (const c of collisions) {
    console.error(`- ${c.name} (collides with ${c.name}.html, size=${c.size} bytes)`);
  }
  console.error('Remove/rename colliding files to keep Cloudflare extensionless canonical routing correct.');
  process.exit(1);
}

console.log('✅ No extensionless filename collisions with .html pages detected.');
