export type PageEntry = {
  slug: string
  name: string
  changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

export const CORE_PAGES: PageEntry[] = [
  { slug: '/', name: 'Home', changeFrequency: 'weekly', priority: 1 },
  { slug: '/services', name: 'Services', changeFrequency: 'monthly', priority: 0.9 },
  { slug: '/residential', name: 'Residential', changeFrequency: 'monthly', priority: 0.8 },
  { slug: '/commercial', name: 'Commercial', changeFrequency: 'monthly', priority: 0.8 },
  { slug: '/service-areas', name: 'Service Areas', changeFrequency: 'monthly', priority: 0.7 },
  { slug: '/gallery', name: 'Our Work', changeFrequency: 'weekly', priority: 0.7 },
  { slug: '/blog', name: 'Blog', changeFrequency: 'weekly', priority: 0.6 },
  { slug: '/about', name: 'About', changeFrequency: 'yearly', priority: 0.5 },
  { slug: '/contact', name: 'Contact', changeFrequency: 'yearly', priority: 0.5 },
  { slug: '/booking', name: 'Booking', changeFrequency: 'yearly', priority: 0.5 },
  { slug: '/reviews', name: 'Reviews', changeFrequency: 'monthly', priority: 0.6 },
]
