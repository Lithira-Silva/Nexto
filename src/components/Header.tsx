import React from 'react'
import { CheckSquare, Sparkles, Target, TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="relative">
        {/* Main logo and title */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 rounded-2xl blur-lg opacity-30 animate-pulse-glow"></div>
            <div className="relative bg-frost-white dark:bg-obsidian-black/90 rounded-2xl p-4 shadow-modern-lg dark:shadow-dark-modern">
              <CheckSquare className="w-10 h-10 text-midnight-blue dark:text-accent-400" />
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-bold font-space gradient-text mb-2">
              NexTo
            </h1>
            <div className="flex items-center justify-center gap-1 text-midnight-blue dark:text-accent-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">MODERN TASK MANAGEMENT</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Subtitle with enhanced styling */}
        <div className="relative">
          <p className="text-xl text-slate-gray dark:text-cloud-gray mb-8 font-medium">
            Transform your productivity with our{' '}
            <span className="text-midnight-blue dark:text-accent-400 font-semibold">beautiful</span>,{' '}
            <span className="text-lavender-glow dark:text-accent-300 font-semibold">intelligent</span> task manager
          </p>
          
          {/* Feature highlights */}
          <div className="flex items-center justify-center gap-8 text-sm text-slate-gray dark:text-cloud-gray/80">
            <div className="flex items-center gap-2 bg-frost-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm dark:shadow-dark-modern border border-slate-gray/20 dark:border-secondary-700">
              <Target className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
              <span>Smart Priorities</span>
            </div>
            <div className="flex items-center gap-2 bg-frost-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm dark:shadow-dark-modern border border-slate-gray/20 dark:border-secondary-700">
              <TrendingUp className="w-4 h-4 text-success-500 dark:text-success-400" />
              <span>Progress Tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-frost-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm dark:shadow-dark-modern border border-slate-gray/20 dark:border-secondary-700">
              <Sparkles className="w-4 h-4 text-lavender-glow dark:text-accent-300" />
              <span>Beautiful Design</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-midnight-blue/20 dark:bg-accent-500/20 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -top-2 -right-6 w-4 h-4 bg-lavender-glow/30 dark:bg-accent-400/30 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-4 left-8 w-6 h-6 bg-slate-gray/20 dark:bg-accent-300/20 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </header>
  )
}
