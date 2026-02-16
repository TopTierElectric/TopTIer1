'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SERVICES } from '@/config/services'
import { buildPagePath } from '@/lib/analytics/events'
import { track } from '@/components/analytics/Track'

type FormKind = 'home' | 'contact' | 'booking'

export function LeadForm({ form }: { form: FormKind }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const fd = new FormData(e.currentTarget)

    // Honeypot
    const company = String(fd.get('company') ?? '')

    const payload = {
      form,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      service: String(fd.get('service') ?? ''),
      message: String(fd.get('message') ?? ''),
      company,
      page_path: buildPagePath(),
    }

    track({ event: 'lead_form_submit', form, page_path: payload.page_path })

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Something went wrong. Please call or text and we’ll take care of you.')
      return
    }

    track({ event: 'lead_form_success', form, page_path: payload.page_path })
    router.push(form === 'booking' ? '/thanks-booking' : '/thanks-contact')
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, maxWidth: 560 }}>
      {/* Honeypot (hidden) */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
        aria-hidden="true"
      />

      <label>
        Name *
        <input name="name" required minLength={2} maxLength={120} />
      </label>

      <label>
        Phone *
        <input name="phone" required minLength={7} maxLength={30} inputMode="tel" />
      </label>

      <label>
        Email (optional)
        <input name="email" type="email" maxLength={200} />
      </label>

      <label>
        Service *
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
      </label>

      <label>
        Details (optional)
        <textarea name="message" rows={5} maxLength={4000} placeholder="Describe the issue, timeline, and any details that help." />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Request Service'}
      </button>

      {error ? <p role="alert">{error}</p> : null}
    </form>
  )
}
