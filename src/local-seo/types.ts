// src/local-seo/types.ts
export type Pillar = 'relevance' | 'distance' | 'prominence'
export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Status = 'pass' | 'fail' | 'warn' | 'needs_data' | 'not_applicable'

export type RuleEval = {
  status: Status
  evidence: string[]
}

export type RuleDefinition = {
  id: string
  title: string
  pillar: Pillar
  weight: number
  severity: Severity
  evaluate: (ctx: AuditContext) => RuleEval
  fix: string[]
  codexPrompt?: string
}

export type RepoFramework = 'next_app_router' | 'next_pages_router' | 'unknown'

export type RepoSnapshot = {
  root: string
  framework: RepoFramework
  exists: (relPath: string) => boolean
  readText: (relPath: string) => string | null
  searchText: (opts: { roots: string[]; exts: string[]; query: RegExp | string }) => { found: boolean; sample?: string }
}

export type PageSnapshot = {
  pathname: string
  url: string
  status: number
  finalUrl: string
  title: string
  metaDescription: string
  canonical: string
  h1Count: number
  h1Text: string
  h2Count: number
  wordCount: number
  text: string
  telLinks: string[]
  smsLinks: string[]
  internalLinks: string[]
  jsonLdObjects: unknown[]
  schema: {
    hasLocalBusiness: boolean
    hasService: boolean
    hasBreadcrumbs: boolean
  }
  images: {
    total: number
    missingAlt: number
    missingDimensions: number
    notLazy: number
  }
}

export type GbpProfile = {
  asOfDate: string // YYYY-MM-DD (used for deterministic recency checks)
  businessName: string
  isServiceAreaBusiness: boolean
  addressShown: boolean
  address: null | {
    street1: string
    street2?: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  phoneE164: string
  websiteUrl: string
  appointmentUrl: string
  primaryCategory: string
  additionalCategories: string[]
  serviceAreas: string[]
  hours: Record<string, string>
  services: Array<{ name: string; description?: string }>
  reviews?: {
    rating: number
    count: number
    responseRatePercent?: number
    lastReviewDate?: string // YYYY-MM-DD
    lastOwnerResponseDate?: string // YYYY-MM-DD
  }
  photos?: {
    count: number
    lastUploadDate?: string // YYYY-MM-DD
  }
  posts?: {
    postingFrequencyPerMonth?: number
    lastPostDate?: string // YYYY-MM-DD
  }
}

export type CitationsSnapshot = {
  asOfDate: string
  citations: Array<{
    provider: string
    url?: string
    name: string
    phoneE164: string
    address: null | {
      street1: string
      street2?: string
      city: string
      region: string
      postalCode: string
      country: string
    }
  }>
}

export type SiteConfig = {
  baseUrl: string
  brandName: string
  phoneE164: string
  serviceAreas: Array<{ name: string; slug?: string }>
}

export type ServiceConfig = {
  slug: string
  name: string
}

export type CorePageConfig = {
  slug: string
  name: string
}

export type AuditContext = {
  repo: RepoSnapshot
  site: SiteConfig
  services: ServiceConfig[]
  corePages: CorePageConfig[]
  gbp?: GbpProfile
  citations?: CitationsSnapshot
  mode: 'static' | 'live'
  baseUrl: string
  asOfDate: string // YYYY-MM-DD (deterministic reference)
  pages: Map<string, PageSnapshot> // pathname -> snapshot
}
