// src/local-seo/citations.ts
import fs from 'node:fs'
import { z } from 'zod'
import { CitationsSnapshot } from './types'

const AddressSchema = z.object({
  street1: z.string().min(1),
  street2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
})

const CitationsSchema = z.object({
  asOfDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  citations: z
    .array(
      z.object({
        provider: z.string().min(1),
        url: z.string().optional(),
        name: z.string().min(1),
        phoneE164: z.string().min(7),
        address: AddressSchema.nullable(),
      }),
    )
    .default([]),
})

export function loadCitations(jsonPath: string): CitationsSnapshot | undefined {
  if (!fs.existsSync(jsonPath)) return undefined
  const raw = fs.readFileSync(jsonPath, 'utf8')
  const parsed = CitationsSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`Citations invalid: ${msg}`)
  }
  return parsed.data as CitationsSnapshot
}
