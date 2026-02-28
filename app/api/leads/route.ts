import { NextResponse } from 'next/server'
import { z } from 'zod'

const LeadSchema = z.object({
  form: z.enum(['home', 'contact', 'booking']),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200).optional().or(z.literal('')),
  phone: z.string().min(7).max(30),
  service: z.string().min(2).max(120),
  message: z.string().min(0).max(4000).optional().or(z.literal('')),
  // honeypot (bots fill this)
  company: z.string().max(200).optional().or(z.literal('')),
  page_path: z.string().max(200).optional(),
})

async function sendLeadEmail(payload: z.infer<typeof LeadSchema>) {
  const mode = process.env.LEADS_MODE ?? 'console'
  const to = process.env.LEADS_TO_EMAIL ?? ''
  const from = process.env.LEADS_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? ''

  if (!to && mode !== 'console') throw new Error('LEADS_TO_EMAIL missing')

  if (mode === 'console') {
    console.log('[LEAD]', payload)
    return
  }

  if (mode === 'resend') {
    if (!from) throw new Error('LEADS_FROM_EMAIL (or RESEND_FROM_EMAIL) missing')
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY missing')

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from,
      to,
      subject: `New Lead (${payload.form}) — ${payload.service}`,
      text: [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email || '-'}`,
        `Service: ${payload.service}`,
        `Page: ${payload.page_path || '-'}`,
        '',
        payload.message || '',
      ].join('\n'),
    })
    return
  }

  throw new Error(`Unknown LEADS_MODE: ${mode}`)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
    }

    // Spam trap: if honeypot has value, pretend success (do not notify)
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    await sendLeadEmail(parsed.data)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
