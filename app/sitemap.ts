import type { MetadataRoute } from 'next'
import { CORE_PAGES } from '@/config/pages'
import { SERVICES } from '@/config/services'

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.toptier-electrical.com').replace(/\/+$/, '')
}

function toAbsolute(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${siteUrl()}${path}`
}

function getBlogSlugs(): string[] {
  return []
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core = CORE_PAGES.map((page) => ({
    url: toAbsolute(page.slug),
    lastModified: now,
    changeFrequency: page.changeFrequency ?? 'monthly',
    priority: page.priority ?? 0.5,
  }))

  const services = SERVICES.map((service) => ({
    url: toAbsolute(service.slug),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blog = getBlogSlugs().map((slug) => ({
    url: toAbsolute(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  return [...core, ...services, ...blog]
}
