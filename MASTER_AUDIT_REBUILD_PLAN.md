# MASTER AUDIT + REBUILD PLAN — TOP TIER ELECTRICAL (Cloudflare-only)

## 0) EXEC SUMMARY (≤1 page)

### Top 10 highest-ROI changes (ranked)
1) Pick ONE canonical hostname + enforce global 301 + consistent canonicals (www vs non-www currently both serve content).
2) Homepage above-fold “Trust Bar” rebuilt: MI license #, “Licensed & Insured”, review rating/count, “Code-aware workmanship”, response time + service area (West Michigan) beside primary CTA.
3) Testimonials page is placeholder-level → replace with real review engine (Google + selected longform quotes + photos).
4) Booking flow conversion uplift: shorten, clarify “what happens next”, add confirmation, reduce friction, add “call/text instead” micro-CTA.
5) Local SEO foundation: LocalBusiness/Electrician schema + Service schema on each service page + FAQ schema where appropriate.
6) Image optimization (biggest CWV lever): AVIF/WebP + srcset + lazy loading; fix MIME mismatches (.jpg served as image/png).
7) Service-page “Proof Stack” module: Recent work + review snippets + “What’s included” + “Permits/inspection readiness” above FAQ.
8) CTR rewrite for titles/meta (local intent + benefit + proof), ensure uniqueness.
9) Financing page credibility: name provider(s), link to terms, add disclosures + example ranges.
10) Cloudflare-only analytics + conversion events plan (Web Analytics beacon everywhere + CF-native conversions).

### Expected impact (if implemented cleanly)
- Leads: +20–60%
- Conversion rate: +15–40%
- Local SEO/CTR: +10–25% CTR uplift
- Perceived trust: major lift (real reviews, license clarity, proof photos standards)

### Risks + what NOT to do
- Don’t add heavy sliders/video backgrounds (CWV killers).
- Don’t use gold text on white for body text (contrast fail; gold is accent only).
- Don’t stuff city pages with near-duplicate content (thin/duplicate risk).
- Don’t add chat widgets/popups that cover CTAs on mobile.

---

## 1) LIVE SITE CRAWL + INVENTORY (VERIFY FIRST)

### Verified findings (crawl notes)
- Mandatory pages found and serving content (see inventory).
- Many .html endpoints appear to redirect to clean paths (observed via “Redirected to URL”).
- Service Areas page exists, but cities appear not linked to individual pages (bullets only).
- Domain canonicalization: www and non-www both serve pages (no forced redirect observed).
- Mobile vs desktop differences: NOT VERIFIED in this environment (procedure below).

---

### 1.1 URL inventory table (CSV-ready)

NOT VERIFIED fields (canonical, robots/indexing, meta descriptions, schema): tool view doesn’t expose <head> reliably.
Verification procedure:
- curl -sL URL | sed -n '1,120p' (title/meta desc/canonical)
- curl -sL URL | rg -n "application/ld\+json|schema\.org"
- curl -sI URL (status + cache headers)

```csv
URL,PageType,Status (observed),Canonical,Robots/Indexing,Title (len),MetaDesc (len),H1,PrimaryCTA,LocalSignals,SchemaPresence,Notes
https://www.toptier-electrical.com/,Home,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrician in West Michigan | Top Tier Electrical" (44),NOT VERIFIED,"Electrician for West Michigan Homes & Businesses","Call Now / Book / Emergency / Text","West Michigan; phone; Licensed & Insured (claims)","NOT VERIFIED","Hero includes estimate form + CTAs"
https://toptier-electrical.com/,Home (non-www),200 content served,NOT VERIFIED,NOT VERIFIED,"Top Tier Electrical | Trusted Electrician in West Michigan" (52),NOT VERIFIED,"Electrician for West Michigan Homes & Businesses","Call Now / Book / Emergency / Text","West Michigan; phone","NOT VERIFIED","Hostname not forced; must choose canonical"
https://www.toptier-electrical.com/services,Service Hub,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrical Services | West Michigan Electrician | Top Tier Electrical" (64),NOT VERIFIED,"Our Electrical Services","Explore service CTAs + Contact/Book","Mentions West Michigan; license in footer","NOT VERIFIED","Pricing ranges section present"
https://www.toptier-electrical.com/panel-upgrades,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrical Panel Upgrade & Service Upgrade | West Michigan Electrician" (69),NOT VERIFIED,"Panel Upgrades & Service Upgrades","Request estimate / Call","West Michigan","NOT VERIFIED","Includes pricing ranges"
https://www.toptier-electrical.com/ev-chargers,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"EV Charger Installation | West Michigan Electrician" (49),NOT VERIFIED,"EV Charger Installation","Request estimate / Call","West Michigan","NOT VERIFIED","Mentions Level 2"
https://www.toptier-electrical.com/lighting,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Lighting Installation & Fixtures | Custom Home Electrician" (57),NOT VERIFIED,"Lighting Installation & Fixtures","Request estimate / Call","West Michigan (sitewide)","NOT VERIFIED","Good opportunity for gallery proof strip"
https://www.toptier-electrical.com/electrical-repairs,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrical Repairs & Troubleshooting | West Michigan Electrician" (63),NOT VERIFIED,"Electrical Repairs & Troubleshooting","Request estimate / Call","West Michigan","NOT VERIFIED","Strong for FAQ + safety messaging"
https://www.toptier-electrical.com/energy-solutions,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Energy Solutions | West Michigan Electrician" (41),NOT VERIFIED,"Energy Solutions","Request estimate / Call","West Michigan","NOT VERIFIED","Add clearer offers + outcomes"
https://www.toptier-electrical.com/energy-consulting,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Energy Consulting | West Michigan Electrician" (42),NOT VERIFIED,"Energy Consulting","Request estimate / Call","West Michigan","NOT VERIFIED","Needs stronger productization"
https://www.toptier-electrical.com/generators,Service,200 content served,NOT VERIFIED,NOT VERIFIED,"Generator Installation | West Michigan Electrician" (47),NOT VERIFIED,"Generator Installation","Request estimate / Call","West Michigan","NOT VERIFIED","Add permit + sizing process"
https://www.toptier-electrical.com/contact,Contact,200 content served,NOT VERIFIED,NOT VERIFIED,"Contact Top Tier Electrical | West Michigan Electrician" (52),NOT VERIFIED,"Contact Top Tier Electrical","Submit form / Call / Email","Phone; service cities listed","NOT VERIFIED","Email appears obfuscated on www view"
https://www.toptier-electrical.com/booking,Booking,200 content served,NOT VERIFIED,NOT VERIFIED,"Book Electrical Service | Top Tier Electrical" (41),NOT VERIFIED,"Book Service","Submit booking","Phone; service cities listed","NOT VERIFIED","Needs conversion-focused reassurance + confirmation"
https://www.toptier-electrical.com/testimonials,Social Proof,200 content served,NOT VERIFIED,NOT VERIFIED,"Customer Feedback | Top Tier Electrical" (36),NOT VERIFIED,"Customer Feedback","(None strong) / Contact","Local signals minimal","NOT VERIFIED","Currently reads like placeholder (no real reviews shown)"
https://www.toptier-electrical.com/financing,Finance,200 content served,NOT VERIFIED,NOT VERIFIED,"Financing | Top Tier Electrical" (29),NOT VERIFIED,"Financing","Apply/Contact (generic)","Local signals minimal","NOT VERIFIED","Needs provider details + disclosures"
https://www.toptier-electrical.com/emergency,Emergency,200 content served,NOT VERIFIED,NOT VERIFIED,"Emergency Electrical Services | Top Tier Electrical" (48),NOT VERIFIED,"Emergency Electrical Services","Call Now","Emergency availability messaging","NOT VERIFIED","Add triage + what to do now"
https://www.toptier-electrical.com/gallery,Gallery,200 content served,NOT VERIFIED,NOT VERIFIED,"Gallery | Top Tier Electrical" (28),NOT VERIFIED,"Gallery","View/Contact","Proof photos (strong)","NOT VERIFIED","Main performance risk: many large images"
https://www.toptier-electrical.com/faq,FAQ,200 content served,NOT VERIFIED,NOT VERIFIED,"FAQ | Top Tier Electrical" (23),NOT VERIFIED,"Frequently Asked Questions","Call / Book","Local signals minimal","NOT VERIFIED","Ideal for FAQ schema"
https://www.toptier-electrical.com/blog,Blog index,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrical Blog & Resources | Top Tier Electrical" (43),NOT VERIFIED,"Blog & Resources","View Services / Schedule","Local signals in footer","NOT VERIFIED","Blog cards use project images"
https://www.toptier-electrical.com/blog-electrical-safety,Blog post,200 content served,NOT VERIFIED,NOT VERIFIED,"Electrical Safety Tips | Top Tier Electrical Blog" (45),NOT VERIFIED,"Electrical Safety Tips for Your Home","View Services / Schedule","Local signals in footer","NOT VERIFIED","Add internal links + FAQ block"
https://www.toptier-electrical.com/blog-right-electrician,Blog post,200 content served,NOT VERIFIED,NOT VERIFIED,"Choosing the Right Electrician | Top Tier Electrical" (51),NOT VERIFIED,"Choosing the Right Electrician","View Services / Schedule","Local signals in footer","NOT VERIFIED","Add “questions to ask” downloadable"
https://www.toptier-electrical.com/blog-ev-charging,Blog post,200 content served,NOT VERIFIED,NOT VERIFIED,"EV Charging at Home | Top Tier Electrical" (38),NOT VERIFIED,"EV Charging at Home","View Services / Schedule","Local signals in footer","NOT VERIFIED","Add EV rebate/permit notes (if applicable)"
https://www.toptier-electrical.com/blog-surge-protection,Blog post,200 content served,NOT VERIFIED,NOT VERIFIED,"Whole-Home Surge Protection | Top Tier Electrical" (47),NOT VERIFIED,"Whole-Home Surge Protection","View Services / Schedule","Local signals in footer","NOT VERIFIED","Add CTA to panel upgrades"
https://www.toptier-electrical.com/service-areas,Service areas,200 content served,NOT VERIFIED,NOT VERIFIED,"Service Areas | West Michigan Electrician" (38),NOT VERIFIED,"Service Areas","Call / Contact","Cities listed: Holland, Grand Rapids, etc.","NOT VERIFIED","Cities appear not linked"
```

### 1.2 Image/graphic inventory (ALL images found via crawl) — CSV-ready
Dims/bytes: NOT VERIFIED.
Verification procedure:

```
identify -format "%f %wx%h %b\n" assets/images/**
```

or script to read file sizes + generate srcset outputs.

```csv
PageURL,Section/Component,SrcPath,Format (observed),Dims/EstSize,Alt?,TrustScore(1-10),Issues,ExactFix
(sitewide),Header/Footer,assets/images/logo.svg,SVG,NOT VERIFIED,Yes,10,"Ensure logo used as-is (no redraw).","Lock aspect ratio; light/dark variants via CSS only; never recolor logo art."
/,Hero/Proof image,assets/images/projects/service-after.jpg,JPG,NOT VERIFIED,NOT VERIFIED,9,"Likely large; no srcset observed.","Generate AVIF/WebP + srcset; mark as LCP if above fold; preload ONLY if LCP."
/gallery,Grid image,assets/images/projects/barn-photo.jpg,JPG,NOT VERIFIED,Yes,9,"Potentially heavy; needs responsive.","Variants 480/768/1024/1536 + srcset/sizes + lazy."
/gallery,Grid image,assets/images/projects/IMG_8262.jpg,JPG,NOT VERIFIED,Yes,9,"Same.","Same."
/gallery,Grid image,assets/images/projects/IMG_0567.jpg,JPG,NOT VERIFIED,Yes,9,"Same.","Same."
/gallery,Grid image,assets/images/projects/3-phase-service.jpg,JPG,NOT VERIFIED,Yes,8,"Compress carefully.","AVIF for large; target <200KB @1024w."
/gallery,Grid image,assets/images/projects/480v-3-phase.jpg,JPG,NOT VERIFIED,Yes,8,"Same.","Same."
/gallery,Grid image,assets/images/projects/conduit.jpg,JPG,NOT VERIFIED,Yes,8,"Same.","Same."
/gallery,Grid image,assets/images/projects/conduit-piping.jpg,JPG,NOT VERIFIED,Yes,8,"Same.","Same."
/gallery,Grid image,assets/images/projects/control-work.jpg,JPG,NOT VERIFIED,Yes,8,"Reused as blog thumb.","Make dedicated blog thumb crops."
/gallery,Grid image,assets/images/projects/control-cabinet.jpg,JPG,NOT VERIFIED,Yes,8,"Reused as blog thumb.","Same."
/gallery,Grid image,assets/images/projects/dust-collector-system.jpg,JPG,NOT VERIFIED,Yes,8,"Same.","Same."
/gallery,Grid image,assets/images/projects/motor.jpg,JPG,NOT VERIFIED,Yes,7,"Same.","Same."
/gallery,Grid image,assets/images/projects/pipe-rack.jpg,JPG,NOT VERIFIED,Yes,7,"Same.","Same."
/gallery,Grid image,assets/images/projects/piping.jpg,JPG,NOT VERIFIED,Yes,7,"Same.","Same."
/gallery,Grid image,assets/images/projects/service-upgrade-before.jpg,JPG,NOT VERIFIED,Yes,7,"Before-photo use sparingly.","Use in before/after module with after image adjacent."
/gallery,Grid image,assets/images/projects/transformer.jpg,JPG,NOT VERIFIED,Yes,7,"Same.","Same."
/gallery,Grid image,assets/images/projects/lighting.jpg,JPG,NOT VERIFIED,Yes,7,"Same.","Same."
/gallery,Grid image,assets/images/projects/selenoids.jpg,served as image/png,NOT VERIFIED,Yes,7,"MIME mismatch (.jpg served as png).","Fix pipeline/headers so .jpg -> image/jpeg; re-encode to WebP/AVIF."
/gallery,Grid image,assets/images/projects/led-handrail.jpg,served as image/png,NOT VERIFIED,Yes,8,"MIME mismatch.","Fix MIME + re-encode + lazy."
/gallery,Grid image,assets/images/projects/led-shelves.jpg,served as image/png,NOT VERIFIED,Yes,8,"MIME mismatch.","Fix MIME + re-encode."
/gallery,Grid image,assets/images/projects/electrical-project-49-1200.jpg,served as image/png,NOT VERIFIED,Yes,8,"MIME mismatch + naming.","Regenerate properly; standardize naming."
/gallery,Grid image,assets/images/projects/fire-response.jpg,NOT VERIFIED,NOT VERIFIED,Yes,6,"Crawler parse error; possible header/corrupt.","Re-upload/re-encode; confirm direct open; ensure proper Content-Type."
/blog,Blog card image,assets/images/projects/kitchen-led.jpg,JPG,NOT VERIFIED,Yes,8,"Topic mismatch risk if reused.","Create topic-specific hero/thumb images."
/blog,Blog card image,assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg,JPG,NOT VERIFIED,Yes,5,"Stock/Unsplash less authentic.","Prefer real EV install; if stock, consistent grade/crop/caption."
```

### 1.3 Mobile vs desktop differences (NOT VERIFIED)
Why: environment can’t reliably render responsive UI deltas.

Verification procedure:

Chrome DevTools device widths: 360×800, 390×844, 768×1024, 1280×800.

For each key page: ensure primary CTA visible without scroll; tap targets ≥44px.

Record: LCP element, CLS shifts, sticky elements covering content.

Run Lighthouse Mobile on /, /services, /booking, /contact, /gallery.

## 2) COMPETITOR + BEST-IN-CLASS BENCHMARKING (MUST BROWSE)
10 best-in-class (national) — what to borrow

Lenhart Electric (FL) — strong proof + team + service categorization.

Gibbs Electric Company (CA) — bold brand positioning + proof loop.

The Electric Connection (CA) — license above fold + years + NAP clarity.

Mr. Electric (national) — IA + estimate clarity + FAQ depth.

Mister Sparky (national) — IA + emergency messaging + local pages.

Green Electrical Solutions (CO) — code/quality emphasis + team bios.

Obot Electric (WA) — premium positioning + quote clarity + testimonials on homepage.

CSI Electrical Contractors — safety culture pages + leadership trust.

Kollmann Electric (WI) — simple IA + direct contact UX.

Lanehart Electrical Contractors (TX) — location architecture + reputation narrative.

5 regional/Michigan patterns to borrow

Hoekstra Electric — professional nav + services clarity.

Haveman Electrical & Plumbing — trust + request service framing.

VerPlank Electric — professional positioning + services clarity.

Butler Electric — straightforward IA + local clarity.

Wireworks Electric (GR area) — schedule estimate conversion focus.

3 premium HVAC/plumbing “trust architecture” exemplars

Service Champions — offer clarity + financing + proof-heavy layout.

Hiller — process clarity + “what to expect”.

Benjamin Franklin Plumbing — trust scaffolding + offers.

Pattern library of winning sections

Hero: local outcome headline + 1 primary CTA + 1 secondary (text/call) + 3 trust bullets + rating strip.

Proof: rating strip below hero; 3 review cards mid; “Recent Work” above final CTA.

Service pages: “What’s included / Options / Pricing factors / FAQ / Proof / CTA”.

About/Team: owner story + headshots + code/safety stance + license clarity.

Guarantees: scoped workmanship warranty + transparent estimate framing.

Contact UX: 2-step form + “what happens next” + appointment windows; always show call/text.

Avoid: coupon dump, stock overload, popups, heavy JS widgets.

## 3) BRAND SYSTEM REBUILD (LOGO-CENTERED)
Logo integrity lock (VERIFIED constraint)

Use ONLY provided logo files as-is. No redraw. No proportion changes. Clean crop only.

NOT VERIFIED: logo files accessible in this runtime; verify repo paths:

/mnt/data/TopTierElectrical_Primary_FlatGold_2048.png

/mnt/data/TopTierElectrical_Primary_Black_2048.png

/mnt/data/TopTierElectrical_Primary_White_2048.png

### 3.1 Color system (tokens + usage rules + WCAG)
Verified brand colors:

Gold #D4AF37

Black #000000

White #FFFFFF

Contrast note:

Gold on white ≈ 2.10:1 (FAIL for normal/large text)
Rules:

Gold as accent/border/bg; do NOT use gold text on white for body.

Use black text on gold backgrounds (passes).

Neutral extensions (brand-safe):

Ink #0B0B0C

Slate #2A2E34

Muted #6B7280

Surface #F7F5EF

Hairline #E7E1CF

### 3.2 Typography system (NOT VERIFIED current fonts)
Recommendation (premium + performant):

Headings: Manrope 600–800

Body: Inter 400–600

Self-host WOFF2; preload only above-fold weight.
Type scale:

H1 48/56 (desktop), 34/40 (mobile)

H2 32/40

H3 24/32

Body 16/24

Small 14/20

### 3.3 UI components
Buttons: Primary (Ink bg + white text), Accent (Gold bg + ink text), Ghost (transparent + ink border)

Forms: 44px min height, real labels, inline validation, success state

Cards: service, proof, review, FAQ accordion

Nav: sticky, 1 primary CTA, persistent phone

Footer: NAP + license + service areas + review link

### 3.4 Design tokens
A) CSS variables

:root {
  --brand-gold: #D4AF37;
  --brand-ink: #0B0B0C;
  --brand-black: #000000;
  --brand-white: #FFFFFF;

  --surface: #F7F5EF;
  --surface-2: #FFFFFF;
  --border: #E7E1CF;
  --text: #0B0B0C;
  --text-muted: #2A2E34;
  --text-subtle: #6B7280;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 22px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 8px 24px rgba(0,0,0,.10);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
B) Tailwind mapping (ONLY if Tailwind exists; NOT VERIFIED)

export default {
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        ink: "#0B0B0C",
        surface: "#F7F5EF",
        border: "#E7E1CF",
        muted: "#2A2E34",
        subtle: "#6B7280",
      },
      borderRadius: { sm: "10px", md: "16px", lg: "22px" },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,.06)",
        md: "0 8px 24px rgba(0,0,0,.10)",
      },
    },
  },
};

## 4) TRUST ARCHITECTURE (THE TRUST STACK)
Trust objects

Identity: Licensed & Insured + MI License # + local team

Proof: rating/count + 3 featured reviews + gallery strip

Process: 3-step “Assess → Quote → Complete & Inspect”

Quality: code-aware workmanship + inspection readiness + clean installs

Risk reversal: scoped workmanship warranty + transparent estimate framing

Availability: emergency pathway + response expectations

Local authenticity: service cities + real project photos

Trust map by template

Home:

Above fold: Trust bar + rating + license

Mid: Recent work + 3 reviews

Near CTA: What happens next + response promise

Footer: NAP + license + cities

Service pages:

Above fold: proof chips + service badge

Mid: What’s included + permits/inspection + proof images

Near CTA: pricing factors + FAQs + review strip

Booking:

Above fold: 2-min promise + what next + call/text fallback

After submit: confirmation + next steps

Testimonials:

rating + filters + longform reviews + Google link

Gallery:

captions + service type + city (if allowed)

FAQ:

CTA + anchors + FAQ schema

Financing:

provider + examples + disclosure

Emergency:

triage checklist + when to call 911 vs electrician

## 5) VISUAL ASSET UPGRADE PLAN (HERO + BACKGROUNDS + PHOTOS)
### 5.1 Homepage hero concepts
A) Trusted Local Pro:

Electrician in clean uniform + branded vehicle; subject right, copy left; subtle ink gradient overlay.

Mobile: chest-up; AVIF/WebP; <180KB @1200w; srcset 480–1600.
B) Premium Craftsmanship:

Clean panel/conduit install close-up; copy on warm surface panel w/ gold border; black text.
C) Home Upgrade:

Real EV/lighting upgrade photo; avoid stock if possible.

### 5.2 Background imagery system
Use surface/white backgrounds + hairline borders; gold as thin accents only.

No noisy textures; minimal geometric line pattern at 2–4% opacity if used.

### 5.3 Service imagery system (shot list)
Panel: before/after + labeling + meter/service change

EV: installed unit + conduit + breaker + finished wall plate

Lighting: finished fixture + switch + safe ladder shot

Repairs: diagnostic (non-scary), thermal scan if used

Generators: transfer switch + pad + conduit + inspection-ready

### 5.4 Image optimization rules
Generate AVIF + WebP + fallback

srcset widths: 480, 768, 1024, 1280, 1600

Lazy-load below fold; do NOT lazy LCP

Naming: service-panel-upgrade-after-01_1280w.avif

Alt: describe outcome/object; no keyword spam

## 6) PAGE-BY-PAGE IMPROVEMENT BLUEPRINT (DETERMINISTIC)
Implementation convention (static HTML observed):

Clean routes likely map to *.html (e.g., /faq ← faq.html) with redirects.

When selectors unknown (NOT VERIFIED), use repo search-string method:

rg -n "Electrician for West Michigan Homes" -S (homepage hero block)

rg -n "Customer Feedback" -S (testimonials)

rg -n "Book Service" -S (booking form)
Add stable hooks like data-ui="hero", data-ui="trustbar".

Global (all pages)
Canonical host enforcement

Fix: Cloudflare Pages _redirects + <link rel="canonical"> per page.

Acceptance: non-canonical 301s; canonical tags correct.

Testimonials rebuild

Fix: rating + count + 12–30 real reviews + Google link + photos.

Where: testimonials.html (search "Customer Feedback").

Image performance + MIME fixes

Fix: correct content-types + AVIF/WebP + responsive srcset + lazy rules.

Acceptance: .jpg served as image/jpeg; LCP <200KB; gallery thumbs <80KB.

/ (homepage) — index.html
Add above-fold trust bar (license, insured, rating/count, local) beside CTA.

Add proof strip (“Recent Work” 3 images + captions).

Add “What happens next” under form.

Add internal links to /services + key service pages + /service-areas.

Acceptance: above fold includes trust bar + CTA + proof element.

/services — services.html
Service cards with 1-sentence benefit + Learn more.

Residential/Commercial/Energy splits.

Add FAQ block + FAQ schema.

Add internal links to all service pages.

Service pages (panel/ev/lighting/repairs/energy/generators)
Template:

Above fold: proof chips row.

“What’s included” checklist.

“Recent Work” 3 images.

“Pricing factors” block.

5 FAQs + FAQ schema.

/contact — contact.html
Standardize NAP block + service area line.

Add response expectations (only if true).

Ensure form labels + success state.

Add Google review link button.

/booking — booking.html
2-column layout: form + trust/what-next.

Inline call/text fallback.

Confirmation UI + next steps.

Backend if needed: Pages Function /api/booking.

/testimonials — testimonials.html
Full proof page: rating summary + filter groups + 12–30 reviews + case-study highlights.

/financing — financing.html
Provider name(s) + apply link + disclosures.

Example ranges (only if accurate).

/emergency — emergency.html
Triage checklist + scenarios; add ETA expectations only if true.

/gallery — gallery.html
Filters (lightweight JS) + captions + alt improvements.

Generate thumbnails; don’t load full-res grid.

/faq — faq.html
Accordion + deep links (#question-slug) + FAQ schema.

Add CTA to contact/booking.

/blog + posts
Add author + dates + categories.

Each post: related service CTA mid + bottom; add 3–5 internal links per post.

Add “local angle” paragraph without stuffing.

## 7) LOCAL SEO + TECHNICAL SEO + CTR
NAP + GBP alignment checklist

Keep NAP consistent sitewide and in GBP.

Phone: (616) 334-7159 (verify matches GBP).

If no public address, configure GBP as service-area business.

Sitemap/robots/canonicals (NOT VERIFIED current)

Publish sitemap.xml with canonical URLs

Publish robots.txt referencing sitemap

Ensure canonical tags in <head> for each page

Schema plan (JSON-LD)

Sitewide: LocalBusiness/Electrician

Service pages: Service

FAQ pages/sections: FAQPage

Reviews: only if compliant (on-page and properly sourced)

LocalBusiness JSON-LD skeleton

```
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Electrician",
  "name":"Top Tier Electrical",
  "url":"https://www.toptier-electrical.com/",
  "telephone":"+1-616-334-7159",
  "areaServed":["Holland MI","Grand Rapids MI","Byron Center MI","Zeeland MI","Saugatuck MI","Hudsonville MI"],
  "sameAs":["PASTE_GBP_URL_HERE"]
}
</script>
```

Title/meta rewrite plan (CTR + local intent)

Home: Electrician in West Michigan | Licensed & Insured | Top Tier Electrical

Panel: Panel Upgrades in West Michigan | Service Changes & Load Calculations

EV: EV Charger Installation in West Michigan | Level 2 Home Charging

Repairs: Electrical Repairs in West Michigan | Troubleshooting & Safe Fixes

Emergency: Emergency Electrician in West Michigan | Call 24/7
(Ensure each page is unique.)

Content clusters + linking

Safety/Code: blog-electrical-safety → electrical-repairs → faq

Panels/Surge: panel-upgrades ↔ blog-surge-protection

EV: ev-chargers ↔ blog-ev-charging

Lighting: lighting → gallery filtered lighting

Backup power: generators → financing → booking

## 8) CONVERSION + ANALYTICS (CLOUDFLARE-ONLY)
Primary conversions

tel: click

sms: click

form submit (contact/estimate)

booking submit

Cloudflare Web Analytics beacon (sitewide)

```
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token":"REPLACE_WITH_REAL_TOKEN"}'></script>
```

Conversion events (Cloudflare-native)
NOT VERIFIED whether your current CF WA supports custom events in your setup; safest CF-native options:

Cloudflare Zaraz for event tracking

Server-side logging via Pages Functions endpoints

Client-side event hooks (agnostic)

```
<script>
  function tteTrack(eventName, meta) {
    window.dispatchEvent(new CustomEvent("tte:track", { detail: { eventName, meta } }));
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    if (a.href.startsWith("tel:")) tteTrack("call_click", { href: a.getAttribute("href") });
    if (a.href.startsWith("sms:")) tteTrack("text_click", { href: a.getAttribute("href") });
  });
</script>
```

Call/text tracking + UTMs (without breaking NAP)

Keep canonical phone visible everywhere.

If tracking numbers, use dynamic insertion for paid channels only; keep GBP consistent.

## 9) PERFORMANCE + ACCESSIBILITY + “PREMIUM FEEL” ENGINEERING
CWV checklist

LCP: optimized hero + correct loading priority

CLS: reserve space for images/fonts; stable header

INP: minimal JS; no heavy sliders

Font loading

Self-host WOFF2; font-display: swap; preload only critical WOFF2.

Images

AVIF/WebP + srcset; lazy below fold; do not preload non-LCP.

Reduce JS bloat

Tiny vanilla JS for nav + filters; avoid heavy frameworks unless needed.

Accessibility

Visible focus rings; real labels; keyboard nav; contrast-safe colors.

Cloudflare caching & compression

Enable Brotli

Cache assets long, HTML short via _headers + Cache Rules.

_headers example

```
/
/*
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

## 10) IMPLEMENTATION BACKLOG (≥30 items, CSV)
Priority,Impact(1-10),Confidence(1-10),URLs,Section/Component,WorkType,Steps,AcceptanceCriteria,VerificationChecklist
P0,10,9,ALL,Hostname canonicalization,SEO/Infra,"Force www or non-www via _redirects; set canonicals","Single canonical; 301 from other host","curl -I both hosts; check canonical tag"
P0,10,8,/testimonials,Testimonials rebuild,CRO/Content,"Add rating strip + 12+ reviews + Google link","Real proof visible","Manual review; link works"
P0,9,8,/,Above-fold trust bar,CRO/UI,"Add license+insured+rating+local next to CTA","Trust visible without scroll","Mobile+desktop check"
P0,9,7,/booking,Booking UX,CRO/UI,"Add what-next, reduce friction, add confirmation","Form completion rate up","Test submit; confirm success UI"
P0,9,7,/gallery,Image optimization,Perf,"Generate AVIF/WebP/srcset; lazy grid","LCP/bytes reduced","Lighthouse; network payload"
P0,8,8,ALL,CF beacon everywhere,Analytics,"Add CF beacon to every HTML file","Beacon loads on all pages","View source; CF dashboard"
P0,8,7,"/services + service pages",Service proof module,CRO/UI,"Add recent work strip + reviews + checklist","Proof near CTAs","Visual review"
P0,8,7,/contact,NAP + response expectations,Local SEO/CRO,"Standardize NAP; add reply SLA","Clarity improved","Check footer/header/contact"
P0,8,6,/faq + service FAQs,FAQ schema,SEO,"Add FAQPage JSON-LD","Valid schema","Rich results test"
P1,8,6,/financing,Provider details,Trust/CRO,"Name provider(s), link, disclosures","Credible financing page","Manual review"
P1,7,7,/blog,Blog images topic-fit,Brand/Trust,"Replace mismatched thumbs; add captions","More coherent","Manual review"
P1,7,6,ALL,Heading hierarchy,SEO/A11y,"Single H1; logical H2/H3","Improved structure","HTML audit"
P1,7,6,/,Internal links to services,SEO,"Add 6 deep links with anchors","Better crawl/UX","Check links"
P1,7,6,/service-areas,City pages strategy,SEO,"Decide: real city pages or keep single page","No thin content","Content review"
P1,7,6,ALL,Footer rebuild,Brand/SEO,"Add consistent NAP + license + links","Trust improved","Visual review"
P1,6,7,/emergency,Emergency triage module,CRO/Content,"Add do-now checklist + scenarios","Higher urgency conversion","Manual review"
P1,6,6,/panel-upgrades,Surge CTA integration,CRO,"Cross-link surge post + panel page","More internal flow","Check anchors"
P1,6,6,/ev-chargers,Permit/process clarity,Trust,"Add steps + what we handle","Reduced objections","Manual review"
P1,6,6,ALL,Button hierarchy,UI,"1 primary CTA per section","Cleaner UI","Visual review"
P2,6,5,ALL,Gallery filters,UX,"Add lightweight filter JS","Better browsing","Test filters"
P2,6,5,ALL,Case studies template,Content,"Add 3 case studies","More proof","Manual review"
P2,5,6,ALL,Icon system,Brand,"Consistent stroke icons","Premium feel","Visual review"
P2,5,6,ALL,Microcopy polish,CRO,"Tighten CTAs, remove fluff","Higher clarity","Copy review"
P2,5,5,ALL,404 page,UX/SEO,"Add helpful 404 with links","Lower bounce","Test 404"
P2,5,5,ALL,Open Graph tags,SEO/Share,"Add OG tags per page","Better share previews","Meta check"
P2,5,5,ALL,Accessibility pass,A11y,"Focus states, labels, contrast","WCAG improvement","Keyboard-only test"
P2,5,5,ALL,Sitemap.xml,SEO,"Generate and publish sitemap","Indexed coverage","Search Console"
P2,5,5,ALL,Robots.txt,SEO,"Publish robots w/ sitemap","Crawler clarity","Fetch robots"
P2,5,4,ALL,Pages Functions form handling,Infra,"Add /api/contact & /api/booking","Reliable delivery","Submit test + logs"
P2,4,6,ALL,Cache policy hardening,Perf,"_headers + CF cache rules","Faster repeat loads","Header verification"
P2,4,5,ALL,MIME correctness for assets,Perf,"Fix content-type for images","No mismatches","curl -I assets"

## 11) DEPLOYMENT PROCESS — CLOUDFLARE PAGES/WORKERS ONLY
Cloudflare Pages setup

Connect GitHub repo → Cloudflare Pages project.

Build:

If static HTML: no build command (or your generator command)

Output dir: repo root or dist/ (NOT VERIFIED; set correctly)

Domain:

Add toptier-electrical.com + www.toptier-electrical.com in Cloudflare DNS

Enforce HTTPS

Canonical redirect using _redirects
Choose one. Example: force www:

https://toptier-electrical.com/* https://www.toptier-electrical.com/:splat 301!
Caching

Use _headers (Section 9) + Cloudflare Cache Rules.

Purge on release (Pages deploy) + manual purge if needed.

Analytics

Replace placeholders with Cloudflare Web Analytics beacon snippet on every page.

Replace YOUR_CLOUDFLARE_ANALYTICS_TOKEN with real token in faq.html and replicate across all HTML files.

Workers/Pages Functions (optional forms)

Implement /api/contact + /api/booking for POST, validation, rate limiting, forward to email/CRM.

Validate end-to-end with submit tests + logs.

