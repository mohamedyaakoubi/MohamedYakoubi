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

