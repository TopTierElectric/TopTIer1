import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length
}

function loadArrayExport(filePath, exportName) {
  const source = readFileSync(filePath, 'utf8')
  const pattern = new RegExp(`export const ${exportName}(?:\\s*:[^=]+)?\\s*=\\s*(\\[[\\s\\S]*?\\n\\])`, 'm')
  const match = source.match(pattern)

  if (!match) {
    throw new Error(`Unable to load ${exportName} from ${filePath}`)
  }

  return Function(`"use strict"; return (${match[1]});`)()
}

function validateServices(services) {
  for (const service of services) {
    if (service.quickAnswers.length < 2) {
      throw new Error(`Service "${service.slug}" has <2 quick answers. Add AEO Q&A.`)
    }

    const combined = service.quickAnswers.map((item) => `${item.q} ${item.a}`).join(' ')
    if (wordCount(combined) < 60) {
      throw new Error(`Service "${service.slug}" quick answers are too thin. Expand answers.`)
    }
  }
}

function validatePages(corePages) {
  const slugs = new Set(corePages.map((page) => page.slug))
  if (!slugs.has('/services')) throw new Error('Missing /services in CORE_PAGES')
  if (!slugs.has('/contact')) throw new Error('Missing /contact in CORE_PAGES')
}

function main() {
  const services = loadArrayExport(resolve('src/config/services.ts'), 'SERVICES')
  const corePages = loadArrayExport(resolve('src/config/pages.ts'), 'CORE_PAGES')

  validatePages(corePages)
  validateServices(services)
  console.log('SEO quality gates passed.')
}

main()
