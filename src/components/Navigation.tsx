"use client"

import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { useMenu } from '@/context/useMenu'

// Types
const createNavigationLinks = (t: (key: string) => string, lang: string) => [
  { href: `/${lang}/#home`, label: t('navigation.links.home'), isSection: true, priority: 1 },
  { href: `/${lang}/projects`, label: t('navigation.links.projects'), isSection: false, priority: 2 },
  { href: `/${lang}/experience`, label: t('navigation.links.experience'), isSection: false, priority: 3 },
  { href: `/${lang}/services`, label: t('navigation.links.services'), isSection: false, priority: 4 },
  {
    href: `/${lang}/sheetdiff`,
    label: 'SheetDiff™',
    isSection: false,
    priority: 5,
    children: [
      { href: `/${lang}/sheetdiff`, label: 'Google Sheets Add-on' },
      { href: `/${lang}/sheetdiff/api-docs`, label: 'Structural Diff API' },
    ],
  },
  { href: `/${lang}/blog`, label: t('blog.title'), isSection: false, priority: 6 },
  { href: `/${lang}/#about`, label: t('navigation.links.about'), isSection: true, priority: 7 },
  { href: `/${lang}/contact`, label: t('navigation.links.contact'), isSection: false, priority: 8 },
]

// Types
interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

interface NavigationLink {
  href: string;
  label: string;
  isSection: boolean;
  priority: number;
  children?: { href: string; label: string }[];
}

// Updated NavLink component - exact same style as your working version
const NavLink = ({ href, label, isActive, onClick }: NavLinkProps) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`
        relative px-4 py-2 
        ${isActive ? 'text-blue-300' : 'text-gray-300 hover:text-white'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
      style={{ transform: 'none' }}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeUnderline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300"
          style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  )
}

export function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useMenu()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  const [sheetdiffOpen, setSheetdiffOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // RTL support - check if current language is Arabic
  const isRTL = language === 'ar'

  // Track active section for homepage sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Only add scroll listener if we're on the home page
    const homePath = `/${language}`
    if (pathname === homePath || pathname === `${homePath}/`) {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial position
      
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, language])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSheetdiffOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleNavigation = async (e: React.MouseEvent, link: NavigationLink) => {    e.preventDefault()
    if (link.isSection) {
      const homePath = `/${language}`
      if (pathname !== homePath && pathname !== `${homePath}/`) {
        await router.push(link.href)
      } else {
        const sectionId = link.href.split('#')[1]
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(sectionId)
        }
      }
    } else {
      await router.push(link.href)
    }
    setIsMenuOpen(false)
  }

  const navigationLinks = createNavigationLinks(t, language)
  const sortedLinks = [...navigationLinks].sort((a, b) => a.priority - b.priority)
  
  // Enhanced active link detection
  const isLinkActive = (href: string) => {
    if (href.includes('#')) {
      const homePath = `/${language}`
      const isOnHomePage = pathname === homePath || pathname === `${homePath}/`
      if (isOnHomePage) {
        const sectionId = href.split('#')[1]
        return activeSection === sectionId
      }
      return false
    } else {
      const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
      const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href
      return normalizedPathname === normalizedHref
    }
  }
  
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.a 
            href={`/${language}`} 
            className="text-xl font-bold text-white"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t('navigation.logo')}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul 
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}
              role="menubar" 
              aria-label="Main menu"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {sortedLinks.map((link) => {
                const isActive = isLinkActive(link.href)

                // SheetDiff dropdown
                if (link.children) {
                  const isDropdownActive = link.children.some(c => isLinkActive(c.href))
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="none"
                      className="relative"
                    >
                      <div ref={dropdownRef}>
                      <motion.button
                        onClick={() => setSheetdiffOpen(prev => !prev)}
                        className={`relative flex items-center gap-1 px-4 py-2 ${isDropdownActive ? 'text-blue-300' : 'text-gray-300 hover:text-white'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-haspopup="true"
                        aria-expanded={sheetdiffOpen}
                      >
                        {link.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${sheetdiffOpen ? 'rotate-180' : ''}`} />
                        {isDropdownActive && (
                          <motion.div
                            layoutId="activeUnderline"
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300"
                            style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.button>
                      <AnimatePresence>
                        {sheetdiffOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-52 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
                          >
                            {link.children.map(child => (
                              <li key={child.href}>
                                <a
                                  href={child.href}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setSheetdiffOpen(false)
                                    router.push(child.href)
                                    setIsMenuOpen(false)
                                  }}
                                  className={`block px-4 py-3 text-sm transition-colors ${
                                    isLinkActive(child.href)
                                      ? 'text-blue-300 bg-blue-500/10'
                                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                  }`}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                      </div>
                    </motion.li>
                  )
                }

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="none"
                  >
                    <NavLink
                      href={link.href}
                      label={link.label}
                      isActive={isActive}
                      onClick={(e) => handleNavigation(e, link)}
                    />
                  </motion.li>
                )
              })}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
              role="menu"
              aria-label="Mobile navigation"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <ul role="menu" className="pt-4 pb-2">
                {sortedLinks.map((link, index) => {
                  const isActive = isLinkActive(link.href)

                  // SheetDiff mobile — show children inline
                  if (link.children) {
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ delay: index * 0.1 }}
                        role="none"
                      >
                        <span className={`block py-2 ${isRTL ? 'text-right pr-4' : 'text-left pl-4'} text-gray-500 text-xs uppercase tracking-wider`}>
                          {link.label}
                        </span>
                        {link.children.map(child => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={(e) => {
                              e.preventDefault()
                              setIsMenuOpen(false)
                              router.push(child.href)
                            }}
                            className={`block py-2 ${isRTL ? 'text-right pr-8' : 'text-left pl-8'} ${
                              isLinkActive(child.href)
                                ? 'text-blue-300'
                                : 'text-gray-300 hover:text-white'
                            }`}
                            role="menuitem"
                          >
                            {child.label}
                          </a>
                        ))}
                      </motion.li>
                    )
                  }

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      transition={{ delay: index * 0.1 }}
                      role="none"
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavigation(e, link)}
                        className={`block py-2 ${isRTL ? 'text-right pr-4' : 'text-left pl-4'} ${
                          isActive 
                            ? "text-blue-300" 
                            : "text-gray-300 hover:text-white"
                        } focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded`}
                        aria-current={isActive ? "page" : undefined}
                        role="menuitem"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}