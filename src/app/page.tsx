'use client'

import { useState, useEffect } from 'react'
import { List, Calendar } from 'lucide-react'
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

  useEffect(() => {
    setMounted(true)
    loadTasks()
  }, [loadTasks])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen px-4 py-8 passionate-scroll smooth-scroll">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Header />
        
        {/* View Mode Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-frost-white/80 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-2 border border-slate-gray/20 dark:border-secondary-700 shadow-modern dark:shadow-dark-modern">
              <div className="flex">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-md transform scale-105'
                      : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-frost-white/50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  <List className="w-5 h-5" />
                  List View
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    viewMode === 'calendar'
                      ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-md transform scale-105'
                      : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-frost-white/50 dark:hover:bg-secondary-700/50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Calendar View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'list' ? (
          /* List View Layout */
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
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
          <div className="space-y-6">
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

        {/* Modern Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-frost-white/80 dark:bg-obsidian-black/80 backdrop-blur-sm rounded-full 
                        border border-slate-gray/20 dark:border-secondary-700/50 shadow-modern dark:shadow-dark-modern">
            <span className="text-slate-gray dark:text-cloud-gray text-sm">Built with Next.js & Modern Design</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
