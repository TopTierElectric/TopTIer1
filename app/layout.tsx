import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusinessJsonLd } from '@/lib/seo/schema'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={buildLocalBusinessJsonLd()} />
        {children}
      </body>
    </html>
  )
}
