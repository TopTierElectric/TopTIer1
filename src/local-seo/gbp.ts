// src/local-seo/gbp.ts
import fs from 'node:fs'
import { z } from 'zod'
import { GbpProfile } from './types'

const AddressSchema = z.object({
  street1: z.string().min(1),
  street2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
})

const GbpSchema = z.object({
  asOfDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  businessName: z.string().min(1),
  isServiceAreaBusiness: z.boolean(),
  addressShown: z.boolean(),
  address: AddressSchema.nullable(),
  phoneE164: z.string().min(7),
  websiteUrl: z.string().url(),
  appointmentUrl: z.string().url(),
  primaryCategory: z.string().min(1),
  additionalCategories: z.array(z.string()).default([]),
  serviceAreas: z.array(z.string()).default([]),
  hours: z.record(z.string(), z.string()).default({}),
  services: z.array(z.object({ name: z.string().min(1), description: z.string().optional() })).default([]),
  reviews: z
    .object({
      rating: z.number(),
      count: z.number().int().nonnegative(),
      responseRatePercent: z.number().min(0).max(100).optional(),
      lastReviewDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      lastOwnerResponseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })
    .optional(),
  photos: z
    .object({
      count: z.number().int().nonnegative(),
      lastUploadDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })
    .optional(),
  posts: z
    .object({
      postingFrequencyPerMonth: z.number().int().nonnegative().optional(),
      lastPostDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    })
    .optional(),
})

export function loadGbpProfile(jsonPath: string): GbpProfile | undefined {
  if (!fs.existsSync(jsonPath)) return undefined
  const raw = fs.readFileSync(jsonPath, 'utf8')
  const parsed = GbpSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`GBP profile invalid: ${msg}`)
  }
  return parsed.data as GbpProfile
}
