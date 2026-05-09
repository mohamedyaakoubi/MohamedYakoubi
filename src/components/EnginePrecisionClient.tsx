'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getEnginePrecisionI18n } from '@/data/engine-precision-i18n'
import { CodeBlock, H2, H3, Callout, FadeIn } from '@/components/ApiDocPrimitives'
import { Menu, X, AlertTriangle, Info } from 'lucide-react'

/* ── Confusion matrix raw data (language-independent) ─────────────── */
const CM_CATEGORIES = ['UNCHANGED', 'MODIFIED', 'SPLIT', 'MERGED', 'DELETED', 'ADDED'] as const
const CM_COLS = ['UNCHANGED', 'MODIFIED', 'SPLIT', 'MERGED', 'DELETED', 'ADDED', 'UNMATCHED'] as const

// GT rows × Engine columns — · = 0
const CM_DATA: Record<string, Record<string, number>> = {
  UNCHANGED: { UNCHANGED: 3,  MODIFIED: 3,  SPLIT: 0, MERGED: 0, DELETED: 0, ADDED: 0, UNMATCHED: 0 },
  MODIFIED:  { UNCHANGED: 0,  MODIFIED: 74, SPLIT: 0, MERGED: 6, DELETED: 1, ADDED: 5, UNMATCHED: 8 },
  SPLIT:     { UNCHANGED: 0,  MODIFIED: 1,  SPLIT: 5, MERGED: 0, DELETED: 0, ADDED: 0, UNMATCHED: 0 },
  MERGED:    { UNCHANGED: 0,  MODIFIED: 1,  SPLIT: 0, MERGED: 18,DELETED: 1, ADDED: 2, UNMATCHED: 0 },
  DELETED:   { UNCHANGED: 0,  MODIFIED: 3,  SPLIT: 1, MERGED: 0, DELETED: 6, ADDED: 1, UNMATCHED: 0 },
  ADDED:     { UNCHANGED: 0,  MODIFIED: 3,  SPLIT: 3, MERGED: 2, DELETED: 0, ADDED: 28,UNMATCHED: 10 },
}

/* ── Accuracy badge ──────────────────────────────────────────────── */
function AccBadge({ acc }: { acc: string }) {
  const n = parseFloat(acc)
  const color =
    n >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
    n >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
    n >= 55 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold ${color}`}>{acc}</span>
}

/* ── F1 badge ────────────────────────────────────────────────────── */
function F1Badge({ f1 }: { f1: string }) {
  const n = parseFloat(f1)
  const color =
    n >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
    n >= 65 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold ${color}`}>{f1}</span>
}

/* ── CM cell ─────────────────────────────────────────────────────── */
function CMCell({ val, isDiagonal }: { val: number; isDiagonal: boolean }) {
  if (val === 0) return <td className="px-3 py-2 text-center text-gray-300 dark:text-gray-700 text-xs">·</td>
  return (
    <td className={`px-3 py-2 text-center text-xs font-mono font-semibold ${
      isDiagonal
        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    }`}>
      {val}
    </td>
  )
}

export default function EnginePrecisionClient() {
  const { language } = useLanguage()
  const t = getEnginePrecisionI18n(language)
  const pathname = usePathname()
  const isRtl = language === 'ar'

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

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 left-6 z-50">
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
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-4">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 xl:px-12 pt-24 pb-10 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href={`/${language}/sheetdiff/api-docs`} className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              {t.breadcrumb.apiDocs}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{t.breadcrumb.current}</span>
          </nav>

          {/* Hero */}
          <FadeIn>
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.hero.title}</h1>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                  {t.hero.badge}
                </span>
              </div>
              <p className="text-base text-gray-500 dark:text-gray-400 mb-4">{t.hero.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{t.hero.intro}</p>
            </div>
          </FadeIn>

          {/* ── Approach ─────────────────────────────────── */}
          <section id="approach" className="scroll-mt-20 mb-14">
            <H2 id="approach">{t.approach.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.approach.intro}</p>
            <div className="space-y-4 mb-6">
              {t.approach.phases.map((p, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{p.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
            {t.approach.params && (
              <div className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4">
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400">{t.approach.params}</p>
              </div>
            )}
            {t.approach.notNovel && (
              <div className="flex gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <Info size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{t.approach.notNovel}</p>
              </div>
            )}
          </section>

          {/* ── Dataset scope ─────────────────────────────── */}
          <section id="scope" className="scroll-mt-20 mb-14">
            <H2 id="scope">{t.scope.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.scope.body}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.dataset}</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.orig}</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.rewk}</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.gtEvents}</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.correct}</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.scope.headers.accuracy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.scope.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-3 py-2 font-mono text-xs text-gray-700 dark:text-gray-300">{r.ds}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.orig}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.rewk}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.gt}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.correct}</td>
                      <td className="px-3 py-2 text-right"><AccBadge acc={r.acc} /></td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 font-semibold">
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{t.scope.totalsLabel}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{t.scope.totals.orig}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{t.scope.totals.rewk}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{t.scope.totals.gt}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{t.scope.totals.correct}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{t.scope.totals.acc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Class distribution ───────────────────────── */}
          <section id="class-dist" className="scroll-mt-20 mb-14">
            <H2 id="class-dist">{t.classDist.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.classDist.body}</p>
            <div className="flex gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
              <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{t.classDist.warning}</p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.classDist.headers.category}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.classDist.headers.support}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.classDist.headers.share}</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Distribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.classDist.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-2 font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{r.category}</td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.support}</td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.share}</td>
                      <td className="px-4 py-2">
                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden w-32">
                          <div
                            className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
                            style={{ width: `${(r.support / 94) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.classDist.imbalanceNote}</p>
          </section>

          {/* ── Per-category metrics ─────────────────────── */}
          <section id="per-category" className="scroll-mt-20 mb-14">
            <H2 id="per-category">{t.perCategory.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.perCategory.intro}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    {(['category','support','tp','fp','fn','precision','recall','f1'] as const).map(k => (
                      <th key={k} className="px-3 py-2.5 text-right first:text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t.perCategory.headers[k]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.perCategory.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-3 py-2 font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{r.category}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.support}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-green-700 dark:text-green-400">{r.tp}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-red-600 dark:text-red-400">{r.fp}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-orange-600 dark:text-orange-400">{r.fn}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{r.precision}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{r.recall}</td>
                      <td className="px-3 py-2 text-right"><F1Badge f1={r.f1} /></td>
                    </tr>
                  ))}
                  {/* Micro avg */}
                  <tr className="bg-blue-50 dark:bg-blue-950/30 border-t-2 border-blue-200 dark:border-blue-800 font-semibold">
                    <td className="px-3 py-2 text-xs text-blue-800 dark:text-blue-200">{t.perCategory.microLabel}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-blue-700 dark:text-blue-300">{t.perCategory.microRow.support}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-green-700 dark:text-green-400">{t.perCategory.microRow.tp}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-red-600 dark:text-red-400">{t.perCategory.microRow.fp}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-orange-600 dark:text-orange-400">{t.perCategory.microRow.fn}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-blue-700 dark:text-blue-300">{t.perCategory.microRow.precision}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-blue-700 dark:text-blue-300">{t.perCategory.microRow.recall}</td>
                    <td className="px-3 py-2 text-right"><F1Badge f1={t.perCategory.microRow.f1} /></td>
                  </tr>
                  {/* Macro avg */}
                  <tr className="bg-gray-50 dark:bg-gray-900 font-semibold">
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{t.perCategory.macroLabel}</td>
                    <td className="px-3 py-2" colSpan={4}></td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{t.perCategory.macroRow.precision}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{t.perCategory.macroRow.recall}</td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{t.perCategory.macroRow.f1}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.perCategory.headline}</p>
            </div>
          </section>

          {/* ── Confusion matrix ─────────────────────────── */}
          <section id="confusion" className="scroll-mt-20 mb-14">
            <H2 id="confusion">{t.confusionMatrix.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.confusionMatrix.intro}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mb-4">
              <table className="text-xs w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-3 py-2.5 text-left font-semibold text-gray-500">GT \ Engine</th>
                    {CM_COLS.map(c => (
                      <th key={c} className="px-3 py-2.5 text-center font-semibold text-gray-500 font-mono">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {CM_CATEGORIES.map(gtCat => (
                    <tr key={gtCat} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                      <td className="px-3 py-2 font-mono font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{gtCat}</td>
                      {CM_COLS.map(engCat => (
                        <CMCell
                          key={engCat}
                          val={CM_DATA[gtCat][engCat] ?? 0}
                          isDiagonal={gtCat === engCat}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.confusionMatrix.unmatchedNote}</p>
          </section>

          {/* ── Root cause ───────────────────────────────── */}
          <section id="root-cause" className="scroll-mt-20 mb-14">
            <H2 id="root-cause">{t.rootCause.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.rootCause.intro}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.rootCause.headers.risk}</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.rootCause.headers.freq}</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.rootCause.headers.cause}</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.rootCause.headers.tunable}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.rootCause.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-3 py-2.5 text-xs font-mono font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{r.risk}</td>
                      <td className="px-3 py-2.5 text-xs font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">{r.freq}</td>
                      <td className="px-3 py-2.5 text-xs text-gray-600 dark:text-gray-400">{r.cause}</td>
                      <td className="px-3 py-2.5 text-xs font-mono text-blue-700 dark:text-blue-400 whitespace-nowrap">{r.tunable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Similarity ───────────────────────────────── */}
          <section id="similarity" className="scroll-mt-20 mb-14">
            <H2 id="similarity">{t.similarity.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.similarity.intro}</p>
            <CodeBlock code={t.similarity.formula} lang="text" />

            <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">{t.similarity.pairsTitle}</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.pairsHeaders.metric}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.pairsHeaders.value}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.similarity.pairsRows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400">{r.metric}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H3>{t.similarity.confTitle}</H3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.confHeaders.band}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.confHeaders.count}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.confHeaders.share}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.similarity.confRows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-2.5 text-xs font-mono text-gray-700 dark:text-gray-300">{r.band}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs text-gray-600 dark:text-gray-400">{r.count}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{r.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H3>{t.similarity.marginTitle}</H3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.marginHeaders.metric}</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.similarity.marginHeaders.value}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {t.similarity.marginRows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400">{r.metric}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Limitations ──────────────────────────────── */}
          <section id="limitations" className="scroll-mt-20 mb-14">
            <H2 id="limitations">{t.limitations.title}</H2>
            <ul className="space-y-3">
              {t.limitations.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gray-400 dark:text-gray-600 mt-0.5 shrink-0">•</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.footer.info}{' '}
                <Link href={`/${language}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Mohamed Yaakoubi
                </Link>
              </p>
              <div className="flex items-center gap-4">
                <Link href={`/${language}/sheetdiff/privacy-policy`} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {t.footer.privacy}
                </Link>
                <Link href={`/${language}/sheetdiff/terms-of-service`} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {t.footer.terms}
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/${language}/sheetdiff/api-docs`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t.footer.back}
              </Link>
            </div>
          </footer>
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
