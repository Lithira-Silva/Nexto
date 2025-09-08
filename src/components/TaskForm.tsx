'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Flag, Sparkles, Target, Zap, Clock, Brain, Wand2, Lightbulb, ChevronDown } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'
import { enhanceTaskWithAI, analyzeTaskWithAI, AITaskAnalysis } from '@/lib/ai'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  const [isAIMode, setIsAIMode] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<AITaskAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  
  const { addTask, isLoading } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    console.log('TaskForm: Submitting task with data:', {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      completed: false,
    })

    try {
      await addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        completed: false,
      })
      
      console.log('TaskForm: Task submitted successfully')

      // Reset form with animation
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
      setAiInput('')
      setAiAnalysis(null)
      setIsAIMode(false)
      setShowAISuggestions(false)
    } catch (error) {
      console.error('TaskForm: Error submitting task:', error)
    }
  }

  const handleAIEnhance = async () => {
    if (!aiInput.trim()) return
    
    setIsAnalyzing(true)
    try {
      // Enhance task with AI
      const enhanced = await enhanceTaskWithAI(aiInput)
      setTitle(enhanced.title)
      setPriority(enhanced.priority)
      if (enhanced.dueDate) setDueDate(enhanced.dueDate)
      if (enhanced.description) setDescription(enhanced.description)
      
      // Get AI analysis
      const analysis = await analyzeTaskWithAI(enhanced.title, enhanced.description)
      setAiAnalysis(analysis)
      setShowAISuggestions(true)
    } catch (error) {
      console.error('AI enhancement failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGetAISuggestions = async () => {
    if (!title.trim()) return
    
    setIsAnalyzing(true)
    try {
      const analysis = await analyzeTaskWithAI(title, description)
      setAiAnalysis(analysis)
      setShowAISuggestions(true)
    } catch (error) {
      console.error('AI analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applyAISuggestion = (suggestion: string) => {
    if (suggestion.includes('priority')) {
      // Apply priority suggestion
      if (aiAnalysis?.priority) {
        setPriority(aiAnalysis.priority)
      }
    }
    // Add more suggestion handlers as needed
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

      {/* AI Mode Toggle */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setIsAIMode(!isAIMode)}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
            isAIMode 
              ? 'bg-midnight-blue/10 dark:bg-accent-900/20 border-midnight-blue/30 dark:border-accent-400/30' 
              : 'glass-morphism border-white/20 dark:border-secondary-700/30 hover:border-midnight-blue/30 dark:hover:border-accent-400/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isAIMode ? 'bg-gradient-to-r from-midnight-blue to-accent-500' : 'bg-slate-gray/20 dark:bg-secondary-700/30'
            }`}>
              <Brain className={`w-4 h-4 ${isAIMode ? 'text-frost-white' : 'text-slate-gray dark:text-cloud-gray'}`} />
            </div>
            <div className="text-left">
              <h3 className={`font-semibold ${isAIMode ? 'text-midnight-blue dark:text-accent-400' : 'text-slate-gray dark:text-cloud-gray'}`}>
                Smart AI Assistant
              </h3>
              <p className="text-xs text-slate-gray/70 dark:text-cloud-gray/50">
                Natural language task creation
              </p>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
            isAIMode ? 'rotate-180 text-midnight-blue dark:text-accent-400' : 'text-slate-gray dark:text-cloud-gray'
          }`} />
        </button>

        {/* AI Input Section */}
        {isAIMode && (
          <div className="mt-4 p-4 glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-accent-500" />
                <span className="text-sm font-medium text-midnight-blue dark:text-frost-white">
                  Describe your task naturally
                </span>
              </div>
              
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g., 'Call mom tomorrow at 3pm about dinner plans' or 'Urgent: finish presentation for Monday meeting'"
                rows={3}
                className="w-full px-4 py-3 text-midnight-blue dark:text-frost-white placeholder-slate-gray/60 dark:placeholder-cloud-gray/50
                         glass-morphism rounded-xl border border-white/20 dark:border-secondary-700/30
                         focus:outline-none focus:ring-2 focus:ring-accent-500/50 dark:focus:ring-accent-400/50
                         focus:border-accent-500/50 dark:focus:border-accent-400/50 transition-all duration-300
                         backdrop-blur-sm resize-none"
              />
              
              <button
                type="button"
                onClick={handleAIEnhance}
                disabled={!aiInput.trim() || isAnalyzing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3
                         bg-gradient-to-r from-accent-500 to-lavender-glow hover:from-accent-600 hover:to-lavender-glow/90
                         text-frost-white font-medium rounded-xl transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-accent-glow/30 hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-frost-white/30 border-t-frost-white rounded-full animate-spin"></div>
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Enhance with AI
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-midnight-blue dark:text-frost-white">
              <Sparkles className="w-4 h-4" />
              Task Title
            </label>
            {!isAIMode && title.trim() && (
              <button
                type="button"
                onClick={handleGetAISuggestions}
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-accent-500 dark:text-accent-400
                         hover:text-accent-600 dark:hover:text-accent-300 transition-colors duration-200
                         glass-morphism rounded-lg border border-white/20 dark:border-secondary-700/30
                         hover:border-accent-500/30 dark:hover:border-accent-400/30"
              >
                {isAnalyzing ? (
                  <div className="w-3 h-3 border border-accent-500/30 border-t-accent-500 rounded-full animate-spin"></div>
                ) : (
                  <Brain className="w-3 h-3" />
                )}
                AI Suggestions
              </button>
            )}
          </div>
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

        {/* AI Suggestions Panel */}
        {showAISuggestions && aiAnalysis && (
          <div className="p-4 glass-morphism rounded-2xl border border-accent-500/20 dark:border-accent-400/20 animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-semibold text-midnight-blue dark:text-frost-white">AI Analysis</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 dark:bg-secondary-800/20 rounded-xl">
                <div className="text-xs text-slate-gray dark:text-cloud-gray/70 mb-1">Suggested Priority</div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    aiAnalysis.priority === 'high' ? 'bg-sunset-orange' :
                    aiAnalysis.priority === 'medium' ? 'bg-slate-gray' : 'bg-lavender-glow'
                  }`}></div>
                  <span className="text-sm font-medium text-midnight-blue dark:text-frost-white capitalize">
                    {aiAnalysis.priority}
                  </span>
                  {priority !== aiAnalysis.priority && (
                    <button
                      onClick={() => setPriority(aiAnalysis.priority)}
                      className="text-xs text-accent-500 hover:text-accent-600 transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-white/5 dark:bg-secondary-800/20 rounded-xl">
                <div className="text-xs text-slate-gray dark:text-cloud-gray/70 mb-1">Estimated Time</div>
                <div className="text-sm font-medium text-midnight-blue dark:text-frost-white">
                  {aiAnalysis.estimatedTime}
                </div>
              </div>
              
              {aiAnalysis.category && (
                <div className="p-3 bg-white/5 dark:bg-secondary-800/20 rounded-xl sm:col-span-2">
                  <div className="text-xs text-slate-gray dark:text-cloud-gray/70 mb-1">Suggested Category</div>
                  <div className="text-sm font-medium text-midnight-blue dark:text-frost-white">
                    {aiAnalysis.category}
                  </div>
                </div>
              )}
            </div>
            
            {aiAnalysis.suggestions.length > 0 && (
              <div>
                <div className="text-xs text-slate-gray dark:text-cloud-gray/70 mb-2">Smart Tips</div>
                <div className="space-y-2">
                  {aiAnalysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2 hover:bg-white/5 dark:hover:bg-secondary-800/10 rounded-lg transition-colors cursor-pointer"
                      onClick={() => applyAISuggestion(suggestion)}
                    >
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-slate-gray dark:text-cloud-gray">
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowAISuggestions(false)}
              className="w-full mt-3 py-2 text-xs text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-colors"
            >
              Hide Suggestions
            </button>
          </div>
        )}

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
