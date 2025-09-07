'use client'

import React, { useState, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Clock, Target, CheckCircle2, Circle } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'
import TaskCard from './TaskCard'

type ViewType = 'daily' | 'weekly' | 'monthly'

// Helper functions for date manipulation
const getWeekStart = (date: Date) => {
  const start = new Date(date)
  const day = start.getDay()
  const diff = start.getDate() - day
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
  return start
}

const getMonthStart = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  start.setHours(0, 0, 0, 0)
  return start
}

const getMonthEnd = (date: Date) => {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  end.setHours(23, 59, 59, 999)
  return end
}

const formatDate = (date: Date) => {
  // Use local date formatting to avoid timezone issues
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

const normalizeDate = (date: Date) => {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized
}

// Helper to parse date string while avoiding timezone issues
const parseDate = (dateString: string) => {
  // Parse date as local date to avoid timezone shifts
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export default function TaskCalendar() {
  const { tasks } = useTaskStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>('weekly')

  // Navigation functions
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    switch (viewType) {
      case 'daily':
        newDate.setDate(newDate.getDate() - 1)
        break
      case 'weekly':
        newDate.setDate(newDate.getDate() - 7)
        break
      case 'monthly':
        newDate.setMonth(newDate.getMonth() - 1)
        break
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    switch (viewType) {
      case 'daily':
        newDate.setDate(newDate.getDate() + 1)
        break
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7)
        break
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1)
        break
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Filter tasks based on the current view
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      
      // Parse the date string as local date to avoid timezone issues
      const taskDate = parseDate(task.dueDate)
      
      // Check for invalid dates
      if (isNaN(taskDate.getTime())) return false
      
      switch (viewType) {
        case 'daily':
          return isSameDay(taskDate, currentDate)
        
        case 'weekly':
          const weekStart = getWeekStart(currentDate)
          const weekEnd = new Date(weekStart)
          weekEnd.setDate(weekEnd.getDate() + 6)
          weekEnd.setHours(23, 59, 59, 999)
          return taskDate >= weekStart && taskDate <= weekEnd
        
        case 'monthly':
          const monthStart = getMonthStart(currentDate)
          const monthEnd = getMonthEnd(currentDate)
          return taskDate >= monthStart && taskDate <= monthEnd
        
        default:
          return false
      }
    })
  }, [tasks, currentDate, viewType])

  // Group tasks by date - normalize both task dates and calendar dates for comparison
  const tasksByDate = useMemo(() => {
    const grouped: { [key: string]: typeof tasks } = {}
    
    filteredTasks.forEach(task => {
      if (task.dueDate) {
        // Parse the task date and format it consistently
        const taskDate = parseDate(task.dueDate)
        const dateKey = formatDate(taskDate)
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(task)
      }
    })
    
    return grouped
  }, [filteredTasks])

  // Generate calendar days for monthly view
  const getCalendarDays = () => {
    const monthStart = getMonthStart(currentDate)
    const monthEnd = getMonthEnd(currentDate)
    const startDate = getWeekStart(monthStart)
    const endDate = new Date(monthEnd)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  // Generate week days
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentDate)
    const days = []
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(day.getDate() + i)
      days.push(day)
    }
    
    return days
  }

  const getViewTitle = () => {
    switch (viewType) {
      case 'daily':
        return currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      case 'weekly':
        const weekStart = getWeekStart(currentDate)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6)
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      case 'monthly':
        return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      default:
        return ''
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  return (
    <div className="bg-frost-white/80 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-gray/20 dark:border-secondary-700 shadow-modern dark:shadow-dark-modern">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
          <h2 className="text-2xl font-bold text-midnight-blue dark:text-frost-white">
            Task Calendar
          </h2>
        </div>

        {/* View Type Selector */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-gray/10 dark:bg-secondary-800 rounded-xl p-1">
            {(['daily', 'weekly', 'monthly'] as ViewType[]).map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  viewType === type
                    ? 'bg-midnight-blue dark:bg-accent-500 text-frost-white shadow-md'
                    : 'text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white hover:bg-frost-white/50 dark:hover:bg-secondary-700/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={navigatePrevious}
          className="flex items-center gap-2 px-4 py-2 bg-frost-white dark:bg-secondary-800/80 border border-slate-gray/30 dark:border-secondary-700 rounded-xl hover:border-midnight-blue dark:hover:border-accent-400 transition-all duration-200 text-midnight-blue dark:text-frost-white"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-midnight-blue dark:text-frost-white">
            {getViewTitle()}
          </h3>
          <button
            onClick={goToToday}
            className="text-sm text-lavender-glow dark:text-accent-400 hover:underline mt-1"
          >
            Go to Today
          </button>
        </div>

        <button
          onClick={navigateNext}
          className="flex items-center gap-2 px-4 py-2 bg-frost-white dark:bg-secondary-800/80 border border-slate-gray/30 dark:border-secondary-700 rounded-xl hover:border-midnight-blue dark:hover:border-accent-400 transition-all duration-200 text-midnight-blue dark:text-frost-white"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* No tasks message */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12 mb-6">
          <Calendar className="w-16 h-16 text-slate-gray/30 dark:text-cloud-gray/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-gray dark:text-cloud-gray mb-2">
            No scheduled tasks found
          </h3>
          <p className="text-slate-gray/80 dark:text-cloud-gray/60 mb-4">
            Tasks need due dates to appear in calendar view
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lavender-glow/10 dark:bg-accent-500/20 rounded-xl">
            <Clock className="w-4 h-4 text-lavender-glow dark:text-accent-400" />
            <span className="text-sm text-lavender-glow dark:text-accent-400">
              Add due dates to your tasks to see them here
            </span>
          </div>
        </div>
      )}

      {/* Calendar Content */}
      {filteredTasks.length > 0 && (
        <>
          {viewType === 'daily' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-midnight-blue/5 to-lavender-glow/5 dark:from-accent-500/10 dark:to-accent-300/10 rounded-xl p-4">
                <h4 className="font-semibold text-midnight-blue dark:text-frost-white mb-3">
                  Tasks for {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h4>
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewType === 'weekly' && (
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center p-2 font-semibold text-slate-gray dark:text-cloud-gray text-sm">
                  {day}
                </div>
              ))}
              {getWeekDays().map((day) => {
                const dateKey = formatDate(day)
                const dayTasks = tasksByDate[dateKey] || []
                
                return (
                  <div
                    key={dateKey}
                    className={`min-h-[120px] p-2 rounded-lg border transition-all duration-200 ${
                      isToday(day)
                        ? 'bg-midnight-blue/10 dark:bg-accent-500/20 border-midnight-blue/30 dark:border-accent-400/30'
                        : 'bg-frost-white/50 dark:bg-secondary-800/30 border-slate-gray/20 dark:border-secondary-700/50 hover:border-slate-gray/40 dark:hover:border-secondary-600'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday(day) 
                        ? 'text-midnight-blue dark:text-accent-400' 
                        : 'text-slate-gray dark:text-cloud-gray'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded text-center truncate ${
                            task.completed
                              ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300'
                              : task.priority === 'high'
                              ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300'
                              : task.priority === 'medium'
                              ? 'bg-lavender-glow/20 dark:bg-accent-500/20 text-midnight-blue dark:text-accent-300'
                              : 'bg-slate-gray/10 dark:bg-secondary-700/50 text-slate-gray dark:text-cloud-gray'
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-slate-gray dark:text-cloud-gray text-center">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {viewType === 'monthly' && (
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center p-2 font-semibold text-slate-gray dark:text-cloud-gray text-sm">
                  {day}
                </div>
              ))}
              {getCalendarDays().map((day) => {
                const dateKey = formatDate(day)
                const dayTasks = tasksByDate[dateKey] || []
                
                return (
                  <div
                    key={dateKey}
                    className={`min-h-[80px] p-1 rounded border transition-all duration-200 ${
                      isToday(day)
                        ? 'bg-midnight-blue/10 dark:bg-accent-500/20 border-midnight-blue/30 dark:border-accent-400/30'
                        : isCurrentMonth(day)
                        ? 'bg-frost-white/50 dark:bg-secondary-800/30 border-slate-gray/20 dark:border-secondary-700/50 hover:border-slate-gray/40 dark:hover:border-secondary-600'
                        : 'bg-slate-gray/5 dark:bg-secondary-900/20 border-slate-gray/10 dark:border-secondary-800/30'
                    }`}
                  >
                    <div className={`text-xs font-medium mb-1 ${
                      isToday(day) 
                        ? 'text-midnight-blue dark:text-accent-400' 
                        : isCurrentMonth(day)
                        ? 'text-slate-gray dark:text-cloud-gray'
                        : 'text-slate-gray/50 dark:text-cloud-gray/40'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-0.5">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className={`text-xs p-0.5 rounded text-center truncate ${
                            task.completed
                              ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300'
                              : task.priority === 'high'
                              ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300'
                              : task.priority === 'medium'
                              ? 'bg-lavender-glow/20 dark:bg-accent-500/20 text-midnight-blue dark:text-accent-300'
                              : 'bg-slate-gray/10 dark:bg-secondary-700/50 text-slate-gray dark:text-cloud-gray'
                          }`}
                        >
                          {task.title.substring(0, 8)}...
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-slate-gray dark:text-cloud-gray text-center">
                          +{dayTasks.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-slate-gray/20 dark:border-secondary-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Total</span>
            </div>
            <span className="text-lg font-bold text-midnight-blue dark:text-frost-white">
              {filteredTasks.length}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-success-500 dark:text-success-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Done</span>
            </div>
            <span className="text-lg font-bold text-success-600 dark:text-success-400">
              {filteredTasks.filter(t => t.completed).length}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-warning-500 dark:text-warning-400" />
              <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">Pending</span>
            </div>
            <span className="text-lg font-bold text-warning-600 dark:text-warning-400">
              {filteredTasks.filter(t => !t.completed).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
