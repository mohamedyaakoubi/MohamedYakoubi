import { useCallback } from 'react'
import type { Language } from '@/types/language'
import en from '@/translations/en'
import ar from '@/translations/ar'
import fr from '@/translations/fr'

type TranslationType = typeof en
const translations: Record<Language, TranslationType> = { en, ar, fr }

export function useTranslation(lang: Language) {
    const t = useCallback(
      (key: string) => {
        try {
          console.log(`Translating key: ${key} for language: ${lang}`)
          const keys = key.split('.')
          let value: any = translations[lang]
          
          for (const k of keys) {
            if (!value || typeof value !== 'object') {
              console.warn(`Missing translation path: ${key} in ${lang}`)
              return key
            }
            value = value[k]
          }
          
          if (!value) {
            console.warn(`No translation found for: ${key} in ${lang}`)
            return key
          }
          
          return value
        } catch (error) {
          console.error(`Translation error for key: ${key}`, error)
          return key
        }
      },
      [lang]
    )
  
    return { t }
  }