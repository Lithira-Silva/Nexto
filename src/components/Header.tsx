import React from 'react'
import { CheckSquare, Sparkles, Target, TrendingUp, Star, Award, Crown, Zap, Brain, Rocket } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-8 animate-fade-in relative overflow-hidden pt-2 sm:pt-4 md:pt-6">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue/5 via-accent-500/5 to-lavender-glow/5 dark:from-accent-900/10 dark:via-secondary-800/10 dark:to-accent-700/10 animate-gradient-shift"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 z-20">
        {/* Premium Brand Section */}
        <div className="mb-12">
          {/* Logo and Main Title */}
          <div className="flex flex-col items-center gap-4 mb-6 mt-2">
            {/* Enhanced Logo */}
            <div className="relative group mt-2">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue via-accent-500 to-lavender-glow rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-110"></div>
              
              {/* Logo container */}
              <div className="relative glass-morphism rounded-3xl p-6 border-2 border-white/20 dark:border-secondary-700/30 shadow-2xl group-hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 rounded-2xl blur-lg opacity-40 animate-pulse-glow"></div>
                  <div className="relative bg-frost-white dark:bg-obsidian-black/90 rounded-2xl p-4 shadow-modern-xl">
                    <CheckSquare className="w-12 h-12 text-midnight-blue dark:text-accent-400 animate-pulse-gentle" />
                  </div>
                </div>
              </div>
              
              {/* Award badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-sunset-orange to-warning-500 rounded-full p-2 shadow-glow animate-bounce-gentle z-10">
                <Crown className="w-4 h-4 text-frost-white" />
              </div>
            </div>

            {/* Brand Name with Premium Typography */}
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black gradient-text mb-3 tracking-tight drop-shadow-xl">
                NexTo
              </h1>
              
              {/* Tagline with enhanced styling */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-midnight-blue/10 dark:via-accent-500/10 to-transparent blur-sm"></div>
                <div className="relative flex items-center justify-center gap-2 px-4 sm:px-6 py-3 glass-morphism rounded-2xl border border-white/20 dark:border-secondary-700/30 shadow-xl">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-midnight-blue dark:text-accent-400 animate-pulse" />
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider gradient-text">PREMIUM TASK MANAGEMENT</span>
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-midnight-blue dark:text-accent-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Subtitle Section */}
          <div className="relative mb-6">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-slate-gray dark:text-cloud-gray mb-4 leading-relaxed">
                Revolutionize your productivity with our{' '}
                <span className="relative inline-block">
                  <span className="text-midnight-blue dark:text-accent-400 font-bold">award-winning</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-midnight-blue to-accent-500 animate-shimmer"></div>
                </span>,{' '}
                <span className="relative inline-block">
                  <span className="text-lavender-glow dark:text-accent-300 font-bold">intelligent</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-lavender-glow to-accent-400 animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
                </span>{' '}
                task management platform
              </p>
              
              {/* Call to Action */}
              <p className="text-base sm:text-lg text-slate-gray/80 dark:text-cloud-gray/70 font-medium">
                Experience the future of productivity with cutting-edge features and beautiful design
              </p>
            </div>
          </div>

          {/* Premium Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            {/* Smart Priorities */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue/10 to-accent-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-morphism rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-secondary-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-midnight-blue to-accent-500 flex items-center justify-center shadow-glow">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-frost-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-midnight-blue dark:text-frost-white">Smart Priorities</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-midnight-blue to-accent-500 mt-1"></div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-gray dark:text-cloud-gray/80 font-medium">
                  AI-powered priority detection that learns from your behavior
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success-500/10 to-emerald-green/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-morphism rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-secondary-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-success-500 to-emerald-green flex items-center justify-center shadow-glow">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-frost-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-midnight-blue dark:text-frost-white">Progress Tracking</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-success-500 to-emerald-green mt-1"></div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-gray dark:text-cloud-gray/80 font-medium">
                  Real-time analytics and insights to boost your productivity
                </p>
              </div>
            </div>

            {/* Beautiful Design */}
            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-lavender-glow/10 to-accent-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-morphism rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-secondary-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-lavender-glow to-accent-400 flex items-center justify-center shadow-glow">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-frost-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-midnight-blue dark:text-frost-white">Award-Winning Design</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-lavender-glow to-accent-400 mt-1"></div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-gray dark:text-cloud-gray/80 font-medium">
                  Crafted with premium UI/UX that delights every interaction
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}
