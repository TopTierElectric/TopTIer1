import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'
import { CORE_PAGES } from '@/config/pages'
import { SERVICES } from '@/config/services'

/**
 * Optional: if you have blog posts stored in code, add them here.
 * This default implementation is safe even if you don’t have blog slugs wired yet.
 */
function getBlogSlugs(): string[] {
  // TODO: Replace with your real blog system:
  // - MDX file system scan
  // - CMS fetch (cached)
  // - DB query
  return []
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core = CORE_PAGES.map((p) => ({
    url: absoluteUrl(p.slug),
    lastModified: now,
    changeFrequency: p.changeFrequency ?? 'monthly',
    priority: p.priority ?? 0.5,
  }))

  const services = SERVICES.map((s) => ({
    url: absoluteUrl(s.slug),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blog = getBlogSlugs().map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  return [...core, ...services, ...blog]
}
