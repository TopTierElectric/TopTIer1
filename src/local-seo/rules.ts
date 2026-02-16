// src/local-seo/rules.ts
import { RuleDefinition, AuditContext } from './types'
import { LOCAL_SEO_THRESHOLDS } from './thresholds'
import { daysBetween } from './date'

function needsData(evidence: string[] = ['Missing required input data.']): { status: 'needs_data'; evidence: string[] } {
  return { status: 'needs_data', evidence }
}

function pass(evidence: string[] = []): { status: 'pass'; evidence: string[] } {
  return { status: 'pass', evidence }
}

function warn(evidence: string[] = []): { status: 'warn'; evidence: string[] } {
  return { status: 'warn', evidence }
}

function fail(evidence: string[] = []): { status: 'fail'; evidence: string[] } {
  return { status: 'fail', evidence }
}

function getPage(ctx: AuditContext, pathname: string) {
  return ctx.pages.get(pathname)
}

function normalizeHost(u: string): string {
  try {
    return new URL(u).host.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function hasUtm(url: string, utmKey: string, expected?: string): boolean {
  try {
    const u = new URL(url)
    const v = u.searchParams.get(utmKey)
    if (!v) return false
    return expected ? v === expected : true
  } catch {
    return false
  }
}

function containsAll(haystack: string, needles: string[]): string[] {
  const lower = haystack.toLowerCase()
  return needles.filter((n) => !lower.includes(n.toLowerCase()))
}

export const LOCAL_SEO_RULES: RuleDefinition[] = [
  // -------------------------
  // TECH + ENTITY (Relevance)
  // -------------------------
  {
    id: 'TECH_ROBOTS_PRESENT',
    title: 'robots.txt is implemented in repo (Next metadata route or public file)',
    pillar: 'relevance',
    weight: 2,
    severity: 'high',
    evaluate: (ctx) => {
      const ok =
        ctx.repo.exists('app/robots.ts') ||
        ctx.repo.exists('app/robots.js') ||
        ctx.repo.exists('public/robots.txt') ||
        ctx.repo.exists('src/app/robots.ts') ||
        ctx.repo.exists('src/app/robots.js')
      return ok ? pass(['robots implementation detected.']) : fail(['No robots implementation found.'])
    },
    fix: ['Add app/robots.ts (Next metadata route) or public/robots.txt at site root.'],
    codexPrompt:
      'Create app/robots.ts (Next.js App Router metadata route) that references sitemap and allows crawling of public pages. Ensure /robots.txt returns 200.',
  },

  {
    id: 'TECH_SITEMAP_PRESENT',
    title: 'sitemap.xml is implemented in repo (Next metadata route or static public sitemap)',
    pillar: 'relevance',
    weight: 2,
    severity: 'high',
    evaluate: (ctx) => {
      const ok =
        ctx.repo.exists('app/sitemap.ts') ||
        ctx.repo.exists('app/sitemap.js') ||
        ctx.repo.exists('public/sitemap.xml') ||
        ctx.repo.exists('src/app/sitemap.ts') ||
        ctx.repo.exists('src/app/sitemap.js')
      return ok ? pass(['sitemap implementation detected.']) : fail(['No sitemap implementation found.'])
    },
    fix: ['Add app/sitemap.ts (Next metadata route) or generate public/sitemap.xml at build time.'],
    codexPrompt: 'Create app/sitemap.ts that lists core pages and service pages using config-driven slugs.',
  },

  {
    id: 'ENTITY_LOCALBUSINESS_SCHEMA_WIRED',
    title: 'LocalBusiness/Electrician JSON-LD is wired into layout (entity clarity)',
    pillar: 'relevance',
    weight: 4,
    severity: 'critical',
    evaluate: (ctx) => {
      // Static check: schema builder exists and is referenced
      const schemaExists =
        ctx.repo.exists('src/lib/seo/schema.ts') || ctx.repo.exists('src/lib/seo/schema.js') || ctx.repo.exists('lib/seo/schema.ts')
      const layoutText =
        ctx.repo.readText('app/layout.tsx') ??
        ctx.repo.readText('src/app/layout.tsx') ??
        ctx.repo.readText('app/layout.jsx') ??
        ''
      const layoutWired = /buildLocalBusinessJsonLd|LocalBusiness|Electrician/.test(layoutText)

      // Live check (optional)
      const home = getPage(ctx, '/')
      const liveOk = home ? home.schema.hasLocalBusiness : false

      if (ctx.mode === 'live' && home) {
        return liveOk ? pass(['Home page contains LocalBusiness/Electrician JSON-LD.']) : fail(['Home page missing LocalBusiness JSON-LD.'])
      }

      if (schemaExists && layoutWired) return pass(['Schema builder exists and layout references it.'])
      return fail(['Schema builder and/or layout wiring not found.'])
    },
    fix: [
      'Implement LocalBusiness (Electrician) JSON-LD and inject it globally in app/layout.tsx.',
      'Ensure schema data matches visible NAP and service areas.',
    ],
    codexPrompt:
      'Add LocalBusiness/Electrician JSON-LD using a schema builder and inject via <script type="application/ld+json"> in app/layout.tsx. Ensure telephone and areaServed match SITE config.',
  },

  {
    id: 'NAP_PHONE_E164_VALID',
    title: 'Site phone is valid E.164 (+1XXXXXXXXXX) and not a placeholder',
    pillar: 'relevance',
    weight: 3,
    severity: 'critical',
    evaluate: (ctx) => {
      const p = (ctx.site.phoneE164 || '').trim()
      if (!p) return fail(['SITE.phoneE164 is empty.'])
      if (/X/.test(p)) return fail(['SITE.phoneE164 contains placeholder X characters.'])
      if (!/^\+\d{10,15}$/.test(p)) return warn([`SITE.phoneE164 "${p}" does not match E.164 pattern +[10-15 digits].`])
      return pass([`SITE.phoneE164 looks valid: ${p}`])
    },
    fix: ['Set SITE.phoneE164 to a real E.164 phone number (e.g., +1616XXXXXXX).'],
    codexPrompt: 'Update src/config/site.ts to set SITE.phoneE164 and SITE.phoneDisplay with real values.',
  },

  {
    id: 'SITE_CONTACT_HAS_TEL_SMS',
    title: 'Contact surface includes clickable tel: and sms: links (lead friction reduction)',
    pillar: 'relevance',
    weight: 3,
    severity: 'high',
    evaluate: (ctx) => {
      const contact = getPage(ctx, '/contact')
      if (ctx.mode === 'live' && contact) {
        const hasTel = contact.telLinks.length > 0
        const hasSms = contact.smsLinks.length > 0
        if (hasTel && hasSms) return pass(['Contact page has tel and sms links.'])
        return fail([`tel links: ${contact.telLinks.length}, sms links: ${contact.smsLinks.length}`])
      }

      // Static fallback: search code for "tel:" and "sms:" usage
      const tel = ctx.repo.searchText({ roots: ['app', 'src', 'components'], exts: ['ts', 'tsx', 'js', 'jsx'], query: /href=.*tel:/ })
      const sms = ctx.repo.searchText({ roots: ['app', 'src', 'components'], exts: ['ts', 'tsx', 'js', 'jsx'], query: /href=.*sms:/ })

      if (tel.found && sms.found) return pass(['Found tel: and sms: in codebase.'])
      return warn(['Could not confirm tel/sms links (run in --mode=live to verify rendered output).'])
    },
    fix: ['Add a Call/Text CTA component and use it on /contact, /booking, and on high-intent service pages.'],
    codexPrompt: 'Create a CallTextCTA component with tel: and sms: links and include it on contact + booking pages.',
  },

  // -------------------------
  // LOCALITY / DISTANCE SIGNALS
  // -------------------------
  {
    id: 'GBP_SAB_ADDRESS_HIDDEN',
    title: 'GBP: Service-area business hides address (compliance + distance clarity)',
    pillar: 'distance',
    weight: 5,
    severity: 'critical',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      if (!ctx.gbp.isServiceAreaBusiness) return { status: 'not_applicable', evidence: ['Business is not marked as service-area business.'] }
      if (ctx.gbp.addressShown) return fail(['GBP shows address but business is marked service-area.'])
      return pass(['GBP address is hidden for service-area business.'])
    },
    fix: [
      'In Google Business Profile: set as Service-area business and hide address if you travel to customers.',
      'Ensure service areas are correctly configured.',
    ],
    codexPrompt:
      'No code change: update GBP settings to hide address if SAB. Then update local-seo/gbp-profile.json to reflect the change.',
  },

  {
    id: 'GBP_SERVICE_AREAS_LIMIT_20',
    title: 'GBP: Service areas count is within Google’s limit (≤ 20)',
    pillar: 'distance',
    weight: 2,
    severity: 'high',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const count = ctx.gbp.serviceAreas.length
      if (count === 0) return warn(['No GBP service areas listed.'])
      if (count > 20) return fail([`GBP service areas = ${count} (exceeds 20).`])
      return pass([`GBP service areas = ${count}.`])
    },
    fix: ['Reduce GBP service areas to 20 or fewer; prioritize revenue cities and realistic coverage.'],
  },

  {
    id: 'GBP_SERVICE_AREAS_ALIGN_WITH_SITE',
    title: 'GBP: Service areas align with SITE.serviceAreas',
    pillar: 'distance',
    weight: 4,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const siteAreas = ctx.site.serviceAreas.map((a) => a.name)
      const missingInGbp = siteAreas.filter((a) => !ctx.gbp!.serviceAreas.includes(a))
      const extraInGbp = ctx.gbp.serviceAreas.filter((a) => !siteAreas.includes(a))

      if (missingInGbp.length === 0 && extraInGbp.length === 0) return pass(['GBP and site service areas match exactly.'])

      const evidence: string[] = []
      if (missingInGbp.length) evidence.push(`Missing in GBP: ${missingInGbp.join(', ')}`)
      if (extraInGbp.length) evidence.push(`Extra in GBP: ${extraInGbp.join(', ')}`)
      return warn(evidence)
    },
    fix: [
      'Keep GBP service areas and website service area list consistent.',
      'If the business expands/shrinks, update both at the same time.',
    ],
    codexPrompt:
      'Update src/config/site.ts (SITE.serviceAreas) or local-seo/gbp-profile.json so the lists match (same spelling/cities).',
  },

  {
    id: 'SITE_SERVICE_AREAS_PAGE_MENTIONS_ALL_CITIES',
    title: 'Site: /service-areas mentions all configured service areas (distance reinforcement)',
    pillar: 'distance',
    weight: 5,
    severity: 'high',
    evaluate: (ctx) => {
      const cityNames = ctx.site.serviceAreas.map((a) => a.name)
      const page = getPage(ctx, '/service-areas')

      // Live mode: exact content check
      if (ctx.mode === 'live' && page) {
        const missing = containsAll(page.text, cityNames)
        if (missing.length === 0) return pass(['All configured cities appear on /service-areas.'])
        return fail([`Missing mentions on /service-areas: ${missing.join(', ')}`])
      }

      // Static: search code for city strings (best-effort)
      const found = ctx.repo.searchText({
        roots: ['app', 'src/app', 'pages', 'src/pages'],
        exts: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
        query: new RegExp(cityNames.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')),
      })
      if (found.found) return warn(['Could not verify all cities. Run --mode=live for exact check.', found.sample ?? ''])
      return warn(['/service-areas verification unavailable in static mode. Run --mode=live.'])
    },
    fix: [
      'Ensure /service-areas lists every city you serve (match GBP service areas).',
      'Add scheduling/travel expectations and link to top services.',
    ],
    codexPrompt:
      'Expand /service-areas page: list each city in SITE.serviceAreas, add travel expectations, and link to Residential/Commercial hubs + top service pages.',
  },

  // -------------------------
  // GBP RELEVANCE SIGNALS
  // -------------------------
  {
    id: 'GBP_WEBSITE_HOST_MATCH',
    title: 'GBP: Website URL host matches site host (relevance consistency)',
    pillar: 'relevance',
    weight: 3,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const gbpHost = normalizeHost(ctx.gbp.websiteUrl)
      const siteHost = normalizeHost(ctx.site.baseUrl)
      if (!gbpHost || !siteHost) return warn(['Unable to parse website hosts.'])
      if (gbpHost !== siteHost) return fail([`GBP host=${gbpHost} vs site host=${siteHost}`])
      return pass([`Host match: ${siteHost}`])
    },
    fix: ['Update GBP website URL to the canonical site host (prefer https + primary domain).'],
  },

  {
    id: 'GBP_APPOINTMENT_URL_HAS_UTM',
    title: 'GBP: Appointment URL includes UTM tracking (lead attribution)',
    pillar: 'prominence',
    weight: 2,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const u = ctx.gbp.appointmentUrl
      const ok =
        hasUtm(u, 'utm_source', 'gbp') &&
        hasUtm(u, 'utm_medium', 'organic') &&
        hasUtm(u, 'utm_campaign', 'maps')
      return ok ? pass(['Appointment URL includes expected UTMs.']) : warn([`Appointment URL missing expected UTMs: ${u}`])
    },
    fix: ['Set GBP appointment URL to /booking with UTMs: utm_source=gbp&utm_medium=organic&utm_campaign=maps.'],
  },

  {
    id: 'GBP_PRIMARY_CATEGORY_SET',
    title: 'GBP: Primary category is set (relevance)',
    pillar: 'relevance',
    weight: 3,
    severity: 'high',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const c = (ctx.gbp.primaryCategory || '').trim()
      if (!c) return fail(['Primary category is empty.'])
      return pass([`Primary category: ${c}`])
    },
    fix: ['Ensure primary category is accurate (commonly “Electrician”). Add only truly relevant secondary categories.'],
  },

  {
    id: 'GBP_SERVICES_LISTED',
    title: 'GBP: Services list is populated (relevance to queries)',
    pillar: 'relevance',
    weight: 3,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const n = ctx.gbp.services.length
      if (n === 0) return warn(['GBP services list is empty.'])
      if (n < 5) return warn([`GBP services count is low (${n}). Add core services.`])
      return pass([`GBP services count: ${n}`])
    },
    fix: ['Add your core services to GBP (panel upgrades, EV chargers, generators, troubleshooting, lighting).'],
  },

  // -------------------------
  // PROMINENCE SIGNALS
  // -------------------------
  {
    id: 'GBP_REVIEWS_HEALTH',
    title: 'GBP: Reviews meet quality threshold (rating + count)',
    pillar: 'prominence',
    weight: 6,
    severity: 'high',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      if (!ctx.gbp.reviews) return warn(['GBP reviews block missing in gbp-profile.json'])
      const r = ctx.gbp.reviews
      const minR = LOCAL_SEO_THRESHOLDS.reviews.minRating
      const minC = LOCAL_SEO_THRESHOLDS.reviews.minCount
      const evidence = [`rating=${r.rating}`, `count=${r.count}`, `threshold=${minR}/${minC}`]
      if (r.rating < minR || r.count < minC) return warn(evidence)
      return pass(evidence)
    },
    fix: [
      'Implement a review SOP: ask every satisfied customer, respond to every review.',
      'Aim for steady growth and recent reviews.',
    ],
  },

  {
    id: 'GBP_REVIEW_RESPONSE_RATE',
    title: 'GBP: Owner response rate meets threshold (trust + prominence)',
    pillar: 'prominence',
    weight: 4,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const rr = ctx.gbp.reviews?.responseRatePercent
      if (rr == null) return warn(['Missing reviews.responseRatePercent in gbp-profile.json'])
      if (rr < LOCAL_SEO_THRESHOLDS.reviews.minResponseRatePercent) return warn([`responseRatePercent=${rr}`])
      return pass([`responseRatePercent=${rr}`])
    },
    fix: ['Respond to reviews consistently (target 90%+ response rate).'],
  },

  {
    id: 'GBP_PHOTOS_FRESHNESS',
    title: 'GBP: Photos are fresh (recent uploads)',
    pillar: 'prominence',
    weight: 2,
    severity: 'low',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const photos = ctx.gbp.photos
      if (!photos) return warn(['Missing photos block in gbp-profile.json'])
      const countOk = photos.count >= LOCAL_SEO_THRESHOLDS.photos.minCount
      const last = photos.lastUploadDate
      const days = last ? daysBetween(last, ctx.asOfDate) : null

      const evidence = [`photos.count=${photos.count}`, `min=${LOCAL_SEO_THRESHOLDS.photos.minCount}`, `lastUpload=${last ?? 'missing'}`]
      if (!countOk) return warn(evidence)

      if (days == null) return warn([...evidence, 'Cannot compute freshness days (missing lastUploadDate).'])
      if (days > LOCAL_SEO_THRESHOLDS.photos.freshnessDays) return warn([...evidence, `stale by ${days} days`])

      return pass([...evidence, `freshnessDays=${days}`])
    },
    fix: ['Upload new, real job photos weekly (panels, EV chargers, lighting, team, before/after).'],
  },

  {
    id: 'GBP_POSTS_FREQUENCY',
    title: 'GBP: Posting cadence is consistent (local engagement)',
    pillar: 'prominence',
    weight: 2,
    severity: 'low',
    evaluate: (ctx) => {
      if (!ctx.gbp) return needsData(['Missing local-seo/gbp-profile.json'])
      const posts = ctx.gbp.posts
      if (!posts) return warn(['Missing posts block in gbp-profile.json'])
      const freq = posts.postingFrequencyPerMonth ?? 0
      const ok = freq >= LOCAL_SEO_THRESHOLDS.posts.minPerMonth
      return ok ? pass([`postingFrequencyPerMonth=${freq}`]) : warn([`postingFrequencyPerMonth=${freq}`])
    },
    fix: ['Post weekly (2–4 posts/month): before/after, safety tips, seasonal generator readiness, etc.'],
  },

  {
    id: 'CITATIONS_NAP_CONSISTENT',
    title: 'Citations: NAP consistency across major directories (prominence reinforcement)',
    pillar: 'prominence',
    weight: 6,
    severity: 'medium',
    evaluate: (ctx) => {
      if (!ctx.citations) return needsData(['Missing local-seo/citations.json'])
      const cites = ctx.citations.citations
      if (cites.length < 5) return warn([`Only ${cites.length} citations listed. Add major directories (Apple Maps, Bing, Yelp, etc.).`])

      const name = ctx.site.brandName.trim()
      const phone = ctx.site.phoneE164.trim()

      const mismatched: string[] = []
      for (const c of cites) {
        if (c.name.trim() !== name) mismatched.push(`${c.provider}: name mismatch (${c.name})`)
        if (c.phoneE164.trim() !== phone) mismatched.push(`${c.provider}: phone mismatch (${c.phoneE164})`)
      }

      if (mismatched.length) return warn(mismatched)
      return pass([`Citations checked=${cites.length}`, 'Name/phone match SITE config.'])
    },
    fix: [
      'Build a citations list and keep NAP consistent.',
      'If service-area business (SAB), be consistent about address display where applicable.',
    ],
  },

  // -------------------------
  // THIN PAGE / DOORWAY RISK (Locations)
  // -------------------------
  {
    id: 'LOC_LOCATION_PAGES_THIN_RISK',
    title: 'Location pages are not thin/templated (doorway risk check)',
    pillar: 'distance',
    weight: 4,
    severity: 'high',
    evaluate: (ctx) => {
      // Heuristic: pages with pathname starting with /electrician-
      const locationPages = [...ctx.pages.keys()].filter((p) => p.startsWith('/electrician-'))

      if (ctx.mode !== 'live') {
        // Static mode: warn because we cannot see rendered wordcount, but still provide signal
        const found = ctx.repo.searchText({
          roots: ['app', 'src/app', 'pages', 'src/pages'],
          exts: ['ts', 'tsx', 'js', 'jsx'],
          query: /electrician-/,
        })
        return found.found
          ? warn(['Location page routes detected in repo. Run --mode=live to evaluate thin-page risk.'])
          : { status: 'not_applicable', evidence: ['No location pages detected (heuristic).'] }
      }

      if (locationPages.length === 0) return { status: 'not_applicable', evidence: ['No /electrician-* pages fetched.'] }

      const thin: string[] = []
      for (const p of locationPages) {
        const snap = ctx.pages.get(p)!
        if (snap.wordCount < LOCAL_SEO_THRESHOLDS.content.minLocationWords) {
          thin.push(`${p}: wordCount=${snap.wordCount} (<${LOCAL_SEO_THRESHOLDS.content.minLocationWords})`)
        }
      }

      if (thin.length) return warn(['Potential thin/doorway risk on location pages:', ...thin])
      return pass([`Location pages checked=${locationPages.length}`, 'No thin pages detected by wordcount heuristic.'])
    },
    fix: [
      'Keep only a few high-value location pages and make them genuinely useful (local proof, FAQs, travel expectations).',
      'Avoid scaling dozens of near-identical city pages (doorway risk).',
    ],
  },
]

// Why the doorway check exists: Google has explicitly targeted doorway pages and warns against pages created “solely for search engines.”
