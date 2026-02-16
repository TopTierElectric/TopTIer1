// src/local-seo/parse.ts
import { load } from 'cheerio'
import { PageSnapshot } from './types'

function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

function wordCount(text: string): number {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

function getTypes(obj: any): string[] {
  if (!obj || typeof obj !== 'object') return []
  const t = obj['@type']
  if (typeof t === 'string') return [t]
  if (Array.isArray(t)) return t.filter((x) => typeof x === 'string')
  return []
}

function hasType(json: unknown[], wanted: string[]): boolean {
  for (const item of json) {
    if (!item) continue
    const stack: any[] = [item]
    while (stack.length) {
      const cur = stack.pop()
      if (!cur) continue
      if (typeof cur === 'object') {
        const types = getTypes(cur)
        if (types.some((t) => wanted.includes(t))) return true

        // crawl nested objects (graph patterns)
        for (const v of Object.values(cur)) {
          if (Array.isArray(v)) stack.push(...v)
          else if (typeof v === 'object') stack.push(v)
        }
      }
    }
  }
  return false
}

export function parseHtmlSnapshot(params: {
  pathname: string
  url: string
  status: number
  finalUrl: string
  html: string
}): PageSnapshot {
  const $ = load(params.html)

  const title = normalizeWhitespace($('title').first().text() || '')
  const metaDescription = normalizeWhitespace($('meta[name="description"]').attr('content') || '')
  const canonical = normalizeWhitespace($('link[rel="canonical"]').attr('href') || '')

  const h1Count = $('h1').length
  const h1Text = normalizeWhitespace($('h1').first().text() || '')
  const h2Count = $('h2').length

  // JSON-LD parsing
  const jsonLdObjects: unknown[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text()
    if (!raw) return
    try {
      const parsed = JSON.parse(raw)
      jsonLdObjects.push(parsed)
    } catch {
      // ignore invalid JSON-LD blocks
    }
  })

  const hasLocalBusiness = hasType(jsonLdObjects, ['LocalBusiness', 'HomeAndConstructionBusiness', 'Electrician'])
  const hasService = hasType(jsonLdObjects, ['Service'])
  const hasBreadcrumbs = hasType(jsonLdObjects, ['BreadcrumbList'])

  const telLinks = $('a[href^="tel:"]')
    .map((_, a) => String($(a).attr('href') || ''))
    .get()
    .filter(Boolean)

  const smsLinks = $('a[href^="sms:"]')
    .map((_, a) => String($(a).attr('href') || ''))
    .get()
    .filter(Boolean)

  const internalLinks = $('a[href]')
    .map((_, a) => String($(a).attr('href') || ''))
    .get()
    .filter((h) => h.startsWith('/'))

  // Images heuristics (performance + trust)
  const imgs = $('img')
  let total = 0
  let missingAlt = 0
  let missingDimensions = 0
  let notLazy = 0

  imgs.each((_, img) => {
    total += 1
    const alt = ($(img).attr('alt') || '').trim()
    if (!alt) missingAlt += 1

    const w = ($(img).attr('width') || '').trim()
    const h = ($(img).attr('height') || '').trim()
    if (!w || !h) missingDimensions += 1

    const loading = ($(img).attr('loading') || '').trim().toLowerCase()
    // Many Next.js images will omit loading on priority images; we only count as "not lazy" if many are missing.
    if (loading !== 'lazy') notLazy += 1
  })

  // Text content
  $('script, style, noscript').remove()
  const text = normalizeWhitespace($('body').text() || '')

  return {
    pathname: params.pathname,
    url: params.url,
    status: params.status,
    finalUrl: params.finalUrl,
    title,
    metaDescription,
    canonical,
    h1Count,
    h1Text,
    h2Count,
    wordCount: wordCount(text),
    text,
    telLinks,
    smsLinks,
    internalLinks,
    jsonLdObjects,
    schema: { hasLocalBusiness, hasService, hasBreadcrumbs },
    images: { total, missingAlt, missingDimensions, notLazy },
  }
}
