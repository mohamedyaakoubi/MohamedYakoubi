"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    setMounted(true)
    // Create and set up audio element
    const audio = new Audio('/sounds/light.mp3')
    audio.preload = 'auto'
    audioRef.current = audio
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    // Play sound on toggle
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }
  }

  if (!mounted) {
    return null
  }

  // Dynamic aria-label that includes current state
  const ariaLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme, current theme is ${theme}`

  return (
    <button
      onClick={handleThemeToggle}
      className="fixed top-20 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-50"
      aria-label={ariaLabel}
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </button>
  )
}