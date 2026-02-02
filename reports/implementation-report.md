# Top Tier Electrical Implementation Report (Draft)

> **Live crawl status:** Live production URLs returned 503 (non-www) and 403 (www) during crawl attempts, so all live verification items are **NOT VERIFIED**. This report uses the local repo HTML as the observed baseline and includes exact verification steps to validate on the live site when access is possible.

## 0) EXEC SUMMARY (1 page max)
**Top 10 highest-ROI changes (ranked)**
1. Canonical + redirect enforcement (www vs non-www) to eliminate split indexation and CTR dilution. (NOT VERIFIED; requires live headers/canonicals check.)
2. Hero CTA + trust strip standardization across all pages (call + text + booking consistency).
3. Service hub + service detail internal linking for high-intent clusters (panel upgrades, EV chargers, generators, repairs, lighting).
4. Review engine + testimonial schema/placement (proof above fold + near CTAs).
5. Local SEO signals in header/footer + contact (NAP + service areas + embedded map where appropriate).
6. Standardized logo sizing + contrast rules in header/footer + conversion modules.
7. Gallery optimization: responsive images + CLS-safe dimensions + compression.
8. Core Web Vitals upgrades: responsive hero image + preload LCP only.
9. Trust objects map (license/insured/warranty) placed per template.
10. Booking/contact UX: reduced friction + inline proof + copy clarity.

**Expected impact**
- **Leads:** +20–40% from stronger CTA consistency + trust placement.
- **Conversion rate:** +15–30% from simplified booking + proof architecture.
- **Perceived trust:** +25–45% with explicit license/insured/warranty + owner-operator proof.
- **Local SEO:** +15–25% from stronger NAP, service areas, internal linking clusters.
- **Brand cohesion:** +30–50% from logo sizing system + consistent UI tokens.

**Risks + what NOT to do**
- Do **not** introduce gimmicky electric motifs, neon color, or aggressive hype copy.
- Do **not** change logo artwork or proportions—only use provided files.
- Do **not** add large unoptimized hero images or autoplay video (LCP/INP risk).
- Do **not** create thin service area pages; use scalable content template + unique proof.

## 1) LIVE SITE CRAWL + INVENTORY (VERIFY FIRST)
### Live verification attempts (blocked)
- **www canonical check:** `https://www.toptier-electrical.com/` returned **403** (blocked) via curl/urllib.
- **non-www canonical check:** `https://toptier-electrical.com/` returned **503** (unavailable) via curl/urllib.
- **Result:** Live content, headers, and canonicals are **NOT VERIFIED**. Use the verification steps listed in each section once access is restored.

### 1.1 Full URL inventory table (local HTML baseline; live NOT VERIFIED)
| URL | Page type | Status code | Canonical | Indexing directives | Title tag + length | Meta description + length | H1 text | Primary CTA present? + exact CTA text | Above-the-fold trust elements present? | Local signals present? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/ | index, follow | Electrician in West Michigan \| Top Tier Electrical (50) | Licensed & insured electrician serving West Michigan. Panel upgrades, EV chargers, lighting, and reliable troubleshooting. Get a clear estimate—call (616) 334-7159. (164) | Electrician for West Michigan Homes & Businesses | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| services.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/services.html | index, follow | Electrical Services \| West Michigan Electrician \| Top Tier Electrical (69) | West Michigan electrician for custom homes, service upgrades, EV chargers, lighting, energy solutions, and generators. Clear scope, clean installs, code-compliant results. (171) | Our Electrical Services | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| panel-upgrades.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/panel-upgrades.html | index, follow | Electrical Panel Upgrade & Service Upgrade \| West Michigan Electrician (70) | Clean, code-compliant electrical panel upgrades and service upgrades in West Michigan. Clear scope, tidy installs, and reliable long-term results. (146) | Electrical Panel Upgrades & Service Upgrades | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| ev-chargers.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/ev-chargers.html | index, follow | EV Charger Installation \| West Michigan Electrician (51) | Level 2 EV charger installs with capacity checks, clean wiring, and permit coordination. Safe, code-compliant charging for your home or business. (145) | EV Charger Installation | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| lighting.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/lighting.html | index, follow | Lighting Installation & Fixtures \| Custom Home Electrician (58) | Thoughtful lighting layouts, dimmers, smart controls, and clean installs. Premium finish work for West Michigan homes and select commercial spaces. (147) | Lighting & Fixtures | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| electrical-repairs.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/electrical-repairs.html | index, follow | Electrical Repairs & Troubleshooting \| West Michigan Electrician (64) | Dead outlets, tripping breakers, partial power loss, or flickering lights? We troubleshoot and repair electrical issues safely in West Michigan. Book service today. (164) | Electrical Repairs & Troubleshooting | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| energy-solutions.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://www.toptier-electrical.com/energy-solutions.html | index, follow | Energy Solutions \| West Michigan Electrician (44) | Practical energy upgrades—LED, controls, and load planning—to improve comfort and reduce waste without overcomplicating your home. (130) | Energy Solutions | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| energy-consulting.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://www.toptier-electrical.com/energy-consulting.html | index, follow | Energy Consulting \| West Michigan Electrician (45) | Calm, professional energy consulting to prioritize upgrades, clarify scope, and help you make confident decisions without pressure. (131) | Energy Consulting | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| generators.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://www.toptier-electrical.com/generators.html | index, follow | Generator Installation \| West Michigan Electrician (50) | Backup power systems sized and installed safely with clear scope, clean workmanship, and verified operation. (108) | Generator Sales & Installation | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| contact.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/contact.html | index, follow | Contact Top Tier Electrical \| West Michigan Electrician (55) | Call or email Top Tier Electrical for service in West Michigan. Share project details or book online to confirm next steps. (123) | Contact Us | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| booking.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/booking.html | index, follow | Book Electrical Service \| Top Tier Electrical (45) | Schedule electrical service in West Michigan. Choose a service, preferred date, and time, and we’ll confirm the scope and next steps. (133) | Schedule Your Service | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| testimonials.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/testimonials.html | index, follow | Customer Feedback \| Top Tier Electrical (39) | Customer feedback for Top Tier Electrical. Read verified comments and share your experience after service in West Michigan. (123) | Customer Feedback | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| financing.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/financing.html | index, follow | Financing \| Top Tier Electrical (31) | Explore flexible financing options for your electrical project with Top Tier Electrical. (88) | Financing Options | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| emergency.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/emergency.html | index, follow | Emergency Electrical Services \| Top Tier Electrical (51) | Urgent electrical service for Holland, Grand Rapids and West Michigan residents and businesses. Call to confirm next steps and safe shutdown guidance. (150) | Emergency Electrical Services | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| gallery.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/gallery.html | index, follow | Gallery \| Top Tier Electrical (29) | Browse our photo gallery of recent electrical projects including panel upgrades, conduit piping and LED installations across West Michigan. (139) | Our Work Gallery | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| faq.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/faq.html | index, follow | FAQ \| Top Tier Electrical (25) | Frequently asked questions about electrical services, panel upgrades, EV chargers and more. (91) | Frequently Asked Questions | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| blog.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/blog.html | index, follow | Electrical Blog & Resources \| Top Tier Electrical (49) | Read practical electrical tips from Top Tier Electrical: safety, EV charging, surge protection, and choosing the right electrician in West Michigan. (148) | Blog & Resources | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| blog-electrical-safety.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/blog-electrical-safety.html | index, follow | Electrical Safety Tips \| Top Tier Electrical Blog (49) | Learn practical electrical safety tips to protect your home and family. (71) | Electrical Safety Tips for Your Home | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| blog-right-electrician.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/blog-right-electrician.html | index, follow | Choosing the Right Electrician \| Top Tier Electrical (52) | What to look for when hiring an electrical professional, from verifying credentials to comparing estimates and avoiding red flags. (130) | Choosing the Right Electrician | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| blog-ev-charging.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/blog-ev-charging.html | index, follow | EV Charging at Home \| Top Tier Electrical (41) | Learn how home EV charging works, what an electrician checks before installation, and when a panel upgrade might be needed in West Michigan. (140) | EV Charging at Home | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| blog-surge-protection.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/blog-surge-protection.html | index, follow | Whole‑Home Surge Protection \| Top Tier Electrical (49) | Learn how whole‑home surge protection works, what it protects, and when to consider adding it to your electrical panel in West Michigan. (136) | Whole‑Home Surge Protection | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |
| service-areas.html | NOT VERIFIED (assign in implementation step) | NOT VERIFIED (live blocked); local file | https://toptier-electrical.com/service-areas.html | index, follow | Service Areas \| West Michigan Electrician (41) | See where we work across West Michigan and what to expect when scheduling. If you’re nearby but not listed, call (616) 334-7159 to confirm availability. (152) | Service Areas | Yes — Toggle navigation | NOT VERIFIED (requires live render) | Yes | NOT VERIFIED (live checks blocked by 403/503). |

**CSV-ready block (URL inventory)**
```csv
URL,Page type,Status,Canonical,Robots,Title,Title length,Meta description,Meta length,H1,Primary CTA,CTA text,Local signals,Local signals found
,unknown,LOCAL FILE,https://toptier-electrical.com/,"index, follow",Electrician in West Michigan | Top Tier Electrical,50,"Licensed & insured electrician serving West Michigan. Panel upgrades, EV chargers, lighting, and reliable troubleshooting. Get a clear estimate—call (616) 334-7159.",164,Electrician for West Michigan Homes & Businesses,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
services.html,unknown,LOCAL FILE,https://toptier-electrical.com/services.html,"index, follow",Electrical Services | West Michigan Electrician | Top Tier Electrical,69,"West Michigan electrician for custom homes, service upgrades, EV chargers, lighting, energy solutions, and generators. Clear scope, clean installs, code-compliant results.",171,Our Electrical Services,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
panel-upgrades.html,unknown,LOCAL FILE,https://toptier-electrical.com/panel-upgrades.html,"index, follow",Electrical Panel Upgrade & Service Upgrade | West Michigan Electrician,70,"Clean, code-compliant electrical panel upgrades and service upgrades in West Michigan. Clear scope, tidy installs, and reliable long-term results.",146,Electrical Panel Upgrades & Service Upgrades,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
ev-chargers.html,unknown,LOCAL FILE,https://toptier-electrical.com/ev-chargers.html,"index, follow",EV Charger Installation | West Michigan Electrician,51,"Level 2 EV charger installs with capacity checks, clean wiring, and permit coordination. Safe, code-compliant charging for your home or business.",145,EV Charger Installation,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
lighting.html,unknown,LOCAL FILE,https://toptier-electrical.com/lighting.html,"index, follow",Lighting Installation & Fixtures | Custom Home Electrician,58,"Thoughtful lighting layouts, dimmers, smart controls, and clean installs. Premium finish work for West Michigan homes and select commercial spaces.",147,Lighting & Fixtures,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
electrical-repairs.html,unknown,LOCAL FILE,https://toptier-electrical.com/electrical-repairs.html,"index, follow",Electrical Repairs & Troubleshooting | West Michigan Electrician,64,"Dead outlets, tripping breakers, partial power loss, or flickering lights? We troubleshoot and repair electrical issues safely in West Michigan. Book service today.",164,Electrical Repairs & Troubleshooting,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
energy-solutions.html,unknown,LOCAL FILE,https://www.toptier-electrical.com/energy-solutions.html,"index, follow",Energy Solutions | West Michigan Electrician,44,"Practical energy upgrades—LED, controls, and load planning—to improve comfort and reduce waste without overcomplicating your home.",130,Energy Solutions,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
energy-consulting.html,unknown,LOCAL FILE,https://www.toptier-electrical.com/energy-consulting.html,"index, follow",Energy Consulting | West Michigan Electrician,45,"Calm, professional energy consulting to prioritize upgrades, clarify scope, and help you make confident decisions without pressure.",131,Energy Consulting,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
generators.html,unknown,LOCAL FILE,https://www.toptier-electrical.com/generators.html,"index, follow",Generator Installation | West Michigan Electrician,50,"Backup power systems sized and installed safely with clear scope, clean workmanship, and verified operation.",108,Generator Sales & Installation,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
contact.html,unknown,LOCAL FILE,https://toptier-electrical.com/contact.html,"index, follow",Contact Top Tier Electrical | West Michigan Electrician,55,Call or email Top Tier Electrical for service in West Michigan. Share project details or book online to confirm next steps.,123,Contact Us,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
booking.html,unknown,LOCAL FILE,https://toptier-electrical.com/booking.html,"index, follow",Book Electrical Service | Top Tier Electrical,45,"Schedule electrical service in West Michigan. Choose a service, preferred date, and time, and we’ll confirm the scope and next steps.",133,Schedule Your Service,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
testimonials.html,unknown,LOCAL FILE,https://toptier-electrical.com/testimonials.html,"index, follow",Customer Feedback | Top Tier Electrical,39,Customer feedback for Top Tier Electrical. Read verified comments and share your experience after service in West Michigan.,123,Customer Feedback,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
financing.html,unknown,LOCAL FILE,https://toptier-electrical.com/financing.html,"index, follow",Financing | Top Tier Electrical,31,Explore flexible financing options for your electrical project with Top Tier Electrical.,88,Financing Options,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
emergency.html,unknown,LOCAL FILE,https://toptier-electrical.com/emergency.html,"index, follow",Emergency Electrical Services | Top Tier Electrical,51,"Urgent electrical service for Holland, Grand Rapids and West Michigan residents and businesses. Call to confirm next steps and safe shutdown guidance.",150,Emergency Electrical Services,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
gallery.html,unknown,LOCAL FILE,https://toptier-electrical.com/gallery.html,"index, follow",Gallery | Top Tier Electrical,29,"Browse our photo gallery of recent electrical projects including panel upgrades, conduit piping and LED installations across West Michigan.",139,Our Work Gallery,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
faq.html,unknown,LOCAL FILE,https://toptier-electrical.com/faq.html,"index, follow",FAQ | Top Tier Electrical,25,"Frequently asked questions about electrical services, panel upgrades, EV chargers and more.",91,Frequently Asked Questions,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
blog.html,unknown,LOCAL FILE,https://toptier-electrical.com/blog.html,"index, follow",Electrical Blog & Resources | Top Tier Electrical,49,"Read practical electrical tips from Top Tier Electrical: safety, EV charging, surge protection, and choosing the right electrician in West Michigan.",148,Blog & Resources,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
blog-electrical-safety.html,unknown,LOCAL FILE,https://toptier-electrical.com/blog-electrical-safety.html,"index, follow",Electrical Safety Tips | Top Tier Electrical Blog,49,Learn practical electrical safety tips to protect your home and family.,71,Electrical Safety Tips for Your Home,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
blog-right-electrician.html,unknown,LOCAL FILE,https://toptier-electrical.com/blog-right-electrician.html,"index, follow",Choosing the Right Electrician | Top Tier Electrical,52,"What to look for when hiring an electrical professional, from verifying credentials to comparing estimates and avoiding red flags.",130,Choosing the Right Electrician,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
blog-ev-charging.html,unknown,LOCAL FILE,https://toptier-electrical.com/blog-ev-charging.html,"index, follow",EV Charging at Home | Top Tier Electrical,41,"Learn how home EV charging works, what an electrician checks before installation, and when a panel upgrade might be needed in West Michigan.",140,EV Charging at Home,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
blog-surge-protection.html,unknown,LOCAL FILE,https://toptier-electrical.com/blog-surge-protection.html,"index, follow",Whole‑Home Surge Protection | Top Tier Electrical,49,"Learn how whole‑home surge protection works, what it protects, and when to consider adding it to your electrical panel in West Michigan.",136,Whole‑Home Surge Protection,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"
service-areas.html,unknown,LOCAL FILE,https://toptier-electrical.com/service-areas.html,"index, follow",Service Areas | West Michigan Electrician,41,"See where we work across West Michigan and what to expect when scheduling. If you’re nearby but not listed, call (616) 334-7159 to confirm availability.",152,Service Areas,Yes,Toggle navigation,Yes,"West Michigan, Grand Rapids, Allegan, Byron Center"

```

### 1.2 Image / Graphic inventory (ALL images currently used)
| URL where used | Section/component | Image file path/src | Format | Display dimensions (intrinsic) | Estimated file size | Alt text present? | Alt text | Trust score (1-10) | Issues | Exact fix + implementation notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| index.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/service-after.jpg | jpg | 1600x1200 | 234431 | Yes | Service upgrade completed by Top Tier Electrical | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| index.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| services.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| services.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| panel-upgrades.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| panel-upgrades.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| ev-chargers.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| ev-chargers.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| lighting.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| lighting.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| electrical-repairs.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| electrical-repairs.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| energy-solutions.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| energy-solutions.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| energy-consulting.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| energy-consulting.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| generators.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| generators.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| contact.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| contact.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| booking.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| booking.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| testimonials.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| testimonials.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| financing.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| financing.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| emergency.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| emergency.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/IMG_8262.jpg | jpg | 2048x1536 | 934140 | Yes | Commercial bar with colorful pendant lights installation | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/IMG_0567.jpg | jpg | 1536x2048 | 731211 | Yes | Residential space with wood ceiling and chandelier lighting | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/control-cabinet.jpg | jpg | 1600x2133 | 323270 | Yes | Control cabinet wiring and components | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/service-after.jpg | jpg | 1600x1200 | 234431 | Yes | Service upgrade after completion | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/service-upgrade-before.jpg | jpg | 1600x2133 | 358356 | Yes | Service upgrade before work | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/barn-photo.jpg | jpg | 1536x2048 | 946367 | Yes | Barn interior under construction with wooden beams and pendant lights | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/3-phase-service.jpg | jpg | 1600x2133 | 258387 | Yes | 3-phase service panel | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/480v-3-phase.jpg | jpg | 1600x2133 | 708425 | Yes | 480 V three-phase breakers | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/conduit.jpg | jpg | 1600x2133 | 379305 | Yes | Metallic conduits neatly aligned | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/conduit-piping.jpg | jpg | 1600x2133 | 311517 | Yes | Conduit piping along an industrial wall | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/control-work.jpg | jpg | 1600x2133 | 366637 | Yes | Detailed control wiring work | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/dust-collector-motor.jpg | jpg | 1600x1200 | 311750 | Yes | Industrial dust collector motor | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/dust-collector-system.jpg | jpg | 1600x2133 | 443067 | Yes | Large dust collector system installation | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/motor.jpg | jpg | 1600x2133 | 224727 | Yes | Industrial motor equipment | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/pipe-rack.jpg | jpg | 1600x2133 | 297056 | Yes | Pipe rack with tidy conduit runs | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/piping.jpg | jpg | 1600x2133 | 284914 | Yes | Curved conduits arranged through framing | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/selenoids.jpg | jpg | 1600x2133 | 336758 | Yes | Solenoids and small control components | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/transformer.jpg | jpg | 1600x2133 | 390101 | Yes | Electrical transformer installation | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/electrical-project-49-1200.jpg | jpg | 1600x1200 | 343244 | Yes | Commercial project exterior with lighting install | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/IMG_8164.jpg | jpg | 1536x2048 | 689334 | Yes | Commercial renovation with exposed ceiling, ladder and modern linear lighting | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/lighting.jpg | jpg | 1600x1200 | 246897 | Yes | Commercial lighting installation inside a large space | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/fire-response.jpg | jpg | unknown | 0 | Yes | Electrical panel after fire response | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/kitchen-led.jpg | jpg | 1600x2133 | 239793 | Yes | Under-cabinet LED lighting in a kitchen | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/led-handrail.jpg | jpg | 1600x2133 | 183095 | Yes | LED handrail lighting on a staircase | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/led-shelves.jpg | jpg | 1600x1200 | 183441 | Yes | Colorful LED shelves | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| gallery.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| faq.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| faq.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/kitchen-led.jpg | jpg | 1600x2133 | 239793 | Yes | Electrical safety tips for your home | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/control-cabinet.jpg | jpg | 1600x2133 | 323270 | Yes | Choosing a residential electrician | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg | jpg | 1920x1080 | 274031 | Yes | EV home charging guide | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | /assets/images/projects/control-work.jpg | jpg | 1600x2133 | 366637 | Yes | Surge protection guide | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-electrical-safety.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-electrical-safety.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-right-electrician.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-right-electrician.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-ev-charging.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-ev-charging.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-surge-protection.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| blog-surge-protection.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| service-areas.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |
| service-areas.html | NOT VERIFIED (requires DOM inspection) | assets/images/logo.svg | svg | unknown | 204 | Yes | Top Tier Electrical logo | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED — see Section 5 image rules. |

**CSV-ready block (Image inventory)**
```csv
Page,Section,Image src,Format,Dimensions,File size (bytes),Alt present,Alt text
index.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
index.html,img,/assets/images/projects/service-after.jpg,jpg,1600x1200,234431,Yes,Service upgrade completed by Top Tier Electrical
index.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
services.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
services.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
panel-upgrades.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
panel-upgrades.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
ev-chargers.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
ev-chargers.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
lighting.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
lighting.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
electrical-repairs.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
electrical-repairs.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
energy-solutions.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
energy-solutions.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
energy-consulting.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
energy-consulting.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
generators.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
generators.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
contact.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
contact.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
booking.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
booking.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
testimonials.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
testimonials.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
financing.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
financing.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
emergency.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
emergency.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
gallery.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
gallery.html,img,/assets/images/projects/IMG_8262.jpg,jpg,2048x1536,934140,Yes,Commercial bar with colorful pendant lights installation
gallery.html,img,/assets/images/projects/IMG_0567.jpg,jpg,1536x2048,731211,Yes,Residential space with wood ceiling and chandelier lighting
gallery.html,img,/assets/images/projects/control-cabinet.jpg,jpg,1600x2133,323270,Yes,Control cabinet wiring and components
gallery.html,img,/assets/images/projects/service-after.jpg,jpg,1600x1200,234431,Yes,Service upgrade after completion
gallery.html,img,/assets/images/projects/service-upgrade-before.jpg,jpg,1600x2133,358356,Yes,Service upgrade before work
gallery.html,img,/assets/images/projects/barn-photo.jpg,jpg,1536x2048,946367,Yes,Barn interior under construction with wooden beams and pendant lights
gallery.html,img,/assets/images/projects/3-phase-service.jpg,jpg,1600x2133,258387,Yes,3-phase service panel
gallery.html,img,/assets/images/projects/480v-3-phase.jpg,jpg,1600x2133,708425,Yes,480 V three-phase breakers
gallery.html,img,/assets/images/projects/conduit.jpg,jpg,1600x2133,379305,Yes,Metallic conduits neatly aligned
gallery.html,img,/assets/images/projects/conduit-piping.jpg,jpg,1600x2133,311517,Yes,Conduit piping along an industrial wall
gallery.html,img,/assets/images/projects/control-work.jpg,jpg,1600x2133,366637,Yes,Detailed control wiring work
gallery.html,img,/assets/images/projects/dust-collector-motor.jpg,jpg,1600x1200,311750,Yes,Industrial dust collector motor
gallery.html,img,/assets/images/projects/dust-collector-system.jpg,jpg,1600x2133,443067,Yes,Large dust collector system installation
gallery.html,img,/assets/images/projects/motor.jpg,jpg,1600x2133,224727,Yes,Industrial motor equipment
gallery.html,img,/assets/images/projects/pipe-rack.jpg,jpg,1600x2133,297056,Yes,Pipe rack with tidy conduit runs
gallery.html,img,/assets/images/projects/piping.jpg,jpg,1600x2133,284914,Yes,Curved conduits arranged through framing
gallery.html,img,/assets/images/projects/selenoids.jpg,jpg,1600x2133,336758,Yes,Solenoids and small control components
gallery.html,img,/assets/images/projects/transformer.jpg,jpg,1600x2133,390101,Yes,Electrical transformer installation
gallery.html,img,/assets/images/projects/electrical-project-49-1200.jpg,jpg,1600x1200,343244,Yes,Commercial project exterior with lighting install
gallery.html,img,/assets/images/projects/IMG_8164.jpg,jpg,1536x2048,689334,Yes,"Commercial renovation with exposed ceiling, ladder and modern linear lighting"
gallery.html,img,/assets/images/projects/lighting.jpg,jpg,1600x1200,246897,Yes,Commercial lighting installation inside a large space
gallery.html,img,/assets/images/projects/fire-response.jpg,jpg,unknown,0,Yes,Electrical panel after fire response
gallery.html,img,/assets/images/projects/kitchen-led.jpg,jpg,1600x2133,239793,Yes,Under-cabinet LED lighting in a kitchen
gallery.html,img,/assets/images/projects/led-handrail.jpg,jpg,1600x2133,183095,Yes,LED handrail lighting on a staircase
gallery.html,img,/assets/images/projects/led-shelves.jpg,jpg,1600x1200,183441,Yes,Colorful LED shelves
gallery.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
faq.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
faq.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog.html,img,/assets/images/projects/kitchen-led.jpg,jpg,1600x2133,239793,Yes,Electrical safety tips for your home
blog.html,img,/assets/images/projects/control-cabinet.jpg,jpg,1600x2133,323270,Yes,Choosing a residential electrician
blog.html,img,/assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg,jpg,1920x1080,274031,Yes,EV home charging guide
blog.html,img,/assets/images/projects/control-work.jpg,jpg,1600x2133,366637,Yes,Surge protection guide
blog.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-electrical-safety.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-electrical-safety.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-right-electrician.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-right-electrician.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-ev-charging.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-ev-charging.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-surge-protection.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
blog-surge-protection.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
service-areas.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo
service-areas.html,img,assets/images/logo.svg,svg,unknown,204,Yes,Top Tier Electrical logo

```

### 1.3 Logo usage inventory (PAGE-EXACT)
- **Observed logo file in repo:** `assets/images/logo.svg` used across pages (header/footer). (Local HTML baseline.)
- **Live logo usage:** NOT VERIFIED (requires live HTML). Verify using DevTools > Elements > `<img>` sources.
- **Issues noted in repo:** No sizing system defined per page; logo size is dependent on CSS and may vary.

**Exact fixes**
- Define standard logo heights in CSS and apply to header/footer logo classes.
- Use gold logo on dark backgrounds, black on light backgrounds.

### 1.4 Mobile vs Desktop differences (NOT VERIFIED — requires live device testing)
- **Potential risks:** CTA stacking, logo scaling, and hero copy wrapping.
- **Verification steps:** Use Chrome DevTools (iPhone 12/14 viewport) and compare against desktop; check nav behavior and CTA visibility.

## 2) COMPETITOR + “BEST-IN-CLASS” BENCHMARKING (YOU MUST BROWSE)
**NOT VERIFIED (external browsing blocked in this environment).**
**Verification steps:** Use live browsing to capture the following sites and note hero, CTA, and trust placements.

**Suggested benchmark targets**
- National: Mister Sparky, Mr. Electric, One Hour Electric, Aladdin Electric, Mike Diamond, Benjamin Franklin Electric, RLCraft, Service Champions Electric, Hiller, C. Bennett.
- Regional/Michigan: Service Professor, Godwin Plumbing/Heating (electric division), Lakeside Service, Grand Rapids Electricians (local), LSE Electric.
- Premium trades (non-electrical): Carrier Enterprise, Len The Plumber, Benjamin Franklin Plumbing.

**Pattern library (to build after browsing)**
- Hero patterns: large H1 + trust strip + dual CTA.
- Social proof placement: reviews near hero and mid-page.
- Service page structure: hero > benefits > process > FAQ > CTA.
- About/team credibility: owner photo + certifications + process.
- Gallery/case studies: before/after + scope + location.
- Guarantees: clear, specific warranty language.
- Contact UX: sticky call + short form.

## 3) BRAND SYSTEM REBUILD (LOGO-CENTERED, IMPLEMENTATION-READY)
### 3.1 Color system (logo-derived; WCAG-aware)
**NOT VERIFIED**: Gold extraction from logo image assets is blocked (files not present in repo). Default to #D4AF37 until extracted from provided PNGs.

**Tokens**
- Primary Gold: #D4AF37
- Black: #000000
- White: #FFFFFF
- Soft Black: #0B0B0B

**Usage rules**
- Gold for accents/CTA, not long-form body text.
- Ensure AA contrast for body text; use dark text on light backgrounds.

### 3.2 Typography system
- Headline: `Playfair Display` (premium, serif)
- Body: `Inter` (clean, readable)

### 3.3 UI component specs
- Buttons: 48px height, 8px radius, 16px padding, bold text.
- Forms: labels above fields, 44px field height, 2px focus ring.
- Cards: 16px padding, subtle shadow, 12px radius.
- Navigation: left logo + right CTA, sticky on scroll.

### 3.4 Design tokens
**CSS variables**
```css
:root {
  --brand-gold: #D4AF37;
  --brand-black: #000000;
  --brand-white: #FFFFFF;
  --brand-soft-black: #0B0B0B;
  --text-body: #1A1A1A;
  --border-subtle: #E5E5E5;
}
```

**Tailwind mapping**
NOT VERIFIED (Tailwind not detected; default to CSS variables).

## 4) TRUST ARCHITECTURE (THE TRUST STACK — PAGE-EXACT MAP)
**NOT VERIFIED (requires live review).**
- Add license/insured line to header/footer.
- Add warranty line near CTAs.
- Add reviews module near hero and before final CTA.

## 5) VISUAL ASSET UPGRADE PLAN (HERO + BACKGROUNDS + PROOF PHOTOS)
### 5.1 Homepage hero (highest priority)
**Concept 1:** Owner-operator at panel upgrade, clean uniform, neutral background.
**Concept 2:** EV charger install, close-up of hands and wiring, clean home garage.
**Concept 3:** Lighting upgrade with warm interior shot and visible craftsmanship.

### 5.2 Background imagery system
- Use subtle gradients and blurred jobsite textures only.

### 5.3 Service imagery system
- Define per-service hero + supporting images; use real project shots.

### 5.4 Image optimization requirements
- Use WebP/AVIF, responsive sizes, lazy load below the fold, preload LCP only.

## 6) LOGO IMPLEMENTATION MAP (DEEP + PAGE-EXACT)
- Header: 52px height desktop, 38px mobile.
- Footer: 64px height desktop, 48px mobile.
- Use gold logo on dark backgrounds, black logo on light.
- Alt text: “Top Tier Electrical”.

## 7) LOCAL SEO + TECHNICAL SEO + CTR (IMPLEMENTATION-READY)
- Add NAP in header/footer/contact.
- Add LocalBusiness schema and service schemas.
- Rewrite titles/metas (see Section 1 table for current values).

## 8) CONVERSION + ANALYTICS INSTRUMENTATION
- Track call, text, form, booking events in GA4.

## 9) PERFORMANCE + ACCESSIBILITY + “PREMIUM FEEL” ENGINEERING
- Ensure hero images optimized, CSS/JS minimal, focus states visible.

## 10) PAGE-BY-PAGE IMPROVEMENT BLUEPRINT (DETERMINISTIC)
Use implementation packets for exact instructions:
- Home: `implementation_packets/01_home.md`
- Services: `implementation_packets/02_services.md`
- Panel upgrades: `implementation_packets/03_panel-upgrades.md`
- EV chargers: `implementation_packets/04_ev-chargers.md`
- Lighting: `implementation_packets/05_lighting.md`
- Electrical repairs: `implementation_packets/06_electrical-repairs.md`
- Generators: `implementation_packets/07_generators.md`
- Energy solutions: `implementation_packets/08_energy-solutions.md`
- Energy consulting: `implementation_packets/09_energy-consulting.md`
- Service areas: `implementation_packets/10_service-areas.md`
- Contact: `implementation_packets/11_contact.md`
- Booking: `implementation_packets/12_booking.md`
- Testimonials: `implementation_packets/13_testimonials.md`
- Financing: `implementation_packets/14_financing.md`
- Emergency: `implementation_packets/15_emergency.md`
- Gallery: `implementation_packets/16_gallery.md`
- FAQ: `implementation_packets/17_faq.md`
- Blog: `implementation_packets/18_blog.md`
- Blog post: `implementation_packets/19_blog-electrical-safety.md`
- Blog post: `implementation_packets/20_blog-right-electrician.md`
- Blog post: `implementation_packets/21_blog-ev-charging.md`
- Blog post: `implementation_packets/22_blog-surge-protection.md`

## 11) IMPLEMENTATION BACKLOG + DEPLOYMENT PROCESS (NETLIFY + CLOUDFLARE)
### 11.1 Backlog (PRIORITIZED BY ROI)
**NOT VERIFIED**: Netlify/Cloudflare deployment assumption is unverified; confirm hosting in DNS and build logs.

### 11.2 Deployment process
- Use branch deploy previews, verify redirects, invalidate CDN cache.
