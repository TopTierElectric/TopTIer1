// src/local-seo/audit.ts
import { AuditContext, RuleDefinition } from './types'
import { LOCAL_SEO_RULES } from './rules'
import { computeScores, severityRank } from './score'

export type RuleResult = {
  id: string
  title: string
  pillar: 'relevance' | 'distance' | 'prominence'
  weight: number
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'pass' | 'fail' | 'warn' | 'needs_data' | 'not_applicable'
  evidence: string[]
  fix: string[]
  codexPrompt?: string
}

export type AuditReport = {
  asOfDate: string
  baseUrl: string
  framework: string
  scores: {
    overall: { score: number; coverage: number }
    perPillar: Record<'relevance' | 'distance' | 'prominence', { score: number; coverage: number }>
  }
  results: RuleResult[]
  prioritizedActions: RuleResult[]
}

function sortResults(a: RuleResult, b: RuleResult): number {
  // deterministic and action-oriented: severity desc, then weight desc, then id asc
  const sa = severityRank(a.severity)
  const sb = severityRank(b.severity)
  if (sa !== sb) return sb - sa
  if (a.weight !== b.weight) return b.weight - a.weight
  return a.id.localeCompare(b.id)
}

function buildResult(rule: RuleDefinition, evalResult: any): RuleResult {
  return {
    id: rule.id,
    title: rule.title,
    pillar: rule.pillar,
    weight: rule.weight,
    severity: rule.severity,
    status: evalResult.status,
    evidence: evalResult.evidence ?? [],
    fix: rule.fix ?? [],
    codexPrompt: rule.codexPrompt,
  }
}

export function runLocalSeoAudit(ctx: AuditContext): AuditReport {
  // Deterministic rule order by id
  const rules = [...LOCAL_SEO_RULES].sort((a, b) => a.id.localeCompare(b.id))

  const results: RuleResult[] = rules.map((r) => buildResult(r, r.evaluate(ctx)))

  const scoreInput = results.map((r) => ({ pillar: r.pillar, weight: r.weight, status: r.status }))
  const scores = computeScores(scoreInput)

  const prioritizedActions = results
    .filter((r) => r.status === 'fail' || r.status === 'warn')
    .sort(sortResults)

  return {
    asOfDate: ctx.asOfDate,
    baseUrl: ctx.baseUrl,
    framework: ctx.repo.framework,
    scores,
    results,
    prioritizedActions,
  }
}
