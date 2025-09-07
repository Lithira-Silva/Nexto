'use client'

import React, { useState } from 'react'
import { Trash2, Edit3, Calendar, CheckCircle2, Circle, Sparkles, Save, X, AlertTriangle } from 'lucide-react'
import { useTaskStore, Task } from '@/store/taskStore'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  
  const { updateTask, deleteTask, toggleTask, isLoading } = useTaskStore()

  const handleSave = async () => {
    if (!editTitle.trim()) return
    
    await updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    })
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  // Modern priority configuration with new color palette
  const priorityConfig = {
    low: {
      gradient: 'from-lavender-glow/20 to-accent-400/20',
      border: 'border-lavender-glow/30',
      bg: 'bg-lavender-glow/5 dark:bg-accent-900/20',
      text: 'text-lavender-glow dark:text-accent-400',
      glowClass: 'shadow-accent-glow',
      label: 'Low Priority'
    },
    medium: {
      gradient: 'from-slate-gray/20 to-secondary-400/20',
      border: 'border-slate-gray/40',
      bg: 'bg-slate-gray/5 dark:bg-secondary-800/30',
      text: 'text-slate-gray dark:text-cloud-gray',
      glowClass: 'shadow-modern',
      label: 'Medium Priority'
    },
    high: {
      gradient: 'from-sunset-orange/20 to-warning-500/20',
      border: 'border-sunset-orange/40',
      bg: 'bg-sunset-orange/5 dark:bg-warning-900/20',
      text: 'text-sunset-orange dark:text-warning-400',
      glowClass: 'shadow-warning-glow',
      label: 'High Priority'
    },
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`
    if (diffDays > 1) return `In ${diffDays} days`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  const priority = priorityConfig[task.priority]

  // Dynamic card classes based on completion and theme
  const getCardClasses = () => {
    if (task.completed) {
      return `
        bg-frost-white/80 dark:bg-obsidian-black/60
        border-2 border-emerald-green/30 dark:border-success-400/30
        shadow-success-glow dark:shadow-success-glow
        transform scale-[0.98] opacity-90
      `
    }
    
    return `
      bg-frost-white/90 dark:bg-obsidian-black/80
      border border-slate-gray/20 dark:border-secondary-700/50
      shadow-modern dark:shadow-dark-modern
      hover:shadow-modern-lg dark:hover:shadow-dark-modern
      hover:scale-[1.02] hover:-translate-y-1
      backdrop-blur-sm
    `
  }

  return (
    <div className={`
      group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out
      ${getCardClasses()}
      animate-fade-in hover:animate-float
    `}>
      {/* Priority indicator stripe */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${priority.gradient.replace('/20', '')}`}></div>
      
      {/* Completion celebration effect */}
      {task.completed && (
        <div className="absolute inset-0 bg-success-gradient opacity-5 dark:opacity-10 pointer-events-none"></div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Modern Completion Toggle */}
          <button
            onClick={() => toggleTask(task.id)}
            disabled={isLoading}
            className="flex-shrink-0 mt-1 transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-green/50 dark:focus:ring-success-400/50 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black rounded-full"
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-green dark:text-success-400 drop-shadow-sm animate-pulse-success" />
            ) : (
              <Circle className="w-6 h-6 text-slate-gray dark:text-cloud-gray/70 hover:text-emerald-green dark:hover:text-success-400 transition-colors" />
            )}
          </button>

          {/* Content */}
          <div className="flex-grow min-w-0">
            {isEditing ? (
              <div className="space-y-4 animate-scale-up">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 text-midnight-blue dark:text-frost-white placeholder-slate-gray dark:placeholder-cloud-gray/60
                           bg-frost-white/90 dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50
                           focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-200"
                  placeholder="Task title..."
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add a description... (optional)"
                  rows={3}
                  className="w-full px-4 py-3 text-midnight-blue dark:text-frost-white placeholder-slate-gray dark:placeholder-cloud-gray/60
                           bg-frost-white/90 dark:bg-secondary-800/50 border border-slate-gray/30 dark:border-secondary-700
                           rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50
                           focus:border-midnight-blue dark:focus:border-accent-400 transition-all duration-200"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={!editTitle.trim() || isLoading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-midnight-blue hover:bg-primary-800 dark:bg-accent-gradient dark:hover:from-accent-500 dark:hover:to-accent-600
                             text-frost-white font-medium rounded-lg transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-midnight-blue/50 dark:focus:ring-accent-400/50 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black
                             disabled:opacity-50 disabled:cursor-not-allowed shadow-modern dark:shadow-accent-glow"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white
                             bg-slate-gray/10 dark:bg-secondary-800/50 hover:bg-slate-gray/20 dark:hover:bg-secondary-700/50
                             border border-slate-gray/30 dark:border-secondary-700 rounded-lg transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-slate-gray/50 dark:focus:ring-secondary-500/50 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Title */}
                <h3 className={`text-lg font-semibold mb-3 transition-all duration-200 ${
                  task.completed 
                    ? 'line-through text-slate-gray dark:text-cloud-gray/70' 
                    : 'text-midnight-blue dark:text-frost-white group-hover:text-primary-800 dark:group-hover:text-frost-white/90'
                }`}>
                  {task.title}
                </h3>
                
                {/* Description */}
                {task.description && (
                  <p className={`text-slate-gray dark:text-cloud-gray/80 mb-4 leading-relaxed transition-all duration-200 ${
                    task.completed ? 'line-through opacity-60' : 'group-hover:text-slate-gray/90 dark:group-hover:text-cloud-gray'
                  }`}>
                    {task.description}
                  </p>
                )}
                
                {/* Metadata */}
                <div className="flex items-center flex-wrap gap-3 text-sm">
                  {/* Priority Badge */}
                  <div className={`
                    flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200
                    ${priority.bg} ${priority.border} ${priority.glowClass}
                    hover:scale-105 hover:shadow-lg
                  `}>
                    <span className={`font-medium ${priority.text}`}>{priority.label}</span>
                  </div>
                  
                  {/* Due Date */}
                  {task.dueDate && (
                    <div className={`
                      flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200
                      ${isOverdue 
                        ? 'bg-sunset-orange/5 dark:bg-warning-900/20 border-sunset-orange/40 text-sunset-orange dark:text-warning-400 shadow-warning-glow' 
                        : 'bg-slate-gray/5 dark:bg-secondary-800/30 border-slate-gray/30 dark:border-secondary-700 text-slate-gray dark:text-cloud-gray'
                      }
                      hover:scale-105
                    `}>
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{formatDate(task.dueDate)}</span>
                      {isOverdue && <AlertTriangle className="w-4 h-4 animate-pulse text-sunset-orange dark:text-warning-400" />}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-2.5 text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-accent-400 
                         hover:bg-slate-gray/10 dark:hover:bg-secondary-800/50 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-slate-gray/30 dark:focus:ring-accent-400/30 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black"
                aria-label="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                disabled={isLoading}
                className="p-2.5 text-slate-gray dark:text-cloud-gray hover:text-sunset-orange dark:hover:text-warning-400
                         hover:bg-slate-gray/10 dark:hover:bg-secondary-800/50 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-sunset-orange/30 dark:focus:ring-warning-400/30 focus:ring-offset-2 dark:focus:ring-offset-obsidian-black"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Completion celebration effect */}
      {task.completed && (
        <div className="absolute top-3 right-3 pointer-events-none">
          <Sparkles className="w-5 h-5 text-emerald-green dark:text-success-400 animate-bounce-gentle" />
        </div>
      )}
      
      {/* High priority urgent indicator */}
      {task.priority === 'high' && !task.completed && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-sunset-orange dark:bg-warning-500 rounded-full animate-pulse-warning shadow-warning-glow"></div>
      )}
    </div>
  )
}
