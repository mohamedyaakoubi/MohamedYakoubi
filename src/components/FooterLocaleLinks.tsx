"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function FooterLocaleLinks() {
  const pathname = usePathname() || '/en'

  const getLocaleUrl = (targetLocale: string) => {
    const segments = pathname.split('/')
    if (segments.length > 1 && ['en', 'fr', 'ar'].includes(segments[1])) {
      segments[1] = targetLocale
      return segments.join('/') || `/${targetLocale}`
    }
    return `/${targetLocale}`
  }

  return (
    <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-400">
      <Link href={getLocaleUrl('en')} hrefLang="en" className="hover:text-white transition-colors">
        English
      </Link>
      <span aria-hidden="true">&middot;</span>
      <Link href={getLocaleUrl('fr')} hrefLang="fr" className="hover:text-white transition-colors">
        Français
      </Link>
      <span aria-hidden="true">&middot;</span>
      <Link href={getLocaleUrl('ar')} hrefLang="ar" className="hover:text-white transition-colors">
        العربية
      </Link>
    </div>
  )
}
