'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Flag, Sparkles, Target, Zap, Clock, AlertTriangle, CheckCircle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  
  const { addTask, isLoading } = useTaskStore()

  // Modern priority configuration with enhanced visual design
  const priorityConfig = {
    low: {
      label: 'Low Priority',
      description: 'Nice to have, flexible timing',
      gradient: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-700/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      icon: <ArrowDown className="w-5 h-5" />,
      ring: 'ring-emerald-200 dark:ring-emerald-700/50'
    },
    medium: {
      label: 'Medium Priority', 
      description: 'Important, reasonable timeline',
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-700/50',
      text: 'text-blue-700 dark:text-blue-300',
      icon: <ArrowRight className="w-5 h-5" />,
      ring: 'ring-blue-200 dark:ring-blue-700/50'
    },
    high: {
      label: 'High Priority',
      description: 'Urgent, needs immediate attention',
      gradient: 'from-red-500 to-orange-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-700/50',
      text: 'text-red-700 dark:text-red-300',
      icon: <ArrowUp className="w-5 h-5" />,
      ring: 'ring-red-200 dark:ring-red-700/50'
    },
  }

  const currentPriority = priorityConfig[priority]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        completed: false,
      })
      
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
    } catch (error) {
      console.error('TaskForm: Error submitting task:', error)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-morphism rounded-3xl p-6 md:p-8 border border-white/20 dark:border-secondary-700/30 shadow-2xl backdrop-blur-xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-midnight-blue via-accent-500 to-lavender-glow flex items-center justify-center">
              <Plus className="w-5 h-5 md:w-6 md:h-6 text-frost-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold gradient-text">Create New Task</h2>
              <p className="text-sm text-slate-gray dark:text-cloud-gray/70">Add a new task to your productivity journey</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 md:px-5 py-3 md:py-4 text-midnight-blue dark:text-frost-white placeholder-slate-gray/60 
                       glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                       focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Flag className="w-4 h-4" />
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-4 md:px-5 py-3 md:py-4 text-midnight-blue dark:text-frost-white placeholder-slate-gray/60
                       glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                       focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 transition-all duration-300 resize-none"
            />
          </div>

          {/* Modern Priority Selection */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Target className="w-4 h-4" />
              Task Priority
            </label>
            <p className="text-xs text-slate-gray dark:text-cloud-gray/70 ml-6">
              Choose the urgency level for this task
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPriority(key as any)}
                  className={`
                    group relative p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    ${priority === key
                      ? `${config.bg} ${config.border} shadow-xl ring-4 ${config.ring} scale-[1.02]`
                      : 'glass-morphism border-white/10 dark:border-secondary-700/20 hover:border-white/30 dark:hover:border-secondary-600/40'
                    }
                  `}
                >
                  {/* Priority Icon & Gradient Background */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.gradient} shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-bold text-sm ${priority === key ? config.text : 'text-midnight-blue dark:text-frost-white'}`}>
                        {config.label}
                      </h3>
                      <p className={`text-xs ${priority === key ? config.text + '/80' : 'text-slate-gray dark:text-cloud-gray/70'}`}>
                        {config.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Priority Level Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(key === 'high' ? 3 : key === 'medium' ? 2 : 1)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            priority === key
                              ? `bg-gradient-to-r ${config.gradient}`
                              : 'bg-slate-gray/30 dark:bg-secondary-600/30'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Selection Checkmark */}
                    {priority === key && (
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg animate-scale-in`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </button>
              ))}
            </div>
            
            {/* Priority Quick Info */}
            <div className={`p-3 rounded-xl ${currentPriority.bg} ${currentPriority.border} border transition-all duration-300`}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${currentPriority.gradient} flex items-center justify-center text-white`}>
                  {currentPriority.icon}
                </div>
                <span className={`text-sm font-medium ${currentPriority.text}`}>
                  Selected: {currentPriority.label}
                </span>
                <span className={`text-xs ${currentPriority.text}/70`}>
                  • {currentPriority.description}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Calendar className="w-4 h-4" />
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 md:px-5 py-3 md:py-4 text-midnight-blue dark:text-frost-white
                       glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                       focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={!title.trim() || isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 
                     bg-gradient-to-r from-midnight-blue via-accent-500 to-lavender-glow
                     hover:from-midnight-blue/90 hover:via-accent-600 hover:to-lavender-glow/90
                     text-frost-white font-bold rounded-2xl transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-2xl hover:shadow-glow hover:scale-105 transform active:scale-95"
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
        </form>
      </div>
    </div>
  )
}
