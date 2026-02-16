// src/local-seo/score.ts
import { Pillar, Status } from './types'

const STATUS_POINTS: Record<Status, number> = {
  pass: 1,
  warn: 0.5,
  fail: 0,
  needs_data: 0,
  not_applicable: 0,
}

export function severityRank(s: string): number {
  switch (s) {
    case 'critical':
      return 4
    case 'high':
      return 3
    case 'medium':
      return 2
    default:
      return 1
  }
}

export function computeScores(items: Array<{ pillar: Pillar; weight: number; status: Status }>) {
  const pillars: Pillar[] = ['relevance', 'distance', 'prominence']

  function calc(pillar?: Pillar) {
    const scoped = pillar ? items.filter((i) => i.pillar === pillar) : items
    const evaluated = scoped.filter((i) => i.status !== 'needs_data' && i.status !== 'not_applicable')

    const denom = evaluated.reduce((sum, i) => sum + i.weight, 0)
    const numer = evaluated.reduce((sum, i) => sum + i.weight * STATUS_POINTS[i.status], 0)

    const totalPossible = scoped.reduce((sum, i) => sum + i.weight, 0)
    const evaluatedWeight = evaluated.reduce((sum, i) => sum + i.weight, 0)

    const score = denom === 0 ? 0 : Math.round((numer / denom) * 100)
    const coverage = totalPossible === 0 ? 0 : Math.round((evaluatedWeight / totalPossible) * 100)

    return { score, coverage }
  }

  const overall = calc()
  const perPillar = Object.fromEntries(pillars.map((p) => [p, calc(p)])) as Record<Pillar, { score: number; coverage: number }>

  return { overall, perPillar }
}
