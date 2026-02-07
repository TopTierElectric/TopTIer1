import { spawn } from 'child_process';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function run() {
  // Start Cloudflare Pages dev server using Wrangler
  const server = spawn('npx', ['wrangler', 'pages', 'dev', 'dist', '--port=8788'], {
    stdio: 'inherit',
  });
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));
  const base = 'http://localhost:8788';
  // Fetch root page
  const res = await fetch(base);
  const html = await res.text();
  const dom = new JSDOM(html);
  const links = Array.from(dom.window.document.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(href => href && !href.startsWith('http'));
  for (const link of links) {
    const url = base + (link.startsWith('/') ? link : '/' + link);
    const r = await fetch(url, { redirect: 'follow' });
    if (r.status >= 400) {
      console.error(`Navigation to ${url} failed with status ${r.status}`);
      server.kill();
      process.exit(1);
    }
  }
  console.log('Navigation simulation succeeded');
  server.kill();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
