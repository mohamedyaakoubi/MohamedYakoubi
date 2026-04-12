import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { InlineDiff, StatusPill, HighlightedCode } from '@/components/ApiDocPrimitives'
import type { Config, ColDiffEntry, ResultMeta } from './types'
import type { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'

type I18n = ReturnType<typeof getLiveSimulatorI18n>

function trunc(v: unknown, max = 120): string {
  const s = String(v ?? '')
  return s.length > max ? s.slice(0, max - 3) + '\u2026' : s
}

/** Read a named field from a positional data array. */
function posVal(data: unknown[], header: string, metaHeaders: string[]): string {
  const idx = metaHeaders.indexOf(header)
  return idx >= 0 ? String(data[idx] ?? '') : ''
}

export function ResultRow({
  row,
  idx,
  t,
  runConfig,
  resultMeta,
}: {
  row:        Record<string, unknown>
  idx:        number
  t:          I18n
  runConfig:  Config | null
  resultMeta: ResultMeta | null
}) {
  const [open, setOpen] = useState(false)

  const status    = row.status as string
  const isSplit   = status === 'SPLIT'
  const isMerged  = status === 'MERGED'

  // Inline diff tokens — present on MODIFIED, may also be present on SPLIT/MERGED
  const rawTokens = row.transcriptDiff as
    | { type: string; text?: string; value?: string }[]
    | undefined
  const tokens = rawTokens?.map((t) => ({
    type:  t.type.toLowerCase(),
    value: t.value ?? t.text ?? '',
  }))

  const colDiffs       = row.colDiffs        as ColDiffEntry[] | null | undefined
  const metaHeaders    = resultMeta?.headers ?? []
  const ignoredHeaders = runConfig
    ? runConfig.ignoreColNames.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  // Children (SPLIT) / parents (MERGED) — positional data arrays
  const splitChildren = isSplit  ? (row.children as unknown[][] | undefined) ?? [] : []
  const mergedParents = isMerged ? (row.parents  as unknown[][] | undefined) ?? [] : []

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      {/* ── Summary row ────────────────────────────────── */}
      <button
        type="button"
        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs text-gray-400 font-mono w-6 text-right shrink-0">
          {idx}
        </span>
        <StatusPill status={status} />
        <span className="flex-1 min-w-0 text-xs text-gray-500 dark:text-gray-400 truncate">
          {row.notes as string}
        </span>
        {/* Preview inline diff in summary row (MODIFIED only) */}
        {tokens && (
          <div className="hidden lg:block flex-1 min-w-0 overflow-hidden">
            <InlineDiff tokens={tokens} />
          </div>
        )}
        {open
          ? <ChevronDown  size={13} className="shrink-0 text-gray-400" />
          : <ChevronRight size={13} className="shrink-0 text-gray-400" />
        }
      </button>

      {/* ── Expanded content ────────────────────────────── */}
      {open && (
        <div className="px-4 pb-5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 space-y-4">

          {/* Column changes table (UNCHANGED / MODIFIED / SPLIT have colDiffs) */}
          {colDiffs && colDiffs.length > 0 && (
            <div className="pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {t.results.columnChanges}
              </p>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-xs min-w-[360px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 font-medium text-gray-400 w-1/5">{t.results.column}</th>
                      <th className="text-left py-2 px-3 font-medium text-red-400 w-2/5">{t.results.originalValue}</th>
                      <th className="text-left py-2 px-3 font-medium text-emerald-500 w-2/5">{t.results.reworkedValue}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-800">
                    {colDiffs.map((d) => {
                      const isIgnored    = ignoredHeaders.includes(d.header)
                      const isTranscript = d.header === 'transcript'
                      return (
                        <tr key={d.idx} className={d.changed ? 'bg-amber-50/70 dark:bg-amber-950/25' : ''}>
                          <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap align-top">
                            {d.header}
                            {isIgnored && (
                              <span className="ml-1.5 inline-block text-[9px] uppercase tracking-wide text-gray-400 bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
                                {t.results.ignored}
                              </span>
                            )}
                            {d.changed && (
                              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle" />
                            )}
                          </td>
                          <td className={`py-2 px-3 font-mono break-all align-top ${d.changed ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'}`}>
                            {trunc(d.oldVal)}
                          </td>
                          <td className={`py-2 px-3 font-mono break-all align-top ${d.changed ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400 dark:text-gray-500'}`}>
                            {isTranscript && tokens
                              ? <InlineDiff tokens={tokens} />
                              : trunc(d.newVal)
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPLIT: resulting child rows */}
          {isSplit && splitChildren.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 dark:text-violet-500 mb-2">
                {t.results.splitChildrenLabel} ({splitChildren.length})
              </p>
              <div className="overflow-x-auto rounded-lg border border-violet-200 dark:border-violet-800/50">
                <table className="w-full text-xs min-w-[360px]">
                  <thead>
                    <tr className="bg-violet-50/60 dark:bg-violet-950/20 border-b border-violet-100 dark:border-violet-800/40">
                      <th className="text-left py-2 px-3 font-medium text-violet-400 w-8">#</th>
                      {metaHeaders.length > 0
                        ? metaHeaders.map((h) => (
                            <th key={h} className="text-left py-2 px-3 font-medium text-gray-400">{h}</th>
                          ))
                        : <th className="text-left py-2 px-3 font-medium text-gray-400">data</th>
                      }
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-950 divide-y divide-violet-50 dark:divide-violet-900/20">
                    {splitChildren.map((childData, ci) => (
                      <tr key={ci} className="bg-violet-50/20 dark:bg-violet-950/10">
                        <td className="py-1.5 px-3 text-violet-400 font-mono">{ci + 1}</td>
                        {metaHeaders.length > 0
                          ? metaHeaders.map((h) => (
                              <td key={h} className="py-1.5 px-3 font-mono text-gray-700 dark:text-gray-300 break-all">
                                {trunc(posVal(childData, h, metaHeaders), h === 'transcript' ? 200 : 60)}
                              </td>
                            ))
                          : <td className="py-1.5 px-3 font-mono text-gray-700 dark:text-gray-300">
                              {JSON.stringify(childData)}
                            </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MERGED: original parent rows */}
          {isMerged && mergedParents.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-2">
                {t.results.mergedParentsLabel} ({mergedParents.length})
              </p>
              <div className="overflow-x-auto rounded-lg border border-blue-200 dark:border-blue-800/50">
                <table className="w-full text-xs min-w-[360px]">
                  <thead>
                    <tr className="bg-blue-50/60 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-800/40">
                      <th className="text-left py-2 px-3 font-medium text-blue-400 w-8">#</th>
                      {metaHeaders.length > 0
                        ? metaHeaders.map((h) => (
                            <th key={h} className="text-left py-2 px-3 font-medium text-gray-400">{h}</th>
                          ))
                        : <th className="text-left py-2 px-3 font-medium text-gray-400">data</th>
                      }
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-950 divide-y divide-blue-50 dark:divide-blue-900/20">
                    {mergedParents.map((parentData, pi) => (
                      <tr key={pi} className="bg-blue-50/20 dark:bg-blue-950/10">
                        <td className="py-1.5 px-3 text-blue-400 font-mono">{pi + 1}</td>
                        {metaHeaders.length > 0
                          ? metaHeaders.map((h) => (
                              <td key={h} className="py-1.5 px-3 font-mono text-gray-500 dark:text-gray-400 break-all">
                                {trunc(posVal(parentData, h, metaHeaders), h === 'transcript' ? 200 : 60)}
                              </td>
                            ))
                          : <td className="py-1.5 px-3 font-mono text-gray-500 dark:text-gray-400">
                              {JSON.stringify(parentData)}
                            </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Standalone inline transcript diff (MODIFIED) */}
          {tokens && (
            <div className="pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {t.results.transcriptDiff}
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3">
                <InlineDiff tokens={tokens} />
              </div>
            </div>
          )}

          {/* Quality scores */}
          {(row.cerScore != null || row.werScore != null || row.serScore != null) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {t.results.scores}
              </p>
              <div className="flex flex-wrap gap-4">
                {(['cerScore', 'werScore', 'serScore'] as const).map((k) =>
                  row[k] != null && (
                    <div key={k} className="text-xs">
                      <span className="text-gray-400 uppercase font-semibold">{k.replace('Score', '').toUpperCase()}</span>
                      <span className="ml-1 font-mono text-gray-800 dark:text-gray-200">{String(row[k])}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Raw JSON */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {t.results.rawJson}
            </p>
            <pre className="text-xs font-mono overflow-x-auto bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-700 p-3 max-h-64">
              <HighlightedCode code={JSON.stringify(row, null, 2)} lang="json" />
            </pre>
          </div>

        </div>
      )}
    </div>
  )
}
