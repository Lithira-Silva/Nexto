'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Lightbulb, TrendingUp, Clock, Target, Sparkles, ChevronRight, RefreshCw } from 'lucide-react'
import { generateAIInsights, AIInsight } from '@/lib/ai'
import { useTaskStore } from '@/store/taskStore'

export default function AIInsights() {
  const { tasks } = useTaskStore()
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const loadInsights = async () => {
    setIsLoading(true)
    try {
      const newInsights = await generateAIInsights(tasks)
      setInsights(newInsights)
    } catch (error) {
      console.error('Failed to generate AI insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadInsightsEffect = async () => {
      setIsLoading(true)
      try {
        const newInsights = await generateAIInsights(tasks)
        setInsights(newInsights)
      } catch (error) {
        console.error('Failed to generate AI insights:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInsightsEffect()
  }, [tasks])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'productivity': return <TrendingUp className="w-5 h-5" />
      case 'scheduling': return <Clock className="w-5 h-5" />
      case 'focus': return <Target className="w-5 h-5" />
      case 'completion': return <Sparkles className="w-5 h-5" />
      default: return <Lightbulb className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'productivity': return 'from-emerald-green to-success-500'
      case 'scheduling': return 'from-accent-500 to-lavender-glow'
      case 'focus': return 'from-sunset-orange to-warning-500'
      case 'completion': return 'from-midnight-blue to-accent-500'
      default: return 'from-slate-gray to-secondary-500'
    }
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-white/20 dark:border-secondary-700/30 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-midnight-blue to-accent-500 flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-frost-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-midnight-blue dark:text-frost-white">AI Insights</h3>
            <p className="text-sm text-slate-gray dark:text-cloud-gray/80">Smart productivity analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadInsights}
            disabled={isLoading}
            className="w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
            aria-label="Refresh insights"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-all duration-300 hover:scale-105"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-accent-500 animate-pulse" />
            <span className="text-slate-gray dark:text-cloud-gray">Analyzing your tasks...</span>
          </div>
        </div>
      )}

      {/* Insights */}
      {!isLoading && insights.length > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-gray dark:text-cloud-gray">
              {insights.length} insight{insights.length > 1 ? 's' : ''} generated
            </span>
          </div>

          {/* Insight Cards */}
          <div className={`space-y-3 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
            {insights.map((insight, index) => (
              <div
                key={index}
                className="group relative p-4 rounded-xl glass-morphism border border-white/10 dark:border-secondary-700/20 hover:border-white/30 dark:hover:border-secondary-600/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getInsightColor(insight.type)} flex items-center justify-center text-frost-white shadow-glow`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-midnight-blue dark:text-frost-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-slate-gray dark:text-cloud-gray/80 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    {insight.action && (
                      <button className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors duration-200">
                        {insight.action}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getInsightColor(insight.type)} rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {insights.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full mt-3 py-2 text-sm font-medium text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors duration-200"
            >
              {isExpanded ? 'Show Less' : `Show ${insights.length - 2} More Insights`}
            </button>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && insights.length === 0 && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-slate-gray/30 dark:text-cloud-gray/30 mx-auto mb-3" />
          <p className="text-slate-gray dark:text-cloud-gray/80 text-sm">
            Add some tasks to get AI-powered insights
          </p>
        </div>
      )}
    </div>
  )
}
