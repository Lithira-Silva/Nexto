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

    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

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
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < new Date()
    ).length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, active, overdue, completionRate }
  }, [tasks])

  if (isLoading && tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="loading-spinner w-12 h-12 mx-auto mb-6"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-midnight-blue dark:text-frost-white mb-2">Loading your tasks...</h3>
          <p className="text-slate-gray dark:text-cloud-gray">We are getting everything ready for you</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-2xl p-8 max-w-md">
          <AlertTriangle className="w-12 h-12 text-warning-500 dark:text-warning-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-warning-800 dark:text-warning-300 mb-2">System Error</h3>
          <p className="text-warning-600 dark:text-warning-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white/50 dark:bg-secondary-900/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-secondary-700/30">
      
      <div className="flex-shrink-0 p-6 border-b border-white/20 dark:border-secondary-700/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-frost-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
            Your Tasks
          </h2>
          <div className="flex items-center gap-2 bg-midnight-blue/10 dark:bg-accent-500/20 rounded-full px-3 py-1">
            <TrendingUp className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
            <span className="text-sm text-midnight-blue dark:text-frost-white font-semibold">{stats.completionRate}% Complete</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Total</span>
            </div>
            <span className="text-lg font-bold text-midnight-blue dark:text-frost-white">{stats.total}</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-success-500 dark:text-success-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Active</span>
            </div>
            <span className="text-lg font-bold text-success-600 dark:text-success-400">{stats.active}</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Done</span>
            </div>
            <span className="text-lg font-bold text-accent-600 dark:text-accent-400">{stats.completed}</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-error-500 dark:text-error-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Overdue</span>
            </div>
            <span className="text-lg font-bold text-error-600 dark:text-error-400">{stats.overdue}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-b border-white/10 dark:border-secondary-700/20">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-gray/50 dark:text-cloud-gray/50" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-frost-white/80 dark:bg-secondary-800/50 border border-slate-gray/20 dark:border-secondary-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight-blue/20 dark:focus:ring-accent-500/20 focus:border-midnight-blue dark:focus:border-accent-500 text-midnight-blue dark:text-frost-white placeholder-slate-gray/50 dark:placeholder-cloud-gray/50 transition-all duration-300 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="appearance-none bg-frost-white/80 dark:bg-secondary-800/50 border border-slate-gray/20 dark:border-secondary-700/50 rounded-lg px-3 py-2.5 pr-8 text-midnight-blue dark:text-frost-white focus:outline-none focus:ring-2 focus:ring-midnight-blue/20 dark:focus:ring-accent-500/20 focus:border-midnight-blue dark:focus:border-accent-500 transition-all duration-300 text-sm"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Done</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-gray/50 dark:text-cloud-gray/50 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="appearance-none bg-frost-white/80 dark:bg-secondary-800/50 border border-slate-gray/20 dark:border-secondary-700/50 rounded-lg px-3 py-2.5 pr-8 text-midnight-blue dark:text-frost-white focus:outline-none focus:ring-2 focus:ring-midnight-blue/20 dark:focus:ring-accent-500/20 focus:border-midnight-blue dark:focus:border-accent-500 transition-all duration-300 text-sm"
              >
                <option value="created">Recent</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="alphabetical">A-Z</option>
              </select>
              <AlignLeft className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-gray/50 dark:text-cloud-gray/50 pointer-events-none" />
            </div>

            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-error-500/10 dark:bg-error-500/20 text-error-600 dark:text-error-400 rounded-lg hover:bg-error-500/20 dark:hover:bg-error-500/30 transition-all duration-300 border border-error-500/20 dark:border-error-500/30 text-sm"
              >
                <Trash2 className="w-3 h-3" />
                <span className="font-medium">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md">
              <div className="relative inline-block mb-6">
                <Circle className="w-16 h-16 text-slate-gray/30 dark:text-cloud-gray/20 mx-auto animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/20 to-lavender-glow/20 dark:from-accent-500/20 dark:to-accent-300/20 rounded-full blur-xl opacity-30"></div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-gray dark:text-cloud-gray mb-3">
                {searchTerm.trim() ? 'No matches found' : 
                 filter === 'completed' ? 'No completed tasks yet' : 
                 filter === 'active' ? 'No active tasks' : 
                 'Ready to get started?'}
              </h3>
              
              <p className="text-slate-gray/80 dark:text-cloud-gray/60 mb-6 text-sm">
                {searchTerm.trim() 
                  ? 'Try adjusting your search terms or filters'
                  : filter === 'all' 
                    ? 'Create your first task to begin your productivity journey!'
                    : `Switch to see ${filter === 'completed' ? 'active' : 'completed'} tasks, or create a new one`
                }
              </p>

              {!searchTerm.trim() && filter === 'all' && (
                <div className="flex items-center justify-center gap-2 text-sm text-midnight-blue dark:text-accent-400">
                  <FileText className="w-4 h-4" />
                  <span>Use the form in the left sidebar to add your first task</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-gray dark:text-cloud-gray text-sm">
                Showing <span className="font-semibold text-midnight-blue dark:text-accent-400">{filteredAndSortedTasks.length}</span> of <span className="font-semibold">{tasks.length}</span> tasks
              </p>
            </div>

            <div className="space-y-3">
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
          </div>
        )}
      </div>
    </div>
  )
}