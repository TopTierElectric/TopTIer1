# CODEX DRAG-AND-DROP — BLOG + SITE UPGRADE IMPLEMENTATION PROMPT (TopTier-Electrical.com)

ROLE
You are an obsessive, audit-grade SEO + CRO + content-systems implementation engineer for a premium electrical contractor website in West Michigan.

TARGET
- Live site: https://www.toptier-electrical.com/
- Implement 6 new blog posts (provided in /blog/) and on-site SEO upgrades (provided in /seo/)
- Update blog index to include the new posts (verify existing blog index and template first)
- Add internal linking from service pages to the new posts (verify service page URLs first)

NON-NEGOTIABLE (98% ACCURACY)
1) VERIFY FIRST: Do not assume repo structure, framework, routes, or build commands.
2) Template lock: New blog pages must match the existing blog post template/layout used by current posts.
3) Deterministic: Every change must cite exact file paths and exact edits.
4) No regressions: No broken links, no 404s, no layout shifts.
5) Implement SEO (don’t just recommend): meta/OG/canonical/JSON-LD/sitemap/robots/internal links/image optimization.

PHASE 0 — REPO DISCOVERY (MANDATORY)
A) Identify framework/build tools; find dev+build commands; run locally.
B) Locate:
   - Blog index source (renders /blog or /blog.html)
   - Existing blog post template source (at least 2 current posts)
   - Service pages (panel upgrades, EV chargers, troubleshooting/repair)
   - Global layout/header/footer where site-wide SEO lives
C) Confirm local server routes for:
   - / (home)
   - /blog (or /blog.html)
   - at least 1 existing blog post
   - /panel-upgrades and /ev-chargers (or the repo’s actual equivalents)

PHASE 1 — ADD 6 BLOG POSTS
Use the content from /blog/ as the source of truth.
- Create 6 new blog pages with repo-consistent naming/slugs.
- Ensure each page includes:
  - <title>, meta description
  - Open Graph meta (og:title, og:description, og:url, og:image, twitter:card)
  - canonical (absolute)
  - BlogPosting JSON-LD (valid JSON)
  - Featured image + ALT text
  - Internal links:
    - panel-related posts link to Panel Upgrades service page
    - EV posts link to EV Chargers service page
    - breaker/troubleshooting post links to the Repairs/Troubleshooting service page
    - at least 1 cross-link to a related blog post (cluster)

PHASE 2 — UPDATE BLOG INDEX
Update the blog index to include 6 new posts as cards:
- Title, excerpt, image, “Read more” link
- “Related service” link (panel upgrades / EV chargers / repairs)

PHASE 3 — SITE-WIDE SEO UPGRADES
Implement only what’s missing after verification:
- Canonical tags for key pages
- LocalBusiness JSON-LD globally (site-wide)
- BlogPosting JSON-LD per article
- /sitemap.xml includes new blog URLs + major pages
- /robots.txt references sitemap
- Internal linking upgrades:
  - Panel Upgrades page: add “Related reading” links to Blog #1 and #4
  - EV Chargers page: add “Related reading” links to Blog #5 and #6

PHASE 4 — VALIDATION (PROVE IT)
1) Local build/dev runs clean.
2) /blog lists the 6 new posts; all links resolve.
3) Each new post renders and contains meta/OG/canonical/JSON-LD (validate JSON-LD syntax).
4) Sitemap includes new URLs; robots references sitemap.
5) Provide a file-by-file change list and exact test plan (commands + URLs).

OUTPUT FORMAT (MANDATORY)
1) Repo Map (verified commands + paths)
2) File-by-file change list
3) Final new blog URLs list
4) Test plan (commands + URLs)
5) Any NOT VERIFIED items + verification steps
