'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Flag, Sparkles } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  
  const { addTask, isLoading } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      completed: false,
    })

    // Reset form with animation
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
  }

  const priorityConfig = {
    low: {
      label: 'Low Priority',
      gradient: 'from-lavender-glow to-accent-400'
    },
    medium: {
      label: 'Medium Priority',
      gradient: 'from-slate-gray to-secondary-500'
    },
    high: {
      label: 'High Priority',
      gradient: 'from-sunset-orange to-warning-500'
    },
  }

  const currentPriority = priorityConfig[priority]

  return (
    <div className="bg-frost-white/90 dark:bg-obsidian-black/80 backdrop-blur-sm border border-slate-gray/20 dark:border-secondary-700/50 rounded-2xl p-8 shadow-modern dark:shadow-dark-modern animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentPriority.gradient} rounded-xl blur opacity-30`}></div>
            <div className="relative bg-frost-white dark:bg-obsidian-black/90 rounded-xl p-3 shadow-modern dark:shadow-dark-modern">
              <Plus className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-midnight-blue dark:text-frost-white font-space">Create New Task</h2>
            <p className="text-slate-gray dark:text-cloud-gray/80 text-sm">Add a new task to boost your productivity</p>
          </div>
        </div>

        {/* Main input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-midnight-blue dark:text-frost-white block">Task Title *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="What amazing thing will you accomplish?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-frost-white dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-300 focus:scale-[1.02] focus:shadow-modern-lg dark:focus:shadow-accent-glow text-midnight-blue dark:text-frost-white placeholder-slate-gray dark:placeholder-cloud-gray/60 text-lg pr-12"
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-5 h-5 text-slate-gray/40 dark:text-cloud-gray/40" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-midnight-blue dark:text-frost-white block">Description</label>
          <textarea
            placeholder="Add more details about your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-frost-white dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-300 focus:scale-[1.02] focus:shadow-modern-lg dark:focus:shadow-accent-glow resize-none text-midnight-blue dark:text-frost-white placeholder-slate-gray dark:placeholder-cloud-gray/60"
            disabled={isLoading}
          />
        </div>

        {/* Priority and Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Selector */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Flag className="w-4 h-4" />
              Priority Level
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className={`w-full px-4 py-3 pr-8 bg-frost-white dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-300 focus:scale-[1.02] appearance-none cursor-pointer text-midnight-blue dark:text-frost-white`}
                disabled={isLoading}
              >
                <option value="low">Low Priority - When you have time</option>
                <option value="medium">Medium Priority - Important</option>
                <option value="high">High Priority - Urgent</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-gray dark:text-cloud-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Calendar className="w-4 h-4" />
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-frost-white dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-300 focus:scale-[1.02] focus:shadow-modern-lg dark:focus:shadow-accent-glow text-midnight-blue dark:text-frost-white"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="w-full bg-gradient-to-r from-midnight-blue to-midnight-blue/90 hover:from-midnight-blue/90 hover:to-midnight-blue/80 dark:from-accent-600 dark:to-accent-700 dark:hover:from-accent-500 dark:hover:to-accent-600 text-frost-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-modern-xl dark:hover:shadow-accent-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner w-5 h-5"></div>
              <span>Creating your task...</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              <span>Create Task</span>
              <div className="w-2 h-2 bg-frost-white/30 rounded-full group-hover:scale-150 transition-transform"></div>
            </>
          )}
        </button>

        {/* Quick tips */}
        <div className="bg-gradient-to-r from-frost-white to-slate-gray/5 dark:from-secondary-800/30 dark:to-secondary-900/30 rounded-xl p-4 border border-slate-gray/20 dark:border-secondary-700">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-midnight-blue dark:text-accent-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-midnight-blue dark:text-frost-white mb-1">Pro Tips:</h4>
              <ul className="text-xs text-slate-gray dark:text-cloud-gray space-y-1">
                <li>• Use descriptive titles to make tasks clear</li>
                <li>• Set due dates to stay on track</li>
                <li>• Choose the right priority level for better focus</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
