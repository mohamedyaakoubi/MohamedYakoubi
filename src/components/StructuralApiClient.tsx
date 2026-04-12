'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'
import { TabbedCodeBlock, HighlightedCode } from '@/components/ApiDocPrimitives'
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  SplitSquareHorizontal,
  GitMerge,
  CirclePlus,
  Trash2,
  Pencil,
  Minus,
  ArrowRight,
  AlertCircle,
  Lock,
  Gauge,
  Globe2,
  FileJson,
  Menu,
  X,
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ── Sidebar structure — IDs are stable; labels come from i18n ── */
const SECTION_IDS_BY_GROUP = [
  ['overview', 'quickstart', 'base-url'],
  ['auth', 'rate-limits'],
  ['endpoints', 'request', 'response', 'config', 'column-mapping'],
  ['errors', 'tracing'],
  ['access'],
] as const

/* ── Copy button ─────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="absolute top-3 right-3 p-1.5 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

/* ── Code block ──────────────────────────────────────────────── */
const LANG_ACCENT: Record<string, string> = {
  json:       'text-amber-500 dark:text-amber-400',
  bash:       'text-emerald-600 dark:text-emerald-400',
  shell:      'text-emerald-600 dark:text-emerald-400',
  curl:       'text-emerald-600 dark:text-emerald-400',
  javascript: 'text-yellow-500 dark:text-yellow-400',
  js:         'text-yellow-500 dark:text-yellow-400',
  typescript: 'text-blue-500 dark:text-blue-400',
  ts:         'text-blue-500 dark:text-blue-400',
  http:       'text-purple-500 dark:text-purple-400',
}
function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const accentCls = LANG_ACCENT[lang.toLowerCase()] ?? 'text-gray-500 dark:text-gray-400'
  return (
    <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-4 shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <span className={`text-xs font-mono font-semibold uppercase tracking-widest select-none ${accentCls}`}>{lang}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        <code><HighlightedCode code={code} lang={lang} /></code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

/* ── Inline code ─────────────────────────────────────────────── */
function IC({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
      {children}
    </code>
  )
}

/* ── Section heading ─────────────────────────────────────────── */
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-gray-900 dark:text-gray-50 mt-12 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 scroll-mt-20 group flex items-center gap-2"
    >
      {children}
      <a href={`#${id}`} aria-hidden="true" tabIndex={-1} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity text-base font-normal after:content-['#']" />
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">
      {children}
    </h3>
  )
}

/* ── Method badge ────────────────────────────────────────────── */
function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET:  'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
    POST: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border ${colors[method] ?? ''}`}>
      {method}
    </span>
  )
}

/* ── Param table ─────────────────────────────────────────────── */
function ParamTable({ rows }: {
  rows: { name: string; type: string; required?: boolean; default?: string; desc: React.ReactNode }[]
}) {
  const hasDefaults = rows.some(r => r.default !== undefined)
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-40">Name</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-32">Type</th>
            {hasDefaults && <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-24">Default</th>}
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {rows.map(r => (
            <tr key={r.name} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
              <td className="px-4 py-3 align-top">
                <IC>{r.name}</IC>
                {r.required && <span className="ml-1.5 text-xs text-red-500 font-medium">*</span>}
              </td>
              <td className="px-4 py-3 align-top">
                <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{r.type}</span>
              </td>
              {hasDefaults && (
                <td className="px-4 py-3 align-top">
                  {r.default !== undefined
                    ? <IC>{r.default}</IC>
                    : <span className="text-gray-400 dark:text-gray-600">—</span>
                  }
                </td>
              )}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 leading-relaxed align-top">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Status style (icons/colors only — descriptions come from i18n) ── */
const STATUS_STYLE: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  UNCHANGED: { icon: <Minus size={13} />,               color: 'text-gray-500 dark:text-gray-400',       bg: 'bg-gray-50 dark:bg-gray-900' },
  MODIFIED:  { icon: <Pencil size={13} />,              color: 'text-amber-600 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ADDED:     { icon: <CirclePlus size={13} />,          color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  DELETED:   { icon: <Trash2 size={13} />,              color: 'text-red-600 dark:text-red-400',         bg: 'bg-red-50 dark:bg-red-900/20' },
  SPLIT:     { icon: <SplitSquareHorizontal size={13} />, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  MERGED:    { icon: <GitMerge size={13} />,            color: 'text-indigo-600 dark:text-indigo-400',   bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
}

/* ── Callout ─────────────────────────────────────────────────── */
function Callout({ type = 'info', children }: { type?: 'info' | 'warn'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warn: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
  }
  return (
    <div className={`flex gap-3 rounded-lg border p-4 my-4 text-sm leading-relaxed ${styles[type]}`}>
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

/* ── Collapsible ─────────────────────────────────────────────── */
function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden my-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {title}
        {open ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
      </button>
      {open && <div className="px-4 py-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">{children}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────────────────── */
export default function StructuralApiClient() {
  const { language } = useLanguage()
  const t = getStructuralApiI18n(language)

  const navGroups = t.nav.groups.map((group, gi) => ({
    label: group.label,
    items: group.items.map((title, ii) => ({
      id: SECTION_IDS_BY_GROUP[gi][ii] as string,
      title,
    })),
  }))
  const allSections = navGroups.flatMap(g => g.items)

  const [activeId, setActiveId] = useState('overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const BASE = 'https://structural-diff-engine.onrender.com'

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = allSections.map(s => s.id)
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileSidebarOpen(false)
  }

  /* ── Sidebar link ───────────────────────────────────────── */
  const SidebarLink = ({ id, title }: { id: string; title: string }) => (
    <button
      onClick={() => scrollTo(id)}
      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
        activeId === id
          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {title}
    </button>
  )

  /* ── Left sidebar content ───────────────────────────────── */
  const SidebarContent = () => (
    <div className="py-4 pr-4 space-y-4">
      {/* Current page — active indicator */}
      <div className="space-y-0.5">
        <div className="px-3 py-1.5 rounded-md text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40">
          {t.hero.title}
        </div>
      </div>

      {/* Guides section */}
      <div>
        <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {t.nav.guidesLabel}
        </p>
        <div className="space-y-0.5">
          {t.nav.guides.map(g => (
            <Link
              key={g.slug}
              href={`/${language}/sheetdiff/api-docs/${g.slug}`}
              className="w-full block px-3 py-1.5 rounded-md text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  /* ── Code examples ──────────────────────────────────────── */
  const curlHealth = `curl ${BASE}/v1/health`

  const curlDiff = `curl -X POST ${BASE}/v1/diff \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "original": [
      { "speaker": "Alice", "start_time": 0, "end_time": 1, "transcript": "Hello world" },
      { "speaker": "Bob",   "start_time": 1, "end_time": 3, "transcript": "Good morning everyone" }
    ],
    "reworked": [
      { "speaker": "Alice", "start_time": 0, "end_time": 1, "transcript": "Hello there" },
      { "speaker": "Bob",   "start_time": 1, "end_time": 2, "transcript": "Good morning" },
      { "speaker": "Bob",   "start_time": 2, "end_time": 3, "transcript": "everyone" }
    ]
  }'`

  const jsDiff = `const response = await fetch('${BASE}/v1/diff', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY',
  },
  body: JSON.stringify({
    original: [
      { speaker: 'Alice', start_time: 0, end_time: 1, transcript: 'Hello world' },
      { speaker: 'Bob',   start_time: 1, end_time: 3, transcript: 'Good morning everyone' },
    ],
    reworked: [
      { speaker: 'Alice', start_time: 0, end_time: 1, transcript: 'Hello there' },
      { speaker: 'Bob',   start_time: 1, end_time: 2, transcript: 'Good morning' },
      { speaker: 'Bob',   start_time: 2, end_time: 3, transcript: 'everyone' },
    ],
  }),
})

const data = await response.json()
console.log(data.data.results)`

  const pythonDiff = `import requests

response = requests.post(
    '${BASE}/v1/diff',
    headers={
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
    },
    json={
        'original': [
            {'speaker': 'Alice', 'start_time': 0, 'end_time': 1, 'transcript': 'Hello world'},
            {'speaker': 'Bob',   'start_time': 1, 'end_time': 3, 'transcript': 'Good morning everyone'},
        ],
        'reworked': [
            {'speaker': 'Alice', 'start_time': 0, 'end_time': 1, 'transcript': 'Hello there'},
            {'speaker': 'Bob',   'start_time': 1, 'end_time': 2, 'transcript': 'Good morning'},
            {'speaker': 'Bob',   'start_time': 2, 'end_time': 3, 'transcript': 'everyone'},
        ],
    },
)

data = response.json()
print(data['data']['results'])`

  const diffTabs = [
    { label: 'curl',       code: curlDiff,    lang: 'bash'   },
    { label: 'javascript', code: jsDiff,      lang: 'js'     },
    { label: 'python',     code: pythonDiff,  lang: 'python' },
  ]

  const responseExample = `{
  "status": "success",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2026-04-08T21:00:00.000Z",
  "data": {
    "results": [
      {
        "status": "MODIFIED",
        "originalRow": { "transcript": "Hello world", ... },
        "reworkedRow": { "transcript": "Hello there", ... },
        "notes": "transcript changed"
      },
      {
        "status": "SPLIT",
        "originalRow": { "transcript": "Good morning everyone", ... },
        "reworkedRows": [ { "transcript": "Good morning" }, { "transcript": "everyone" } ],
        "notes": "split into 2 rows"
      }
    ],
    "scores": { "overallCER": 0.12, "overallWER": 0.18, "SegER": 0.33, "transcriptCER": 0.12, "transcriptWER": 0.18, "SER": 0.05, "transcriptSER": 0.04, "SACR": null },
    "composite": { "grade": 3.8, "label": "Good", "percent": "12.3" },
    "meta": { "originalRows": 2, "reworkedRows": 3, "headers": [...] }
  }
}`

  const errorExample = `{
  "status": "error",
  "requestId": "550e8400-...",
  "timestamp": "2026-04-08T21:00:00.000Z",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [{ "field": "original", "message": "\\"original\\" is required" }]
  }
}`

  /* ─────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────── */
  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Mobile sidebar toggle — floating, only on small screens */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-gray-800 border border-gray-700 text-sm text-gray-200 shadow-lg"
          onClick={() => setMobileSidebarOpen(o => !o)}
        >
          {mobileSidebarOpen ? <X size={15} /> : <Menu size={15} />}
          <span>{t.nav.sectionsBtn}</span>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" style={{ top: 64 }}>
          <div className="w-72 max-w-[80vw] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto shadow-xl px-4">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* 3-column layout */}
      <div className="max-w-screen-xl mx-auto flex">

        {/* ── Left sidebar ─────────────────────────────────── */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-4">
          <SidebarContent />
        </aside>

        {/* ── Main content ─────────────────────────────────── */}
        <main ref={contentRef} className="flex-1 min-w-0 px-6 xl:px-12 pt-24 pb-10 max-w-3xl">

          {/* Overview */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div id="overview" className="scroll-mt-20">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Link href={`/${language}/sheetdiff`} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t.breadcrumb.parent}</Link>
                <ChevronRight size={13} className="text-gray-300 dark:text-gray-600" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">{t.breadcrumb.current}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-3">
                {t.hero.title}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
                {t.hero.desc}
              </p>

              {/* Feature grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <Lock size={15} />,    color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                  { icon: <Gauge size={15} />,   color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-900/20' },
                  { icon: <Globe2 size={15} />,  color: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-900/20' },
                  { icon: <FileJson size={15} />,color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                ].map((style, i) => {
                  const f = t.hero.features[i]
                  return (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <span className={`shrink-0 w-7 h-7 rounded flex items-center justify-center ${style.bg} ${style.color}`}>{style.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{f.label}</div>
                        <div className="text-xs text-gray-500">{f.sub}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Start */}
          <H2 id="quickstart">{t.quickStart.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            {t.quickStart.desc}
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.quickStart.step1}
          </p>
          <CodeBlock code={curlHealth} lang="bash" />
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-6 mb-4">
            {t.quickStart.step2}
          </p>
          <TabbedCodeBlock tabs={diffTabs} />

          {/* Base URL */}
          <H2 id="base-url">{t.baseUrl.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            {t.baseUrl.desc}
          </p>
          <CodeBlock code={BASE} lang="url" />

          {/* Authentication */}
          <H2 id="auth">{t.auth.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.auth.desc}
          </p>
          <CodeBlock
            code={`curl -H "x-api-key: YOUR_API_KEY" -H "Content-Type: application/json" \\
  -X POST ${BASE}/v1/diff -d '{...}'`}
            lang="bash"
          />
          <Callout type="warn">
            {t.auth.callout}
          </Callout>

          {/* Rate Limits */}
          <H2 id="rate-limits">{t.rateLimits.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.rateLimits.desc}
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.rateLimits.headers.tier}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.rateLimits.headers.limit}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.rateLimits.headers.responseHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {t.rateLimits.rows.map((row, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-950">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{row.tier}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.limit}</td>
                    <td className="px-4 py-3"><IC>{i === 0 ? 'RateLimit-Limit' : 'RateLimit-Remaining'}</IC></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Endpoints */}
          <H2 id="endpoints">{t.endpoints.title}</H2>
          <H3>GET /v1/health</H3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            {t.endpoints.getHealthDesc}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <MethodBadge method="GET" />
            <IC>/v1/health</IC>
            <span className="text-xs text-gray-400">{t.endpoints.noAuth}</span>
          </div>
          <CodeBlock code={`{ "status": "ok", "version": "1.0.0", "uptime": 42, "timestamp": "..." }`} lang="json" />

          <H3>POST /v1/diff</H3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            {t.endpoints.postDiffDesc}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <MethodBadge method="POST" />
            <IC>/v1/diff</IC>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><Lock size={11} /> {t.endpoints.authRequired}</span>
          </div>

          {/* Request Body */}
          <H2 id="request">{t.request.title}</H2>
          <ParamTable rows={[
            { name: 'original',      type: 'array',    required: true,  desc: t.request.params[0] as string },
            { name: 'reworked',      type: 'array',    required: true,  desc: t.request.params[1] as string },
            { name: 'config',        type: 'object',   desc: (() => { const d = t.request.params[2]; return typeof d === 'string' ? d : <span>{d.pre} <button onClick={() => scrollTo('config')} className="text-blue-600 dark:text-blue-400 hover:underline">{d.linkLabel}</button>{d.post}</span> })() },
            { name: 'headers',       type: 'string[]', desc: t.request.params[3] as string },
            { name: 'columnMapping', type: 'object',   desc: (() => { const d = t.request.params[4]; return typeof d === 'string' ? d : <span>{d.pre} <button onClick={() => scrollTo('column-mapping')} className="text-blue-600 dark:text-blue-400 hover:underline">{d.linkLabel}</button>{d.post}</span> })() },
          ]} />

          <H3>{t.request.rowFieldsTitle}</H3>
          <p className="text-sm text-gray-500 mb-3">
            {t.request.rowFieldsNote}
          </p>
          <ParamTable rows={[
            { name: 'transcript',        type: 'string',        required: true, desc: t.request.rowFields[0] },
            { name: 'speaker',           type: 'string',                        desc: t.request.rowFields[1] },
            { name: 'start_time',        type: 'number|string',                 desc: t.request.rowFields[2] },
            { name: 'end_time',          type: 'number|string',                 desc: t.request.rowFields[3] },
            { name: 'non_speech_events', type: 'string',                        desc: t.request.rowFields[4] },
            { name: 'emotion',           type: 'string',                        desc: t.request.rowFields[5] },
            { name: 'language',          type: 'string',                        desc: t.request.rowFields[6] },
            { name: 'locale',            type: 'string',                        desc: t.request.rowFields[7] },
            { name: 'accent',            type: 'string',                        desc: t.request.rowFields[8] },
            { name: 'file_name',         type: 'string',                        desc: t.request.rowFields[9] },
          ]} />

          {/* Response Shape */}
          <H2 id="response">{t.response.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            {t.response.desc}
          </p>
          <CodeBlock code={responseExample} lang="json" />

          <H3>{t.response.diffStatusesTitle}</H3>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">{t.response.headers.status}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.response.headers.meaning}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {Object.entries(STATUS_STYLE).map(([status, meta]) => (
                  <tr key={status} className={`${meta.bg} transition-colors`}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold ${meta.color}`}>
                        {meta.icon}{status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t.response.statuses[status as keyof typeof t.response.statuses]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H3>{t.response.scoresTitle}</H3>
          <ParamTable rows={[
            { name: 'overallCER',    type: 'number', desc: t.response.scores[0] },
            { name: 'overallWER',    type: 'number', desc: t.response.scores[1] },
            { name: 'SegER',         type: 'number', desc: t.response.scores[2] },
            { name: 'transcriptCER', type: 'number', desc: t.response.scores[3] },
            { name: 'transcriptWER', type: 'number', desc: t.response.scores[4] },
            { name: 'SER',           type: 'number', desc: t.response.scores[5] },
            { name: 'transcriptSER', type: 'number', desc: t.response.scores[6] },
            { name: 'SACR',          type: 'number', desc: t.response.scores[7] },
          ]} />

          <H3>{t.response.compositeTitle}</H3>
          <ParamTable rows={[
            { name: 'grade',          type: 'number',   desc: t.response.composite[0] },
            { name: 'label',          type: 'string',   desc: t.response.composite[1] },
            { name: 'percent',        type: 'string',   desc: t.response.composite[2] },
            { name: 'enabledMetrics', type: 'string[]', desc: t.response.composite[3] },
          ]} />

          <H3>{t.response.metaTitle}</H3>
          <ParamTable rows={[
            { name: 'originalRows', type: 'number',   desc: t.response.meta[0] },
            { name: 'reworkedRows', type: 'number',   desc: t.response.meta[1] },
            { name: 'headers',      type: 'string[]', desc: t.response.meta[2] },
          ]} />

          {/* Config Options */}
          <H2 id="config">{t.config.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.config.desc}
          </p>
          <ParamTable rows={[
            { name: 'simpleMode',            type: 'boolean',         default: 'false',       desc: t.config.params[0] },
            { name: 'enableSplits',          type: 'boolean',         default: 'true',        desc: t.config.params[1] },
            { name: 'enableMerges',          type: 'boolean',         default: 'true',        desc: t.config.params[2] },
            { name: 'enableCER',             type: 'boolean',         default: 'true',        desc: t.config.params[3] },
            { name: 'enableWER',             type: 'boolean',         default: 'true',        desc: t.config.params[4] },
            { name: 'enableSegER',           type: 'boolean',         default: 'true',        desc: t.config.params[5] },
            { name: 'enableSER',             type: 'boolean',         default: 'true',        desc: t.config.params[6] },
            { name: 'stripDiacritics',       type: 'boolean',         default: 'true',        desc: t.config.params[7] },
            { name: 'positionalMode',        type: 'boolean',         default: 'false',       desc: t.config.params[8] },
            { name: 'ignoreColNames',        type: 'string[]',        default: '[]',          desc: t.config.params[9] },
            { name: 'enableInlineDiff',      type: 'boolean',         default: 'true',        desc: t.config.params[10] },
            { name: 'structuralTransforms',  type: 'TransformRule[]', default: '[]',          desc: t.config.params[11] },
            { name: 'enableTranscriptCER',   type: 'boolean',         default: 'true',        desc: t.config.params[12] },
            { name: 'enableTranscriptWER',   type: 'boolean',         default: 'true',        desc: t.config.params[13] },
            { name: 'enableTranscriptSER',   type: 'boolean',         default: 'true',        desc: t.config.params[14] },
            { name: 'enableSACR',            type: 'boolean',         default: 'true',        desc: t.config.params[15] },
            { name: 'speakerColName',        type: 'string',          default: 'auto-detect', desc: t.config.params[16] },
            { name: 'enableComposite',       type: 'boolean',         default: 'true',        desc: t.config.params[17] },
            { name: 'cerInComposite',        type: 'boolean',         default: 'true',        desc: t.config.params[18] },
            { name: 'werInComposite',        type: 'boolean',         default: 'true',        desc: t.config.params[19] },
            { name: 'segerInComposite',      type: 'boolean',         default: 'true',        desc: t.config.params[20] },
            { name: 'serInComposite',        type: 'boolean',         default: 'true',        desc: t.config.params[21] },
          ]} />

          <Collapsible title={t.config.expertTitle}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t.config.expertDesc}
            </p>
            <ParamTable rows={[
              { name: 'SIM_CONFIDENT',      type: 'number (0–1)', default: '0.70', desc: t.config.expertParams[0] },
              { name: 'SIM_MODERATE',       type: 'number (0–1)', default: '0.40', desc: t.config.expertParams[1] },
              { name: 'SIM_WEAK',           type: 'number (0–1)', default: '0.20', desc: t.config.expertParams[2] },
              { name: 'TIME_EXACT_TOL',     type: 'number (s)',   default: '0.05', desc: t.config.expertParams[3] },
              { name: 'TIME_FUZZY_TOL',     type: 'number (s)',   default: '2.5',  desc: t.config.expertParams[4] },
              { name: 'SPLIT_COMBINED_MIN', type: 'number (0–1)', default: '0.35', desc: t.config.expertParams[5] },
              { name: 'MERGE_COMBINED_MIN', type: 'number (0–1)', default: '0.65', desc: t.config.expertParams[6] },
              { name: 'CHAR_DIFF_LIMIT',    type: 'integer',      default: '1500', desc: t.config.expertParams[7] },
            ]} />
          </Collapsible>

          {/* Column Mapping */}
          <H2 id="column-mapping">{t.columnMapping.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.columnMapping.desc}
          </p>
          <CodeBlock
            code={`{
  "original":      [[0, 1, "Alice", "Hello world"]],
  "headers":       ["start_time", "end_time", "speaker", "transcript"],
  "columnMapping": { "transcript": 3, "speaker": 2, "start_time": 0, "end_time": 1 }
}`}
            lang="json"
          />
          <ParamTable rows={[
            { name: 'transcript', type: 'integer', required: true, desc: t.columnMapping.params[0] },
            { name: 'speaker',    type: 'integer',               desc: t.columnMapping.params[1] },
            { name: 'start_time', type: 'integer',               desc: t.columnMapping.params[2] },
            { name: 'end_time',   type: 'integer',               desc: t.columnMapping.params[3] },
            { name: 'nse',        type: 'integer',               desc: t.columnMapping.params[4] },
            { name: 'extraCols',  type: 'integer[]',             desc: t.columnMapping.params[5] },
          ]} />

          {/* Error Reference */}
          <H2 id="errors">{t.errors.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.errors.desc}
          </p>
          <CodeBlock code={errorExample} lang="json" />

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">{t.errors.headers.http}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-52">{t.errors.headers.code}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.errors.headers.cause}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ['400', 'BAD_REQUEST',        t.errors.causes[0]],
                  ['401', 'UNAUTHORIZED',       t.errors.causes[1]],
                  ['404', 'NOT_FOUND',          t.errors.causes[2]],
                  ['413', 'PAYLOAD_TOO_LARGE',  t.errors.causes[3]],
                  ['422', 'VALIDATION_ERROR',   t.errors.causes[4]],
                  ['429', 'RATE_LIMIT_EXCEEDED',t.errors.causes[5]],
                  ['500', 'INTERNAL_SERVER_ERROR', t.errors.causes[6]],
                ].map(([code, name, cause]) => (
                  <tr key={code} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-red-600 dark:text-red-400 font-bold">{code}</td>
                    <td className="px-4 py-3"><IC>{name}</IC></td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{cause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Request Tracing */}
          <H2 id="tracing">{t.tracing.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {t.tracing.desc}
          </p>
          <CodeBlock
            code={`curl -H "x-request-id: job-2026-01-batch-3" \\
  -H "x-api-key: YOUR_KEY" \\
  -X POST ${BASE}/v1/diff -d '{...}'`}
            lang="bash"
          />

          {/* Access */}
          <H2 id="access">{t.access.title}</H2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {t.access.desc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${language}/contact`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              {t.access.requestBtn} <ArrowRight size={14} />
            </Link>
            <Link
              href={`/${language}/sheetdiff`}
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {t.access.viewAddonBtn}
            </Link>
          </div>

          {/* Footer spacer */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-400 flex items-center justify-between flex-wrap gap-3">
            <span>{t.footer.info} <a href={`/${language}/contact`} className="hover:text-gray-600 dark:hover:text-gray-300 underline">Mohamed Yaakoubi</a></span>
            <div className="flex items-center gap-4 flex-wrap">
              <a href={`/${language}/sheetdiff/api-docs/privacy-policy`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300 underline">{t.footer.privacy}</a>
              <a href={`/${language}/sheetdiff/api-docs/terms-of-service`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300 underline">{t.footer.terms}</a>
              <Link href={`/${language}/sheetdiff`} className="hover:text-gray-600 dark:hover:text-gray-300">{t.footer.back}</Link>
            </div>
          </div>
        </main>

        {/* ── Right TOC sidebar ─────────────────────────────── */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-8 border-l border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{t.nav.onThisPage}</p>
          <div className="space-y-0.5">
            {allSections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${
                  activeId === s.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
