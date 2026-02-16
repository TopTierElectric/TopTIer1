type UTM = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content?: string
  utm_term?: string
}

export function withUtm(url: string, utm: UTM): string {
  const u = new URL(url)

  for (const [k, v] of Object.entries(utm)) {
    if (v) u.searchParams.set(k, v)
  }

  return u.toString()
}

// Example helper for GBP
export function gbpBookingUrl(base: string): string {
  return withUtm(base, {
    utm_source: 'gbp',
    utm_medium: 'organic',
    utm_campaign: 'maps',
    utm_content: 'booking_link',
  })
}
