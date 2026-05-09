import Link from "next/link"
import { getTranslations } from '@/lib/translations'
import { blogPosts } from '@/data/blog'

interface FooterProps {
  locale: string;
}

// Server component — all links render as static HTML for full crawlability.
export function Footer({ locale }: FooterProps) {
  const translations = getTranslations(locale)
  const t = translations.footer
  const navT = translations.navigation.links
  
  const currentYear = new Date().getFullYear()
  
  const getLocalizedUrl = (path: string) => {
    if (path === '/') return `/${locale}`
    return `/${locale}${path}`
  }

  // Abbreviated blog post titles for footer display
  const blogLinks = blogPosts.map(p => ({
    slug: p.slug,
    title: p.title.length > 40 ? p.title.slice(0, 40) + '…' : p.title,
  }))
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative z-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1 — Site navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.sitemap}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getLocalizedUrl('/')} className="hover:text-blue-400 transition-colors">
                  {navT.home}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/projects')} className="hover:text-blue-400 transition-colors">
                  {navT.projects}
                </Link>
                {/* Project detail pages — ensures crawlers reach every project page */}
                <ul className="ml-3 mt-1 space-y-1 text-gray-400">
                  <li><Link href={getLocalizedUrl('/projects/potential')} className="hover:text-blue-400 transition-colors">Potential</Link></li>
                  <li><Link href={getLocalizedUrl('/projects/documed')} className="hover:text-blue-400 transition-colors">DocuMed</Link></li>
                  <li><Link href={getLocalizedUrl('/projects/internationalskills')} className="hover:text-blue-400 transition-colors">InternationalSkills</Link></li>
                </ul>
              </li>
              <li>
                <Link href={getLocalizedUrl('/services')} className="hover:text-blue-400 transition-colors">
                  {navT.services}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/experience')} className="hover:text-blue-400 transition-colors">
                  {navT.experience}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/blog')} className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
                {/* Individual blog posts — ensures crawlers reach every post */}
                <ul className="ml-3 mt-1 space-y-1 text-gray-400">
                  {blogLinks.map(post => (
                    <li key={post.slug}>
                      <Link href={getLocalizedUrl(`/blog/${post.slug}`)} className="hover:text-blue-400 transition-colors">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href={getLocalizedUrl('/contact')} className="hover:text-blue-400 transition-colors">
                  {navT.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — SheetDiff™ (all sub-pages explicit for crawlability) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">SheetDiff™</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getLocalizedUrl('/sheetdiff')} className="hover:text-blue-400 transition-colors">
                  {locale === 'fr' ? 'Extension Google Sheets' : locale === 'ar' ? 'إضافة جوجل شيتس' : 'Google Sheets Add-on'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/pricing')} className="hover:text-blue-400 transition-colors">
                  {locale === 'fr' ? 'Tarifs' : locale === 'ar' ? 'الأسعار' : 'Pricing'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/api-docs')} className="hover:text-blue-400 transition-colors">
                  {locale === 'fr' ? 'Documentation API' : locale === 'ar' ? 'توثيق API' : 'API Documentation'}
                </Link>
                {/* API docs sub-pages */}
                <ul className="ml-3 mt-1 space-y-1 text-gray-400">
                  <li><Link href={getLocalizedUrl('/sheetdiff/api-docs/parameters')} className="hover:text-blue-400 transition-colors">{locale === 'fr' ? 'Paramètres' : locale === 'ar' ? 'المعاملات' : 'Parameters'}</Link></li>
                  <li><Link href={getLocalizedUrl('/sheetdiff/api-docs/diff-statuses')} className="hover:text-blue-400 transition-colors">{locale === 'fr' ? 'Statuts Diff' : locale === 'ar' ? 'حالات Diff' : 'Diff Statuses'}</Link></li>
                  <li><Link href={getLocalizedUrl('/sheetdiff/api-docs/demo')} className="hover:text-blue-400 transition-colors">Demo</Link></li>
                  <li><Link href={getLocalizedUrl('/sheetdiff/api-docs/playground')} className="hover:text-blue-400 transition-colors">Playground</Link></li>
                  <li><Link href={getLocalizedUrl('/sheetdiff/api-docs/engine-precision')} className="hover:text-blue-400 transition-colors">{locale === 'fr' ? 'Précision du moteur' : locale === 'ar' ? 'دقة المحرك' : 'Engine Precision'}</Link></li>
                </ul>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/privacy-policy')} className="hover:text-blue-400 transition-colors text-gray-400">
                  {locale === 'fr' ? 'Politique de confidentialité' : locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/terms-of-service')} className="hover:text-blue-400 transition-colors text-gray-400">
                  {locale === 'fr' ? 'Conditions d\u2019utilisation' : locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/api-docs/privacy-policy')} className="hover:text-blue-400 transition-colors text-gray-400">
                  {locale === 'fr' ? 'Confidentialité API' : locale === 'ar' ? 'خصوصية API' : 'API Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/sheetdiff/api-docs/terms-of-service')} className="hover:text-blue-400 transition-colors text-gray-400">
                  {locale === 'fr' ? 'CGU API' : locale === 'ar' ? 'شروط API' : 'API Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 — Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.contact}</h3>
            <p className="mb-2 text-sm">{t.email}: amirrak8@gmail.com</p>
            <p className="mb-2 text-sm">{t.phone}: +216 54711524</p>
            <p className="text-sm">{t.location}</p>
          </div>
          
          {/* Column 4 — Social Links */}
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
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-300">
          <p>© {currentYear} {t.copyright}</p>
          {/* Portfolio-wide legal links — internal links must NOT use target="_blank" */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-400">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-blue-400 transition-colors">
              {locale === 'fr' ? 'Politique de confidentialité' : locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href={`/${locale}/terms-of-service`} className="hover:text-blue-400 transition-colors">
              {locale === 'fr' ? "Conditions d\u2019utilisation" : locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </Link>
          </div>
          {/* Language versions — static links so crawlers discover all locale variants */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <Link href="/en" hrefLang="en" className="hover:text-blue-400 transition-colors">English</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/fr" hrefLang="fr" className="hover:text-blue-400 transition-colors">Français</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/ar" hrefLang="ar" className="hover:text-blue-400 transition-colors">العربية</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12" style={{ left: '7rem' }}>
        <p className="font-serif italic text-sm text-gray-300">
          {t.aiQuote}
        </p>
      </div>
    </footer>
  )
}