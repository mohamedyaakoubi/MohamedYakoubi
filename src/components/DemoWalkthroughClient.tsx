'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getDemoWalkthroughI18n } from '@/data/demo-walkthrough-i18n'
import {
  CodeBlock,
  TabbedCodeBlock,
  IC,
  H2,
  H3,
  Callout,
  StatusPill,
  FadeIn,
} from '@/components/ApiDocPrimitives'
import { Menu, X } from 'lucide-react'

export default function DemoWalkthroughClient() {
  const { language } = useLanguage()
  const t = getDemoWalkthroughI18n(language)
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

  /* ── All demo code ──────────────────────────────────────────── */

  const columnMappingTable = `Platform column   API field
─────────────────────────────
Talker          → speaker
BeginTime       → start_time
FinishTime      → end_time
Utterance       → transcript
NoiseTag        → non_speech_events
Mood            → emotion
Show            (passed through unchanged)
Subject         (passed through unchanged)`

  const adapterJS = `const KEY_MAP = {
  Talker:    'speaker',
  BeginTime: 'start_time',
  FinishTime:'end_time',
  Utterance: 'transcript',
  NoiseTag:  'non_speech_events',
  Mood:      'emotion',
}

const adapt = row =>
  Object.fromEntries(
    Object.entries(row).map(([k, v]) => [KEY_MAP[k] ?? k, v])
  )

const originalAdapted = originalData.map(adapt)
const reworkedAdapted = reworkedData.map(adapt)`

  const adapterPython = `KEY_MAP = {
    "Talker":    "speaker",
    "BeginTime": "start_time",
    "FinishTime": "end_time",
    "Utterance": "transcript",
    "NoiseTag":  "non_speech_events",
    "Mood":      "emotion",
}

def adapt(row):
    return {KEY_MAP.get(k, k): v for k, v in row.items()}

original_adapted = [adapt(r) for r in original_data]
reworked_adapted = [adapt(r) for r in reworked_data]`

  const originalData = `[
  { "speaker": "Sarah Mitchell", "start_time": 0.00,  "end_time": 4.20,  "transcript": "Welcome to The Language Lab, the podcast where we break down how AI is changing the way we communicate.",                          "non_speech_events": "[intro jingle]", "emotion": "warm"       },
  { "speaker": "Sarah Mitchell", "start_time": 4.20,  "end_time": 8.00,  "transcript": "Today we have two fantastic guests joining us to talk about machine translation and quality assurance.",                             "non_speech_events": "",               "emotion": "enthusiastic" },
  { "speaker": "James Park",     "start_time": 8.00,  "end_time": 11.50, "transcript": "Thanks Sarah glad to be here I have been looking forward to this conversation for weeks.",                                           "non_speech_events": "",               "emotion": "friendly"   },
  { "speaker": "Elena Rossi",    "start_time": 11.50, "end_time": 15.00, "transcript": "Same here this is such an important topic right now especially with how fast the field is evolving.",                                 "non_speech_events": "",               "emotion": "engaged"    },
  { "speaker": "Sarah Mitchell", "start_time": 15.00, "end_time": 19.80, "transcript": "James lets start with you. Your team recently published a paper on neural machine translation for low resource languages.",           "non_speech_events": "",               "emotion": "curious"    },
  { "speaker": "James Park",     "start_time": 19.80, "end_time": 26.50, "transcript": "Yes so our main finding was that back translation combined with careful data augmentation can boost BLEU scores by up to twelve points for languages with under fifty thousand parallel sentences.", "non_speech_events": "", "emotion": "analytical" },
  { "speaker": "James Park",     "start_time": 26.50, "end_time": 30.00, "transcript": "The trick is selecting the right seed data and not just throwing everything at the model.",                                          "non_speech_events": "",               "emotion": "technical"  },
  { "speaker": "Elena Rossi",    "start_time": 30.00, "end_time": 34.50, "transcript": "That resonates with our work at the localization lab where we focus on Arabic dialect adaptation.",                                   "non_speech_events": "",               "emotion": "thoughtful" },
  { "speaker": "Elena Rossi",    "start_time": 34.50, "end_time": 39.00, "transcript": "Standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input.",                                       "non_speech_events": "",               "emotion": "concerned"  }
]`

  const reworkedData = `[
  { "speaker": "Sarah Mitchell", "start_time": 0.00,  "end_time": 4.20,  "transcript": "Welcome to The Language Lab, the podcast where we break down how AI is changing the way we communicate.",                 "non_speech_events": "[intro jingle]", "emotion": "warm"        },
  { "speaker": "Sarah Mitchell", "start_time": 4.20,  "end_time": 8.00,  "transcript": "Today, we have two fantastic guests joining us to talk about machine translation and quality assurance.",                  "non_speech_events": "",               "emotion": "enthusiastic" },
  { "speaker": "James Park",     "start_time": 8.00,  "end_time": 11.50, "transcript": "Thanks, Sarah. Glad to be here — I've been looking forward to this conversation for weeks.",                              "non_speech_events": "",               "emotion": "friendly"    },
  { "speaker": "Elena Rossi",    "start_time": 11.50, "end_time": 15.00, "transcript": "Same here. This is such an important topic right now, especially with how fast the field is evolving.",                    "non_speech_events": "",               "emotion": "engaged"     },
  { "speaker": "Sarah Mitchell", "start_time": 15.00, "end_time": 19.80, "transcript": "James, let's start with you. Your team recently published a paper on neural machine translation for low-resource languages.", "non_speech_events": "",               "emotion": "curious"     },
  { "speaker": "James Park",     "start_time": 19.80, "end_time": 23.20, "transcript": "Yes, so our main finding was that back-translation combined with careful data augmentation can boost BLEU scores by up to 12 points.", "non_speech_events": "", "emotion": "analytical"  },
  { "speaker": "James Park",     "start_time": 23.20, "end_time": 26.50, "transcript": "This holds for languages with under 50,000 parallel sentences.",                                                           "non_speech_events": "",               "emotion": "analytical"  },
  { "speaker": "James Park",     "start_time": 26.50, "end_time": 30.00, "transcript": "The trick is selecting the right seed data and not just throwing everything at the model.",                                "non_speech_events": "",               "emotion": "technical"   },
  { "speaker": "Elena Rossi",    "start_time": 30.00, "end_time": 39.00, "transcript": "That resonates with our work at the localization lab where we focus on Arabic dialect adaptation — standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input.", "non_speech_events": "", "emotion": "thoughtful" }
]`

  const curlRequest = `curl -X POST https://structural-diff-engine.onrender.com/v1/diff \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "x-request-id: batch-ep101-layer1-layer2-qa" \\
  -d '{
    "original": <originalAdapted array>,
    "reworked": <reworkedAdapted array>
  }'`

  const jsDemoRequest = `// After adapting column names with the KEY_MAP adapter above
const response = await fetch('https://structural-diff-engine.onrender.com/v1/diff', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY',
    'x-request-id': 'batch-ep101-layer1-layer2-qa',
  },
  body: JSON.stringify({
    original: originalAdapted,  // 9 rows, adapted column names
    reworked: reworkedAdapted,  // 9 rows after annotator post-edit
  }),
})

const data = await response.json()
// data.data.results   — one entry per original row
// data.data.scores    — CER / WER / SegER / SER
// data.data.composite — grade, score, label`

  const pythonDemoRequest = `# After adapting column names with the adapt() function above
import requests

response = requests.post(
    'https://structural-diff-engine.onrender.com/v1/diff',
    headers={
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
        'x-request-id': 'batch-ep101-layer1-layer2-qa',
    },
    json={
        'original': original_adapted,  # 9 rows, adapted column names
        'reworked': reworked_adapted,  # 9 rows after annotator post-edit
    },
)

data = response.json()
# data['data']['results']   — one entry per original row
# data['data']['scores']    — CER / WER / SegER / SER
# data['data']['composite'] — grade, score, label`

  const requestTabs = [
    { label: 'curl',       code: curlRequest,       lang: 'bash'   },
    { label: 'javascript', code: jsDemoRequest,     lang: 'js'     },
    { label: 'python',     code: pythonDemoRequest, lang: 'python' },
  ]

  const responseExcerpt = `{
  "status": "success",
  "requestId": "batch-ep101-layer1-layer2-qa",
  "data": {
    "results": [
      { "status": "UNCHANGED", "notes": "exact match",          ... },  // row 0 — Sarah intro
      { "status": "MODIFIED",  "notes": "transcript changed",   ... },  // row 1 — comma added
      { "status": "MODIFIED",  "notes": "transcript changed",   ... },  // row 2 — James punctuation
      { "status": "MODIFIED",  "notes": "transcript changed",   ... },  // row 3 — Elena punctuation
      { "status": "MODIFIED",  "notes": "transcript changed",   ... },  // row 4 — Sarah question
      { "status": "SPLIT",     "notes": "split into 2 rows",    ... },  // row 5 — James finding (split)
      { "status": "UNCHANGED", "notes": "exact match",          ... },  // row 6 — James trick
      { "status": "MERGED",    "notes": "merged from 2 rows",   ... },  // rows 7+8 — Elena merged
      { "status": "MERGED",    "notes": "Source row 1/2 ...",   ... },  // ← trace entry, skip in counts
      { "status": "MERGED",    "notes": "Source row 2/2 ...",   ... }   // ← trace entry, skip in counts
    ],
    "scores": {
      "CER": 0.09,
      "WER": 0.14,
      "SegER": 0.22,
      "SER": 0.44,
      "cerT": 0.09,
      "werT": 0.14
    },
    "composite": {
      "score": 3.9,
      "grade": "B",
      "label": "Good"
    },
    "meta": {
      "originalRows": 9,
      "reworkedRows": 9
    }
  }
}`

  const layers = t.scenario.layers

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

            {/* ── Scenario ──────────────────────────────── */}
            <section id="scenario" className="scroll-mt-20">
              <H2 id="scenario">{t.scenario.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.scenario.body}</p>

              <div className="space-y-3 mb-6">
                {layers.map((layer, i) => (
                  <div key={i} className="flex gap-4 items-start px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <span className="shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                      {i}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-0.5">{layer.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{layer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.scenario.thisDemo}</p>
            </section>

            {/* ── The data ──────────────────────────────── */}
            <section id="data" className="scroll-mt-20">
              <H2 id="data">{t.data.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.data.body}</p>

              <CodeBlock code={columnMappingTable} lang="text" />
              <Callout type="info">{t.data.columnMapNote}</Callout>
            </section>

            {/* ── Adapting column names ─────────────────── */}
            <section id="adapting-columns" className="scroll-mt-20">
              <H2 id="adapting-columns">{t.data.adapterTitle}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.data.adapterBody}</p>

              <H3>JavaScript</H3>
              <CodeBlock code={adapterJS} lang="js" />

              <H3>Python</H3>
              <CodeBlock code={adapterPython} lang="python" />
            </section>

            {/* ── The request ───────────────────────────── */}
            <section id="the-request" className="scroll-mt-20">
              <H2 id="the-request">{t.request.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.request.preNote}</p>

              <H3>Original array (9 rows — AI output)</H3>
              <CodeBlock code={originalData} lang="json" />

              <H3>Reworked array (9 rows — annotator post-edit)</H3>
              <CodeBlock code={reworkedData} lang="json" />

              <TabbedCodeBlock tabs={requestTabs} />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">{t.request.postNote}</p>
            </section>

            {/* ── The response ──────────────────────────── */}
            <section id="the-response" className="scroll-mt-20">
              <H2 id="the-response">{t.response.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.response.walkthrough}</p>
              <CodeBlock code={responseExcerpt} lang="json" />

              <div className="mt-6 space-y-3">
                {t.response.rows.map((row) => (
                  <div
                    key={row.rowRef}
                    className="flex gap-3 items-start px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="shrink-0 mt-0.5">
                      <StatusPill status={row.status} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">{row.rowRef}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{row.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Reading scores ────────────────────────── */}
            <section id="reading-scores" className="scroll-mt-20">
              <H2 id="reading-scores">{t.scores.title}</H2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.scores.intro}</p>

              <div className="space-y-4">
                {/* CER */}
                <div className="px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">CER</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">≈ 0.09</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.scores.cerExplained}</p>
                </div>

                {/* WER */}
                <div className="px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">WER</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">≈ 0.14</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.scores.werExplained}</p>
                </div>

                {/* SegER */}
                <div className="px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">SegER</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">≈ 0.22</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.scores.segerExplained}</p>
                </div>

                {/* SER */}
                <div className="px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">SER</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">≈ 0.67</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.scores.serExplained}</p>
                </div>

                {/* Composite  */}
                <div className="px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Composite</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">B / Good (3.9)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.scores.gradeExplained}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">{t.scores.gradeContext}</p>
                </div>
              </div>
            </section>

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
