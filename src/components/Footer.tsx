"use client"

import Link from "next/link"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  
  const currentYear = new Date().getFullYear()
  
  // Generate locale-aware URLs
  const getLocalizedUrl = (path: string) => {
    if (language === 'en') {
      return path === '/' ? '/' : path
    }
    return path === '/' ? `/${language}` : `/${language}${path}`
  }
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative z-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.sitemap')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t('navigation.links.home')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/projects')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t('navigation.links.projects')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/services')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t('navigation.links.services')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/experience')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t('navigation.links.experience')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/contact')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t('navigation.links.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.contact')}</h3>
            <p className="mb-2">{t('footer.email')}: amirrak8@gmail.com</p>
            <p className="mb-2">{t('footer.phone')}: +216 54711524</p>
            <p>{t('footer.location')}</p>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.connect')}</h3>
            <div className={`flex ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a 
                href="https://github.com/mohamedyaakoubi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/yaakoubi-mohamed/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}