'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, List, Moon, Sun, LogOut, User, Trophy, Plus, CheckSquare } from 'lucide-react'
import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import TaskCalendar from '@/components/TaskCalendar'
import TaskAnalytics from '@/components/TaskAnalytics'
import GoalsAchievements from '@/components/GoalsAchievements'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'

type ViewMode = 'list' | 'calendar'
type ActiveTab = 'add' | 'tasks' | 'goals'

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { tasks, loadTasks, isLoading } = useTaskStore()
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [activeTab, setActiveTab] = useState<ActiveTab>('add')
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
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10">
      
      {/* Left Navigation Sidebar */}
      <div className="flex-shrink-0 w-20 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl border-r border-white/20 dark:border-secondary-700/30 shadow-lg">
        <div className="h-full flex flex-col py-4">
          
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'N'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-col space-y-3 px-3">
            {/* Add Task Tab */}
            <button
              onClick={() => setActiveTab('add')}
              className={`
                group relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 
                ${activeTab === 'add'
                  ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-lg scale-105'
                  : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105'
                }
              `}
              title="Add Task"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Add</span>
              
              {/* Active indicator */}
              {activeTab === 'add' && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-midnight-blue dark:bg-accent-400 rounded-full"></div>
              )}
            </button>

            {/* Tasks Tab */}
            <button
              onClick={() => setActiveTab('tasks')}
              className={`
                group relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 
                ${activeTab === 'tasks'
                  ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-lg scale-105'
                  : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105'
                }
              `}
              title="View Tasks"
            >
              <CheckSquare className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Tasks</span>
              
              {/* Active indicator */}
              {activeTab === 'tasks' && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-midnight-blue dark:bg-accent-400 rounded-full"></div>
              )}
            </button>

            {/* Goals/Achievements Tab */}
            <button
              onClick={() => setActiveTab('goals')}
              className={`
                group relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 
                ${activeTab === 'goals'
                  ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-lg scale-105'
                  : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105'
                }
              `}
              title="Goals & Achievements"
            >
              <Trophy className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Goals</span>
              
              {/* Active indicator */}
              {activeTab === 'goals' && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-midnight-blue dark:bg-accent-400 rounded-full"></div>
              )}
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex-1 flex flex-col justify-end space-y-3 px-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile */}
            <button
              className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105"
              title={`Logged in as ${user?.name}`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 text-slate-gray dark:text-cloud-gray hover:text-error-500 dark:hover:text-error-400 hover:bg-white/20 dark:hover:bg-secondary-700/30 hover:scale-105"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Only show for tasks tab */}
        {activeTab === 'tasks' && (
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

                  {/* Navigation Controls - Right */}
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
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full px-4 py-4">
            {activeTab === 'add' ? (
              // Add Task Content - Only the task form
              <div className="h-full flex items-start justify-center py-8 overflow-y-auto">
                <div className="w-full max-w-3xl px-4">
                  <TaskForm />
                </div>
              </div>
            ) : activeTab === 'tasks' ? (
              // Tasks Content - Display all tasks with dates and calendar
              viewMode === 'list' ? (
                /* List View - Full Width Task List */
                <div className="h-full">
                  <TaskList />
                </div>
              ) : (
                /* Calendar View - Full Width Layout */
                <div className="h-full flex flex-col space-y-4">
                  
                  {/* Top Section - Analytics */}
                  <div className="flex-shrink-0">
                    <TaskAnalytics />
                  </div>
                  
                  {/* Main Section - Calendar */}
                  <div className="flex-1 overflow-hidden">
                    <div className="h-full">
                      <TaskCalendar />
                    </div>
                  </div>
                </div>
              )
            ) : (
              // Goals & Achievements Content
              <div className="h-full">
                <GoalsAchievements />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
