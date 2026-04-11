'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getDiffStatusesI18n } from '@/data/diff-statuses-i18n'
import {
  CodeBlock,
  IC,
  H2,
  H3,
  Callout,
  DiffCompare,
  InlineDiff,
  StatusPill,
  FadeIn,
} from '@/components/ApiDocPrimitives'
import { Menu, X } from 'lucide-react'

/* ── Reusable status section wrapper ──────────────────────────── */
function StatusSection({
  id,
  title,
  definition,
  whenYouSeeThis,
  inputNote,
  responseNote,
  workflowContext,
  children,
}: {
  id: string
  title: string
  definition: string
  whenYouSeeThis: string
  inputNote: string
  responseNote: string
  workflowContext: string
  children?: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mt-12 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <StatusPill status={title} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{definition}</p>
      {children}
      <div className="space-y-3 mt-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">When you see this</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{whenYouSeeThis}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Request note</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{inputNote}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Response note</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{responseNote}</p>
        </div>
        <div className="mt-4 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Workflow context</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{workflowContext}</p>
        </div>
      </div>
    </section>
  )
}

export default function DiffStatusesClient() {
  const { language } = useLanguage()
  const t = getDiffStatusesI18n(language)
  const pathname = usePathname()

  const [activeId, setActiveId] = useState(t.nav.sections[0]?.id ?? '')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const ids = t.nav.sections.map(s => s.id)
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileSidebarOpen(false)
  }

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

  const SidebarContent = () => (
    <div className="py-4 pr-4 space-y-4">
      {/* API Reference — link to top-level docs */}
      <div className="space-y-0.5">
        <Link
          href={`/${language}/sheetdiff/api-docs`}
          className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {t.breadcrumb.apiDocs}
        </Link>
      </div>

      {/* Guides */}
      <div>
        <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {t.nav.guidesLabel}
        </p>
        <div className="space-y-0.5">
          {t.nav.guides.map(g => {
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

  /* ── Concrete code examples for each status ─────────────── */

  const unchangedRequest = `{
  "original": [{ "speaker": "Alice", "transcript": "Good morning everyone." }],
  "reworked": [{ "speaker": "Alice", "transcript": "Good morning everyone." }]
}`
  const unchangedResponse = `{
  "status": "UNCHANGED",
  "notes": "exact match",
  "snapData": ["Alice", "Good morning everyone."],
  "currData": ["Alice", "Good morning everyone."]
}`

  const modifiedRequest_before = `[{ "speaker": "Doctor", "transcript": "I've been having headaches for the past two weeks" }]`
  const modifiedRequest_after  = `[{ "speaker": "Doctor", "transcript": "I've been having headaches for the past 2 weeks" }]`
  const modifiedResponse = `{
  "status": "MODIFIED",
  "notes": "transcript changed",
  "transcriptDiff": [
    { "type": "equal",  "value": "I've been having headaches for the past " },
    { "type": "delete", "value": "two weeks" },
    { "type": "insert", "value": "2 weeks" }
  ],
  "snapData": ["Doctor", "I've been having headaches for the past two weeks"],
  "currData": ["Doctor", "I've been having headaches for the past 2 weeks"]
}`

  const addedRequest = `{
  "original": [{ "speaker": "Agent", "transcript": "Let me pull up your account." }],
  "reworked": [
    { "speaker": "Agent",    "transcript": "Let me pull up your account." },
    { "speaker": "Customer", "transcript": "Thank you." }
  ]
}`
  const addedResponse = `{
  "results": [
    { "status": "UNCHANGED", "notes": "exact match", ... },
    {
      "status": "ADDED",
      "notes": "new row in reworked",
      "currData": ["Customer", "Thank you."]
    }
  ]
}`

  const deletedRequest = `{
  "original": [
    { "speaker": "Host", "transcript": "Welcome to the show." },
    { "speaker": "[noise]", "transcript": "[background music fades]" }
  ],
  "reworked": [
    { "speaker": "Host", "transcript": "Welcome to the show." }
  ]
}`
  const deletedResponse = `{
  "results": [
    { "status": "UNCHANGED", "notes": "exact match", ... },
    {
      "status": "DELETED",
      "notes": "row removed from reworked",
      "snapData": ["[noise]", "[background music fades]"]
    }
  ]
}`

  const splitRequest_before = `[{
  "speaker": "Candidate",
  "transcript": "For new users we relied on content-based filtering. For new items we used metadata clustering to find similar items with existing ratings."
}]`
  const splitRequest_after  = `[
  { "speaker": "Candidate", "transcript": "For new users, we relied on content-based filtering." },
  { "speaker": "Candidate", "transcript": "For new items, we used metadata clustering to find similar items with existing ratings." }
]`
  const splitResponse = `{
  "status": "SPLIT",
  "notes": "split into 2 rows",
  "originalRow": {
    "transcript": "For new users we relied on content-based filtering. For new items..."
  },
  "reworkedRows": [
    { "transcript": "For new users, we relied on content-based filtering." },
    { "transcript": "For new items, we used metadata clustering..." }
  ]
}`

  const mergedRequest_before = `[
  { "speaker": "Elena", "transcript": "That resonates with our work at the localization lab." },
  { "speaker": "Elena", "transcript": "Standard Arabic models fail on Tunisian input." }
]`
  const mergedRequest_after  = `[{
  "speaker": "Elena",
  "transcript": "That resonates with our work at the localization lab — standard Arabic models fail on Tunisian input."
}]`
  const mergedResponse = `{
  "results": [
    {
      "status": "MERGED",
      "notes": "merged from 2 rows",
      "reworkedRow": {
        "transcript": "That resonates with our work at the localization lab — standard Arabic models fail on Tunisian input."
      }
    },
    {
      "status": "MERGED",
      "notes": "Source row 1/2 · merged into reworked row 0",
      "snapData": ["Elena", "That resonates with our work at the localization lab."]
    },
    {
      "status": "MERGED",
      "notes": "Source row 2/2 · merged into reworked row 0",
      "snapData": ["Elena", "Standard Arabic models fail on Tunisian input."]
    }
  ]
}`

  const sampleTranscriptDiff = [
    { type: 'equal',  value: 'Thanks' },
    { type: 'insert', value: ',' },
    { type: 'equal',  value: ' Sarah' },
    { type: 'insert', value: '.' },
    { type: 'equal',  value: ' ' },
    { type: 'delete', value: 'g' },
    { type: 'insert', value: 'G' },
    { type: 'equal',  value: 'lad to be here ' },
    { type: 'delete', value: 'I' },
    { type: 'insert', value: '\u2014' },
    { type: 'equal',  value: ' ' },
    { type: 'delete', value: 'ha' },
    { type: 'insert', value: "I'" },
    { type: 'equal',  value: 've been looking forward to this conversation for weeks.' },
  ]

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-gray-800 border border-gray-700 text-sm text-gray-200 shadow-lg"
          onClick={() => setMobileSidebarOpen(o => !o)}
        >
          {mobileSidebarOpen ? <X size={15} /> : <Menu size={15} />}
          <span>{t.nav.sectionsBtn}</span>
        </button>
      </div>

      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" style={{ top: 64 }}>
          <div className="w-72 max-w-[80vw] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto shadow-xl px-4">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      <div className="max-w-screen-xl mx-auto flex">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-4">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 xl:px-12 pt-24 pb-10 max-w-3xl">
          <FadeIn>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link href={`/${language}/sheetdiff/api-docs`} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                {t.breadcrumb.apiDocs}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">›</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{t.breadcrumb.current}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-2">
              {t.hero.title}
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-3 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
              {t.hero.intro}
            </p>

            {/* ── Pipeline note ─────────────────────────── */}
            <section id="engine-pipeline" className="scroll-mt-20">
              <H2 id="engine-pipeline">{t.pipelineNote.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{t.pipelineNote.body}</p>
              <Callout type="info">{t.pipelineNote.filterHint}</Callout>
            </section>

            {/* ── UNCHANGED ─────────────────────────────── */}
            <StatusSection id="UNCHANGED" {...t.statuses.UNCHANGED}>
              <DiffCompare
                before={unchangedRequest.split('\n').slice(1, 2).join('\n')}
                after={unchangedRequest.split('\n').slice(2, 3).join('\n')}
                result={unchangedResponse}
              />
              <CodeBlock code={unchangedRequest} lang="json" />
              <CodeBlock code={unchangedResponse} lang="json" />
            </StatusSection>

            {/* ── MODIFIED ──────────────────────────────── */}
            <StatusSection id="MODIFIED" {...t.statuses.MODIFIED}>
              <DiffCompare
                label="Transcript diff example"
                before={modifiedRequest_before}
                after={modifiedRequest_after}
                result={modifiedResponse}
              />
              <H3>Live transcriptDiff rendering</H3>
              <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Example rendering of transcriptDiff tokens</p>
                <InlineDiff tokens={sampleTranscriptDiff} />
              </div>
            </StatusSection>

            {/* ── ADDED ─────────────────────────────────── */}
            <StatusSection id="ADDED" {...t.statuses.ADDED}>
              <CodeBlock code={addedRequest} lang="json" />
              <CodeBlock code={addedResponse} lang="json" />
            </StatusSection>

            {/* ── DELETED ───────────────────────────────── */}
            <StatusSection id="DELETED" {...t.statuses.DELETED}>
              <CodeBlock code={deletedRequest} lang="json" />
              <CodeBlock code={deletedResponse} lang="json" />
            </StatusSection>

            {/* ── SPLIT ─────────────────────────────────── */}
            <StatusSection id="SPLIT" {...t.statuses.SPLIT}>
              <DiffCompare
                label="One row → two rows"
                before={splitRequest_before}
                after={splitRequest_after}
                result={splitResponse}
              />
            </StatusSection>

            {/* ── MERGED ────────────────────────────────── */}
            <StatusSection id="MERGED" {...t.statuses.MERGED}>
              <DiffCompare
                label="Two rows → one merged row (+ two source rows in response)"
                before={mergedRequest_before}
                after={mergedRequest_after}
                result={mergedResponse}
              />
            </StatusSection>

            {/* ── transcriptDiff ────────────────────────── */}
            <H2 id="transcriptDiff">{t.transcriptDiff.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.transcriptDiff.body}</p>
            <div className="space-y-2 mb-4">
              {t.transcriptDiff.tokenTypes.map((tt, i) => (
                <div key={i} className="flex gap-2 items-start text-sm text-gray-600 dark:text-gray-400">
                  <span className="shrink-0 mt-0.5 text-gray-300 dark:text-gray-600">•</span>
                  <span>{tt}</span>
                </div>
              ))}
            </div>
            <CodeBlock
              lang="json"
              code={`"transcriptDiff": [
  { "type": "equal",  "value": "I've been having headaches for the past " },
  { "type": "delete", "value": "two" },
  { "type": "insert", "value": "2" },
  { "type": "equal",  "value": " weeks" }
]`}
            />

            {/* ── Source rows ───────────────────────────── */}
            <H2 id="source-rows">{t.sourceRows.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.sourceRows.body}</p>
            <CodeBlock code={t.sourceRows.filterCode} lang="js" />

            {/* ── Counts table ──────────────────────────── */}
            <H2 id="counts-table">{t.countsTable.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.countsTable.intro}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">{t.countsTable.headers.status}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.countsTable.headers.countStrategy}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.countsTable.headers.note}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.countsTable.rows.map(row => (
                    <tr key={row.status} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3 align-top"><StatusPill status={row.status} /></td>
                      <td className="px-4 py-3 align-top text-gray-600 dark:text-gray-400">{row.strategy}</td>
                      <td className="px-4 py-3 align-top text-gray-500 dark:text-gray-500 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-400 flex-wrap gap-3">
              <span>{t.footer.info} <Link href={`/${language}`} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Mohamed Yaakoubi</Link></span>
              <div className="flex items-center gap-4 flex-wrap">
                <a href={`/${language}/sheetdiff/api-docs/privacy-policy`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors underline">{t.footer.privacy}</a>
                <a href={`/${language}/sheetdiff/api-docs/terms-of-service`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors underline">{t.footer.terms}</a>
                <Link href={`/${language}/sheetdiff/api-docs`} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">{t.footer.back}</Link>
              </div>
            </div>
          </FadeIn>
        </main>

        {/* ── Right TOC sidebar ─────────────────────────────── */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-8 border-l border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{t.nav.onThisPage}</p>
          <div className="space-y-0.5">
            {t.nav.sections.map(s => (
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
