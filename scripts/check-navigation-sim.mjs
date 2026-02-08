#!/usr/bin/env node
import { spawn } from 'node:child_process';

const outputDir = process.env.PAGES_OUTPUT_DIR || '.';
const baseUrl = process.env.PAGES_BASE_URL || 'http://localhost:8788';
const seedPaths = ['/'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function extractInternalLinks(html) {
  const links = new Set();
  const regex = /href\s*=\s*["']([^"']+)["']/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href) continue;
    if (href.startsWith('#')) continue;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('http://') || href.startsWith('https://')) continue;

    const normalized = href.startsWith('/') ? href : `/${href.replace(/^\.\//, '')}`;
    links.add(normalized.split('?')[0].split('#')[0]);
  }

  return [...links];
}

async function fetchFollow(url) {
  return fetch(url, { redirect: 'follow' });
}

async function waitForServer(maxAttempts = 120) {
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      const res = await fetchFollow(baseUrl);
      if (res.ok || res.status < 500) return;
    } catch {}
    await sleep(1000);
  }

  throw new Error('[nav] wrangler pages dev did not become ready in time');
}

async function main() {
  const child = spawn('npx', ['wrangler', 'pages', 'dev', outputDir, '--port', '8788'], {
    stdio: 'inherit',
  });

  try {
    await waitForServer();

    const queue = new Set(seedPaths);
    const visited = new Set();

    while (queue.size > 0) {
      const route = queue.values().next().value;
      queue.delete(route);
      if (visited.has(route)) continue;
      visited.add(route);

      const response = await fetchFollow(`${baseUrl}${route}`);
      if (response.status >= 400) {
        throw new Error(`[nav] FAIL ${route} -> HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const html = await response.text();
        for (const link of extractInternalLinks(html)) {
          if (/\.(png|jpe?g|webp|avif|svg|css|js|pdf)$/i.test(link)) continue;
          queue.add(link);
        }
      }
    }

    console.log(`[nav] OK (${visited.size} routes checked)`);
  } finally {
    child.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
