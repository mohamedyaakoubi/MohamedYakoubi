'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getParametersGuideI18n } from '@/data/parameters-guide-i18n'
import {
  CopyButton,
  CodeBlock,
  IC,
  H2,
  H3,
  ParamTable,
  Callout,
  Collapsible,
  DiffCompare,
  StatusPill,
  FadeIn,
  fadeIn,
} from '@/components/ApiDocPrimitives'
import { Menu, X } from 'lucide-react'

export default function ParametersGuideClient() {
  const { language } = useLanguage()
  const t = getParametersGuideI18n(language)
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

  /* ── Code examples ─────────────────────────────────────────── */

  const simpleModeOff_before = `{
  "original": [
    { "speaker": "Candidate", "words": "For new users we relied on content-based filtering. For new items we used metadata clustering to find similar items." }
  ],
  "reworked": [
    { "speaker": "Candidate", "words": "For new users, we relied on content-based filtering." },
    { "speaker": "Candidate", "words": "For new items, we used metadata clustering to find similar items." }
  ]
}`

  const simpleModeOff_result = `{
  "results": [
    {
      "status": "SPLIT",
      "notes": "split into 2 rows",
      "originalRow": { "words": "For new users we relied on content-based filtering..." },
      "reworkedRows": [
        { "words": "For new users, we relied on content-based filtering." },
        { "words": "For new items, we used metadata clustering..." }
      ]
    }
  ]
}`

  const simpleModeOn_result = `{
  "results": [
    {
      "status": "MODIFIED",
      "notes": "words changed",
      "snapData": ["Candidate", "For new users we relied on content-based filtering..."],
      "currData": ["Candidate", "For new users, we relied on content-based filtering."],
      "transcriptDiff": [
        { "type": "equal",  "value": "For new users" },
        { "type": "insert", "value": "," },
        { "type": "equal",  "value": " we relied on content-based filtering." }
      ]
    },
    {
      "status": "ADDED",
      "notes": "new row in reworked",
      "currData": ["Candidate", "For new items, we used metadata clustering..."]
    }
  ]
}`

  const stripOff_payload = `{
  "original": [{ "speaker": "المذيع", "transcript": "مرحبا بكم في نشرة الاخبار" }],
  "reworked": [{ "speaker": "المذيع", "transcript": "مرحباً بكم في نشرة الأخبار" }]
}`

  // Default (stripDiacritics: true) — diacritics stripped → UNCHANGED
  const stripDefault_result = `{ "status": "UNCHANGED", "notes": "high similarity match (diacritics stripped)" }`

  // Override (stripDiacritics: false) — raw comparison → MODIFIED
  const stripFalse_result = `{ "status": "MODIFIED", "notes": "transcript changed",
  "transcriptDiff": [
    { "type": "EQUAL",  "text": "مرحب" },
    { "type": "DELETE", "text": "ا" },
    { "type": "INSERT", "text": "اً" },
    { "type": "EQUAL",  "text": " بكم في نشرة ال" },
    { "type": "DELETE", "text": "ا" },
    { "type": "INSERT", "text": "أ" },
    { "type": "EQUAL",  "text": "خبار" }
  ]
}`

  const ignoreExample_before = `{
  "original": [
    { "transcript": "The patient reports mild chest pain.", "speaker": "Doctor", "confidence": 0.88, "category": "symptom" }
  ],
  "reworked": [
    { "transcript": "The patient reports mild chest pain.", "speaker": "Doctor", "confidence": 0.94, "category": "complaint" }
  ]
}`

  const ignoreExample_without = `{ "status": "MODIFIED", "notes": "confidence, category changed" }`

  const ignoreExample_with = `{
  // request: { "config": { "ignoreColNames": ["confidence", "category"] } }
  "status": "UNCHANGED", "notes": "exact match (after ignoring confidence, category)"
}`

  const thresholdsExample = `{
  "config": {
    "SIM_WEAK": 0.15,
    "TIME_EXACT_TOL": 1.0,
    "SPLIT_COMBINED_MIN": 0.70
  }
}`

  const scoringFlagsExample = `{
  "config": {
    "enableCER": false,
    "enableWER": false,
    "enableSACR": false
  }
}`

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

            {/* ── When to customize ───────────────────────── */}
            <H2 id="when-to-customize">{t.whenSection.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.whenSection.body}</p>
            <div className="space-y-2 mb-6">
              {t.whenSection.useCases.map(uc => (
                <div key={uc.flag} className="flex gap-3 items-start px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <IC>{uc.flag}</IC>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{uc.reason}</span>
                </div>
              ))}
            </div>

            {/* ── simpleMode ─────────────────────────────── */}
            <H2 id="simpleMode">{t.simpleMode.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.simpleMode.what}</p>

            <DiffCompare
              label={t.simpleMode.defaultBehavior}
              before={simpleModeOff_before}
              after={`/* config: {} (default) */`}
              result={simpleModeOff_result}
            />

            <H3>{t.simpleMode.withFlag}</H3>
            <CodeBlock code={simpleModeOn_result} lang="json" />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-4">{t.simpleMode.whenToUse}</p>
            <Callout type="info">{t.simpleMode.note}</Callout>

            {/* ── enableSplits / enableMerges ─────────────── */}
            <H2 id="enableSplitsMerges">{t.enableSplitsMerges.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.enableSplitsMerges.intro}</p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3 items-start px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-900">
                <StatusPill status="SPLIT" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.enableSplitsMerges.splits}</p>
              </div>
              <div className="flex gap-3 items-start px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900">
                <StatusPill status="MERGED" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.enableSplitsMerges.merges}</p>
              </div>
            </div>
            <CodeBlock
              lang="json"
              code={`{
  "config": {
    "enableSplits": false,
    "enableMerges": true
  }
}`}
            />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.enableSplitsMerges.whenToUse}</p>

            {/* ── stripDiacritics ─────────────────────────── */}
            <H2 id="stripDiacritics">{t.stripDiacritics.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.stripDiacritics.what}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.stripDiacritics.examples}</p>

            <DiffCompare
              label={t.stripDiacritics.defaultBehavior}
              before={stripOff_payload}
              after={`/* config: {} (default — stripDiacritics: true) */`}
              result={stripDefault_result}
            />

            <H3>{t.stripDiacritics.withFalse}</H3>
            <CodeBlock code={stripFalse_result} lang="json" />
            <CodeBlock
              code={`{ "config": { "stripDiacritics": false } }`}
              lang="json"
            />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">{t.stripDiacritics.whenToUse}</p>

            {/* ── positionalMode ─────────────────────────── */}
            <H2 id="positionalMode">{t.positionalMode.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.positionalMode.what}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.positionalMode.defaultVsPositional}</p>
            <Callout type="warn">{t.positionalMode.riskNote}</Callout>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">{t.positionalMode.whenToUse}</p>
            <CodeBlock
              code={`{ "config": { "positionalMode": true } }`}
              lang="json"
            />

            {/* ── ignoreColNames ─────────────────────────── */}
            <H2 id="ignoreColNames">{t.ignoreColNames.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.ignoreColNames.what}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.ignoreColNames.example}</p>

            <DiffCompare
              label="Without ignoreColNames"
              before={ignoreExample_before}
              after={`/* config: {} */`}
              result={ignoreExample_without}
            />

            <H3>With ignoreColNames</H3>
            <CodeBlock code={ignoreExample_with} lang="json" />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">{t.ignoreColNames.whenToUse}</p>

            {/* ── enableInlineDiff ───────────────────────── */}
            <H2 id="enableInlineDiff">{t.enableInlineDiff.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.enableInlineDiff.what}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.enableInlineDiff.whenFalse}</p>
            <CodeBlock
              code={`{ "config": { "enableInlineDiff": false } }`}
              lang="json"
            />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.enableInlineDiff.response}</p>
            <CodeBlock
              code={`// transcriptDiff format — type is UPPERCASE, field is "text"
[
  { "type": "EQUAL",  "text": "Hello " },
  { "type": "DELETE", "text": "world" },
  { "type": "INSERT", "text": "there" }
]`}
              lang="json"
            />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2 mb-2">{t.enableInlineDiff.whenToUse}</p>
            <Callout type="info">{t.enableInlineDiff.note}</Callout>

            {/* ── Scoring flags ─────────────────────────── */}
            <H2 id="enableScoring">{t.scoringFlags.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.scoringFlags.intro}</p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-44">Flag</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Default</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">What it measures · When to disable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.scoringFlags.flags.map(f => (
                    <tr key={f.name} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3 align-top"><IC>{f.name}</IC></td>
                      <td className="px-4 py-3 align-top">
                        <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{f.default}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-xs text-gray-500 mb-1">{f.what}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{f.whenToDisable}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock lang="json" code={scoringFlagsExample} />
            <Callout type="info">{t.scoringFlags.compositeNote}</Callout>
            <Callout type="info">{t.scoringFlags.sacrAutoNote}</Callout>
            <Callout type="info">{t.scoringFlags.headerRowNote}</Callout>

            {/* ── structuralTransforms ───────────────────── */}
            <H2 id="structuralTransforms">{t.structuralTransforms.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.structuralTransforms.what}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.structuralTransforms.schema}</p>
            <CodeBlock
              code={`{
  "config": {
    "structuralTransforms": [
      { "find": "^ID-\\\\d+:\\\\s*", "replace": "", "isRegex": true },
      { "find": "https?://[^\\\\s]+",  "replace": "[URL]", "isRegex": true }
    ]
  }
}`}
              lang="json"
            />
            <Callout type="warn">{t.structuralTransforms.caveat}</Callout>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">{t.structuralTransforms.whenToUse}</p>

            {/* ── Expert thresholds ──────────────────────── */}
            <H2 id="expert-thresholds">{t.expertThresholds.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.expertThresholds.intro}</p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-52">Parameter</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Default</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">When to adjust · Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.expertThresholds.params.map(p => (
                    <tr key={p.name} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3 align-top">
                        <IC>{p.name}</IC>
                        <div className="text-xs text-gray-400 mt-0.5">{p.type}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{p.default}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-xs text-gray-500 mb-1">{p.whenToUse}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{p.effect}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={thresholdsExample} lang="json" />

            <Collapsible title={t.expertThresholds.lowerSimWeak}>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.expertThresholds.lowerSimWeak}</p>
            </Collapsible>
            <Collapsible title={t.expertThresholds.raiseSimConfident}>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.expertThresholds.raiseSimConfident}</p>
            </Collapsible>
            <Collapsible title={t.expertThresholds.timeTol}>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.expertThresholds.timeTol}</p>
            </Collapsible>
            <Collapsible title={t.expertThresholds.splitMergeTol}>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.expertThresholds.splitMergeTol}</p>
            </Collapsible>

            {/* Footer */}
            <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-400">
              <span>{t.footer.info} <Link href={`/${language}`} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Mohamed Yaakoubi</Link></span>
              <Link href={`/${language}/sheetdiff/api-docs`} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">{t.footer.back}</Link>
            </div>
          </FadeIn>
        </main>

        {/* ── Right TOC sidebar ───────────────────────────── */}
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
