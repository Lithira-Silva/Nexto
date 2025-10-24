'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, List, Moon, Sun, LogOut, User } from 'lucide-react'
import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import TaskCalendar from '@/components/TaskCalendar'
import TaskAnalytics from '@/components/TaskAnalytics'
import AIInsights from '@/components/AIInsights'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'

type ViewMode = 'list' | 'calendar'

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { tasks, loadTasks, isLoading } = useTaskStore()
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check authentication
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    loadTasks()
    
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)
  }, [isAuthenticated, loadTasks, router])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!mounted || !isAuthenticated) {
    return null // Avoid hydration mismatch and unauthorized access
  }

  return (
    <div className="min-h-screen passionate-scroll smooth-scroll">
      {/* Hero Section with User Info */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10"></div>
        
        <div className="relative px-4 py-4 pt-8">
          <div className="mx-auto max-w-7xl">
            {/* User Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="glass-morphism rounded-2xl p-4 border border-white/20 dark:border-secondary-700/30 shadow-xl">
                  <User className="w-8 h-8 text-midnight-blue dark:text-accent-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.name}!</h1>
                  <p className="text-slate-gray dark:text-cloud-gray font-medium">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-morphism border border-white/20 dark:border-secondary-700/30 text-slate-gray dark:text-cloud-gray hover:text-error-500 dark:hover:text-error-400 hover:border-error-500/50 transition-all duration-300 button-premium shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Centered above tasks */}
      <div className="relative px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center mb-8">
            <div className="p-3 border shadow-2xl glass-morphism rounded-3xl border-white/20 dark:border-secondary-700/30 backdrop-blur-xl">
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
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-xl glass-morphism text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white button-premium focus-ring border-white/10 dark:border-secondary-700/20"
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
        <div className="mx-auto max-w-7xl">
          {viewMode === 'list' ? (
            /* List View Layout */
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 slide-in-bottom">
              {/* Task Creation Form */}
              <div className="space-y-6 xl:col-span-1">
                <div className="sticky top-8">
                  <TaskForm />
                </div>
                {/* AI Insights */}
                <AIInsights />
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
              
              {/* AI Insights */}
              <AIInsights />
              
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
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

          {/* Premium Footer */}
          <footer className="mt-20 text-center slide-in-bottom">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-midnight-blue/5 dark:via-accent-500/5 to-transparent top-1/2"></div>
              
              <div className="relative inline-flex items-center gap-3 px-8 py-4 border shadow-2xl glass-morphism rounded-2xl border-white/20 dark:border-secondary-700/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Built with</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold gradient-text">Next.js</span>
                  <span className="text-sm text-slate-gray dark:text-cloud-gray">&</span>
                  <span className="font-bold gradient-text">Premium Design</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-midnight-blue to-accent-500 animate-bounce"></div>
              </div>

              {/* Floating elements */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
