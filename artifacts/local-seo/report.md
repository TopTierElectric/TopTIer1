# Local SEO Audit Report

- asOfDate: **2026-02-16**
- baseUrl: **https://www.toptier-electrical.com**
- framework: **next_app_router**

## Scores

- Overall: **85/100** (coverage 94%)
- Relevance: **85/100** (coverage 100%)
- Distance: **84/100** (coverage 80%)
- Prominence: **86/100** (coverage 100%)

## Prioritized Actions (fix these first)

### ⚠️ SITE_SERVICE_AREAS_PAGE_MENTIONS_ALL_CITIES — Site: /service-areas mentions all configured service areas (distance reinforcement)

- pillar: **distance** | severity: **high** | weight: **5**
- evidence:
  - /service-areas verification unavailable in static mode. Run --mode=live.
- fix:
  - Ensure /service-areas lists every city you serve (match GBP service areas).
  - Add scheduling/travel expectations and link to top services.

### ❌ TECH_ROBOTS_PRESENT — robots.txt is implemented in repo (Next metadata route or public file)

- pillar: **relevance** | severity: **high** | weight: **2**
- evidence:
  - No robots implementation found.
- fix:
  - Add app/robots.ts (Next metadata route) or public/robots.txt at site root.

### ⚠️ CITATIONS_NAP_CONSISTENT — Citations: NAP consistency across major directories (prominence reinforcement)

- pillar: **prominence** | severity: **medium** | weight: **6**
- evidence:
  - Only 3 citations listed. Add major directories (Apple Maps, Bing, Yelp, etc.).
- fix:
  - Build a citations list and keep NAP consistent.
  - If service-area business (SAB), be consistent about address display where applicable.

### ⚠️ GBP_SERVICES_LISTED — GBP: Services list is populated (relevance to queries)

- pillar: **relevance** | severity: **medium** | weight: **3**
- evidence:
  - GBP services count is low (2). Add core services.
- fix:
  - Add your core services to GBP (panel upgrades, EV chargers, generators, troubleshooting, lighting).

## Full Rule Results

| Status            | Rule                                        |     Pillar | Weight | Severity |
| ----------------- | ------------------------------------------- | ---------: | -----: | -------- |
| ⚠️ warn           | CITATIONS_NAP_CONSISTENT                    | prominence |      6 | medium   |
| ✅ pass           | ENTITY_LOCALBUSINESS_SCHEMA_WIRED           |  relevance |      4 | critical |
| ✅ pass           | GBP_APPOINTMENT_URL_HAS_UTM                 | prominence |      2 | medium   |
| ✅ pass           | GBP_PHOTOS_FRESHNESS                        | prominence |      2 | low      |
| ✅ pass           | GBP_POSTS_FREQUENCY                         | prominence |      2 | low      |
| ✅ pass           | GBP_PRIMARY_CATEGORY_SET                    |  relevance |      3 | high     |
| ✅ pass           | GBP_REVIEW_RESPONSE_RATE                    | prominence |      4 | medium   |
| ✅ pass           | GBP_REVIEWS_HEALTH                          | prominence |      6 | high     |
| ✅ pass           | GBP_SAB_ADDRESS_HIDDEN                      |   distance |      5 | critical |
| ✅ pass           | GBP_SERVICE_AREAS_ALIGN_WITH_SITE           |   distance |      4 | medium   |
| ✅ pass           | GBP_SERVICE_AREAS_LIMIT_20                  |   distance |      2 | high     |
| ⚠️ warn           | GBP_SERVICES_LISTED                         |  relevance |      3 | medium   |
| ✅ pass           | GBP_WEBSITE_HOST_MATCH                      |  relevance |      3 | medium   |
| ➖ not_applicable | LOC_LOCATION_PAGES_THIN_RISK                |   distance |      4 | high     |
| ✅ pass           | NAP_PHONE_E164_VALID                        |  relevance |      3 | critical |
| ✅ pass           | SITE_CONTACT_HAS_TEL_SMS                    |  relevance |      3 | high     |
| ⚠️ warn           | SITE_SERVICE_AREAS_PAGE_MENTIONS_ALL_CITIES |   distance |      5 | high     |
| ❌ fail           | TECH_ROBOTS_PRESENT                         |  relevance |      2 | high     |
| ✅ pass           | TECH_SITEMAP_PRESENT                        |  relevance |      2 | high     |
