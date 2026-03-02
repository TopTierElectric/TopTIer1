import { buildMetadata } from '@/lib/seo/metadata'
import { CallTextCTA } from '@/components/cta/CallTextCTA'

export const metadata = buildMetadata({
  title: 'Booking Request Received',
  pathname: '/thanks-booking',
  noindex: true,
})

export default function ThanksBookingPage() {
  return (
    <main>
      <h1>Booking request received</h1>
      <p>
        We’ll confirm details and next steps. If you need immediate help, call or text now.
      </p>
      <CallTextCTA />
    </main>
  )
}
