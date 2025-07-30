import Link from "next/link"
import { getTranslations } from '@/lib/translations'

interface FooterProps {
  locale: string;
}

// This is now a server component to ensure its content is statically rendered for SEO.
export function Footer({ locale }: FooterProps) {
  // Fetch translations on the server
  const translations = getTranslations(locale)
  const t = translations.footer
  const navT = translations.navigation.links
  
  const currentYear = new Date().getFullYear()
  
  // Generate locale-aware URLs on the server.
  // This ensures all links are correctly formatted for the current language.
  const getLocalizedUrl = (path: string) => {
    // All paths are prefixed with the locale for consistency (e.g., /en/projects).
    if (path === '/') {
      return `/${locale}`
    }
    return `/${locale}${path}`
  }
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative z-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.sitemap}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {navT.home}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/projects')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {navT.projects}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/services')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {navT.services}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/experience')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {navT.experience}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/contact')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {navT.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.contact}</h3>
            <p className="mb-2">{t.email}: amirrak8@gmail.com</p>
            <p className="mb-2">{t.phone}: +216 54711524</p>
            <p>{t.location}</p>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.connect}</h3>
            <div className={`flex ${locale === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
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
          <p>© {currentYear} {t.copyright}</p>
        </div>
      </div>
      <div className="absolute bottom-12" style={{ left: '7rem' }}>
        {/* TODO: For a true signature look, consider adding a font like 'Dancing Script' via Google Fonts. */}
        <p className="font-serif italic text-sm text-gray-500">
          {t.aiQuote}
        </p>
      </div>
    </footer>
  )
}