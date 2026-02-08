# TopTier1 — Full Audit & “Top‑Tier” Upgrade Procedure (Cloudflare Pages)

This document compiles and **interprets the routing/security/CI plan**, plus a **full-site audit checklist** (routing, navigation, performance, SEO, accessibility, security, images, and conversion/CTAs), and gives **step-by-step implementation instructions with ready-to-paste code**.

> Notes about verification: where behavior depends on Cloudflare Pages runtime, verification steps are included using `wrangler pages dev` + `curl` to validate redirects/headers and to simulate real routing. Cloudflare’s official docs are cited for the platform behaviors.

---

## Verification addendum (repository-verified, recent activity)

This section records a direct verification pass against the current repository state and recent merged Codex activity.

### A) Recent merged Codex activity reviewed

- `Merge pull request #117` from `codex/conduct-full-audit-and-implementation-process`
- `Merge pull request #114` from `codex/add-ci-and-production-deployment-workflows`
- `Merge pull request #112` from `codex/add-navigation-check-script-with-wrangler`
- `Merge pull request #111` from `codex/create-check-redirects-script-for-cloudflare`

### B) What is verified as accurate right now

- Cloudflare-style extensionless canonical redirects are present in root `_redirects` (for example `/contact.html /contact 301`).
- Security headers and cache directives are present in root `_headers`.
- CI includes build, redirect syntax guard, extensionless policy checks, and navigation simulation (`check:navigation-sim`).
- Production deployment uses `cloudflare/wrangler-action@v3` and checks required Cloudflare secrets.
- `check:redirects-cloudflare` currently passes.
- `check:navigation-sim` currently passes under `wrangler pages dev`, including extensionless redirect + destination checks.

### C) Accuracy corrections to the procedural text

To keep this document fully accurate with implementation reality:

1. References to `public/_redirects` and `public/_headers` should be interpreted as **repository root** (`_redirects`, `_headers`) for this project.
2. References to output directory `dist/` should be interpreted as the current static-site output root (`.`), unless the project later adopts a build directory.
3. Terraform/OIDC/IaC checks are now wired in CI with conditional execution when `.tf` files exist (plus optional AWS OIDC configuration via repository Variables).

### D) Verification verdict

- Routing + redirect procedure: **Verified correct** against active scripts and runtime simulation.
- Header/security procedure: **Verified correct** against active `_headers` policy file.
- CI/deploy procedure: **Verified implemented** (Cloudflare checks/deploy are active, and Terraform/OIDC/IaC checks are implemented in CI when Terraform code is present).

---

## 0) Target end‑state (what “done” means)

### Hosting + routing

- Cloudflare Pages serves the site.
- Routing is controlled by:
  - Cloudflare Pages defaults (notably: `.html → extensionless` canonicalization)
  - A `_redirects` file (**Cloudflare Pages format**) in the build output directory
- **No redirects should fight the platform defaults** (avoid `/contact → /contact.html` style rules; it adds extra hops and makes canonicals messy).

Cloudflare `_redirects` rules:

- One rule per line: `[source] [destination] [code?]`
- Code defaults to `302`
- Lines that do not match the format are ignored
- Redirects are always followed even if an asset matches  
  (so you do not need “forced redirect markers”). citeturn33search0

### Security headers

- Enforced via `_headers` for static assets.
- If Pages Functions are used later, **headers must be set in Function code**, because `_headers` is not applied to Function responses. citeturn33search1turn33search0

### CI/CD + IaC posture

- PR CI runs:
  - Terraform fmt/validate/plan + IaC scan
  - Site build
  - Redirect syntax guard (prevents `301!` etc)
  - Navigation simulation against `wrangler pages dev` (high‑fidelity routing)
- Production deploy gated behind a GitHub **Environment** with approvals.
- **No long-lived AWS keys** in GitHub. Use GitHub Actions → AWS OIDC AssumeRole for AWS use cases (primarily Terraform state).
- Cloudflare deploy uses `cloudflare/wrangler-action@v3` with:
  - `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` stored as GitHub secrets  
    Cloudflare explicitly documents this recommended approach. citeturn34search1

---

## 1) What to fix first (highest impact “root causes”)

These are the issues that most commonly break routing, reduce conversion, or hurt performance/SEO.

### 1.1 `_redirects` parsing: **`301!` is invalid**

Cloudflare Pages only supports **numeric** status tokens in `_redirects`. Any `301!` / `302!` / `200!` style marker is not valid and will be ignored by the parser.  
Fix: `301! → 301`. (And add a CI guard so it can’t regress.)

Cloudflare docs confirm the format `[source] [destination] [code?]` and that lines not matching are ignored. citeturn33search0

### 1.2 Canonical URL policy: **extensionless is the canonical**

Cloudflare Pages canonicalizes `.html` to extensionless paths (example: `/contact.html → /contact`).  
Therefore:

- Internal links should be `href="/contact"` not `href="/contact.html"`
- Do **not** add redirects like `/contact /contact.html` (it reverses the canonical and adds a hop).

### 1.3 Security headers should live in `_headers` (static)

`_headers` is the Cloudflare Pages equivalent of `nginx_headers.conf` for static assets. citeturn33search1

### 1.4 High‑fidelity nav/routing tests: use `wrangler pages dev`

This is the closest local simulation of Pages routing (including `_redirects` and extensionless handling), so navigation tests should hit the local dev server rather than doing file-exists checks. citeturn34search4

---

## 2) Repo layout (portfolio-grade structure)

Recommended minimal structure (works for static or built sites):

```
.
├── public/                       # copied into build output
│   ├── _redirects
│   ├── _headers
│   ├── robots.txt
│   └── sitemap.xml               # or generated at build
├── scripts/
│   ├── check-redirects-cloudflare.mjs
│   └── check-navigation-sim.mjs
├── dist/                         # build output (example)
├── terraform/
│   ├── modules/
│   └── envs/
│       └── prod/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy-prod.yml
└── docs/
    └── IMAGE-SOURCES.md
```

> If you are “no-build” (pure HTML/CSS in repo root), then your “build output” is the repo root, and `_redirects/_headers` must be at that root. Cloudflare docs allow placing `_redirects`/`_headers` directly into the output directory if you’re not using a framework. citeturn33search0turn33search1

---

## 3) Routing implementation (Cloudflare-correct)

### 3.1 Author `_redirects` in `public/_redirects`

Cloudflare recommends placing `_redirects` in your static assets directory (commonly `public/` or `static/`) so it gets copied to the final output folder during build. citeturn33search0

**File:** `public/_redirects`

Use this as a clean baseline:

```txt
# Cloudflare Pages Redirects
# Format: [source] [destination] [code?]
# Notes:
# - Codes must be numeric (e.g., 301 not 301!)
# - Keep static redirects above dynamic ones
# - Don't fight Pages extensionless HTML handling

# Legacy explicit redirects (only if these URLs exist in the wild)
# /index.html -> /
/index.html / 301

# If you previously had "www" traffic, DO NOT attempt to do host-level redirects here.
# Cloudflare Pages does not support domain-level redirects in _redirects. Use Bulk Redirects or Redirect Rules.
```

Why we avoid host redirects in `_redirects`:

- Cloudflare Pages `_redirects` explicitly lists **domain-level redirects as unsupported**. citeturn33search0

#### www → apex (the correct way)

Use **Cloudflare Bulk Redirects** or Rules → URL Forwarding in Cloudflare dashboard to redirect:

- `www.example.com/*` → `example.com/$1` with `301` (or `308`)
  This belongs to Cloudflare zone-level rules, not Pages `_redirects`.

---

## 4) Headers implementation (Cloudflare-correct)

### 4.1 Create `public/_headers`

Cloudflare Pages supports `_headers` for static responses. citeturn33search1

**File:** `public/_headers`

```txt
/*
  # Security (baseline)
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

  # CSP: start strict, then relax only as needed.
  # NOTE: if you use Google Fonts, allow fonts.googleapis.com/fonts.gstatic.com.
  Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' https://static.cloudflareinsights.com; connect-src 'self' https://static.cloudflareinsights.com

  # HTML should revalidate
  Cache-Control: public, max-age=0, must-revalidate
```

Aggressive caching for fingerprinted assets:

```txt
/assets/*
  Cache-Control: public, max-age=31556952, immutable
```

> Cloudflare docs: `_headers` blocks are URL-pattern lines followed by indented `Name: Value` header lines. citeturn33search1  
> Also: `_headers` is not applied to Pages Functions responses. citeturn33search1

---

## 5) CI guards (redirect syntax + navigation simulation)

### 5.1 Redirect syntax guard

**File:** `scripts/check-redirects-cloudflare.mjs`

```js
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.env.PAGES_OUTPUT_DIR || "dist"; // adjust to your build output
const redirectsPath = path.join(OUT_DIR, "_redirects");

if (!fs.existsSync(redirectsPath)) {
  console.log(
    `[redirects] no ${redirectsPath} found (ok for repos that don’t use _redirects).`,
  );
  process.exit(0);
}

const content = fs.readFileSync(redirectsPath, "utf8");

// 1) reject invalid Netlify-style markers like "301!"
const badBang = content.match(/\b\d{3}!\b/g);
if (badBang?.length) {
  console.error(
    `[redirects] Invalid status token(s) found: ${[...new Set(badBang)].join(", ")}`,
  );
  console.error(
    `[redirects] Fix: replace 301! -> 301 (Cloudflare requires numeric status codes).`,
  );
  process.exit(1);
}

// 2) basic line format validation: ignore blank lines and comments
const lines = content.split(/\r?\n/);
let failed = false;

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i].trim();
  if (!raw || raw.startsWith("#")) continue;

  // Split on whitespace
  const parts = raw.split(/\s+/);

  // Cloudflare: [source] [destination] [code?]
  if (parts.length < 2 || parts.length > 3) {
    console.error(
      `[redirects] Line ${i + 1} invalid token count: "${lines[i]}"`,
    );
    failed = true;
    continue;
  }

  // If code exists, must be numeric
  if (parts.length === 3 && !/^\d{3}$/.test(parts[2])) {
    console.error(
      `[redirects] Line ${i + 1} invalid status code: "${lines[i]}"`,
    );
    failed = true;
  }
}

if (failed) process.exit(1);

console.log("[redirects] OK");
process.exit(0);
```

Cloudflare `_redirects` format reference: citeturn33search0

---

### 5.2 Navigation simulation against `wrangler pages dev`

This test:

- Starts `wrangler pages dev dist`
- Fetches a seed page (e.g., `/`)
- Extracts internal links
- Requests each link (follow redirects)
- Fails if final status is 4xx/5xx

**File:** `scripts/check-navigation-sim.mjs`

```js
import { spawn } from "node:child_process";

const BASE = "http://127.0.0.1:8788";
const OUTPUT_DIR = process.env.PAGES_OUTPUT_DIR || "dist";
const SEED_PATHS = ["/"]; // add "/services", "/contact" etc

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchOk(url, opts = {}) {
  const res = await fetch(url, { redirect: "follow", ...opts });
  return res;
}

function extractInternalLinks(html) {
  // Light-weight link extraction (works for static HTML)
  const links = new Set();
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1].trim();
    if (!href) continue;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("#")) continue;
    if (href.startsWith("http://") || href.startsWith("https://")) continue; // external
    // Normalize relative to root
    const normalized = href.startsWith("/")
      ? href
      : `/${href.replace(/^\.\//, "")}`;
    links.add(normalized.split("?")[0].split("#")[0]);
  }
  return [...links];
}

async function main() {
  // Start wrangler pages dev
  const child = spawn(
    "npx",
    ["wrangler", "pages", "dev", OUTPUT_DIR, "--port", "8788"],
    { stdio: "inherit" },
  );

  // Give it a moment to boot
  await sleep(2500);

  try {
    const toCheck = new Set(SEED_PATHS);
    const checked = new Set();

    // Crawl shallowly: fetch each html page once and extract links
    while (toCheck.size) {
      const path = toCheck.values().next().value;
      toCheck.delete(path);

      if (checked.has(path)) continue;
      checked.add(path);

      const url = `${BASE}${path}`;
      const res = await fetchOk(url);

      if (res.status >= 400) {
        throw new Error(`[nav] FAIL ${path} -> HTTP ${res.status}`);
      }

      const ct = res.headers.get("content-type") || "";
      if (ct.includes("text/html")) {
        const html = await res.text();
        for (const l of extractInternalLinks(html)) {
          // only crawl site pages (not images/css/js)
          if (/\.(png|jpe?g|webp|avif|svg|css|js|pdf)$/i.test(l)) continue;
          toCheck.add(l);
        }
      }
    }

    // Final pass: ensure everything resolves (including non-HTML routes)
    for (const path of checked) {
      const res = await fetchOk(`${BASE}${path}`);
      if (res.status >= 400) {
        throw new Error(`[nav] FAIL final ${path} -> HTTP ${res.status}`);
      }
    }

    console.log(`[nav] OK (${checked.size} routes checked)`);
  } finally {
    child.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

Wrangler `pages dev` is the intended local dev simulation for Pages + config. citeturn34search4

---

## 6) GitHub Actions (PR CI + Production gated deploy)

### 6.1 PR CI: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:

jobs:
  terraform:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: terraform/envs/prod
    steps:
      - uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.8.5

      - name: Terraform fmt (check)
        run: terraform fmt -check -recursive

      - name: Terraform init
        run: terraform init -input=false

      - name: Terraform validate
        run: terraform validate

      - name: Terraform plan (no apply)
        run: terraform plan -input=false -no-color

      - name: Trivy IaC scan
        uses: aquasecurity/trivy-action@0.24.0
        with:
          scan-type: config
          scan-ref: terraform/

  site:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Use Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install deps
        run: npm ci

      - name: Build
        run: npm run build

      - name: Guard Cloudflare _redirects syntax
        run: node scripts/check-redirects-cloudflare.mjs

      - name: Navigation simulation (Cloudflare Pages)
        run: node scripts/check-navigation-sim.mjs
```

### 6.2 Production deploy: `.github/workflows/deploy-prod.yml`

```yaml
name: Deploy Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    permissions:
      contents: read
      deployments: write

    steps:
      - uses: actions/checkout@v4

      - name: Use Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install deps
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=${{ secrets.CLOUDFLARE_PAGES_PROJECT }}
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

Cloudflare’s docs for CI Direct Upload show `wrangler-action@v3` and the required secrets. citeturn34search1

---

## 7) Site code audit: required fixes (Top‑Tier standard)

### 7.1 Navigation + routing correctness

**Goal:** zero 404s, zero redirect loops, minimal redirect hops.

Fixes:

1. **Internal links must use extensionless paths**:
   - ✅ `/contact`
   - ❌ `/contact.html` (creates an extra redirect hop due to Pages `.html → extensionless` behavior)

2. Ensure `_redirects` does not contain extensionless → `.html` redirects:
   - ❌ `/contact /contact.html 301`
   - ✅ rely on platform; optionally explicitly redirect `/.html` → extensionless only if you need to override legacy

3. Canonical tags must match the canonical URL strategy (extensionless):
   - `<link rel="canonical" href="https://example.com/contact">`

4. Add automated checks:
   - `node scripts/check-redirects-cloudflare.mjs`
   - `node scripts/check-navigation-sim.mjs`

Cloudflare redirect ordering and ignoring invalid lines: citeturn33search0

---

### 7.2 Security audit

**Goal:** strong baseline headers without breaking legitimate embeds.

Required:

- HSTS, nosniff, DENY framing, referrer policy, permissions policy
- CSP tuned to your real dependencies
- Use `_headers` for static; Functions must set headers in code. citeturn33search1

Verification commands:

```bash
# After running: npx wrangler pages dev . --port 8788
curl -I http://127.0.0.1:8788/
curl -I http://127.0.0.1:8788/assets/css/styles.css
```

Expected:

- `Strict-Transport-Security` present on HTTPS (prod)
- `Content-Security-Policy` present
- `Cache-Control` for assets is immutable

---

### 7.3 Accessibility audit (must-fix)

1. Mobile menu:
   - Ensure toggle sets `aria-expanded="true|false"` correctly every time.
2. Add focus-visible states for links/buttons.
3. Ensure images have alt text (or empty alt if decorative).
4. Ensure form fields have labels and error states.

Verification:

- `npx playwright test` (optional)
- `npx axe-cli http://127.0.0.1:8788/` (optional)

---

### 7.4 SEO audit (must-fix)

**Priority fixes**

1. **Unique `<title>` and meta description per page**
2. OG/Twitter meta tags:
   - `og:title`, `og:description`, `og:image` (1200×630), `og:url`
3. `robots.txt` + `sitemap.xml` in `public/`
4. Structured data:
   - Fix any inconsistent ratings (e.g., schema says 4.9 while page text says 5.0)
   - LocalBusiness schema for homepage
   - Service schema (optional) per service page
5. Ensure canonicals are extensionless.

---

### 7.5 Performance audit (must-fix)

**Top-tier baseline goals**

- LCP < 2.5s (mobile), CLS < 0.1, INP < 200ms
- No oversized images; all non-gallery images should be WebP/AVIF and responsive
- Hero image preloaded; below-the-fold images lazy-loaded
- Fonts:
  - use `font-display: swap`
  - preload critical WOFF2 (optional)
- Minimize render-blocking assets:
  - inline minimal critical CSS or load main CSS with good caching

Verification:

- `scripts/with-chrome-path.sh npx lighthouse http://127.0.0.1:8788/ --only-categories=performance,seo,accessibility,best-practices`

---

## 8) “Ultimate images” plan (legally safer stock process)

### 8.1 Legal-safety process (do this every time)

To keep this as close as possible to “no legal issues”:

1. Only use images from sites with a clear **free commercial-use license**, and keep the source record.
2. Save a record in `docs/IMAGE-SOURCES.md` including:
   - Page URL
   - Direct image URL
   - Author/photographer name
   - Download date
   - License page URL (for Pexels: https://www.pexels.com/license/)
3. Do **not** imply stock models are your employees. Avoid “Our Team” labels for stock people images.

### 8.2 Curated images (download links + recommended placement)

> These images are sourced from Pexels “Free to use” pages and include direct download URLs.

#### (A) Homepage hero background (wide)

- **Source page:** https://www.pexels.com/photo/an-electrician-inspecting-a-fuse-box-7359566/ citeturn20view0turn21view0
- **Direct download:**

```txt
https://images.pexels.com/photos/7359566/pexels-photo-7359566.jpeg?cs=srgb&dl=pexels-onbab-7359566.jpg&fm=jpg
```

- **Recommended repo path:** `assets/images/hero/electrician-fusebox-hero.jpg`

#### (B) “Service: Electrical Panels / Repairs”

- **Source page:** https://www.pexels.com/photo/an-electrician-working-on-switchboard-7359571/ citeturn16view0turn18view0
- **Direct download:**

```txt
https://images.pexels.com/photos/7359571/pexels-photo-7359571.jpeg?cs=srgb&dl=pexels-onbab-7359571.jpg&fm=jpg
```

- **Repo path:** `assets/images/services/panel-repair.jpg`

#### (C) “Service: Solar / Energy”

- **Source page:** https://www.pexels.com/photo/electricians-inspecting-the-solar-panels-4254161/ citeturn23view0turn25view0
- **Direct download:**

```txt
https://images.pexels.com/photos/4254161/pexels-photo-4254161.jpeg?cs=srgb&dl=pexels-gustavo-fring-4254161.jpg&fm=jpg
```

- **Repo path:** `assets/images/services/solar-inspection.jpg`

#### (D) “Service: Battery Storage”

- **Source page:** https://www.pexels.com/photo/technician-installing-home-battery-system-indoors-33751679/ citeturn24view0turn25view1
- **Direct download:**

```txt
https://images.pexels.com/photos/33751679/pexels-photo-33751679.jpeg?cs=srgb&dl=pexels-elite-power-group-661996115-33751679.jpg&fm=jpg
```

- **Repo path:** `assets/images/services/home-battery.jpg`

#### (E) “Service: Interior Lighting”

- **Source page:** https://www.pexels.com/photo/modern-ceiling-with-recessed-lighting-31735047/ citeturn14search8
- **Direct download:** (open the Pexels page and click “Free download”)
- **Repo path:** `assets/images/services/recessed-lighting.jpg`

#### (F) “Trust / Inspections / Safety”

- **Source page:** https://www.pexels.com/photo/a-man-in-green-vest-8293640/ citeturn29view0turn31view0
- **Direct download:**

```txt
https://images.pexels.com/photos/8293640/pexels-photo-8293640.jpeg?cs=srgb&dl=pexels-rdne-8293640.jpg&fm=jpg
```

- **Repo path:** `assets/images/sections/safety-inspection.jpg`

#### (G) “Residential Panel Inspection”

- **Source page:** https://www.pexels.com/photo/electrician-inspecting-residential-fuse-box-area-32497160/ citeturn30view0turn31view1
- **Direct download:**

```txt
https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?cs=srgb&dl=pexels-kathleen-austin-kuhn-2152973960-32497160.jpg&fm=jpg
```

- **Repo path:** `assets/images/sections/panel-inspection.jpg`

---

## 9) Image optimization procedure (must do for performance)

### 9.1 Convert + size correctly

For each image you add:

1. Create 2–3 sizes:
   - 640w, 1024w, 1600w (hero can go to 1920w)
2. Export to:
   - WebP (baseline)
   - AVIF (optional but best)
3. Keep originals in `assets/images/src/` and outputs in `assets/images/optimized/`.

Example CLI (using `sharp`):

```bash
npm i -D sharp
node scripts/optimize-images.mjs
```

### 9.2 Use `<picture>` with `srcset`

Example:

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /assets/images/optimized/electrician-fusebox-hero-1024.avif 1024w,
      /assets/images/optimized/electrician-fusebox-hero-1600.avif 1600w
    "
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcset="
      /assets/images/optimized/electrician-fusebox-hero-1024.webp 1024w,
      /assets/images/optimized/electrician-fusebox-hero-1600.webp 1600w
    "
    sizes="100vw"
  />
  <img
    src="/assets/images/optimized/electrician-fusebox-hero-1600.jpg"
    width="1600"
    height="1067"
    alt="Electrician inspecting an outdoor fuse box"
    fetchpriority="high"
    decoding="async"
  />
</picture>
```

For below-the-fold images:

- add `loading="lazy"`

---

## 10) Branding + UI polish (fonts, colors, widths, CTAs)

### 10.1 Layout tokens (CSS variables)

**File:** `assets/css/styles.css` (or your main CSS)

```css
:root {
  /* Colors */
  --bg: #0b0f14;
  --surface: #0f1720;
  --text: #e7eef7;
  --muted: #a7b4c4;

  --brand: #f59e0b; /* amber */
  --brand-2: #0ea5e9; /* electric blue */

  /* Typography */
  --font-sans:
    system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial,
    "Noto Sans", "Liberation Sans", sans-serif;
  --font-display: var(--font-sans);

  /* Layout */
  --container: 72rem; /* ~1152px */
  --gutter: clamp(1rem, 4vw, 2rem);

  /* Radius + shadow */
  --r-md: 14px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.container {
  width: min(var(--container), 100% - 2 * var(--gutter));
  margin-inline: auto;
}
```

### 10.2 CTA buttons (consistent conversion design)

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.1rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
}

.btn-primary {
  background: var(--brand);
  color: #111;
}

.btn-secondary {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.25);
  color: var(--text);
}

.btn:hover {
  transform: translateY(-1px);
}
.btn:active {
  transform: translateY(0);
}

.btn:focus-visible {
  outline: 3px solid rgba(14, 165, 233, 0.6);
  outline-offset: 3px;
}
```

### 10.3 CTA placement rules (what “top tier” sites do)

- Hero: Primary CTA (“Request Estimate”) + secondary CTA (“Call Now”)
- Every service page:
  - CTA after first section
  - CTA near testimonials
  - Sticky mobile CTA (optional)
- Contact page:
  - Phone CTA above form
  - Map + service area text + business hours structured for SEO

---

## 11) Final verification checklist (98% confidence gate)

Run locally:

```bash
npm ci
npm run build
npx wrangler pages dev . --port 8788
node scripts/check-redirects-cloudflare.mjs
node scripts/check-navigation-sim.mjs
scripts/with-chrome-path.sh npx lighthouse http://127.0.0.1:8788/ --only-categories=performance,seo,accessibility,best-practices
```

- If Lighthouse fails with `CHROME_PATH`/browser runtime errors, run through wrapper auto-provisioning first:

```bash
WITH_CHROME_AUTO_APT=1 scripts/with-chrome-path.sh npx lighthouse http://127.0.0.1:8788/ --only-categories=performance,seo,accessibility,best-practices --chrome-flags='--headless=new --no-sandbox' --output=json --output-path=reports/lh-pages.json
```

Manual checks:

- Visit:
  - `/contact` (loads)
  - `/contact.html` (redirects to `/contact`)
  - All nav links are extensionless
- Confirm headers:
  - CSP present and does not block fonts/scripts
- Confirm SEO:
  - `<title>` unique per page
  - canonical matches extensionless
  - sitemap lists extensionless URLs only

Deploy preview (optional):

- Use Pages Preview deploy and re-run the checks against the preview URL.

---

## 12) “Compatibility” notes

- `_redirects` and `_headers` must be in the static output directory:
  - If you build into `dist/`, ensure `public/` files are copied into `dist/`.
- `_redirects/_headers` do not apply to Pages Functions responses (static-only). citeturn33search0turn33search1
- Domain-level redirects are not supported in `_redirects` (use Bulk Redirects / Rules). citeturn33search0
- CI deploy should use Wrangler action and secrets as Cloudflare documents. citeturn34search1
- Wrangler configuration can specify `pages_build_output_dir` and is used by `wrangler pages dev`. citeturn34search4

---

## Appendix A — Image source record template

**File:** `docs/IMAGE-SOURCES.md`

```md
# Image Sources (License Record)

All images here are stock assets. Do not imply depicted individuals are employees.

## Template

- Local file: assets/images/...
- Source page: ...
- Direct download: ...
- Author: ...
- License: https://www.pexels.com/license/
- Download date: YYYY-MM-DD
- Notes: (crop/resize, where used)

## Entries

(…)
```
