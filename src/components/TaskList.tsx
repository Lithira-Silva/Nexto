'use client'

import React, { useState, useMemo } from 'react'
import { Filter, Trash2, Search, BarChart3, Target, Clock, CheckCircle2, Circle, Sparkles, TrendingUp, AlertTriangle, Activity, Zap, AlignLeft, FileText } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'
import TaskCard from './TaskCard'

type FilterType = 'all' | 'active' | 'completed'
type SortType = 'created' | 'dueDate' | 'priority' | 'alphabetical'

export default function TaskList() {
  const { tasks, isLoading, error, clearCompleted } = useTaskStore()
  const [filter, setFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('created')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed)
        break
      case 'completed':
        filtered = filtered.filter(task => task.completed)
        break
      default:
        break
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return sorted
  }, [tasks, filter, sortBy, searchTerm])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const active = total - completed
    const overdue = tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      !task.completed
    ).length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, active, overdue, completionRate }
  }, [tasks])

  if (isLoading && tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative">
          <div className="loading-spinner w-12 h-12 mx-auto mb-6"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
        </div>
        <h3 className="text-xl font-semibold text-midnight-blue dark:text-frost-white mb-2">Loading your tasks...</h3>
        <p className="text-slate-gray dark:text-cloud-gray">We're getting everything ready for you</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-2xl p-8 max-w-md mx-auto">
          <AlertTriangle className="w-12 h-12 text-warning-500 dark:text-warning-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-warning-800 dark:text-warning-300 mb-2">System Error</h3>
          <p className="text-warning-600 dark:text-warning-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-slide-up passionate-scroll smooth-scroll">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-frost-white to-slate-gray/5 dark:from-secondary-800/50 dark:to-secondary-900/50 rounded-2xl p-6 mb-8 border border-slate-gray/20 dark:border-secondary-700 shadow-modern dark:shadow-dark-modern">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-midnight-blue dark:text-frost-white flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-midnight-blue dark:text-accent-400" />
            Your Tasks
          </h2>
          <div className="flex items-center gap-2 bg-midnight-blue/10 dark:bg-accent-500/20 rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
            <span className="text-midnight-blue dark:text-frost-white font-semibold">{stats.completionRate}% Complete</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-frost-white dark:bg-secondary-800/80 rounded-xl p-4 border border-slate-gray/20 dark:border-secondary-700">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Total</span>
            </div>
            <span className="text-2xl font-bold text-midnight-blue dark:text-frost-white">{stats.total}</span>
          </div>
          
          <div className="bg-frost-white dark:bg-secondary-800/80 rounded-xl p-4 border border-slate-gray/20 dark:border-secondary-700">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success-500 dark:text-success-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Done</span>
            </div>
            <span className="text-2xl font-bold text-success-600 dark:text-success-400">{stats.completed}</span>
          </div>
          
          <div className="bg-frost-white dark:bg-secondary-800/80 rounded-xl p-4 border border-slate-gray/20 dark:border-secondary-700">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-lavender-glow dark:text-accent-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Active</span>
            </div>
            <span className="text-2xl font-bold text-lavender-glow dark:text-accent-400">{stats.active}</span>
          </div>
          
          <div className="bg-frost-white dark:bg-secondary-800/80 rounded-xl p-4 border border-slate-gray/20 dark:border-secondary-700">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-warning-500 dark:text-warning-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Overdue</span>
            </div>
            <span className="text-2xl font-bold text-warning-600 dark:text-warning-400">{stats.overdue}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-frost-white/80 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-gray/20 dark:border-secondary-700 shadow-modern dark:shadow-dark-modern">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray dark:text-cloud-gray/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-frost-white dark:bg-secondary-800/80 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-200 placeholder-slate-gray dark:placeholder-cloud-gray/60 text-midnight-blue dark:text-frost-white"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-3 bg-frost-white dark:bg-secondary-800/80 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 cursor-pointer hover:border-midnight-blue dark:hover:border-accent-400 transition-all duration-200 text-midnight-blue dark:text-frost-white"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-4 py-3 bg-frost-white dark:bg-secondary-800/80 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 cursor-pointer hover:border-midnight-blue dark:hover:border-accent-400 transition-all duration-200 text-midnight-blue dark:text-frost-white"
            >
              <option value="created">Recent First</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">A to Z</option>
            </select>

            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="flex items-center gap-2 px-4 py-3 bg-warning-50 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-xl hover:bg-warning-100 dark:hover:bg-warning-900/50 transition-all duration-200 border border-warning-200 dark:border-warning-800 hover:border-warning-300 dark:hover:border-warning-700 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear Done
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative inline-block mb-6">
              <Circle className="w-20 h-20 text-slate-gray/30 dark:text-cloud-gray/20 mx-auto animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/20 to-lavender-glow/20 dark:from-accent-500/20 dark:to-accent-300/20 rounded-full blur-xl opacity-30 animate-float"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-gray dark:text-cloud-gray mb-3">
              {searchTerm.trim() ? 'No matches found' : 
               filter === 'completed' ? 'No completed tasks yet' : 
               filter === 'active' ? 'No active tasks' : 
               'Ready to get started?'}
            </h3>
            
            <p className="text-slate-gray/80 dark:text-cloud-gray/60 mb-6 max-w-md mx-auto">
              {searchTerm.trim() 
                ? 'Try adjusting your search terms or filters'
                : filter === 'all' 
                  ? 'Create your first task above to begin your productivity journey!'
                  : `Switch to see ${filter === 'completed' ? 'active' : 'completed'} tasks, or create a new one`
              }
            </p>

            {!searchTerm.trim() && filter === 'all' && (
              <div className="flex items-center justify-center gap-2 text-sm text-midnight-blue dark:text-accent-400">
                <FileText className="w-4 h-4" />
                <span>Use the form above to add your first task</span>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Task count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-gray dark:text-cloud-gray">
                Showing <span className="font-semibold text-midnight-blue dark:text-accent-400">{filteredAndSortedTasks.length}</span> of <span className="font-semibold">{tasks.length}</span> tasks
              </p>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {filteredAndSortedTasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-slide-up"
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}