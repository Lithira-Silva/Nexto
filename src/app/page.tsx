'use client'

import { useState, useEffect } from 'react'
import { Calendar, List, Moon, Sun } from 'lucide-react'
import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import TaskCalendar from '@/components/TaskCalendar'
import TaskAnalytics from '@/components/TaskAnalytics'
import Header from '@/components/Header'
import ThemeToggle from '@/components/ThemeToggle'
import { useTaskStore } from '@/store/taskStore'

type ViewMode = 'list' | 'calendar'

export default function Home() {
  const { tasks, loadTasks, isLoading } = useTaskStore()
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadTasks()
    
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)
  }, [loadTasks])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen passionate-scroll smooth-scroll">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10"></div>
        
        <div className="relative px-4 py-4 pt-8">
          <div className="max-w-7xl mx-auto">
            <Header />
          </div>
        </div>
      </div>

      {/* Navigation Controls - Centered above tasks */}
      <div className="relative px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="glass-morphism rounded-3xl p-3 border border-white/20 dark:border-secondary-700/30 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-white/10 dark:bg-secondary-800/30 rounded-2xl p-1.5">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                      ${viewMode === 'list'
                        ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow scale-105'
                        : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30'
                      }
                    `}
                  >
                    <List className="w-5 h-5" />
                    <span className="font-semibold">List</span>
                  </button>
                  
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 button-premium
                      ${viewMode === 'calendar'
                        ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-glow scale-105'
                        : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30'
                      }
                    `}
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Calendar</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-white/20 dark:bg-secondary-600/40"></div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-all duration-300 button-premium focus-ring border border-white/10 dark:border-secondary-700/20"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 py-8 bg-gradient-to-b from-transparent to-cloud-white/30 dark:to-secondary-900/30">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'list' ? (
            /* List View Layout */
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 slide-in-bottom">
              {/* Task Creation Form */}
              <div className="xl:col-span-1">
                <div className="sticky top-8">
                  <TaskForm />
                </div>
              </div>

              {/* Task List */}
              <div className="xl:col-span-2">
                <TaskList />
              </div>
            </div>
          ) : (
            /* Calendar View Layout */
            <div className="space-y-8 slide-in-bottom">
              {/* Analytics Section */}
              <TaskAnalytics />
              
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Task Creation Form */}
                <div className="xl:col-span-1">
                  <div className="sticky top-8">
                    <TaskForm />
                  </div>
                </div>

                {/* Task Calendar */}
                <div className="xl:col-span-3">
                  <TaskCalendar />
                </div>
              </div>
            </div>
          )}

          {/* Award-Winning Footer */}
          <footer className="mt-20 text-center slide-in-bottom">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-midnight-blue/5 dark:via-accent-500/5 to-transparent h-px top-1/2"></div>
              
              <div className="relative inline-flex items-center gap-3 px-8 py-4 glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-gray dark:text-cloud-gray text-sm font-medium">Built with</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold gradient-text">Next.js</span>
                  <span className="text-slate-gray dark:text-cloud-gray text-sm">&</span>
                  <span className="font-bold gradient-text">Award-Winning Design</span>
                </div>
                <div className="w-2 h-2 bg-gradient-to-r from-midnight-blue to-accent-500 rounded-full animate-bounce"></div>
              </div>

              {/* Floating elements */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
