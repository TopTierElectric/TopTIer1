import { buildMetadata, pageTitle } from '@/lib/seo/metadata'
import { CallTextCTA } from '@/components/cta/CallTextCTA'

export const metadata = buildMetadata({
  title: pageTitle('Reviews'),
  pathname: '/reviews',
  description:
    'What customers say about our electrical work—communication, quality, and code-compliant execution.',
})

const TESTIMONIALS = [
  // TODO: replace with real reviews you have permission to republish
  {
    name: 'Homeowner — Panel Upgrade',
    text: 'Clear communication, clean install, and everything passed inspection. Would hire again.',
  },
  {
    name: 'Business Owner — Troubleshooting',
    text: 'Found the issue fast and explained options. Minimal downtime and solid work.',
  },
]

export default function ReviewsPage() {
  return (
    <main>
      <h1>Customer Reviews</h1>

      <p>
        We aim for clean workmanship and clear communication. Here are a few customer notes (with
        permission).
      </p>

      <section>
        {TESTIMONIALS.map((t, i) => (
          <article key={i} style={{ padding: 12, border: '1px solid #ddd', marginBottom: 12 }}>
            <strong>{t.name}</strong>
            <p>{t.text}</p>
          </article>
        ))}
      </section>

      <CallTextCTA />
    </main>
  )
}
