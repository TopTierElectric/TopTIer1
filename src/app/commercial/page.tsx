import Link from 'next/link'
import { buildMetadata, pageTitle } from '@/lib/seo/metadata'
import { SERVICES } from '@/config/services'
import { LeadForm } from '@/components/forms/LeadForm'
import { CallTextCTA } from '@/components/cta/CallTextCTA'

export const metadata = buildMetadata({
  title: pageTitle('Commercial Electrician'),
  pathname: '/commercial',
  description:
    'Commercial electrical service for troubleshooting, lighting upgrades, panel/service upgrades, and power improvements—with a focus on safety, uptime, and clean documentation.',
})

export default function CommercialPage() {
  const commercial = SERVICES.filter((s) => s.primaryIntent === 'commercial' || s.primaryIntent === 'both')

  return (
    <main>
      <h1>Commercial Electrician</h1>

      <p>
        We support businesses with reliable electrical service—repairs, upgrades, and improvements—while minimizing downtime and keeping work code-compliant.
      </p>

      <CallTextCTA />

      <section>
        <h2>Commercial Services</h2>
        <ul>
          {commercial.map((s) => (
            <li key={s.slug}>
              <Link href={s.slug}>
                <strong>{s.name}</strong>
              </Link>
              <div>{s.short}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>How We Protect Your Uptime</h2>
        <ul>
          <li>Plan shutdown windows (when required) and confirm restoration steps</li>
          <li>Document circuits and changes when it helps future service</li>
          <li>Communicate constraints early (access, scheduling, permits)</li>
        </ul>
      </section>

      <section>
        <h2>Request Commercial Service</h2>
        <LeadForm form="contact" />
      </section>
    </main>
  )
}
