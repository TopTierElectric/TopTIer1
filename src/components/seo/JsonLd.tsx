import React from 'react'

// Basic sanitizer per Next.js guidance: prevents "<" injection in JSON-LD.
function toSafeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: toSafeJson(data) }}
    />
  )
}
