import type { MetadataRoute } from 'next'

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.toptier-electrical.com').replace(/\/+$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
