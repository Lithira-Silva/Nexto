'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, List, CheckSquare, Sparkles, Moon, Sun, Menu, X, BarChart3 } from 'lucide-react'

interface NavigationProps {
  currentView: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Floating Navigation */}
      <nav className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out
        ${isScrolled 
          ? 'glass-morphism shadow-2xl backdrop-blur-xl border border-white/20 dark:border-secondary-700/30 scale-100 opacity-100' 
          : 'bg-transparent scale-95 opacity-90'
        }
        rounded-2xl
      `}>
        <div className="px-3 py-2">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Logo */}
            <div className="flex items-center space-x-3 px-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-midnight-blue via-accent-500 to-lavender-glow morph-shape flex items-center justify-center shadow-glow">
                  <CheckSquare className="w-5 h-5 text-frost-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-sunset-orange to-warning-400 rounded-full animate-bounce"></div>
              </div>
              
              <div>
                <h2 className="text-lg font-bold gradient-text tracking-tight">NexTo</h2>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-slate-gray/20 dark:bg-secondary-600/40 mx-2"></div>

            {/* View Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onViewChange('list')}
                className={`
                  flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                  ${currentView === 'list'
                    ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow scale-105'
                    : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/10 dark:hover:bg-secondary-700/30'
                  }
                `}
              >
                <List className="w-4 h-4" />
                <span className="font-semibold">List</span>
              </button>
              
              <button
                onClick={() => onViewChange('calendar')}
                className={`
                  flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                  ${currentView === 'calendar'
                    ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow scale-105'
                    : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/10 dark:hover:bg-secondary-700/30'
                  }
                `}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">Calendar</span>
              </button>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-slate-gray/20 dark:bg-secondary-600/40 mx-2"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-xl glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-all duration-300 button-premium focus-ring"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between px-2">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-midnight-blue to-accent-500 flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-frost-white" />
              </div>
              <span className="font-bold gradient-text text-lg">NexTo</span>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-lg glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray button-premium"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 rounded-lg glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray button-premium"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`
          md:hidden transition-all duration-500 ease-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-4 pb-4 pt-2 border-t border-white/10 dark:border-secondary-700/30">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onViewChange('list')
                  setIsMobileMenuOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                  ${currentView === 'list'
                    ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow'
                    : 'text-slate-gray dark:text-cloud-gray hover:bg-white/10 dark:hover:bg-secondary-700/30'
                  }
                `}
              >
                <List className="w-4 h-4" />
                <span>List View</span>
              </button>
              
              <button
                onClick={() => {
                  onViewChange('calendar')
                  setIsMobileMenuOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                  ${currentView === 'calendar'
                    ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow'
                    : 'text-slate-gray dark:text-cloud-gray hover:bg-white/10 dark:hover:bg-secondary-700/30'
                  }
                `}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendar View</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
