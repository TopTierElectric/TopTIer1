'use client'

import { SITE } from '@/config/site'
import { track } from '@/components/analytics/Track'
import { buildPagePath } from '@/lib/analytics/events'

export function CallTextCTA() {
  const pagePath = buildPagePath()

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <a
        href={`tel:${SITE.phoneE164}`}
        onClick={() => track({ event: 'click_call', phone: SITE.phoneE164, page_path: pagePath })}
      >
        Call {SITE.phoneDisplay}
      </a>
      <a
        href={`sms:${SITE.smsE164}`}
        onClick={() => track({ event: 'click_text', phone: SITE.smsE164, page_path: pagePath })}
      >
        Text us
      </a>
    </div>
  )
}
