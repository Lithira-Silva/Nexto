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

          <div className="space-y-3">
            <label className="text-sm font-semibold text-midnight-blue dark:text-frost-white">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-4 md:px-5 py-3 md:py-4 text-midnight-blue dark:text-frost-white
                       glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30
                       focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 transition-all duration-300"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
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
