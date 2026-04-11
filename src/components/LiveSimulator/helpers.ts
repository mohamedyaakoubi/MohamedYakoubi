import type { ColMap, Config } from './types'
import { LEGACY_ORDER } from './types'

// ── JSON inspection ───────────────────────────────────────────────

export function detectColumns(jsonText: string): string[] {
  try {
    const arr = JSON.parse(jsonText)
    if (!Array.isArray(arr) || arr.length === 0) return []
    return Object.keys(arr[0] as object)
  } catch {
    return []
  }
}

export function rowCount(jsonText: string): number | null {
  try {
    const arr = JSON.parse(jsonText)
    return Array.isArray(arr) ? arr.length : null
  } catch {
    return null
  }
}

/**
 * Returns a map of column → sample values (up to 10 rows) for type-checking.
 */
export function detectValues(jsonText: string): Record<string, unknown[]> {
  try {
    const arr = JSON.parse(jsonText) as Record<string, unknown>[]
    if (!Array.isArray(arr) || arr.length === 0) return {}
    const sample = arr.slice(0, 10)
    const result: Record<string, unknown[]> = {}
    sample.forEach((row) => {
      Object.entries(row).forEach(([k, v]) => {
        if (!result[k]) result[k] = []
        result[k].push(v)
      })
    })
    return result
  } catch {
    return {}
  }
}

// ── Column mapping ────────────────────────────────────────────────

export function applyColMapping(
  rows: Record<string, unknown>[],
  map: ColMap,
): Record<string, unknown>[] {
  const active = Object.entries(map).filter(([api, user]) => user && user !== api)
  if (active.length === 0) return rows
  return rows.map((row) => {
    const out: Record<string, unknown> = { ...row }
    active.forEach(([apiField, userField]) => {
      if (userField in row) {
        out[apiField] = row[userField]
        if (userField !== apiField) delete out[userField]
      }
    })
    return out
  })
}

/**
 * Heuristic type-safety check: warns when a user maps a column whose
 * values look incompatible with the engine's expected type for that role.
 *
 * - start_time / end_time expect numeric values
 * - speaker / emotion / language / locale / accent expect text values
 */
export function validateMapping(
  apiField: keyof ColMap,
  userField: string,
  values: Record<string, unknown[]>,
): 'warn' | null {
  if (!userField) return null
  const sample = values[userField]
  if (!sample) return null
  const nonEmpty = sample.filter((v) => v !== '' && v !== null && v !== undefined)
  if (nonEmpty.length === 0) return null
  const isAllNumeric = nonEmpty.every((v) => !isNaN(Number(v)))
  if ((apiField === 'start_time' || apiField === 'end_time') && !isAllNumeric) return 'warn'
  if (
    (apiField === 'speaker' || apiField === 'emotion' || apiField === 'language' ||
     apiField === 'locale'  || apiField === 'accent') &&
    isAllNumeric
  ) return 'warn'
  return null
}

// ── Headers / API request ─────────────────────────────────────────

/**
 * Build a headers array to send to the API when data has extra (non-legacy)
 * columns. Always puts LEGACY_ORDER first so COL indices stay valid.
 * Returns undefined when no extra columns exist.
 */
export function buildHeaders(
  orig: Record<string, unknown>[],
  reworked: Record<string, unknown>[],
  enabledExtras: Record<string, boolean>,
): string[] | undefined {
  const sample = { ...(orig[0] ?? {}), ...(reworked[0] ?? {}) }
  const allKeys = Object.keys(sample)
  const extras = allKeys.filter((k) => !LEGACY_ORDER.includes(k as never) && enabledExtras[k] !== false)
  if (extras.length === 0) return undefined
  return [...LEGACY_ORDER, ...extras].slice(0, 30)
}

export function buildRequestConfig(cfg: Config): Record<string, unknown> {
  const out: Record<string, unknown> = {
    simpleMode:       cfg.simpleMode,
    enableInlineDiff: cfg.enableInlineDiff,
    enableSplits:     cfg.enableSplits,
    enableMerges:     cfg.enableMerges,
    enableCER:           cfg.enableCER,
    enableTranscriptCER: cfg.enableTranscriptCER,
    enableWER:           cfg.enableWER,
    enableTranscriptWER: cfg.enableTranscriptWER,
    enableSegER:         cfg.enableSegER,
    enableSER:           cfg.enableSER,
    enableTranscriptSER: cfg.enableTranscriptSER,
    enableSACR:          cfg.enableSACR,
    enableComposite:     cfg.enableComposite,
    cerInComposite:      cfg.cerInComposite,
    werInComposite:      cfg.werInComposite,
    segerInComposite:    cfg.segerInComposite,
    serInComposite:      cfg.serInComposite,
    stripDiacritics:  cfg.stripDiacritics,
    positionalMode:   cfg.positionalMode,
  }
  if (cfg.ignoreColNames.trim()) {
    out.ignoreColNames = cfg.ignoreColNames.split(',').map((s) => s.trim()).filter(Boolean)
  }
  if (cfg.SIM_CONFIDENT    !== 0.75)  out.SIM_CONFIDENT    = cfg.SIM_CONFIDENT
  if (cfg.SIM_MODERATE     !== 0.5)   out.SIM_MODERATE     = cfg.SIM_MODERATE
  if (cfg.SIM_WEAK         !== 0.3)   out.SIM_WEAK         = cfg.SIM_WEAK
  if (cfg.TIME_EXACT_TOL   !== 1.0)   out.TIME_EXACT_TOL   = cfg.TIME_EXACT_TOL
  if (cfg.TIME_FUZZY_TOL   !== 2.5)   out.TIME_FUZZY_TOL   = cfg.TIME_FUZZY_TOL
  if (cfg.SPLIT_COMBINED_MIN !== 0.35) out.SPLIT_COMBINED_MIN = cfg.SPLIT_COMBINED_MIN
  if (cfg.MERGE_COMBINED_MIN !== 0.65) out.MERGE_COMBINED_MIN = cfg.MERGE_COMBINED_MIN
  if (cfg.CHAR_DIFF_LIMIT  !== 1500)  out.CHAR_DIFF_LIMIT  = cfg.CHAR_DIFF_LIMIT
  return out
}

// ── Results processing ────────────────────────────────────────────

export function summarizeCounts(results: Record<string, unknown>[]): Record<string, number> {
  const counts: Record<string, number> = {}
  results.forEach((r) => {
    const s = r.status as string
    if (s) counts[s] = (counts[s] ?? 0) + 1
  })
  return counts
}
