// scripts/local-seo-audit.ts
import fs from 'node:fs'
import path from 'node:path'

import { createRepoSnapshot } from '../src/local-seo/repo'
import { loadGbpProfile } from '../src/local-seo/gbp'
import { loadCitations } from '../src/local-seo/citations'
import { fetchHtml } from '../src/local-seo/fetch'
import { parseHtmlSnapshot } from '../src/local-seo/parse'
import { runLocalSeoAudit } from '../src/local-seo/audit'
import { toCodexPrompts, toMarkdown } from '../src/local-seo/format'

// These are expected from Pack 0. If you haven’t added them, create minimal equivalents.
import { SITE } from '../src/config/site'
import { SERVICES } from '../src/config/services'
import { CORE_PAGES } from '../src/config/pages'

function arg(name: string, fallback?: string): string | undefined {
  const pfx = `--${name}=`
  const hit = process.argv.find((a) => a.startsWith(pfx))
  if (!hit) return fallback
  return hit.slice(pfx.length)
}

function flag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

function ensureDir(absPath: string) {
  fs.mkdirSync(absPath, { recursive: true })
}

function writeFile(absPath: string, content: string) {
  ensureDir(path.dirname(absPath))
  fs.writeFileSync(absPath, content, 'utf8')
}

function buildUrl(baseUrl: string, pathname: string): string {
  const base = baseUrl.replace(/\/+$/, '')
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${p}`
}

async function main() {
  const mode = (arg('mode', 'static') as 'static' | 'live') ?? 'static'
  const baseUrl = arg('baseUrl', SITE.baseUrl) ?? SITE.baseUrl
  const outDir = arg('outDir', 'artifacts/local-seo') ?? 'artifacts/local-seo'
  const gbpPath = arg('gbp', 'local-seo/gbp-profile.json') ?? 'local-seo/gbp-profile.json'
  const citationsPath = arg('citations', 'local-seo/citations.json') ?? 'local-seo/citations.json'
  const asOf = arg('asOf') // optional override YYYY-MM-DD

  const repo = createRepoSnapshot(process.cwd())

  const gbp = loadGbpProfile(gbpPath)
  const citations = loadCitations(citationsPath)

  // Deterministic reference date:
  // 1) CLI --asOf=YYYY-MM-DD
  // 2) gbp.asOfDate
  // 3) citations.asOfDate
  // 4) fallback to today (not deterministic)
  const asOfDate =
    asOf ||
    gbp?.asOfDate ||
    citations?.asOfDate ||
    new Date().toISOString().slice(0, 10)

  const pages = new Map<string, any>()

  // Build a deterministic URL list (core pages + service pages)
  const slugs = [
    ...CORE_PAGES.map((p) => p.slug),
    ...SERVICES.map((s) => s.slug),
  ]
    .map((s) => (s.startsWith('/') ? s : `/${s}`))
    .filter((s, idx, arr) => arr.indexOf(s) === idx)
    .sort((a, b) => a.localeCompare(b))

  if (mode === 'live') {
    for (const pathname of slugs) {
      const url = buildUrl(baseUrl, pathname)
      try {
        const { status, finalUrl, html } = await fetchHtml(url)
        const snap = parseHtmlSnapshot({ pathname, url, status, finalUrl, html })
        pages.set(pathname, snap)
      } catch (err: any) {
        pages.set(pathname, {
          pathname,
          url,
          status: 0,
          finalUrl: url,
          title: '',
          metaDescription: '',
          canonical: '',
          h1Count: 0,
          h1Text: '',
          h2Count: 0,
          wordCount: 0,
          text: '',
          telLinks: [],
          smsLinks: [],
          internalLinks: [],
          jsonLdObjects: [],
          schema: { hasLocalBusiness: false, hasService: false, hasBreadcrumbs: false },
          images: { total: 0, missingAlt: 0, missingDimensions: 0, notLazy: 0 },
          _error: String(err?.message ?? err),
        })
      }
    }
  }

  const report = runLocalSeoAudit({
    repo,
    site: {
      baseUrl: SITE.baseUrl,
      brandName: SITE.brandName,
      phoneE164: SITE.phoneE164,
      serviceAreas: SITE.serviceAreas,
    },
    services: SERVICES.map((s) => ({ slug: s.slug, name: s.name })),
    corePages: CORE_PAGES.map((p) => ({ slug: p.slug, name: p.name })),
    gbp,
    citations,
    mode,
    baseUrl,
    asOfDate,
    pages,
  })

  const outAbs = path.resolve(process.cwd(), outDir)
  ensureDir(outAbs)

  writeFile(path.join(outAbs, 'report.json'), JSON.stringify(report, null, 2))
  writeFile(path.join(outAbs, 'report.md'), toMarkdown(report))
  writeFile(path.join(outAbs, 'codex-prompts.md'), toCodexPrompts(report))

  console.log(`[localseo] overall=${report.scores.overall.score} coverage=${report.scores.overall.coverage}%`)
  console.log(`[localseo] report written to ${outAbs}`)

  const failBelow = arg('failBelow')
  if (failBelow) {
    const threshold = Number(failBelow)
    if (!Number.isNaN(threshold) && report.scores.overall.score < threshold) {
      console.error(`[localseo] FAIL: score ${report.scores.overall.score} < threshold ${threshold}`)
      process.exit(1)
    }
  }

  if (flag('failOnCritical')) {
    const criticalFails = report.prioritizedActions.filter((a) => a.severity === 'critical' && a.status === 'fail')
    if (criticalFails.length) {
      console.error(`[localseo] FAIL: critical failures present: ${criticalFails.map((c) => c.id).join(', ')}`)
      process.exit(1)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
