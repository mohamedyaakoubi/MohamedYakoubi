"use client"

import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMenu } from '@/context/useMenu'

// Types
const createNavigationLinks = (t: (key: string) => string, lang: string) => [
  { href: `/${lang}/#home`, label: t('navigation.links.home'), isSection: true, priority: 1 },
  { href: `/${lang}/projects`, label: t('navigation.links.projects'), isSection: false, priority: 2 },
  { href: `/${lang}/experience`, label: t('navigation.links.experience'), isSection: false, priority: 3 },
  { href: `/${lang}/services`, label: t('navigation.links.services'), isSection: false, priority: 4 },
  { href: `/${lang}/#about`, label: t('navigation.links.about'), isSection: true, priority: 5 },
  { href: `/${lang}/contact`, label: t('navigation.links.contact'), isSection: false, priority: 6 },
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
}

// Updated NavLink component - exact same style as your working version
const NavLink = ({ href, label, isActive, onClick }: NavLinkProps) => {
  console.log(`NavLink rendering: href=${href}, label=${label}, isActive=${isActive}`) // Debug log
  
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

  // RTL support - check if current language is Arabic
  const isRTL = language === 'ar'

  console.log('=== Navigation Debug Info ===')
  console.log('Current pathname:', pathname)
  console.log('Current language:', language)
  console.log('Active section:', activeSection)
  console.log('============================')

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

  const handleNavigation = async (e: React.MouseEvent, link: NavigationLink) => {
    e.preventDefault()
    console.log(`Navigation clicked: ${link.href}, isSection: ${link.isSection}`)
    
    if (link.isSection) {
      const homePath = `/${language}`
      if (pathname !== homePath && pathname !== `${homePath}/`) {
        // Navigate to home page with hash
        console.log(`Navigating to home with section: ${link.href}`)
        await router.push(link.href)
      } else {
        // If already on home page, just scroll
        const sectionId = link.href.split('#')[1]
        console.log(`Scrolling to section: ${sectionId}`)
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(sectionId) // Update active section immediately
        }
      }
    } else {
      console.log(`Navigating to page: ${link.href}`)
      await router.push(link.href)
    }
    
    setIsMenuOpen(false)
  }

  const navigationLinks = createNavigationLinks(t, language)
  const sortedLinks = [...navigationLinks].sort((a, b) => a.priority - b.priority)
  
  // Enhanced active link detection with detailed logging
  const isLinkActive = (href: string) => {
    console.log(`\n--- Checking link: ${href} ---`)
    console.log(`Current pathname: ${pathname}`)
    
    if (href.includes('#')) {
      // For section links
      const homePath = `/${language}`
      const isOnHomePage = pathname === homePath || pathname === `${homePath}/`
      console.log(`Is on home page: ${isOnHomePage}`)
      
      if (isOnHomePage) {
        const sectionId = href.split('#')[1]
        const isActive = activeSection === sectionId
        console.log(`Section ID: ${sectionId}, Active section: ${activeSection}, Is active: ${isActive}`)
        return isActive
      }
      console.log(`Not on home page, section link inactive`)
      return false
    } else {
      // For regular page links
      const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
      const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href
      const isActive = normalizedPathname === normalizedHref
      console.log(`Page link - Normalized pathname: "${normalizedPathname}", Normalized href: "${normalizedHref}", Is active: ${isActive}`)
      return isActive
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
              className={`flex ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}
              role="menubar" 
              aria-label="Main menu"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {sortedLinks.map((link) => {
                const isActive = isLinkActive(link.href)
                console.log(`Final result for ${link.href}: isActive = ${isActive}`)
                
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