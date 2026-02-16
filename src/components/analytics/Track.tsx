'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import { LeadEvent } from '@/lib/analytics/events'

export function track(event: LeadEvent) {
  try {
    sendGTMEvent(event)
  } catch {
    // Fallback: push to dataLayer if GTM helper isn't available
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(event)
  }
}
