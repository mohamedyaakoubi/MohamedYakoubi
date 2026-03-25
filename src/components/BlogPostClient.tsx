'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import type { BlogPost } from '@/types/blog'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { analytics } from '@/lib/analytics'

interface BlogPostClientProps {
  post: BlogPost
  locale: string
  translations: any
}

export default function BlogPostClient({ post, locale, translations }: BlogPostClientProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const isRTL = language === 'ar'
  const theme = post.theme
  const [shareLabel, setShareLabel] = useState<string | null>(null)
  const { setTheme, theme: currentTheme } = useTheme()
  const previousTheme = useRef<string | undefined>(undefined)

  useEffect(() => {
    previousTheme.current = currentTheme
    setTheme('dark')
    return () => {
      if (previousTheme.current && previousTheme.current !== 'dark') {
        setTheme(previousTheme.current)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShare = useCallback(async () => {
    const url = `https://www.mohamedyaakoubi.com/${language}/blog/${post.slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.description, url })
        analytics.blogShare(post.slug, 'native')
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      analytics.blogShare(post.slug, 'clipboard')
      setShareLabel(language === 'ar' ? 'تم النسخ!' : language === 'fr' ? 'Copié !' : 'Copied!')
      setTimeout(() => setShareLabel(null), 2000)
    }
  }, [language, post.slug, post.title, post.description])

  const themeVars = {
    '--blog-accent': theme.accent,
    '--blog-accent-rgb': theme.accentRgb,
  } as React.CSSProperties

  return (
    <main className={`blog-post ${isRTL ? 'rtl' : 'ltr'}`} style={themeVars}>
      {/* ── Hero ── */}
      <motion.div
        className="blog-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="blog-hero-bg-image"
          />
        )}
        <div className="blog-hero-inner">
          <div className="blog-hero-tag">{theme.heroTag}</div>

          {post.heroTitle ? (
            <h1
              className="blog-hero-title"
              dangerouslySetInnerHTML={{ __html: post.heroTitle }}
            />
          ) : (
            <h1 className="blog-hero-title">{post.title}</h1>
          )}

          <p className="blog-hero-sub">{post.description}</p>

          <div className="blog-hero-meta">
            {post.tags.slice(0, 5).map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="blog-scroll-hint">↓ {language === 'ar' ? 'مرّر للقراءة' : language === 'fr' ? 'défiler pour lire' : 'scroll to read'}</div>
      </motion.div>

      {/* ── Article ── */}
      <motion.article
        className="blog-article"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />

      {/* ── Footer ── */}
      <footer className="blog-footer">
        <div className="blog-tags">
          {post.tags.map(tag => (
            <span key={tag} className="blog-tag">#{tag}</span>
          ))}
        </div>

        <div className="blog-footer-actions">
          <button onClick={handleShare} className="blog-share-btn">
            <Share2 size={16} />
            {shareLabel || (language === 'ar' ? 'مشاركة' : language === 'fr' ? 'Partager' : 'Share')}
          </button>
          <Link
            href={`/${language}/blog`}
            className={`blog-back-link ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </footer>
    </main>
  )
}

// ── Markdown → HTML Renderer ──

function renderMarkdown(content: string): string {
  const sections = content.split(/\n---\n/)
  return sections.map(s => renderSection(s.trim())).filter(Boolean).join('')
}

function renderSection(section: string): string {
  if (!section) return ''

  // Finding with severity badge (EN/FR/AR)
  const severityMap: Record<string, string> = {
    'Critical': 'critical', 'High': 'high', 'Medium': 'medium', 'Low': 'low',
    'Critique': 'critical', 'Élevé': 'high', 'Moyen': 'medium', 'Faible': 'low',
    'حرجة': 'critical', 'عالية': 'high', 'متوسطة': 'medium', 'منخفضة': 'low',
  }
  const severityPattern = Object.keys(severityMap).join('|')
  const findingMatch = section.match(new RegExp(`^### (.+?)\\s*\\[(${severityPattern})\\]`))
  if (findingMatch) {
    const fullTitle = findingMatch[1].trim()
    const severity = findingMatch[2]
    const sev = severityMap[severity] || severity.toLowerCase()
    const body = section.substring(section.indexOf('\n') + 1).trim()
    return `<div class="finding ${sev}">
      <div class="finding-header">
        <span class="badge ${sev}">${severity}</span>
        <span class="finding-title">${fullTitle}</span>
      </div>
      <div class="finding-body">${renderContent(body)}</div>
    </div>`
  }

  // Chapter: ## NN — Title
  const chapterMatch = section.match(/^## (\d{2}) — (.+)/)
  if (chapterMatch) {
    const num = chapterMatch[1]
    const title = chapterMatch[2]
    const nlIdx = section.indexOf('\n')
    const body = nlIdx > -1 ? section.substring(nlIdx + 1).trim() : ''
    return `<div class="chapter">
      <span class="chapter-num">${num} —</span>
      <div class="chapter-line"></div>
    </div>
    <h2 class="chapter-title">${title}</h2>
    ${body ? renderContent(body) : ''}`
  }

  // ## Heading (no number)
  const h2Match = section.match(/^## (.+)/)
  if (h2Match) {
    const title = h2Match[1]
    const idx = section.indexOf('\n')
    const body = idx > -1 ? section.substring(idx + 1).trim() : ''
    if (title === 'Preface' || title === 'Préface' || title === 'مقدمة') {
      return `<div class="blog-preface">${renderContent(body)}</div>`
    }
    if (title === 'Closing' || title === 'Conclusion' || title === 'خاتمة') {
      return `<div class="closing">
        <h2 class="chapter-title">${title}</h2>
        ${renderContent(body)}
      </div>`
    }
    return `<div class="chapter">
      <span class="chapter-num">—</span>
      <div class="chapter-line"></div>
    </div>
    <h2 class="chapter-title">${renderInline(title)}</h2>
    ${renderContent(body)}`
  }

  // ### Sub-heading (like "Findings Summary")
  const h3Match = section.match(/^### (.+)/)
  if (h3Match) {
    const title = h3Match[1]
    const idx = section.indexOf('\n')
    const body = idx > -1 ? section.substring(idx + 1).trim() : ''
    return `<h3 class="section-subtitle">${renderInline(title)}</h3>${renderContent(body)}`
  }

  return renderContent(section)
}

function renderContent(content: string): string {
  if (!content) return ''
  let html = content

  // Sequence diagrams (:::diagram ... :::)
  html = html.replace(/:::diagram\n([\s\S]*?):::/g, (_match, diagramContent: string) => {
    const lines = diagramContent.trim().split('\n')
    let rows = ''
    for (const line of lines) {
      const parts = line.split('|').map((s: string) => s.trim())
      if (parts.length < 3) continue
      const [from, label, to] = parts
      const note = parts[3] || ''
      const isRight = from === 'CLIENT' || from === 'العميل'
      rows += `<div class="diagram-row">
        <div class="diagram-node ${isRight ? 'diagram-client' : 'diagram-server'}">${from}</div>
        <div class="diagram-arrow-container">
          <div class="diagram-label">${label}</div>
          <div class="diagram-arrow ${isRight ? 'diagram-arrow-right' : 'diagram-arrow-left'}">
            <div class="diagram-arrow-line"></div>
            <div class="diagram-arrow-head"></div>
          </div>
          ${note ? `<div class="diagram-note">${note}</div>` : ''}
        </div>
        <div class="diagram-node ${isRight ? 'diagram-server' : 'diagram-client'}">${to}</div>
      </div>`
    }
    const clientLabel = lines[0]?.split('|')[0]?.trim() || 'CLIENT'
    const serverLabel = lines[0]?.split('|')[2]?.trim() || 'SERVER'
    return `<div class="diagram-container">
      <div class="diagram-header">
        <div class="diagram-header-node">${clientLabel}</div>
        <div class="diagram-header-spacer"></div>
        <div class="diagram-header-node">${serverLabel}</div>
      </div>
      <div class="diagram-body">${rows}</div>
    </div>`
  })

  // Pull quote (:::quote ... :::)
  html = html.replace(/:::quote\n([\s\S]*?):::/g, (_match, quoteContent: string) => {
    return `<div class="pull-quote">${quoteContent.trim().replace(/\n/g, '<br>')}</div>`
  })

  // Alert callout (:::alert ... :::)
  html = html.replace(/:::alert\n([\s\S]*?):::/g, (_match, alertContent: string) => {
    const rendered = alertContent.trim()
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
    return `<div class="callout"><p>${rendered}</p></div>`
  })

  // Finding cards inside content (### Title [Severity]) — EN/FR/AR
  const severityMapInline: Record<string, string> = {
    'Critical': 'critical', 'High': 'high', 'Medium': 'medium', 'Low': 'low',
    'Critique': 'critical', 'Élevé': 'high', 'Moyen': 'medium', 'Faible': 'low',
    'حرجة': 'critical', 'عالية': 'high', 'متوسطة': 'medium', 'منخفضة': 'low',
  }
  const sevPatternInline = Object.keys(severityMapInline).join('|')
  html = html.replace(new RegExp(`### (.+?)\\s*\\[(${sevPatternInline})\\]\n([\\s\\S]*?)(?=\n### |\n---|\n## |$)`, 'g'), 
    (_match: string, title: string, severity: string, body: string) => {
      const sev = severityMapInline[severity] || severity.toLowerCase()
      return `<div class="finding ${sev}">
        <div class="finding-header">
          <span class="badge ${sev}">${severity}</span>
          <span class="finding-title">${title.trim()}</span>
        </div>
        <div class="finding-body">${renderContent(body.trim())}</div>
      </div>`
    })

  html = html.replace(/:::arch\n([\s\S]*?):::/g, (_match, archContent: string) => {
    const escaped = archContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trim()
    // Color code: ⚠️ lines get .highlight, ✓ lines get .ok, section headers get .ok
    const colored = escaped
      .replace(/^(CLIENT|API|AUTH|العميل|الخادم|المصادقة|SERVEUR)(\s*\(.*?\))/gm, '<span class="ok">$1</span>$2')
      .replace(/(⚠️)/g, '<span class="highlight">⚠️</span>')
      .replace(/(✓)/g, '<span class="ok">✓</span>')
      .replace(/((?:returns|accepts|secret|exposed|generated|randomness|winner|values|retourne|accepte|clé|exposé|يُعيد|يقبل|مفتاح|مكشوف)[^\n]*⚠️[^\n]*)/g, '<span class="highlight">$1</span>')
      .replace(/((?:server-controlled|rate limited|attempt counter|limité|محدودة|عداد)[^\n]*✓[^\n]*)/g, '<span class="ok">$1</span>')
    return `<div class="arch">${colored.replace(/\n/g, '<br>')}</div>`
  })

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang: string, code: string) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n\n/g, '\n \n')
      .trimEnd()
    return `<div class="code-block">
      <div class="code-header">${lang || 'code'}</div>
      <pre>${highlightSyntax(escaped)}</pre>
    </div>`
  })

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_match, header: string, _sep: string, body: string) => {
      const ths = header.split('|').filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`).join('')
      const trs = body.trim().split('\n').map((row: string) => {
        const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) => {
          let val = c.trim()
          const tableSevMap: Record<string, string> = {
            'Critical': 'critical', 'High': 'high', 'Medium': 'medium',
            'Critique': 'critical', 'Élevé': 'high', 'Moyen': 'medium',
            'حرجة': 'critical', 'عالية': 'high', 'متوسطة': 'medium',
          }
          if (tableSevMap[val]) val = `<span class="badge ${tableSevMap[val]}">${val}</span>`
          else if (/Confirmed|Exploited|Confirmé|confirmé|Exploité|مؤكّد|استُغل/i.test(val)) val = `<span class="status-confirmed">${val}</span>`
          return `<td>${val}</td>`
        }).join('')
        return `<tr>${tds}</tr>`
      }).join('')
      return `<div class="table-wrap"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`
    }
  )

  // Inline code
  html = html.replace(/`([^`]+)`/g, (_, code: string) => {
    if (/^console\.(log|warn|error|info|debug)$/.test(code)) {
      return `<code class="hl-console">${code}</code>`
    }
    return `<code>${code}</code>`
  })

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Consolidate numbered list items separated by blank lines
  html = html.replace(/(\d+\.\s+[^\n]+)\n\n(?=\d+\.\s+)/g, '$1\n')

  // Numbered list items
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')

  // Unordered list items
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive list items
  html = html.replace(/((?:<li[^>]*>[\s\S]*?<\/li>\s*)+)/g, (match) => {
    if (match.includes('<ul') || match.includes('<ol')) return match
    return `<ul class="styled">${match}</ul>`
  })

  // Paragraphs
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('<blockquote')
    ) {
      return trimmed
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`
  }).join('\n')

  return html
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function highlightSyntax(code: string): string {
  // The code has been HTML-escaped (&amp; &lt; &gt;) but quotes remain literal
  // Single-pass tokenizer for comments, strings, keywords, booleans, numbers
  const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|new|this|import|from|export|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|delete|void|extends|super)\b|\b(true|false|null|undefined)\b|(\b\d+\.?\d*\b)/g

  let result = code.replace(tokenRegex, (match, comment: string, str: string, keyword: string, bool: string, num: string) => {
    if (comment) return `<span class="cm">${comment}</span>`
    if (str) return `<span class="str">${str}</span>`
    if (keyword) return `<span class="kw">${keyword}</span>`
    if (bool) return `<span class="prop">${bool}</span>`
    if (num) return `<span class="num">${num}</span>`
    return match
  })

  // Detect function calls: word( — but skip already-wrapped keywords
  result = result.replace(/(?<![">])(\b[a-zA-Z_$][a-zA-Z0-9_$]*)\(/g, (full, name) => {
    return `<span class="fn">${name}</span>(`
  })

  // Detect property access after dot: .word (not followed by opening paren)
  result = result.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)(?!\s*\(|<)/g, (_, prop) => {
    return `.<span class="prop">${prop}</span>`
  })

  // Highlight console.log / console.warn / console.error
  result = result.replace(/console<span class="prop">\.(log|warn|error|info|debug)<\/span>/g, 
    '<span class="hl-console">console.$1</span>')

  return result
}
