'use client'

import { useState, useEffect } from 'react'
import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import Header from '@/components/Header'
import ThemeToggle from '@/components/ThemeToggle'
import { useTaskStore } from '@/store/taskStore'

export default function Home() {
  const { tasks, loadTasks, isLoading } = useTaskStore()
  const [mounted, setMounted] = useState(false)

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
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Header />
        
        {/* Main Content Grid */}
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
