'use client'

import React from 'react'
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'

export default function TaskAnalytics() {
  const { tasks } = useTaskStore()

  // Calculate analytics
  const analytics = React.useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const pending = total - completed

    // Tasks due today
    const dueToday = tasks.filter(task => {
      if (!task.dueDate) return false
      const dueDate = new Date(task.dueDate)
      return dueDate >= today && dueDate < tomorrow && !task.completed
    }).length

    // Tasks due this week
    const dueThisWeek = tasks.filter(task => {
      if (!task.dueDate) return false
      const dueDate = new Date(task.dueDate)
      return dueDate >= today && dueDate < nextWeek && !task.completed
    }).length

    // Overdue tasks
    const overdue = tasks.filter(task => {
      if (!task.dueDate) return false
      const dueDate = new Date(task.dueDate)
      return dueDate < today && !task.completed
    }).length

    // Priority breakdown
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length
    const mediumPriority = tasks.filter(task => task.priority === 'medium' && !task.completed).length
    const lowPriority = tasks.filter(task => task.priority === 'low' && !task.completed).length

    // Completion rate
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      completed,
      pending,
      dueToday,
      dueThisWeek,
      overdue,
      highPriority,
      mediumPriority,
      lowPriority,
      completionRate
    }
  }, [tasks])

  return (
    <div className="bg-frost-white/80 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-gray/20 dark:border-secondary-700 shadow-modern dark:shadow-dark-modern mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
        <h3 className="text-xl font-bold text-midnight-blue dark:text-frost-white">Task Analytics</h3>
        <div className="ml-auto flex items-center gap-2 bg-midnight-blue/10 dark:bg-accent-500/20 rounded-full px-3 py-1">
          <TrendingUp className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
          <span className="text-sm font-semibold text-midnight-blue dark:text-accent-400">
            {analytics.completionRate}% Complete
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Tasks */}
        <div className="bg-gradient-to-br from-midnight-blue/10 to-midnight-blue/5 dark:from-accent-500/20 dark:to-accent-500/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Total</span>
          </div>
          <span className="text-2xl font-bold text-midnight-blue dark:text-frost-white">{analytics.total}</span>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-success-500/10 to-success-500/5 dark:from-success-400/20 dark:to-success-400/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-success-600 dark:text-success-400" />
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Done</span>
          </div>
          <span className="text-2xl font-bold text-success-600 dark:text-success-400">{analytics.completed}</span>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-lavender-glow/10 to-lavender-glow/5 dark:from-accent-400/20 dark:to-accent-400/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-lavender-glow dark:text-accent-400" />
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Pending</span>
          </div>
          <span className="text-2xl font-bold text-lavender-glow dark:text-accent-400">{analytics.pending}</span>
        </div>

        {/* Overdue */}
        <div className="bg-gradient-to-br from-warning-500/10 to-warning-500/5 dark:from-warning-400/20 dark:to-warning-400/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning-600 dark:text-warning-400" />
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Overdue</span>
          </div>
          <span className="text-2xl font-bold text-warning-600 dark:text-warning-400">{analytics.overdue}</span>
        </div>
      </div>

      {/* Due Today/This Week */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-sunset-orange/10 to-sunset-orange/5 dark:from-warning-400/20 dark:to-warning-400/10 rounded-xl p-4">
          <h4 className="font-semibold text-midnight-blue dark:text-frost-white mb-2">Due Today</h4>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-sunset-orange dark:text-warning-400">{analytics.dueToday}</span>
            <span className="text-sm text-slate-gray dark:text-cloud-gray">tasks</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-green/10 to-emerald-green/5 dark:from-success-400/20 dark:to-success-400/10 rounded-xl p-4">
          <h4 className="font-semibold text-midnight-blue dark:text-frost-white mb-2">Due This Week</h4>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-emerald-green dark:text-success-400">{analytics.dueThisWeek}</span>
            <span className="text-sm text-slate-gray dark:text-cloud-gray">tasks</span>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-gradient-to-r from-slate-gray/5 to-slate-gray/2 dark:from-secondary-700/30 dark:to-secondary-700/10 rounded-xl p-4">
        <h4 className="font-semibold text-midnight-blue dark:text-frost-white mb-4">Priority Breakdown (Pending)</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 dark:from-warning-400 dark:to-warning-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">{analytics.highPriority}</span>
            </div>
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">High</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-lavender-glow to-accent-500 dark:from-accent-400 dark:to-accent-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">{analytics.mediumPriority}</span>
            </div>
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Medium</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-green to-success-500 dark:from-success-400 dark:to-success-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">{analytics.lowPriority}</span>
            </div>
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Low</span>
          </div>
        </div>
      </div>
    </div>
  )
}
