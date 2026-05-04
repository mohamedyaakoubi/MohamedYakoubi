'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Check, X } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'

const CONSENT_KEY = 'portfolio-cookie-consent'

// EEA + UK + Switzerland: all Europe/* timezones plus Cyprus (Asia/Nicosia).
// These users will be handled by Google Funding Choices (post-AdSense approval).
function isEUUser(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return tz.startsWith('Europe/') || tz === 'Asia/Nicosia'
  } catch {
    return false // unknown timezone → show banner
  }
}

const text = {
  en: {
    message:
      'We use cookies and third-party services — including Google Analytics and Google AdSense — to analyse traffic and display ads. Non-essential cookies are only set with your consent.',
    accept: 'Accept all',
    decline: 'Decline',
    policy: 'Privacy Policy',
  },
  fr: {
    message:
      'Nous utilisons des cookies et des services tiers — dont Google Analytics et Google AdSense — pour analyser le trafic et diffuser des publicités. Les cookies non essentiels ne sont activés qu\u2019avec votre consentement.',
    accept: 'Tout accepter',
    decline: 'Refuser',
    policy: 'Politique de confidentialité',
  },
  ar: {
    message:
      'نستخدم ملفات تعريف الارتباط وخدمات الطرف الثالث — بما في ذلك Google Analytics وGoogle AdSense — لتحليل حركة المرور وعرض الإعلانات. لا يتم تفعيل الكوكيز غير الضرورية إلا بموافقتكم.',
    accept: 'قبول الكل',
    decline: 'رفض',
    policy: 'سياسة الخصوصية',
  },
} as const

type Locale = keyof typeof text

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function applyConsent(granted: boolean) {
  if (typeof window === 'undefined') return
  const state = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  })
  // Fire the first page_view now that analytics is unblocked
  if (granted) {
    window.gtag?.('event', 'page_view')
  }
}

export default function CookieConsent() {
  const { language } = useLanguage()
  const locale = (Object.keys(text).includes(language) ? language : 'en') as Locale
  const t = text[locale]

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // EU/EEA/UK/CH users: skip — Google Funding Choices CMP handles them post-AdSense approval.
    if (isEUUser()) return

    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) {
        // Show after a short delay so it doesn't compete with initial paint
        const id = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(id)
      }
    } catch {
      // localStorage not available — show banner so user can decide
      setVisible(true)
    }
  }, [])

  function handleDecline() {
    try { localStorage.setItem(CONSENT_KEY, 'declined') } catch { /* noop */ }
    applyConsent(false)
    setVisible(false)
  }

  function handleAccept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch { /* noop */ }
    applyConsent(true)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          className="fixed bottom-0 inset-x-0 z-[60] p-4"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Cookie className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />

            <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.message}{' '}
              <Link
                href={`/${language}/privacy-policy`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {t.policy}
              </Link>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t.decline}
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                {t.decline}
              </button>
              <button
                onClick={handleAccept}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                aria-label={t.accept}
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
