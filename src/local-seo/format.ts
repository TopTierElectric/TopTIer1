// src/local-seo/format.ts
import { AuditReport } from './audit'

function emoji(status: string) {
  switch (status) {
    case 'pass':
      return '✅'
    case 'warn':
      return '⚠️'
    case 'fail':
      return '❌'
    case 'needs_data':
      return '🧩'
    default:
      return '➖'
  }
}

export function toMarkdown(report: AuditReport): string {
  const { overall, perPillar } = report.scores

  const lines: string[] = []
  lines.push(`# Local SEO Audit Report`)
  lines.push(`- asOfDate: **${report.asOfDate}**`)
  lines.push(`- baseUrl: **${report.baseUrl}**`)
  lines.push(`- framework: **${report.framework}**`)
  lines.push('')
  lines.push(`## Scores`)
  lines.push(`- Overall: **${overall.score}/100** (coverage ${overall.coverage}%)`)
  lines.push(`- Relevance: **${perPillar.relevance.score}/100** (coverage ${perPillar.relevance.coverage}%)`)
  lines.push(`- Distance: **${perPillar.distance.score}/100** (coverage ${perPillar.distance.coverage}%)`)
  lines.push(`- Prominence: **${perPillar.prominence.score}/100** (coverage ${perPillar.prominence.coverage}%)`)
  lines.push('')
  lines.push(`## Prioritized Actions (fix these first)`)
  if (!report.prioritizedActions.length) {
    lines.push(`✅ No actions needed (all rules passed).`)
  } else {
    for (const a of report.prioritizedActions.slice(0, 15)) {
      lines.push(`### ${emoji(a.status)} ${a.id} — ${a.title}`)
      lines.push(`- pillar: **${a.pillar}** | severity: **${a.severity}** | weight: **${a.weight}**`)
      if (a.evidence.length) {
        lines.push(`- evidence:`)
        for (const e of a.evidence) lines.push(`  - ${e}`)
      }
      if (a.fix.length) {
        lines.push(`- fix:`)
        for (const f of a.fix) lines.push(`  - ${f}`)
      }
      lines.push('')
    }
  }

  lines.push(`## Full Rule Results`)
  lines.push(`| Status | Rule | Pillar | Weight | Severity |`)
  lines.push(`|---|---|---:|---:|---|`)
  for (const r of report.results) {
    lines.push(`| ${emoji(r.status)} ${r.status} | ${r.id} | ${r.pillar} | ${r.weight} | ${r.severity} |`)
  }

  lines.push('')
  return lines.join('\n')
}

export function toCodexPrompts(report: AuditReport): string {
  const lines: string[] = []
  lines.push(`# Codex Fix Prompts — Local SEO`)
  lines.push(`Use each section as a separate Codex task.`)
  lines.push('')

  const actions = report.prioritizedActions
  if (!actions.length) {
    lines.push('✅ No prompts needed.')
    return lines.join('\n')
  }

  for (const a of actions) {
    lines.push(`## ${a.id}: ${a.title}`)
    lines.push(`Status: ${a.status} | Pillar: ${a.pillar} | Severity: ${a.severity}`)
    if (a.evidence.length) {
      lines.push('')
      lines.push(`Evidence:`)
      for (const e of a.evidence) lines.push(`- ${e}`)
    }
    lines.push('')
    lines.push(`Prompt:`)
    lines.push('```text')
    lines.push(
      a.codexPrompt ??
        [
          `Fix ${a.id} in repo.`,
          `Apply these changes:`,
          ...(a.fix ?? []).map((f) => `- ${f}`),
          `After changes, re-run npm run localseo:audit and ensure this rule passes.`,
        ].join('\n'),
    )
    lines.push('```')
    lines.push('')
  }

  return lines.join('\n')
}
