// src/local-seo/date.ts
export function parseYyyyMmDd(date: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const d = new Date(`${date}T00:00:00.000Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function daysBetween(fromYmd: string, toYmd: string): number | null {
  const a = parseYyyyMmDd(fromYmd)
  const b = parseYyyyMmDd(toYmd)
  if (!a || !b) return null
  const ms = b.getTime() - a.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}
