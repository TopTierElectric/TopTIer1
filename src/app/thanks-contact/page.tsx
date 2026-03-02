import { buildMetadata } from '@/lib/seo/metadata'
import { CallTextCTA } from '@/components/cta/CallTextCTA'

export const metadata = buildMetadata({
  title: 'Request Received',
  pathname: '/thanks-contact',
  noindex: true,
})

export default function ThanksContactPage() {
  return (
    <main>
      <h1>We got your request</h1>
      <p>
        If this is urgent, call or text now. Otherwise we’ll respond as soon as possible during business hours.
      </p>
      <CallTextCTA />
    </main>
  )
}
