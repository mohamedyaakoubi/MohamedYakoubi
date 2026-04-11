'use client'

import React from 'react'

// ── i18n shape (subset used by this component) ────────────────────
interface ScorePanelI18n {
  title: string
  composite: string
  overall: string
  transcriptOnly: string
  cer: string
  wer: string
  seger: string
  ser: string
  transcriptSer: string
  sacr: string
  grade: string
  disabled: string
}

// ── Types (matches engine output shape) ──────────────────────────
interface Scores {
  overallCER:          number | null
  overallCERPercent:   string | null
  overallCERGrade:     number | null
  overallCERLabel:     string | null
  transcriptCER:       number | null
  transcriptCERPercent: string | null
  transcriptCERGrade:  number | null
  transcriptCERLabel:  string | null
  overallWER:          number | null
  overallWERPercent:   string | null
  overallWERGrade:     number | null
  overallWERLabel:     string | null
  transcriptWER:       number | null
  transcriptWERPercent: string | null
  transcriptWERGrade:  number | null
  transcriptWERLabel:  string | null
  SegER:               number | null
  SegERPercent:        string | null
  SegERGrade:          number | null
  SegERLabel:          string | null
  SER:                 number | null
  SERPercent:          string | null
  SERGrade:            number | null
  SERLabel:            string | null
  transcriptSER:       number | null
  transcriptSERPercent: string | null
  transcriptSERGrade:  number | null
  transcriptSERLabel:  string | null
  SACR:                number | null
  SACRPercent:         string | null
  SACRGrade:           number | null
  SACRLabel:           string | null
}

interface Composite {
  grade:          number
  label:          string
  percent:        string
  enabledMetrics: string[]
  details:        string
}

interface Props {
  scores:    Record<string, unknown> | null
  composite: Record<string, unknown> | null
  t:         { scorePanel: ScorePanelI18n }
}

// ── Helpers ──────────────────────────────────────────────────────
function gradeColor(grade: number | null | undefined): string {
  if (grade == null) return 'text-gray-400 dark:text-gray-500'
  if (grade >= 4.5) return 'text-emerald-600 dark:text-emerald-400'
  if (grade >= 3.5) return 'text-green-600 dark:text-green-400'
  if (grade >= 2.5) return 'text-yellow-600 dark:text-yellow-400'
  if (grade >= 1.5) return 'text-orange-500 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

function gradeBg(grade: number | null | undefined): string {
  if (grade == null) return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
  if (grade >= 4.5) return 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
  if (grade >= 3.5) return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300'
  if (grade >= 2.5) return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300'
  if (grade >= 1.5) return 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
  return 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
}

function MetricCell({
  percent,
  grade,
  disabled,
}: {
  percent: string | null
  grade:   number | null
  disabled: string
}) {
  if (percent == null && grade == null) {
    return <span className="text-gray-400 dark:text-gray-500 tabular-nums">{disabled}</span>
  }
  return (
    <span className="tabular-nums">
      <span className={`font-semibold ${gradeColor(grade)}`}>{percent ?? disabled}%</span>
      {grade != null && (
        <span className="ml-1.5 text-xs text-gray-400 dark:text-gray-500">({grade}/5)</span>
      )}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────
export function ScorePanel({ scores: rawScores, composite: rawComposite, t }: Props) {
  if (!rawScores && !rawComposite) return null

  const s = rawScores as unknown as Scores | null
  const c = rawComposite as unknown as Composite | null

  const tp = t.scorePanel

  return (
    <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{tp.title}</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Composite score */}
        {c && (
          <div className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${gradeBg(c.grade)}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-0.5">{tp.composite}</p>
              <p className="text-2xl font-bold tabular-nums">{c.grade.toFixed(1)}<span className="text-sm font-normal opacity-60 ml-1">/5</span></p>
              <p className="text-sm font-medium mt-0.5">{c.label}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60 mb-1">{c.enabledMetrics.join(' · ')}</p>
              <p className="text-lg font-semibold tabular-nums">{c.percent}%</p>
            </div>
          </div>
        )}

        {/* Metrics table */}
        {s && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:border-gray-800">
                  <th className="py-2 pr-4 text-left font-semibold w-12">{tp.grade}</th>
                  <th className="py-2 pr-4 text-left font-semibold">{tp.overall}</th>
                  <th className="py-2 text-left font-semibold">{tp.transcriptOnly}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {/* CER row */}
                <tr>
                  <td className="py-2.5 pr-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">{tp.cer}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <MetricCell percent={s.overallCERPercent ?? null} grade={s.overallCERGrade ?? null} disabled={tp.disabled} />
                  </td>
                  <td className="py-2.5">
                    <MetricCell percent={s.transcriptCERPercent ?? null} grade={s.transcriptCERGrade ?? null} disabled={tp.disabled} />
                  </td>
                </tr>
                {/* WER row */}
                <tr>
                  <td className="py-2.5 pr-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">{tp.wer}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <MetricCell percent={s.overallWERPercent ?? null} grade={s.overallWERGrade ?? null} disabled={tp.disabled} />
                  </td>
                  <td className="py-2.5">
                    <MetricCell percent={s.transcriptWERPercent ?? null} grade={s.transcriptWERGrade ?? null} disabled={tp.disabled} />
                  </td>
                </tr>
                {/* SegER row */}
                <tr>
                  <td className="py-2.5 pr-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">{tp.seger}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <MetricCell percent={s.SegERPercent ?? null} grade={s.SegERGrade ?? null} disabled={tp.disabled} />
                  </td>
                  <td className="py-2.5">
                    <span className="text-gray-400 dark:text-gray-500 tabular-nums">{tp.disabled}</span>
                  </td>
                </tr>
                {/* SER row */}
                <tr>
                  <td className="py-2.5 pr-4">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">{tp.ser}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <MetricCell percent={s.SERPercent ?? null} grade={s.SERGrade ?? null} disabled={tp.disabled} />
                  </td>
                  <td className="py-2.5">
                    <MetricCell percent={s.transcriptSERPercent ?? null} grade={s.transcriptSERGrade ?? null} disabled={tp.disabled} />
                  </td>
                </tr>
                {/* SACR row — only shown when speaker data produced a result */}
                {s.SACRPercent != null && (
                  <tr>
                    <td className="py-2.5 pr-4">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">{tp.sacr}</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <MetricCell percent={s.SACRPercent ?? null} grade={s.SACRGrade ?? null} disabled={tp.disabled} />
                    </td>
                    <td className="py-2.5">
                      <span className="text-gray-400 dark:text-gray-500 tabular-nums">{tp.disabled}</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
