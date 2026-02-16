import { SITE, absoluteUrl } from '@/config/site'
import { SERVICES } from '@/config/services'

type JsonLd = Record<string, unknown>

export function buildLocalBusinessJsonLd(): JsonLd {
  const sameAs = Object.values(SITE.sameAs).filter(Boolean)

  // Use a stable @id so other schema objects can reference the business.
  const businessId = absoluteUrl('/#business')

  return {
    '@context': 'https://schema.org',
    // Electrician is a valid Schema.org type (subtype of HomeAndConstructionBusiness / LocalBusiness)
    '@type': 'Electrician',
    '@id': businessId,
    name: SITE.legalName,
    url: SITE.baseUrl,
    telephone: SITE.phoneE164,
    email: SITE.email,
    description: SITE.description,
    areaServed: SITE.serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
    sameAs: sameAs.length ? sameAs : undefined,
  }
}

export function buildServiceJsonLd(serviceSlug: string): JsonLd | null {
  const svc = SERVICES.find((s) => s.slug === serviceSlug)
  if (!svc) return null

  const businessId = absoluteUrl('/#business')

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.name,
    serviceType: svc.name,
    description: svc.short,
    url: absoluteUrl(svc.slug),
    provider: { '@id': businessId },
    areaServed: SITE.serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
  }
}

export function buildBreadcrumbsJsonLd(items: Array<{ name: string; pathname: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: absoluteUrl(it.pathname),
    })),
  }
}

export function buildBlogPostingJsonLd(input: {
  headline: string
  pathname: string
  datePublished: string
  dateModified?: string
  authorName: string
}): JsonLd {
  const businessId = absoluteUrl('/#business')

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    mainEntityOfPage: absoluteUrl(input.pathname),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      '@type': 'Person',
      name: input.authorName,
    },
    publisher: { '@id': businessId },
  }
}
