import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE.baseUrl).replace(/\/+$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
