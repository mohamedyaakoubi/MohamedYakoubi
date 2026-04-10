'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'
import { H2, IC, Callout, StatusPill, FadeIn } from '@/components/ApiDocPrimitives'
import { Menu, X, Upload, ChevronDown, ChevronRight, RotateCcw, Eye, EyeOff, AlertTriangle, LayoutList, Table2 } from 'lucide-react'

import type { Config, ColMap, TransformRule, ResultMeta } from './types'
import { LEGACY_ORDER, DEFAULT_CONFIG, EMPTY_COL_MAP } from './types'
import { SAMPLES } from './samples'
import {
  detectColumns, rowCount, detectValues,
  applyColMapping, validateMapping,
  buildHeaders, buildRequestConfig, summarizeCounts,
} from './helpers'
import { Toggle, NumInput } from './Controls'
import { ResultRow } from './ResultRow'
import { SpreadsheetView } from './SpreadsheetView'
import { ScorePanel } from './ScorePanel'

const BASE = 'https://structural-diff-engine.onrender.com'

// ── Main component ────────────────────────────────────────────────
export default function LiveSimulatorClient() {
  const { language } = useLanguage()
  const t = getLiveSimulatorI18n(language)
  const pathname = usePathname()

  // ── State ─────────────────────────────────────────────────────
  const [originalText, setOriginalText]       = useState('')
  const [reworkedText, setReworkedText]       = useState('')
  const [apiKey,       setApiKey]             = useState('sdiff-acme-abc123')
  const [showKey,      setShowKey]            = useState(false)
  const [requestId,    setRequestId]          = useState('')
  const [config,       setConfig]             = useState<Config>(DEFAULT_CONFIG)
  const [transformRules, setTransformRules]   = useState<TransformRule[]>([])
  const [showExpert,   setShowExpert]         = useState(false)
  const [showTransforms, setShowTransforms]   = useState(false)
  const [colMap,       setColMap]             = useState<ColMap>(EMPTY_COL_MAP)
  const [extraColsEnabled, setExtraColsEnabled] = useState<Record<string, boolean>>({})

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [samplesOpen,       setSamplesOpen]        = useState(false)
  const [loading,           setLoading]            = useState(false)
  const [error,             setError]              = useState<string | null>(null)
  const [results,           setResults]            = useState<Record<string, unknown>[] | null>(null)
  const [scores,            setScores]             = useState<Record<string, unknown> | null>(null)
  const [composite,         setComposite]          = useState<Record<string, unknown> | null>(null)
  const [runConfig,         setRunConfig]          = useState<Config | null>(null)
  const [resultMeta,        setResultMeta]         = useState<ResultMeta | null>(null)
  const [activeId,          setActiveId]           = useState(t.nav.sections[0]?.id ?? '')
  /** 'list' = collapsible rows  |  'sheet' = spreadsheet table */
  const [viewMode,          setViewMode]           = useState<'list' | 'sheet'>('list')

  const originalFileRef = useRef<HTMLInputElement>(null)
  const reworkedFileRef = useRef<HTMLInputElement>(null)
  const samplesMenuRef  = useRef<HTMLDivElement>(null)

  // Restore API key from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('sim_api_key')
    if (saved) setApiKey(saved)
  }, [])

  // Right sidebar TOC scroll tracking
  useEffect(() => {
    const ids = t.nav.sections.map((s) => s.id)
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -70% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Auto-enable newly detected extra (non-legacy) columns when input changes
  useEffect(() => {
    const cols = detectColumns(originalText)
    const extras = cols.filter((k) => !LEGACY_ORDER.includes(k as never))
    if (extras.length === 0) return
    setExtraColsEnabled((prev) => {
      const next = { ...prev }
      extras.forEach((k) => { if (next[k] === undefined) next[k] = true })
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalText])

  // Close samples dropdown on outside click
  useEffect(() => {
    if (!samplesOpen) return
    const handler = (e: MouseEvent) => {
      if (samplesMenuRef.current && !samplesMenuRef.current.contains(e.target as Node))
        setSamplesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [samplesOpen])

  // ── Helpers ───────────────────────────────────────────────────
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileSidebarOpen(false)
  }

  const loadSample = (idx: number) => {
    const s = SAMPLES[idx]
    setOriginalText(s.original)
    setReworkedText(s.reworked)
    setResults(null)
    setError(null)
    setSamplesOpen(false)
  }

  const handleFileUpload =
    (side: 'original' | 'reworked') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result as string
        side === 'original' ? setOriginalText(text) : setReworkedText(text)
      }
      reader.readAsText(file)
      e.target.value = ''
    }

  const updateConfig = <K extends keyof Config>(key: K, val: Config[K]) => {
    setConfig((prev) => {
      const next: Config = { ...prev, [key]: val }
      if (key === 'simpleMode') {
        if (val) {
          next.positionalMode = false
          next.enableSplits = false;  next.enableMerges = false
          next.enableCER    = false;  next.enableTranscriptCER = false
          next.enableWER    = false;  next.enableTranscriptWER = false
          next.enableSegER  = false;  next.enableSER = false
          next.enableSACR   = false;  next.enableComposite     = false
        } else {
          next.enableSplits = true;   next.enableMerges = true
          next.enableCER    = true;   next.enableTranscriptCER = true
          next.enableWER    = true;   next.enableTranscriptWER = true
          next.enableSegER  = true;   next.enableSER = true
          next.enableSACR   = true;   next.enableComposite     = true
        }
      }
      if (key === 'positionalMode') {
        if (val) {
          next.simpleMode      = false
          next.enableSplits    = false;  next.enableMerges = false
          next.enableSegER     = false
          next.enableInlineDiff = true
        } else {
          next.enableSplits = true; next.enableMerges = true; next.enableSegER = true
        }
      }
      if (
        (key === 'enableSplits' || key === 'enableMerges') &&
        !next.simpleMode && !next.positionalMode &&
        !next.enableSplits && !next.enableMerges
      ) {
        next.enableSegER = false
      }
      return next
    })
  }

  const resetAll = () => {
    setOriginalText(''); setReworkedText('')
    setResults(null);   setError(null)
    setScores(null);    setComposite(null)
    setConfig(DEFAULT_CONFIG)
    setTransformRules([])
    setColMap(EMPTY_COL_MAP)
    setExtraColsEnabled({})
    setResultMeta(null)
  }

  const submitDiff = async () => {
    setError(null); setResults(null)

    let original: Record<string, unknown>[]
    let reworked: Record<string, unknown>[]
    try {
      original = JSON.parse(originalText)
      if (!Array.isArray(original)) throw new Error()
    } catch { setError(t.errors.parseOriginal); return }
    try {
      reworked = JSON.parse(reworkedText)
      if (!Array.isArray(reworked)) throw new Error()
    } catch { setError(t.errors.parseReworked); return }
    if (!apiKey.trim()) { setError(t.run.noKey); return }

    const mappedOriginal = applyColMapping(original, colMap)
    const mappedReworked = applyColMapping(reworked, colMap)
    sessionStorage.setItem('sim_api_key', apiKey)
    setLoading(true)

    const detectedHeaders = buildHeaders(mappedOriginal, mappedReworked, extraColsEnabled)

    try {
      const body: Record<string, unknown> = {
        original: mappedOriginal,
        reworked: mappedReworked,
        config: {
          ...buildRequestConfig(config),
          ...(transformRules.length > 0 ? { structuralTransforms: transformRules } : {}),
        },
        ...(detectedHeaders ? { headers: detectedHeaders } : {}),
      }
      const res = await fetch(`${BASE}/v1/diff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          ...(requestId.trim() ? { 'x-request-id': requestId.trim() } : {}),
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { message?: string }
        throw new Error(errData.message ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { data?: { results?: unknown[]; meta?: unknown; scores?: unknown; composite?: unknown }; results?: unknown[] }
      const rows = (data?.data?.results ?? data?.results ?? []) as Record<string, unknown>[]
      const meta = (data?.data?.meta ?? {}) as ResultMeta
      setResults(rows)
      setScores((data?.data?.scores ?? null) as Record<string, unknown> | null)
      setComposite((data?.data?.composite ?? null) as Record<string, unknown> | null)
      setRunConfig(config)
      setResultMeta(meta)
      setTimeout(() => scrollTo('results'), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.fetchFailed)
    } finally {
      setLoading(false)
    }
  }

  // ── Derived ───────────────────────────────────────────────────
  const counts        = results ? summarizeCounts(results) : null
  const detectedCols  = detectColumns(originalText)
  const detectedVals  = detectValues(originalText)
  const extraCols     = detectedCols.filter((k) => !LEGACY_ORDER.includes(k as never))

  const simpleOn       = config.simpleMode
  const positionalOn   = config.positionalMode
  const splitsDisabled = simpleOn || positionalOn
  const mergesDisabled = simpleOn || positionalOn
  const cerDisabled    = simpleOn
  const werDisabled    = simpleOn
  const segerDisabled  = simpleOn || positionalOn || (!config.enableSplits && !config.enableMerges)
  const showSegerHint  = !simpleOn && !positionalOn && !config.enableSplits && !config.enableMerges

  // ── Sidebar ───────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="py-4 pr-4 space-y-4">
      <div className="space-y-0.5">
        <Link
          href={`/${language}/sheetdiff/api-docs`}
          className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {t.breadcrumb.apiDocs}
        </Link>
      </div>
      <div>
        <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {t.nav.guidesLabel}
        </p>
        <div className="space-y-0.5">
          {t.nav.guides.map((g) => {
            const isActive = pathname?.endsWith(`/${g.slug}`)
            return (
              <Link
                key={g.slug}
                href={`/${language}/sheetdiff/api-docs/${g.slug}`}
                className={`w-full block px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {g.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )

  // ── Render ────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-gray-800 border border-gray-700 text-sm text-gray-200 shadow-lg"
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          {mobileSidebarOpen ? <X size={15} /> : <Menu size={15} />}
          <span>{t.nav.sectionsBtn}</span>
        </button>
      </div>

      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto flex min-h-screen">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-4">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 pt-24 pb-12 max-w-3xl">
          <FadeIn>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link
                href={`/${language}/sheetdiff/api-docs`}
                className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {t.breadcrumb.apiDocs}
              </Link>
              <span>›</span>
              <span className="text-gray-600 dark:text-gray-300">{t.breadcrumb.current}</span>
            </div>

            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Live
                </span>
                <span className="text-xs text-gray-400 font-mono">structural-diff-engine.onrender.com</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t.hero.title}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{t.hero.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.hero.intro}</p>
            </div>

            {/* ── Section 1: Data Input ──────────────────────────── */}
            <H2 id="data-input">{t.input.title}</H2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paste JSON arrays or upload <IC>.json</IC> files. Each element is one row.
              </p>
              <div className="relative" ref={samplesMenuRef}>
                <button
                  type="button"
                  onClick={() => setSamplesOpen(o => !o)}
                  className="text-xs px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1.5 shrink-0 ml-4"
                >
                  <RotateCcw size={11} />
                  {t.input.loadSample}
                  <ChevronDown size={11} className={`transition-transform ${samplesOpen ? 'rotate-180' : ''}`} />
                </button>
                {samplesOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-50 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                    <div className="max-h-80 overflow-y-auto">
                      {SAMPLES.map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => loadSample(i)}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors"
                        >
                          <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{s.label}</div>
                          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{s.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Original pane */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                    {t.input.originalLabel}
                    {(() => {
                      const n = rowCount(originalText)
                      if (n !== null) return <span className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px]">{n} {t.input.rows}</span>
                      if (originalText) return <span className="ml-1 text-red-500 text-xs">{t.input.invalidJson}</span>
                      return null
                    })()}
                  </span>
                  <div className="flex items-center gap-1">
                    <input type="file" ref={originalFileRef} accept=".json" className="hidden" onChange={handleFileUpload('original')} />
                    <button type="button" onClick={() => originalFileRef.current?.click()} className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-1">
                      <Upload size={11} /> {t.input.upload}
                    </button>
                    {originalText && (
                      <button type="button" onClick={() => setOriginalText('')} className="text-xs px-1.5 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea value={originalText} onChange={(e) => setOriginalText(e.target.value)} placeholder={t.input.placeholder} rows={12} spellCheck={false} className="w-full font-mono text-xs px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-red-50/30 dark:bg-red-950/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>

              {/* Reworked pane */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    {t.input.reworkedLabel}
                    {(() => {
                      const n = rowCount(reworkedText)
                      if (n !== null) return <span className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px]">{n} {t.input.rows}</span>
                      if (reworkedText) return <span className="ml-1 text-red-500 text-xs">{t.input.invalidJson}</span>
                      return null
                    })()}
                  </span>
                  <div className="flex items-center gap-1">
                    <input type="file" ref={reworkedFileRef} accept=".json" className="hidden" onChange={handleFileUpload('reworked')} />
                    <button type="button" onClick={() => reworkedFileRef.current?.click()} className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-1">
                      <Upload size={11} /> {t.input.upload}
                    </button>
                    {reworkedText && (
                      <button type="button" onClick={() => setReworkedText('')} className="text-xs px-1.5 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea value={reworkedText} onChange={(e) => setReworkedText(e.target.value)} placeholder={t.input.placeholder} rows={12} spellCheck={false} className="w-full font-mono text-xs px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-emerald-50/30 dark:bg-emerald-950/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>
            </div>

            {/* ── Section 2: Authentication ──────────────────────── */}
            <H2 id="authentication">{t.auth.title}</H2>
            <div className="grid sm:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.auth.apiKeyLabel}</label>
                <div className="relative flex items-center">
                  <input type={showKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={t.auth.apiKeyPlaceholder} className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setShowKey((v) => !v)} className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.auth.requestIdLabel}</label>
                <input type="text" value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder={t.auth.requestIdPlaceholder} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <Callout type="info">{t.auth.note}</Callout>

            {/* ── Section 3: Column Mapping ──────────────────────── */}
            <H2 id="column-mapping">{t.mapping.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.mapping.body}</p>
            {detectedCols.length > 0 ? (
              <div className="mb-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {(
                    [
                      ['transcript',        simpleOn ? t.mapping.transcriptFieldSimple : t.mapping.transcriptField, false],
                      ['speaker',           t.mapping.speakerField,    true],
                      ['start_time',        t.mapping.startTimeField,  true],
                      ['end_time',          t.mapping.endTimeField,    true],
                      ['non_speech_events', t.mapping.nseField,        true],
                      ['emotion',           t.mapping.emotionField,    true],
                      ['language',          t.mapping.languageField,   true],
                      ['locale',            t.mapping.localeField,     true],
                      ['accent',            t.mapping.accentField,     true],
                      ['file_name',         t.mapping.fileNameField,   true],
                    ] as [keyof ColMap, string, boolean][]
                  ).map(([apiField, label, optional]) => {
                    const warn = validateMapping(apiField, colMap[apiField], detectedVals)
                    return (
                      <div key={apiField}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {label}{' '}
                          {optional && <span className="text-gray-400 font-normal text-xs">{t.mapping.optional}</span>}
                        </label>
                        <select
                          value={colMap[apiField]}
                          onChange={(e) => setColMap((m) => ({ ...m, [apiField]: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {/* First option = engine's default name for this role */}
                          <option value="">— {apiField} —</option>
                          {detectedCols.map((col) => <option key={col} value={col}>{col}</option>)}
                        </select>
                        {warn && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                            <AlertTriangle size={11} />
                            {t.mapping.typeMismatch}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Extra (non-legacy) columns */}
                {extraCols.length > 0 && (
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.mapping.extraColsTitle}</p>
                      <div className="flex gap-3 text-xs">
                        <button type="button" onClick={() => setExtraColsEnabled(Object.fromEntries(extraCols.map((k) => [k, true])))} className="text-blue-600 dark:text-blue-400 hover:underline">{t.mapping.allExtra}</button>
                        <button type="button" onClick={() => setExtraColsEnabled(Object.fromEntries(extraCols.map((k) => [k, false])))} className="text-gray-400 dark:text-gray-500 hover:underline">{t.mapping.noneExtra}</button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.mapping.extraColsBody}</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {extraCols.map((col) => (
                        <label key={col} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                          <input type="checkbox" checked={extraColsEnabled[col] !== false} onChange={(e) => setExtraColsEnabled((prev) => ({ ...prev, [col]: e.target.checked }))} className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="font-mono text-xs">{col}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-8 italic">
                Paste valid JSON in the Original field to auto-detect columns.
              </p>
            )}

            {/* ── Section 4: Config Parameters ──────────────────── */}
            <H2 id="config">{t.config.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.config.body}</p>

            <div className="space-y-4 mb-6">
              <Toggle value={config.simpleMode}      onChange={(v) => updateConfig('simpleMode', v)}      label={t.config.simpleMode.label}      desc={t.config.simpleMode.desc}      disabled={positionalOn} />
              <Toggle value={config.enableInlineDiff} onChange={(v) => updateConfig('enableInlineDiff', v)} label={t.config.enableInlineDiff.label} desc={t.config.enableInlineDiff.desc} />
              <Toggle value={config.enableSplits}    onChange={(v) => updateConfig('enableSplits', v)}    label={t.config.enableSplits.label}    desc={t.config.enableSplits.desc}    disabled={splitsDisabled} />
              <Toggle value={config.enableMerges}    onChange={(v) => updateConfig('enableMerges', v)}    label={t.config.enableMerges.label}    desc={t.config.enableMerges.desc}    disabled={mergesDisabled} />
              <Toggle value={config.enableCER}          onChange={(v) => updateConfig('enableCER', v)}          label={t.config.enableCER.label}          desc={t.config.enableCER.desc}          disabled={cerDisabled} />
              <Toggle value={config.enableTranscriptCER} onChange={(v) => updateConfig('enableTranscriptCER', v)} label={t.config.enableTranscriptCER.label} desc={t.config.enableTranscriptCER.desc} disabled={cerDisabled || !config.enableCER} />
              <Toggle value={config.enableWER}          onChange={(v) => updateConfig('enableWER', v)}          label={t.config.enableWER.label}          desc={t.config.enableWER.desc}          disabled={werDisabled} />
              <Toggle value={config.enableTranscriptWER} onChange={(v) => updateConfig('enableTranscriptWER', v)} label={t.config.enableTranscriptWER.label} desc={t.config.enableTranscriptWER.desc} disabled={werDisabled || !config.enableWER} />
              <Toggle value={config.enableSegER}          onChange={(v) => updateConfig('enableSegER', v)}          label={t.config.enableSegER.label}          desc={t.config.enableSegER.desc}          disabled={segerDisabled} />
              {showSegerHint && <p className="text-xs text-amber-600 dark:text-amber-500 ml-12">{t.config.segerHint}</p>}
              <Toggle value={config.enableSER}            onChange={(v) => updateConfig('enableSER', v)}            label={t.config.enableSER.label}            desc={t.config.enableSER.desc} />
              <Toggle value={config.enableSACR}           onChange={(v) => updateConfig('enableSACR', v)}           label={t.config.enableSACR.label}           desc={t.config.enableSACR.desc} />
              <Toggle value={config.enableComposite}    onChange={(v) => updateConfig('enableComposite', v)}    label={t.config.enableComposite.label}    desc={t.config.enableComposite.desc} />
              <Toggle value={config.stripDiacritics} onChange={(v) => updateConfig('stripDiacritics', v)} label={t.config.stripDiacritics.label} desc={t.config.stripDiacritics.desc} />
              <Toggle value={config.positionalMode}  onChange={(v) => updateConfig('positionalMode', v)}  label={t.config.positionalMode.label}  desc={t.config.positionalMode.desc} />
            </div>

            {/* ignoreColNames */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">{t.config.ignoreColNames.label}</label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{t.config.ignoreColNames.desc}</p>
              <input type="text" value={config.ignoreColNames} onChange={(e) => updateConfig('ignoreColNames', e.target.value)} placeholder={t.config.ignoreColNames.placeholder} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Expert thresholds */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-8">
              <button type="button" onClick={() => setShowExpert((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200">
                {t.config.expertTitle}
                {showExpert ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
              </button>
              {showExpert && (
                <div className="px-4 py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 space-y-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t.config.expertBody}</p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <NumInput value={config.SIM_CONFIDENT}     onChange={(v) => updateConfig('SIM_CONFIDENT', v)}     label={t.config.SIM_CONFIDENT.label}     desc={t.config.SIM_CONFIDENT.desc}     min={0} max={1}     step={0.05} />
                    <NumInput value={config.SIM_MODERATE}      onChange={(v) => updateConfig('SIM_MODERATE', v)}      label={t.config.SIM_MODERATE.label}      desc={t.config.SIM_MODERATE.desc}      min={0} max={1}     step={0.05} />
                    <NumInput value={config.SIM_WEAK}          onChange={(v) => updateConfig('SIM_WEAK', v)}          label={t.config.SIM_WEAK.label}          desc={t.config.SIM_WEAK.desc}          min={0} max={1}     step={0.05} />
                    <NumInput value={config.TIME_EXACT_TOL}    onChange={(v) => updateConfig('TIME_EXACT_TOL', v)}    label={t.config.TIME_EXACT_TOL.label}    desc={t.config.TIME_EXACT_TOL.desc}    min={0} max={60}    step={0.1}  />
                    <NumInput value={config.TIME_FUZZY_TOL}    onChange={(v) => updateConfig('TIME_FUZZY_TOL', v)}    label={t.config.TIME_FUZZY_TOL.label}    desc={t.config.TIME_FUZZY_TOL.desc}    min={0} max={60}    step={0.1}  />
                    <NumInput value={config.SPLIT_COMBINED_MIN} onChange={(v) => updateConfig('SPLIT_COMBINED_MIN', v)} label={t.config.SPLIT_COMBINED_MIN.label} desc={t.config.SPLIT_COMBINED_MIN.desc} min={0} max={1}  step={0.05} />
                    <NumInput value={config.MERGE_COMBINED_MIN} onChange={(v) => updateConfig('MERGE_COMBINED_MIN', v)} label={t.config.MERGE_COMBINED_MIN.label} desc={t.config.MERGE_COMBINED_MIN.desc} min={0} max={1}  step={0.05} />
                    <NumInput value={config.CHAR_DIFF_LIMIT}   onChange={(v) => updateConfig('CHAR_DIFF_LIMIT', v)}   label={t.config.CHAR_DIFF_LIMIT.label}   desc={t.config.CHAR_DIFF_LIMIT.desc}   min={100} max={50000} step={100} />
                  </div>
                </div>
              )}
            </div>

            {/* Transform Rules */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-8">
              <button type="button" onClick={() => setShowTransforms((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200">
                <span>
                  {t.config.transformRules.title}
                  {transformRules.length > 0 && <span className="ml-2 text-xs font-normal text-blue-600 dark:text-blue-400">({transformRules.length})</span>}
                </span>
                {showTransforms ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
              </button>
              {showTransforms && (
                <div className="px-4 py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t.config.transformRules.desc}</p>
                  {transformRules.length === 0 && <p className="text-xs text-gray-400 dark:text-gray-600 italic mb-3">{t.config.transformRules.noRules}</p>}
                  <div className="space-y-3 mb-4">
                    {transformRules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <input type="text" value={rule.find} onChange={(e) => setTransformRules((prev) => prev.map((r, i) => (i === idx ? { ...r, find: e.target.value } : r)))} placeholder={t.config.transformRules.findPlaceholder} aria-label={t.config.transformRules.findLabel} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1.5" />
                          <input type="text" value={rule.replace} onChange={(e) => setTransformRules((prev) => prev.map((r, i) => (i === idx ? { ...r, replace: e.target.value } : r)))} placeholder={t.config.transformRules.replacePlaceholder} aria-label={t.config.transformRules.replaceLabel} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t.config.transformRules.regexLabel}</label>
                          <input type="checkbox" checked={rule.isRegex} onChange={(e) => setTransformRules((prev) => prev.map((r, i) => (i === idx ? { ...r, isRegex: e.target.checked } : r)))} className="w-4 h-4 accent-blue-600" />
                        </div>
                        <button type="button" onClick={() => setTransformRules((prev) => prev.filter((_, i) => i !== idx))} className="mt-0.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" aria-label="Remove rule"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setTransformRules((prev) => [...prev, { find: '', replace: '', isRegex: false }])} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {t.config.transformRules.addRule}
                  </button>
                </div>
              )}
            </div>

            {/* Run / Reset */}
            <div className="flex items-center gap-3 mb-6">
              <button type="button" onClick={submitDiff} disabled={loading} className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center gap-2">
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>{t.run.running}</>
                ) : t.run.button}
              </button>
              <button type="button" onClick={resetAll} className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{t.run.reset}</button>
            </div>

            {error && <Callout type="warn">{error}</Callout>}

            {/* ── Section 5: Results ────────────────────────────── */}
            {results && (
              <>
                <H2 id="results">{t.results.title}</H2>

                {/* Score panel */}
                <ScorePanel scores={scores} composite={composite} t={t} />

                {/* Summary + view toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  {counts && Object.keys(counts).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(counts).map(([status, n]) => (
                        <div key={status} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold">
                          <StatusPill status={status} />
                          <span className="text-gray-700 dark:text-gray-300 ml-1">× {n}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View mode toggle */}
                  <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                      <LayoutList size={12} />
                      {t.results.viewList}
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('sheet')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${viewMode === 'sheet' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                      <Table2 size={12} />
                      {t.results.viewSheet}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 italic">{t.results.traceNote}</p>

                {/* ── List view ── */}
                {viewMode === 'list' && (
                  <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    {results.map((row, i) => (
                      <ResultRow key={i} row={row} idx={i + 1} t={t} runConfig={runConfig} resultMeta={resultMeta} />
                    ))}
                  </div>
                )}

                {/* ── Spreadsheet view ── */}
                {viewMode === 'sheet' && (
                  <SpreadsheetView results={results} runConfig={runConfig} resultMeta={resultMeta} t={t} />
                )}
              </>
            )}

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400 flex justify-between">
              <Link href={`/${language}/sheetdiff/api-docs`} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                ← {t.breadcrumb.apiDocs}
              </Link>
            </div>
          </FadeIn>
        </main>

        {/* Right TOC sidebar */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-8 border-l border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{t.nav.onThisPage}</p>
          <div className="space-y-0.5">
            {t.nav.sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${activeId === s.id ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}>
                {s.title}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
