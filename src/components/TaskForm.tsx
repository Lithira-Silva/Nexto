'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Flag, Sparkles, Target, Zap, Clock } from 'lucide-react'
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
      gradient: 'from-lavender-glow to-accent-400',
      bg: 'bg-lavender-glow/10 dark:bg-accent-900/20',
      border: 'border-lavender-glow/30 dark:border-accent-400/30',
      text: 'text-lavender-glow dark:text-accent-400',
      icon: <Target className="w-4 h-4" />
    },
    medium: {
      label: 'Medium Priority',
      gradient: 'from-slate-gray to-secondary-500',
      bg: 'bg-slate-gray/10 dark:bg-secondary-800/30',
      border: 'border-slate-gray/30 dark:border-secondary-600/30',
      text: 'text-slate-gray dark:text-cloud-gray',
      icon: <Clock className="w-4 h-4" />
    },
    high: {
      label: 'High Priority',
      gradient: 'from-sunset-orange to-warning-500',
      bg: 'bg-sunset-orange/10 dark:bg-warning-900/20',
      border: 'border-sunset-orange/30 dark:border-warning-400/30',
      text: 'text-sunset-orange dark:text-warning-400',
      icon: <Zap className="w-4 h-4" />
    },
  }

  const currentPriority = priorityConfig[priority]

  return (
    <div className="glass-morphism rounded-3xl p-8 border border-white/20 dark:border-secondary-700/30 shadow-2xl backdrop-blur-xl animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-midnight-blue via-accent-500 to-lavender-glow morph-shape flex items-center justify-center shadow-glow">
            <Plus className="w-6 h-6 text-frost-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">Create Task</h2>
            <p className="text-sm text-slate-gray dark:text-cloud-gray/70 font-medium">Add a new task to your workflow</p>
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-midnight-blue/20 dark:via-accent-500/20 to-transparent"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
            <Sparkles className="w-4 h-4" />
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-5 py-4 text-midnight-blue dark:text-frost-white placeholder-slate-gray/60 dark:placeholder-cloud-gray/50
                     glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                     focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50
                     focus:border-midnight-blue/50 dark:focus:border-accent-400/50 transition-all duration-300
                     backdrop-blur-sm shadow-modern dark:shadow-dark-modern
                     hover:shadow-modern-lg dark:hover:shadow-accent-glow/20"
            required
          />
        </div>

        {/* Task Description */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
            <Flag className="w-4 h-4" />
            Description
            <span className="text-xs text-slate-gray dark:text-cloud-gray/60 font-normal">(Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
            rows={4}
            className="w-full px-5 py-4 text-midnight-blue dark:text-frost-white placeholder-slate-gray/60 dark:placeholder-cloud-gray/50
                     glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                     focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50
                     focus:border-midnight-blue/50 dark:focus:border-accent-400/50 transition-all duration-300
                     backdrop-blur-sm shadow-modern dark:shadow-dark-modern resize-none
                     hover:shadow-modern-lg dark:hover:shadow-accent-glow/20"
          />
        </div>

        {/* Priority Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
            {currentPriority.icon}
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(priorityConfig).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPriority(key as any)}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all duration-300 button-premium
                  ${priority === key
                    ? `${config.bg} ${config.border} shadow-glow scale-105 ring-2 ring-white/20 dark:ring-secondary-700/30`
                    : 'glass-morphism border-white/10 dark:border-secondary-700/20 hover:border-white/30 dark:hover:border-secondary-600/40 hover:scale-102'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${config.bg}`}>
                    {config.icon}
                  </div>
                  <span className={`text-xs font-semibold ${priority === key ? config.text : 'text-slate-gray dark:text-cloud-gray'}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
                
                {/* Selection indicator */}
                {priority === key && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-midnight-blue to-accent-500 rounded-full animate-pulse-glow"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
            <Calendar className="w-4 h-4" />
            Due Date
            <span className="text-xs text-slate-gray dark:text-cloud-gray/60 font-normal">(Optional)</span>
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-5 py-4 text-midnight-blue dark:text-frost-white
                     glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                     focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50
                     focus:border-midnight-blue/50 dark:focus:border-accent-400/50 transition-all duration-300
                     backdrop-blur-sm shadow-modern dark:shadow-dark-modern
                     hover:shadow-modern-lg dark:hover:shadow-accent-glow/20
                     [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 
                   bg-gradient-to-r from-midnight-blue via-accent-500 to-lavender-glow
                   hover:from-midnight-blue/90 hover:via-accent-600 hover:to-lavender-glow/90
                   text-frost-white font-bold rounded-2xl transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   shadow-2xl hover:shadow-glow hover:scale-105 button-premium
                   transform active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-frost-white/30 border-t-frost-white rounded-full animate-spin"></div>
              Creating Task...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Create Task
              <Sparkles className="w-4 h-4 animate-pulse" />
            </>
          )}
        </button>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-white/10 dark:border-secondary-700/30">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-gray dark:text-cloud-gray/70">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span>Ready to create</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>Stay focused</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Achieve more</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
