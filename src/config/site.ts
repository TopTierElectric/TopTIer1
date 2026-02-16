export type ServiceArea = {
  name: string
  slug: string // for internal linking, optional
}

export const SITE = {
  brandName: 'Top Tier Electrical',
  legalName: 'Top Tier Electrical', // TODO: replace with legal entity name if different
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.toptier-electrical.com',
  defaultLocale: 'en-US',
  ogLocale: 'en_US',

  // TODO: fill in real values from your business
  phoneE164: '+1XXXXXXXXXX',
  phoneDisplay: '(XXX) XXX-XXXX',
  smsE164: '+1XXXXXXXXXX',
  email: 'info@toptier-electrical.com',

  // Positioning (used for SEO + AEO)
  tagline: 'Residential & Commercial Electrical Services',
  description:
    'Licensed electrical services for homes and businesses. Panel upgrades, EV chargers, generators, troubleshooting, and lighting—with clear communication and code-compliant workmanship.',

  // Service area (keep short + real to avoid doorway-page patterns)
  serviceAreas: [
    { name: 'Holland, MI', slug: 'holland-mi' },
    { name: 'Grand Rapids, MI', slug: 'grand-rapids-mi' },
    { name: 'Zeeland, MI', slug: 'zeeland-mi' },
  ] satisfies ServiceArea[],

  // Optional: social / entity links
  sameAs: {
    // TODO: add real URLs (GBP profile URL, Facebook, Instagram, etc.)
    gbp: '',
    facebook: '',
    instagram: '',
  },

  // Analytics
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',

  // Brand assets (store in /public)
  ogImage: '/og-default.png',
  twitterImage: '/twitter-default.png',
} as const

export function absoluteUrl(pathname: string): string {
  const base = SITE.baseUrl.replace(/\/+$/, '')
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}
