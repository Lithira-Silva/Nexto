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
    
    // Default to light theme
    setIsDarkMode(false)
    document.documentElement.classList.remove('dark')
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
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10">
      
      {/* Header - Fixed at top */}
      <header className="flex-shrink-0 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl border-b border-white/20 dark:border-secondary-700/30 shadow-lg">
        <div className="px-4 py-4">
          <div className="mx-auto max-w-none">
            <div className="flex items-center justify-between">
              
              {/* User Info - Left */}
              <div className="flex items-center gap-3">
                <div className="glass-morphism rounded-xl p-3 border border-white/20 dark:border-secondary-700/30">
                  <User className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Welcome, {user?.name}!</h1>
                  <p className="text-sm text-slate-gray dark:text-cloud-gray">{user?.email}</p>
                </div>
              </div>

              {/* Navigation Controls - Center */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-white/10 dark:bg-secondary-800/30 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                      ${viewMode === 'list'
                        ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-lg'
                        : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30'
                      }
                    `}
                  >
                    <List className="w-4 h-4" />
                    <span className="text-sm font-semibold">List</span>
                  </button>
                  
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                      ${viewMode === 'calendar'
                        ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-lg'
                        : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30'
                      }
                    `}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">Calendar</span>
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-lg glass-morphism text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white border-white/10 dark:border-secondary-700/20"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* Logout - Right */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-morphism border border-white/20 dark:border-secondary-700/30 text-slate-gray dark:text-cloud-gray hover:text-error-500 dark:hover:text-error-400 hover:border-error-500/50 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Fills remaining space */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-4 py-4">
          {viewMode === 'list' ? (
            /* List View - 3 Column Layout */
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Sidebar - Task Form & AI Insights */}
              <div className="lg:col-span-3 xl:col-span-3 space-y-4 overflow-y-auto">
                <div className="space-y-4">
                  <TaskForm />
                  <AIInsights />
                </div>
              </div>

              {/* Main Content - Task List */}
              <div className="lg:col-span-9 xl:col-span-9 overflow-hidden">
                <div className="h-full">
                  <TaskList />
                </div>
              </div>
            </div>
          ) : (
            /* Calendar View - Full Width Layout */
            <div className="h-full flex flex-col space-y-4">
              
              {/* Top Section - Analytics */}
              <div className="flex-shrink-0">
                <TaskAnalytics />
              </div>
              
              {/* Main Section - Calendar + Sidebar */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
                
                {/* Left Sidebar - Task Form & AI */}
                <div className="lg:col-span-3 space-y-4 overflow-y-auto">
                  <TaskForm />
                  <AIInsights />
                </div>

                {/* Main Calendar */}
                <div className="lg:col-span-9 overflow-hidden">
                  <div className="h-full">
                    <TaskCalendar />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
