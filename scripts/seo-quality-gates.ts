import { SERVICES } from '../src/config/services'
import { CORE_PAGES } from '../src/config/pages'

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length
}

// Example: enforce that every service has at least 2 quick answers and non-trivial copy
function validateServices() {
  for (const s of SERVICES) {
    if (s.quickAnswers.length < 2) {
      throw new Error(`Service "${s.slug}" has <2 quick answers. Add AEO Q&A.`)
    }
    const combined = s.quickAnswers.map((x) => `${x.q} ${x.a}`).join(' ')
    if (wordCount(combined) < 60) {
      throw new Error(`Service "${s.slug}" quick answers are too thin. Expand answers.`)
    }
  }
}

function validatePages() {
  const slugs = new Set(CORE_PAGES.map((p) => p.slug))
  if (!slugs.has('/services')) throw new Error('Missing /services in CORE_PAGES')
  if (!slugs.has('/contact')) throw new Error('Missing /contact in CORE_PAGES')
}

function main() {
  validatePages()
  validateServices()
  console.log('SEO quality gates passed.')
}

main()
