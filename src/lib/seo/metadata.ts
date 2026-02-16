import type { Metadata } from 'next'
import { SITE, absoluteUrl } from '@/config/site'

type PageMetaInput = {
  title: string
  description?: string
  pathname: string // canonical path
  noindex?: boolean
  ogImage?: string
}

export function buildMetadata(input: PageMetaInput): Metadata {
  const canonical = input.pathname.startsWith('/') ? input.pathname : `/${input.pathname}`
  const description = input.description ?? SITE.description
  const ogImage = input.ogImage ?? SITE.ogImage

  return {
    title: input.title,
    description,
    alternates: {
      canonical,
    },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: canonical,
      title: input.title,
      description,
      siteName: SITE.brandName,
      locale: SITE.ogLocale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${input.title} | ${SITE.brandName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description,
      images: [SITE.twitterImage],
    },
  }
}

export function pageTitle(title: string): string {
  return `${title} | ${SITE.brandName}`
}

// Useful if you need absolute canonical for JSON-LD or analytics payloads
export function canonicalUrl(pathname: string): string {
  return absoluteUrl(pathname)
}
