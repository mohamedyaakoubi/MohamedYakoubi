"use client"

import { useEffect, useState } from "react"

export default function PopupBlocker() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Function to check if mobile menu is open
    const checkMenuState = () => {
      setIsMenuOpen(document.body.classList.contains('mobile-menu-open'))
    }

    // Check on mount
    checkMenuState()

    // Listen for class changes on body
    const observer = new MutationObserver(checkMenuState)
    observer.observe(document.body, { attributes: true })

    // Listen for custom events
    const handleMenuChange = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen)
    }

    window.addEventListener('mobilemenuchange', handleMenuChange as EventListener)

    return () => {
      observer.disconnect()
      window.removeEventListener('mobilemenuchange', handleMenuChange as EventListener)
    }
  }, [])

  if (!isMenuOpen) return null

  return (
    <div 
      className="fixed inset-0 z-45 bg-transparent" 
      onClick={(e) => {
        // This prevents clicks from reaching anything below
        e.preventDefault()
        e.stopPropagation()
      }}
    />
  )
}