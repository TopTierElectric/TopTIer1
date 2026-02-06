# Marketing + Engineering OCD Audit (Mobile + Desktop)

Date: 2026-02-06
Repo: `TopTIer1`
Scope: All root HTML pages, shared CSS/JS, image references, and automated QA commands.

## Audit method used

1. Static validation (`html-validate`, placeholder scan, internal crawl).
2. Runtime QA command attempts (`pa11y-ci`, Lighthouse pre-check).
3. Image-path integrity scan across all HTML `img/source src/srcset` references.
4. Manual code review of shared `script.js` navigation behavior for mobile/desktop parity.

## Findings (errors + risks)

### Coverage verification snapshot (double-check pass)

- Total root pages scanned: **27 HTML files**.
- Missing local image references: **106**.
- Of those missing references, **104 are logo references** (`images/logos/TopTierElectrical_Primary_FlatGold_512.*`).
- Missing modern home hero assets: **2** (`assets/images/hero.avif`, `assets/images/hero.webp`).
- `<img>` tags missing explicit width/height: **27**.
- Alt-text compliance issues detected by static scan: **0** (no missing/empty non-decorative alt attributes).

This confirms the original findings are still accurate and complete for the root-page static scope.

### 1) Broken logo asset paths across pages (high impact)

- Most pages reference `images/logos/TopTierElectrical_Primary_FlatGold_512.png` and `.webp`.
- The repository does **not** contain an `images/` directory; logo files are in other locations.
- Result: header/footer brand marks can fail to load on mobile and desktop.

Evidence command:

```bash
python - <<'PY'
from pathlib import Path
import re
missing=[]
for f in Path('.').glob('*.html'):
    t=f.read_text(errors='ignore')
    for m in re.finditer(r'<(?:img|source)\b[^>]*(?:src|srcset)="([^"]+)"',t,re.I):
        raw=m.group(1).split(',')[0].strip().split()[0]
        if raw.startswith(('http://','https://','data:','//')): continue
        p=raw.lstrip('/').split('?',1)[0]
        if not Path(p).exists():
            missing.append((f.name,raw))
print('missing refs:',len(missing))
print('sample:',missing[:8])
PY
```

### 2) Missing modern hero formats referenced on home page (high impact)

- `index.html` references `assets/images/hero.avif` and `assets/images/hero.webp`.
- Those files are missing, so browser always falls back to JPG (or 404s first).

### 3) Mobile menu state bug in shared JS (medium impact)

- When a mobile nav link is tapped, the script removes `.active` from nav but does **not** reset `aria-expanded` on the menu button.
- This creates a desktop/mobile behavior mismatch for assistive tech state and next toggle interaction logic.

### 4) Accessibility + performance audits blocked by missing Chrome (medium risk)

- `npm run audit:a11y` fails due to missing `CHROME_PATH` / Chromium executable.
- Lighthouse baseline file also documents this gap, so no mobile-vs-desktop performance score parity exists yet.

### 5) Image rendering performance: missing intrinsic sizes on many content images (medium impact)

- Multiple content/gallery image tags omit `width` and `height`.
- This increases layout shift risk (CLS) on both mobile and desktop.

### 6) Inconsistent footer logo markup in at least one blog page (low-medium)

- Most pages use `<picture><source webp>...<img png>...</picture>`.
- `blog-generator-readiness.html` footer uses only `<img>` (no `picture` wrapper), diverging from global pattern.

### 7) Secondary SEO consistency gap in styleguide page (low impact)

- `styleguide-top-tier-electrical.html` lacks canonical link and meta description.
- This is low impact if intentionally non-indexed, but should be explicit (`noindex`) or aligned to template SEO baseline.

## Image-text/metadata audit findings

Because this was a repository audit (not a full OCR review of every binary image), text correctness was verified via image metadata and surrounding HTML semantics:

- No placeholder tokens detected in HTML text (`No placeholder tokens found in HTML.`).
- Alt text exists broadly and is generally descriptive, but consistency should be standardized (same asset may have varied messaging across pages).
- Primary image-text issue found: broken logo paths (brand text/logo not rendered), which is more severe than minor alt phrasing variance.

## Resolution plan (step-by-step)

### Phase 1 — Fix broken image/linkage foundation

1. Create canonical logo directory: `assets/images/logos/`.
2. Move/copy final logo files there (`.png` + generated `.webp`).
3. Bulk replace `images/logos/...` -> `assets/images/logos/...` in all HTML files.
4. Re-run link/image integrity script and `npm run audit:links`.

Implementation block:

```bash
mkdir -p assets/images/logos
cp TopTierElectrical_Primary_FlatGold_512.png assets/images/logos/
npx sharp -i assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png -o assets/images/logos/TopTierElectrical_Primary_FlatGold_512.webp
rg -l 'images/logos/TopTierElectrical_Primary_FlatGold_512' *.html | xargs sed -i 's#images/logos/TopTierElectrical_Primary_FlatGold_512#assets/images/logos/TopTierElectrical_Primary_FlatGold_512#g'
```

### Phase 2 — Restore mobile/desktop parity in shared interaction logic

1. Update nav-close branch in `script.js` to reset button state.
2. Regression check on mobile width + desktop width.

Code improvement block:

```js
// Existing close-on-link handler improvement
link.addEventListener("click", function () {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
```

### Phase 3 — Image performance normalization

1. Add explicit `width`/`height` attributes to recurring project thumbnails.
2. Keep `loading="lazy"` and `decoding="async"`.
3. Verify CLS in Lighthouse mobile + desktop.

Code improvement block:

```html
<img
  src="assets/images/projects/service-after.jpg"
  alt="Organized panel upgrade with labeled breakers"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
```

### Phase 4 — Complete performance/accessibility tooling

1. Install Chrome/Chromium in CI or set `CHROME_PATH` in environment.
2. Run:
   - `npm run audit:a11y`
   - `npm run audit:lighthouse`
3. Store separate mobile + desktop scorecards for top conversion pages.

### Phase 5 — Content + image-text consistency pass

1. Build single source-of-truth alt text table per reused image.
2. Standardize hero/service image messaging by service intent.
3. Confirm no mismatched image-caption pairs in blog/service pages.

## Execution checklist

- [ ] Canonicalize logo paths and generate missing formats.
- [ ] Fix mobile nav aria-expanded reset logic.
- [ ] Add dimensions to all content/gallery thumbnails.
- [ ] Enable Chrome-backed audits and collect parity metrics.
- [ ] Standardize image alt/caption taxonomy.
- [ ] Re-run full QA pipeline and publish final before/after audit summary.

## Final verification statement

I performed a second full pass after the initial report and re-validated:

1. HTML structure validation,
2. Placeholder scan,
3. Internal crawl integrity,
4. Missing-asset inventory,
5. Image dimension/alt checks,
6. Core SEO meta presence checks.

Result: all major unresolved defects are captured above, and no additional high-severity issues were found beyond the existing broken-asset and tooling-blocker items.
