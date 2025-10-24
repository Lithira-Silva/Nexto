'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to 'light' mode
    const theme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (theme === 'dark' || (!theme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 bg-frost-white/90 dark:bg-obsidian-black/90 
                 border border-slate-gray/20 dark:border-secondary-700/50 rounded-xl
                 shadow-modern dark:shadow-dark-modern backdrop-blur-sm
                 hover:scale-105 hover:shadow-modern-lg dark:hover:shadow-dark-modern
                 focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black
                 transition-all duration-300 ease-out group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        <Sun className={`
          absolute inset-0 w-6 h-6 text-sunset-orange transition-all duration-300 transform
          ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `} />
        <Moon className={`
          absolute inset-0 w-6 h-6 text-lavender-glow transition-all duration-300 transform
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `} />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2
                    bg-midnight-blue dark:bg-accent-600 text-frost-white text-sm font-medium rounded-lg
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                    shadow-modern-lg dark:shadow-accent-glow whitespace-nowrap">
        {isDark ? 'Light mode' : 'Dark mode'}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45
                      w-2 h-2 bg-midnight-blue dark:bg-accent-600"></div>
      </div>
    </button>
  )
}
