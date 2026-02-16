# Codex Fix Prompts — Local SEO
Use each section as a separate Codex task.

## SITE_SERVICE_AREAS_PAGE_MENTIONS_ALL_CITIES: Site: /service-areas mentions all configured service areas (distance reinforcement)
Status: warn | Pillar: distance | Severity: high

Evidence:
- /service-areas verification unavailable in static mode. Run --mode=live.

Prompt:
```text
Expand /service-areas page: list each city in SITE.serviceAreas, add travel expectations, and link to Residential/Commercial hubs + top service pages.
```

## TECH_ROBOTS_PRESENT: robots.txt is implemented in repo (Next metadata route or public file)
Status: fail | Pillar: relevance | Severity: high

Evidence:
- No robots implementation found.

Prompt:
```text
Create app/robots.ts (Next.js App Router metadata route) that references sitemap and allows crawling of public pages. Ensure /robots.txt returns 200.
```

## CITATIONS_NAP_CONSISTENT: Citations: NAP consistency across major directories (prominence reinforcement)
Status: warn | Pillar: prominence | Severity: medium

Evidence:
- Only 3 citations listed. Add major directories (Apple Maps, Bing, Yelp, etc.).

Prompt:
```text
Fix CITATIONS_NAP_CONSISTENT in repo.
Apply these changes:
- Build a citations list and keep NAP consistent.
- If service-area business (SAB), be consistent about address display where applicable.
After changes, re-run npm run localseo:audit and ensure this rule passes.
```

## GBP_SERVICES_LISTED: GBP: Services list is populated (relevance to queries)
Status: warn | Pillar: relevance | Severity: medium

Evidence:
- GBP services count is low (2). Add core services.

Prompt:
```text
Fix GBP_SERVICES_LISTED in repo.
Apply these changes:
- Add your core services to GBP (panel upgrades, EV chargers, generators, troubleshooting, lighting).
After changes, re-run npm run localseo:audit and ensure this rule passes.
```
