import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function run(cmd, env = {}) {
  execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });
}

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) fail(msg);
}

function walkHtml(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkHtml(p));
    else if (e.isFile() && p.endsWith('.html')) out.push(p);
  }
  return out;
}

function extractMeta(raw, file) {
  const m = raw.match(/<!--\s*@meta\s*([\s\S]*?)-->/m);
  assert(m, `${file}: missing @meta block`);
  try { return JSON.parse(m[1].trim()); }
  catch (e) { fail(`${file}: invalid @meta JSON: ${e.message}`); }
}

function countWords(htmlSnippet) {
  const text = htmlSnippet.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return 0;
  return text.split(' ').length;
}

const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'));
assert(site.license_number === '6220430', 'site.json license_number must be 6220430');
assert(site.gbp && site.gbp.utm_profile && site.gbp.utm_appointment && site.gbp.review_url, 'site.json gbp settings are incomplete');
assert(!String(site.gbp.review_url).includes('__PASTE'), 'site.gbp.review_url still contains placeholder');
assert(Array.isArray(site.validation?.forbidden_strings), 'site.validation.forbidden_strings missing');

const layout = fs.readFileSync('src/partials/layout.html', 'utf8');
assert(layout.includes('class="skip-link" href="#main"'), 'layout missing skip-link');
assert(layout.includes('<main id="main">') || layout.includes('<main id="main"'), 'layout missing main#main');

for (const file of walkHtml('src/pages')) {
  const raw = fs.readFileSync(file, 'utf8');
  const meta = extractMeta(raw, file);
  assert((meta.title || '').length >= 10, `${file}: title too short`);
  assert((meta.description || '').length >= 50, `${file}: meta description too short`);
  assert(meta.pageType, `${file}: missing pageType`);
  assert(meta.indexable !== undefined, `${file}: missing indexable`);
  assert(!/<header[\s>]/i.test(raw), `${file}: page contains <header> (must use shared partial)`);
  assert(!/<footer[\s>]/i.test(raw), `${file}: page contains <footer> (must use shared partial)`);
}

for (const city of ['electrician-grand-rapids.html','electrician-holland.html','electrician-muskegon.html','electrician-grand-haven.html','electrician-allegan.html']) {
  const file = path.join('src/pages', city);
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/<h1>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  assert(m, `${file}: missing intro paragraph under h1`);
  const words = countWords(m[1]);
  assert(words >= 80 && words <= 120, `${file}: intro paragraph must be 80-120 words (found ${words})`);
  assert(raw.includes('<h2>Popular services'), `${file}: missing popular services section`);
  assert(raw.includes('<h2>FAQ</h2>'), `${file}: missing FAQ section`);
  assert(raw.includes('<!--@include decision-cta -->'), `${file}: missing decision CTA include`);
}

for (const svc of ['ev-chargers.html','generators.html','lighting.html','electrical-repairs.html','dedicated-circuits.html','code-corrections.html']) {
  const file = path.join('src/pages', svc);
  const raw = fs.readFileSync(file, 'utf8');
  assert(raw.includes('<h2>FAQ</h2>'), `${file}: missing FAQ section`);
  assert(raw.includes('<h2>Related services</h2>'), `${file}: missing related services section`);
  assert(raw.includes('<!--@include decision-cta -->'), `${file}: missing decision CTA include`);
}

const placeholders = execSync('rg -n "__PASTE_GOOGLE_REVIEW_LINK__" src/pages src/partials scripts src/data/site.json || true', { encoding: 'utf8' }).trim();
if (placeholders) {
  const allowed = placeholders.split('\n').every(line => line.includes('src/data/site.json'));
  assert(allowed, `placeholder found outside allowed validation list:
${placeholders}`);
}
run('npm run clean');
run('npm run build', { NODE_ENV: 'production' });
run('npm run verify');
run('npm run verify:zero-updates');
run('npm run verify:stability');

console.log('✅ Full sweep verification passed.');
