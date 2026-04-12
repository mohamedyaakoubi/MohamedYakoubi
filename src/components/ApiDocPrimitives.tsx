'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  SplitSquareHorizontal,
  GitMerge,
  CirclePlus,
  Trash2,
  Pencil,
  Minus,
} from 'lucide-react'

export const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ── Copy button ─────────────────────────────────────────────── */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="p-1.5 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0"
      aria-label="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

/* ── Syntax highlighting ─────────────────────────────────────── */
type TokenType =
  | 'key' | 'string' | 'number' | 'boolean' | 'null'
  | 'comment' | 'keyword' | 'function' | 'flag'
  | 'variable' | 'punctuation' | 'plain'

type RawToken = { type: TokenType; text: string }

function tokenize(code: string, lang: string): RawToken[] {
  const l = lang.toLowerCase()

  if (l === 'json') {
    const tokens: RawToken[] = []
    // key strings are followed by ":", value strings are not
    const re = /("(?:[^"\\]|\\.)*")\s*(?=:)|("(?:[^"\\]|\\.)*")|(true|false|null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}\[\],:])/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
      if      (m[1] != null) tokens.push({ type: 'key',         text: m[1] })
      else if (m[2] != null) tokens.push({ type: 'string',      text: m[2] })
      else if (m[3] != null) tokens.push({ type: m[3] === 'null' ? 'null' : 'boolean', text: m[3] })
      else if (m[4] != null) tokens.push({ type: 'number',      text: m[4] })
      else if (m[5] != null) tokens.push({ type: 'punctuation', text: m[5] })
      last = re.lastIndex
    }
    if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
    return tokens
  }

  if (['bash', 'shell', 'sh', 'curl'].includes(l)) {
    const tokens: RawToken[] = []
    const re = /(#[^\n]*)|(--?[\w-]+)|(\$\{?[\w]+\}?)|(https?:\/\/[^\s"'\\]+)|("(?:[^"\\]|\\.)*"|'[^']*')|(\b(?:curl|wget|node|npm|npx|python|python3|cd|ls|export|echo|cat|mkdir|POST|GET|PUT|DELETE|PATCH)\b)/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
      if      (m[1] != null) tokens.push({ type: 'comment',  text: m[1] })
      else if (m[2] != null) tokens.push({ type: 'flag',     text: m[2] })
      else if (m[3] != null) tokens.push({ type: 'variable', text: m[3] })
      else if (m[4] != null) tokens.push({ type: 'string',   text: m[4] })
      else if (m[5] != null) tokens.push({ type: 'string',   text: m[5] })
      else if (m[6] != null) tokens.push({ type: 'keyword',  text: m[6] })
      last = re.lastIndex
    }
    if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
    return tokens
  }

  if (['javascript', 'js', 'typescript', 'ts', 'jsx', 'tsx'].includes(l)) {
    const tokens: RawToken[] = []
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b-?\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|if|else|for|while|class|import|export|default|from|as|async|await|new|this|typeof|instanceof|in|of|try|catch|finally|throw|true|false|null|undefined|void)\b)|(\b[a-zA-Z_$][\w$]*(?=\s*\())/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
      if      (m[1] != null) tokens.push({ type: 'comment',  text: m[1] })
      else if (m[2] != null) tokens.push({ type: 'string',   text: m[2] })
      else if (m[3] != null) tokens.push({ type: 'number',   text: m[3] })
      else if (m[4] != null) tokens.push({ type: 'keyword',  text: m[4] })
      else if (m[5] != null) tokens.push({ type: 'function', text: m[5] })
      last = re.lastIndex
    }
    if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
    return tokens
  }

  if (['python', 'py'].includes(l)) {
    const tokens: RawToken[] = []
    // triple-quoted strings must come before single-line strings
    const re = /("""[\s\S]*?"""|'''[\s\S]*?''')|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#[^\n]*)|(\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(\b(?:def|class|return|if|elif|else|for|while|import|from|as|with|try|except|finally|raise|pass|break|continue|in|not|and|or|is|lambda|yield|global|nonlocal|del|assert|True|False|None|async|await)\b)|(\b[a-zA-Z_]\w*(?=\s*\())/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
      if      (m[1] != null) tokens.push({ type: 'string',   text: m[1] })
      else if (m[2] != null) tokens.push({ type: 'string',   text: m[2] })
      else if (m[3] != null) tokens.push({ type: 'comment',  text: m[3] })
      else if (m[4] != null) tokens.push({ type: 'number',   text: m[4] })
      else if (m[5] != null) tokens.push({ type: 'keyword',  text: m[5] })
      else if (m[6] != null) tokens.push({ type: 'function', text: m[6] })
      last = re.lastIndex
    }
    if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
    return tokens
  }

  return [{ type: 'plain', text: code }]
}

// VS Code Dark+ / Light+ token colors
function SyntaxToken({ type, text }: RawToken) {
  switch (type) {
    case 'key':         return <span className="text-[#0451A5] dark:text-[#9CDCFE]">{text}</span>
    case 'string':      return <span className="text-[#A31515] dark:text-[#CE9178]">{text}</span>
    case 'number':      return <span className="text-[#098658] dark:text-[#B5CEA8]">{text}</span>
    case 'boolean':
    case 'null':        return <span className="text-[#0000FF] dark:text-[#569CD6]">{text}</span>
    case 'comment':     return <span className="text-[#008000] dark:text-[#6A9955] italic">{text}</span>
    case 'keyword':     return <span className="text-[#AF00DB] dark:text-[#569CD6]">{text}</span>
    case 'function':    return <span className="text-[#795E26] dark:text-[#DCDCAA]">{text}</span>
    case 'flag':        return <span className="text-[#001080] dark:text-[#9CDCFE]">{text}</span>
    case 'variable':    return <span className="text-[#001080] dark:text-[#9CDCFE]">{text}</span>
    case 'punctuation': return <span className="text-[#767676] dark:text-[#D4D4D4]">{text}</span>
    default:            return <>{text}</>
  }
}

export function HighlightedCode({ code, lang }: { code: string; lang: string }) {
  return (
    <>
      {tokenize(code, lang).map((tok, i) => (
        <SyntaxToken key={i} type={tok.type} text={tok.text} />
      ))}
    </>
  )
}

const LANG_ACCENT: Record<string, string> = {
  json:       'text-amber-500 dark:text-amber-400',
  bash:       'text-emerald-600 dark:text-emerald-400',
  shell:      'text-emerald-600 dark:text-emerald-400',
  sh:         'text-emerald-600 dark:text-emerald-400',
  curl:       'text-emerald-600 dark:text-emerald-400',
  javascript: 'text-yellow-500 dark:text-yellow-400',
  js:         'text-yellow-500 dark:text-yellow-400',
  typescript: 'text-blue-500 dark:text-blue-400',
  ts:         'text-blue-500 dark:text-blue-400',
  jsx:        'text-cyan-500 dark:text-cyan-400',
  tsx:        'text-cyan-500 dark:text-cyan-400',
  http:       'text-purple-500 dark:text-purple-400',
  python:     'text-blue-600 dark:text-[#4EC9B0]',
  py:         'text-blue-600 dark:text-[#4EC9B0]',
}

/* ── Code block ──────────────────────────────────────────────── */
export function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const accentCls = LANG_ACCENT[lang.toLowerCase()] ?? 'text-gray-500 dark:text-gray-400'
  return (
    <div dir="ltr" className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-4 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <span className={`text-xs font-mono font-semibold uppercase tracking-widest select-none ${accentCls}`}>{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        <code><HighlightedCode code={code} lang={lang} /></code>
      </pre>
    </div>
  )
}

/* ── Tabbed code block (curl / JavaScript / Python) ─────────── */
export type CodeTab = { label: string; code: string; lang: string }

export function TabbedCodeBlock({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0)
  const current = tabs[active]
  return (
    <div dir="ltr" className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-4 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                i === active
                  ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CopyButton text={current.code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        <code><HighlightedCode code={current.code} lang={current.lang} /></code>
      </pre>
    </div>
  )
}

/* ── Inline code ─────────────────────────────────────────────── */
export function IC({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
      {children}
    </code>
  )
}

/* ── Section headings ────────────────────────────────────────── */
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-gray-900 dark:text-gray-50 mt-12 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 scroll-mt-20 group flex items-center gap-2"
    >
      {children}
      <a
        href={`#${id}`}
        aria-hidden="true"
        tabIndex={-1}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity text-base font-normal after:content-['#']"
      />
    </h2>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">
      {children}
    </h3>
  )
}

/* ── Method badge ────────────────────────────────────────────── */
export function MethodBadge({ method }: { method: string }) {
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
export function ParamTable({
  rows,
}: {
  rows: { name: string; type: string; required?: boolean; desc: React.ReactNode }[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-44">Name</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-32">Type</th>
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
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 leading-relaxed align-top">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Callout ─────────────────────────────────────────────────── */
export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warn' | 'tip'
  children: React.ReactNode
}) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warn: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    tip:  'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
  }
  return (
    <div className={`flex gap-3 rounded-lg border p-4 my-4 text-sm leading-relaxed ${styles[type]}`}>
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

/* ── Collapsible ─────────────────────────────────────────────── */
export function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden my-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {title}
        {open ? (
          <ChevronDown size={20} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronRight size={20} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 py-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Before / After diff comparison block ───────────────────── */
export function DiffCompare({
  label,
  before,
  after,
  result,
  lang = 'json',
}: {
  label?: string
  before: string
  after: string
  result: string
  lang?: string
}) {
  return (
    <div className="my-6 space-y-1">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
          {label}
        </p>
      )}
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
              Original
            </p>
            <CopyButton text={before} />
          </div>
          <div dir="ltr" className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <pre className="p-3 overflow-x-auto text-xs bg-red-50 dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
              <code><HighlightedCode code={before} lang={lang} /></code>
            </pre>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              Reworked
            </p>
            <CopyButton text={after} />
          </div>
          <div dir="ltr" className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <pre className="p-3 overflow-x-auto text-xs bg-emerald-50 dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
              <code><HighlightedCode code={after} lang={lang} /></code>
            </pre>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-3 mb-1 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
          API Result
        </p>
        <div dir="ltr" className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <span className={`text-xs font-mono font-semibold uppercase tracking-widest select-none ${LANG_ACCENT[lang.toLowerCase()] ?? 'text-gray-500 dark:text-gray-400'}`}>{lang}</span>
            <CopyButton text={result} />
          </div>
          <pre className="p-4 overflow-x-auto text-sm bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
            <code><HighlightedCode code={result} lang={lang} /></code>
          </pre>
        </div>
      </div>
    </div>
  )
}

/* ── Inline diff tokens (transcriptDiff display) ─────────────── */
export function InlineDiff({ tokens }: { tokens: { type: string; value: string }[] }) {
  return (
    <span className="font-mono text-sm">
      {tokens.map((tok, i) => {
        if (tok.type === 'equal')
          return <span key={i} className="text-gray-700 dark:text-gray-300">{tok.value}</span>
        if (tok.type === 'delete')
          return (
            <span key={i} className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 line-through px-0.5 rounded">
              {tok.value}
            </span>
          )
        if (tok.type === 'insert')
          return (
            <span key={i} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-0.5 rounded">
              {tok.value}
            </span>
          )
        return null
      })}
    </span>
  )
}

/* ── Status pill ─────────────────────────────────────────────── */
export const STATUS_STYLE: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  UNCHANGED: { icon: <Minus size={13} />,                  color: 'text-gray-600 dark:text-gray-400',       bg: 'bg-gray-50 dark:bg-gray-900/60',        border: 'border-gray-200 dark:border-gray-700' },
  MODIFIED:  { icon: <Pencil size={13} />,                 color: 'text-amber-700 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-900/20',      border: 'border-amber-200 dark:border-amber-800' },
  ADDED:     { icon: <CirclePlus size={13} />,             color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20',  border: 'border-emerald-200 dark:border-emerald-800' },
  DELETED:   { icon: <Trash2 size={13} />,                 color: 'text-red-700 dark:text-red-400',         bg: 'bg-red-50 dark:bg-red-900/20',          border: 'border-red-200 dark:border-red-800' },
  SPLIT:     { icon: <SplitSquareHorizontal size={13} />,  color: 'text-purple-700 dark:text-purple-400',   bg: 'bg-purple-50 dark:bg-purple-900/20',    border: 'border-purple-200 dark:border-purple-800' },
  MERGED:    { icon: <GitMerge size={13} />,               color: 'text-indigo-700 dark:text-indigo-400',   bg: 'bg-indigo-50 dark:bg-indigo-900/20',    border: 'border-indigo-200 dark:border-indigo-800' },
}

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLE[status]
  if (!s) return <IC>{status}</IC>
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border ${s.bg} ${s.color} ${s.border}`}>
      {s.icon}
      {status}
    </span>
  )
}

/* ── Motion wrapper ──────────────────────────────────────────── */
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      {children}
    </motion.div>
  )
}
