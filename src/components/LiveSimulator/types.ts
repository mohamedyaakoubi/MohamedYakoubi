// ── Domain types ─────────────────────────────────────────────────

export interface TransformRule {
  find: string
  replace: string
  isRegex: boolean
}

export interface Config {
  simpleMode: boolean
  enableInlineDiff: boolean
  enableSplits: boolean
  enableMerges: boolean
  enableCER: boolean
  enableTranscriptCER: boolean
  enableWER: boolean
  enableTranscriptWER: boolean
  enableSegER: boolean
  enableSER: boolean
  enableTranscriptSER: boolean
  enableSACR: boolean
  enableComposite: boolean
  cerInComposite: boolean
  werInComposite: boolean
  segerInComposite: boolean
  serInComposite: boolean
  stripDiacritics: boolean
  positionalMode: boolean
  ignoreColNames: string // comma-separated; converted to string[] on submit
  SIM_CONFIDENT: number
  SIM_MODERATE: number
  SIM_WEAK: number
  TIME_EXACT_TOL: number
  TIME_FUZZY_TOL: number
  SPLIT_COMBINED_MIN: number
  MERGE_COMBINED_MIN: number
  CHAR_DIFF_LIMIT: number
}

export interface ColMap {
  transcript: string
  speaker: string
  start_time: string
  end_time: string
  non_speech_events: string
  emotion: string
  language: string
  locale: string
  accent: string
  file_name: string
}

export interface SampleDataset {
  id:          string
  label:       string
  description: string
  original:    string
  reworked:    string
}

export interface ColDiffEntry {
  idx:     number
  header:  string
  oldVal:  unknown
  newVal:  unknown
  changed: boolean
}

// ── Constants ─────────────────────────────────────────────────────

/** Must match engine LEGACY_HEADERS to keep COL indices valid */
export const LEGACY_ORDER = [
  'file_name', 'speaker', 'start_time', 'end_time', 'transcript',
  'non_speech_events', 'emotion', 'language', 'locale', 'accent',
] as const

export const DEFAULT_CONFIG: Config = {
  simpleMode: false,
  enableInlineDiff: true,
  enableSplits: true,
  enableMerges: true,
  enableCER: true,
  enableTranscriptCER: true,
  enableWER: true,
  enableTranscriptWER: true,
  enableSegER: true,
  enableSER: true,
  enableTranscriptSER: true,
  enableSACR: true,
  enableComposite: true,
  cerInComposite: true,
  werInComposite: true,
  segerInComposite: true,
  serInComposite: true,
  stripDiacritics: false,
  positionalMode: false,
  ignoreColNames: '',
  SIM_CONFIDENT: 0.75,
  SIM_MODERATE: 0.5,
  SIM_WEAK: 0.3,
  TIME_EXACT_TOL: 1.0,
  TIME_FUZZY_TOL: 2.5,
  SPLIT_COMBINED_MIN: 0.35,
  MERGE_COMBINED_MIN: 0.65,
  CHAR_DIFF_LIMIT: 1500,
}

export const EMPTY_COL_MAP: ColMap = {
  transcript: '', speaker: '', start_time: '', end_time: '',
  non_speech_events: '', emotion: '', language: '', locale: '',
  accent: '', file_name: '',
}

/** Metadata returned by the engine alongside results */
export interface ResultMeta {
  originalRows: number
  reworkedRows: number
  headers: string[]
}
