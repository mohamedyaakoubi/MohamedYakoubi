import { notFound } from 'next/navigation'
import enTranslations from '@/translations/en'
import frTranslations from '@/translations/fr'
import arTranslations from '@/translations/ar'

const translations = {
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations,
}

export function getTranslations(locale: string) {
  return translations[locale as keyof typeof translations] || translations.en
}

export function getSupportedLocales() {
  return ['en', 'fr', 'ar']
}

export function getDefaultLocale() {
  return 'en'
}

// Call first in every page under app/[locale]. The [locale] layout accepts any first
// path segment, so without this /<anything>/<route> renders with HTTP 200. Throwing from
// the page (not the layout) keeps the 404 inside the full site layout.
export function assertSupportedLocale(locale: string) {
  if (!getSupportedLocales().includes(locale)) notFound()
}

