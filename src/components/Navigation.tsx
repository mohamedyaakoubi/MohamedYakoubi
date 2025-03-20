"use client"

import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMenu } from '@/context/useMenu'

// Types
const createNavigationLinks = (t: (key: string) => string) => [
  { href: "/#home", label: t('navigation.links.home'), isSection: true, priority: 1 },
  { href: "/projects", label: t('navigation.links.projects'), isSection: false, priority: 2 },
  { href: "/experience", label: t('navigation.links.experience'), isSection: false, priority: 3 },
  { href: "/services", label: t('navigation.links.services'), isSection: false, priority: 4 },
  { href: "/#about", label: t('navigation.links.about'), isSection: true, priority: 5 },
  { href: "/contact", label: t('navigation.links.contact'), isSection: false, priority: 6 },
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

// Components
const NavLink = ({ href, label, isActive, onClick }: NavLinkProps) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={`
      relative px-4 py-2 
      ${isActive ? 'text-blue-500' : 'text-gray-300 hover:text-white'}
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
    {isActive && (
      <motion.div
        layoutId="underline"
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
      />
    )}
  </motion.a>
);

export function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useMenu()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = async (e: React.MouseEvent, link: NavigationLink) => {
    e.preventDefault()
    
    if (link.isSection) {
      if (pathname !== '/') {
        // Navigate to home page with hash
        await router.push(`/${link.href}`)
      } else {
        // If already on home page, just scroll
        const element = document.getElementById(link.href.replace('/#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      await router.push(link.href)
    }
    
    setIsMenuOpen(false)
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('/#', ''))
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigationLinks = createNavigationLinks(t)
  const sortedLinks = [...navigationLinks].sort((a, b) => a.priority - b.priority)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a href="/#home" className="text-xl font-bold text-white">
            {t('navigation.logo')}
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {sortedLinks.map((link) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  onClick={(e) => handleNavigation(e, link)}
                />
              </motion.li>
            ))}
          </ul>

            {/* Mobile Menu Button */}
            <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              role="navigation"
              aria-label="Mobile navigation"
            >
              <ul className="pt-4 pb-2">
                {sortedLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link)}
                      className={`block py-2 ${
                        pathname === link.href 
                          ? "text-blue-500" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}