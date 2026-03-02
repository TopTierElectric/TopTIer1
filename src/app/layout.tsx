import type { ReactNode } from 'react'

import { buildLocalBusinessJsonLd } from '../src/lib/seo/schema'

export default function RootLayout({ children }: { children: ReactNode }) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd()

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        {children}
      </body>
    </html>
  )
}
