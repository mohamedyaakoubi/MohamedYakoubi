'use client'

import React, { useState } from 'react'
import { InlineDiff } from '@/components/ApiDocPrimitives'
import type { ColDiffEntry, Config, ResultMeta } from './types'
import type { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'

type I18n = ReturnType<typeof getLiveSimulatorI18n>

// ── Status colour palette (mirrors SheetDiff Report) ─────────────

const STATUS_ROW_CLASS: Record<string, string> = {
  UNCHANGED: '',
  MODIFIED:  'bg-amber-50/70   dark:bg-amber-950/20',
  ADDED:     'bg-emerald-50/70 dark:bg-emerald-950/20',
  DELETED:   'bg-red-50/60     dark:bg-red-950/20',
  SPLIT:     'bg-violet-50/60  dark:bg-violet-950/20',
  MERGED:    'bg-blue-50/60    dark:bg-blue-950/20',
}

const SPLIT_CHILD_ROW   = 'bg-violet-50/30 dark:bg-violet-950/10'
const MERGED_PARENT_ROW = 'bg-blue-50/30   dark:bg-blue-950/10'

const STATUS_BADGE_CLASS: Record<string, string> = {
  UNCHANGED: 'bg-gray-100    dark:bg-gray-800      text-gray-500    dark:text-gray-400',
  MODIFIED:  'bg-amber-100   dark:bg-amber-900/50  text-amber-700   dark:text-amber-300',
  ADDED:     'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
  DELETED:   'bg-red-100     dark:bg-red-900/50    text-red-700     dark:text-red-300',
  SPLIT:     'bg-violet-100  dark:bg-violet-900/50 text-violet-700  dark:text-violet-300',
  MERGED:    'bg-blue-100    dark:bg-blue-900/50   text-blue-700    dark:text-blue-300',
}

// ── Helpers ───────────────────────────────────────────────────────

function trunc(s: string, max = 80): string {
  return s.length > max ? s.slice(0, max - 2) + '\u2026' : s
}

/**
 * Build the ordered list of content columns to show.
 * Uses meta.headers (engine-authoritative order). Falls back to scanning
 * colDiffs if meta is unavailable.
 */
function resolveHeaders(
  results: Record<string, unknown>[],
  metaHeaders: string[],
): string[] {
  if (metaHeaders.length > 0) return metaHeaders
  const seen  = new Set<string>()
  const order: string[] = []
  for (const row of results) {
    const cd = row.colDiffs as ColDiffEntry[] | null | undefined
    cd?.forEach((d) => {
      if (!seen.has(d.header)) { seen.add(d.header); order.push(d.header) }
    })
  }
  return order
}

/**
 * Resolve display value + change flag for a cell.
 *
 * Priority:
 *   1. colDiffs entry  — authoritative (UNCHANGED / MODIFIED / SPLIT)
 *   2. Positional lookup in snapData / currData via metaHeaders index
 *      — used for ADDED / DELETED / MERGED which have no colDiffs
 *
 * DELETED and SPLIT parent rows show *original* (snapData) values because
 * those rows are replaced / no longer present in the reworked version.
 */
function cellValue(
  row:         Record<string, unknown>,
  header:      string,
  metaHeaders: string[],
): { value: string; changed: boolean } {
  const status     = row.status as string
  const useOldSide = status === 'DELETED' || status === 'SPLIT'

  // Priority 1 — colDiffs
  const cd = (row.colDiffs as ColDiffEntry[] | null | undefined)
    ?.find((d) => d.header === header)
  if (cd) {
    return {
      value:   String(useOldSide ? (cd.oldVal ?? '') : (cd.newVal ?? '')),
      changed: cd.changed,
    }
  }

  // Priority 2 — positional lookup (ADDED / DELETED / MERGED)
  const idx = metaHeaders.indexOf(header)
  if (idx < 0) return { value: '', changed: false }
  const rawData = (
    useOldSide ? row.snapData : row.currData
  ) as unknown[] | null | undefined
  return { value: String(rawData?.[idx] ?? ''), changed: false }
}

/** Read one field from a positional data array. */
function posVal(data: unknown[], header: string, metaHeaders: string[]): string {
  const idx = metaHeaders.indexOf(header)
  return idx >= 0 ? String(data[idx] ?? '') : ''
}

// ── Component ─────────────────────────────────────────────────────

export function SpreadsheetView({
  results,
  runConfig,
  resultMeta,
  t,
}: {
  results:    Record<string, unknown>[]
  runConfig:  Config | null
  resultMeta: ResultMeta | null
  t: I18n
}) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const metaHeaders   = resultMeta?.headers ?? []
  const headers       = resolveHeaders(results, metaHeaders)
  const ignoredCols   = runConfig
    ? new Set(runConfig.ignoreColNames.split(',').map((s) => s.trim()).filter(Boolean))
    : new Set<string>()
  const transcriptIdx = headers.indexOf('transcript')

  let displayIdx = 0

  return (
    <div className="mt-6">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 italic">
        {t.results.spreadsheetNote}
      </p>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse min-w-full"
            style={{ tableLayout: 'fixed' }}
          >
            {/* Column widths */}
            <colgroup>
              <col style={{ width: '2.5rem',  minWidth: '2.5rem'  }} />
              <col style={{ width: '7.5rem',  minWidth: '7.5rem'  }} />
              <col style={{ width: '14rem',   minWidth: '12rem'   }} />
              {headers.map((h) => (
                <col
                  key={h}
                  style={{
                    width:    h === 'transcript' ? '22rem' : '7rem',
                    minWidth: h === 'transcript' ? '18rem' : '5.5rem',
                  }}
                />
              ))}
            </colgroup>

            {/* Header row */}
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-2 text-center font-semibold text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-700">
                  #
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                  {t.results.rowStatus}
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                  {t.results.notes}
                </th>
                {headers.map((h, i) => (
                  <th
                    key={h}
                    className={`py-2 px-3 text-left font-semibold whitespace-nowrap ${
                      ignoredCols.has(h)
                        ? 'text-gray-300 dark:text-gray-600'
                        : 'text-gray-500 dark:text-gray-400'
                    } ${i < headers.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}
                  >
                    {h}
                    {ignoredCols.has(h) && (
                      <span className="ml-1 text-[9px] font-normal">({t.results.ignored})</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Data rows */}
            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-800">
              {results.map((row, rowI) => {
                const status    = row.status as string
                const isDeleted = status === 'DELETED'
                const isSplit   = status === 'SPLIT'
                const isMerged  = status === 'MERGED'
                const rowClass  = STATUS_ROW_CLASS[status] ?? ''
                const isExp     = expandedRow === rowI

                displayIdx++

                // Inline diff tokens — present on MODIFIED and may be present on SPLIT/MERGED
                const rawTokens = row.transcriptDiff as
                  | { type: string; text?: string; value?: string }[]
                  | undefined
                const tokens = rawTokens?.map((tok) => ({
                  type:  tok.type.toLowerCase(),
                  value: tok.value ?? tok.text ?? '',
                }))

                // Children (SPLIT) and parents (MERGED) are positional data arrays
                const splitChildren = isSplit  ? (row.children as unknown[][] | undefined) ?? [] : []
                const mergedParents = isMerged ? (row.parents  as unknown[][] | undefined) ?? [] : []

                return (
                  <React.Fragment key={rowI}>

                    {/* ── Main result row ────────────────── */}
                    <tr
                      className={`${rowClass} hover:brightness-95 dark:hover:brightness-110 cursor-pointer transition-all`}
                      onClick={() => setExpandedRow(isExp ? null : rowI)}
                    >
                      <td className="py-1.5 px-2 text-center text-gray-400 font-mono border-r border-gray-100 dark:border-gray-800 select-none">
                        {displayIdx}
                      </td>

                      <td className="py-1.5 px-2 border-r border-gray-100 dark:border-gray-800 whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${STATUS_BADGE_CLASS[status] ?? 'text-gray-500'}`}>
                          {status}
                        </span>
                      </td>

                      <td
                        className="py-1.5 px-3 text-gray-500 dark:text-gray-400 border-r border-gray-100 dark:border-gray-800 whitespace-pre-wrap break-words"
                        title={(row.notes as string) ?? ''}
                      >
                        {(row.notes as string) ?? ''}
                      </td>

                      {headers.map((h, hi) => {
                        const { value, changed } = cellValue(row, h, metaHeaders)
                        const isTransCol  = hi === transcriptIdx
                        // DELETED rows are struck through — they no longer exist in reworked
                        const strikeClass = isDeleted ? 'line-through opacity-50' : ''
                        const base = `py-1.5 px-3 align-top font-mono ${hi < headers.length - 1 ? 'border-r border-gray-100 dark:border-gray-800' : ''}`

                        if (isTransCol && tokens) {
                          return (
                            <td key={h} className={`${base} bg-amber-50/60 dark:bg-amber-950/20 ${strikeClass}`}>
                              <InlineDiff tokens={tokens} />
                            </td>
                          )
                        }

                        return (
                          <td
                            key={h}
                            className={`${base} ${changed ? 'bg-amber-50/60 dark:bg-amber-950/20 font-semibold' : ''} ${strikeClass} text-gray-700 dark:text-gray-300`}
                          >
                            {trunc(value, h === 'transcript' ? 140 : 40)}
                          </td>
                        )
                      })}
                    </tr>

                    {/* ── SPLIT: child sub-rows ──────────── */}
                    {splitChildren.map((childData, ci) => (
                      <tr key={`${rowI}-c${ci}`} className={SPLIT_CHILD_ROW}>
                        <td className="py-1.5 px-2 text-center text-violet-400 font-mono text-[10px] border-r border-gray-100 dark:border-gray-800 select-none">
                          ↳
                        </td>
                        <td className="py-1.5 px-2 border-r border-gray-100 dark:border-gray-800 whitespace-nowrap">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                            child {ci + 1}/{splitChildren.length}
                          </span>
                        </td>
                        <td className="py-1.5 px-3 text-violet-400 dark:text-violet-500 text-[10px] border-r border-gray-100 dark:border-gray-800 italic">
                          {t.results.splitChildrenLabel}
                        </td>
                        {headers.map((h, hi) => (
                          <td
                            key={h}
                            className={`py-1.5 px-3 font-mono text-gray-600 dark:text-gray-400 ${hi < headers.length - 1 ? 'border-r border-gray-100 dark:border-gray-800' : ''}`}
                          >
                            {trunc(posVal(childData, h, metaHeaders), h === 'transcript' ? 140 : 40)}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* ── MERGED: parent sub-rows ────────── */}
                    {mergedParents.map((parentData, pi) => (
                      <tr key={`${rowI}-p${pi}`} className={MERGED_PARENT_ROW}>
                        <td className="py-1.5 px-2 text-center text-amber-400 font-mono text-[10px] border-r border-gray-100 dark:border-gray-800 select-none">
                          ↑
                        </td>
                        <td className="py-1.5 px-2 border-r border-gray-100 dark:border-gray-800 whitespace-nowrap">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            src {pi + 1}/{mergedParents.length}
                          </span>
                        </td>
                        <td className="py-1.5 px-3 text-blue-400 dark:text-blue-500 text-[10px] border-r border-gray-100 dark:border-gray-800 italic">
                          {t.results.mergedParentsLabel}
                        </td>
                        {headers.map((h, hi) => (
                          <td
                            key={h}
                            className={`py-1.5 px-3 font-mono text-gray-500 dark:text-gray-400 ${hi < headers.length - 1 ? 'border-r border-gray-100 dark:border-gray-800' : ''}`}
                          >
                            {trunc(posVal(parentData, h, metaHeaders), h === 'transcript' ? 140 : 40)}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* ── Expanded: quality scores ────────── */}
                    {isExp && (row.cerScore != null || row.werScore != null || row.serScore != null) && (
                      <tr className={rowClass}>
                        <td /><td />
                        <td colSpan={headers.length + 1} className="pb-2 px-3">
                          <div className="flex gap-4 pt-1">
                            {(['cerScore', 'werScore', 'serScore'] as const).map((k) =>
                              row[k] != null && (
                                <span key={k} className="text-[10px] font-mono">
                                  <span className="text-gray-400 uppercase font-semibold">{k.replace('Score', '')}: </span>
                                  <span className="text-gray-700 dark:text-gray-300">{String(row[k])}</span>
                                </span>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    )}

                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mr-1">
            {t.results.legend}
          </span>
          {Object.entries(STATUS_BADGE_CLASS).map(([s, cls]) => (
            <span key={s} className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${cls}`}>
              {s}
            </span>
          ))}
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 mr-1 align-middle" />
            {t.results.changedCell}
          </span>
          <span className="text-[10px] text-violet-400">↳</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">{t.results.splitChildrenLabel}</span>
          <span className="text-[10px] text-blue-400">↑</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">{t.results.mergedParentsLabel}</span>
        </div>
      </div>
    </div>
  )
}
