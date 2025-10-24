'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles, TrendingUp, Zap, Shield, CheckSquare, Crown } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Default to light theme
    setIsDarkMode(false)
    document.documentElement.classList.remove('dark')

    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/dashboard')
    }

    // Animate counters when component mounts
    const animateCounters = () => {
      const counters = document.querySelectorAll('.animate-counter')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0')
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            counter.textContent = target.toString()
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current).toString()
          }
        }, 50)
      })
    }

    // Delay counter animation to match CSS animation timing
    const timeoutId = setTimeout(animateCounters, 3000)
    return () => clearTimeout(timeoutId)
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid credentials. Please use a valid email and password (min 6 characters).')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex max-h-screen min-h-screen overflow-hidden passionate-scroll smooth-scroll bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/10 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10">
      {/* LEFT SIDE - Brand & Header Section */}
      <div className="relative hidden overflow-y-auto lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-midnight-blue via-accent-600 to-lavender-glow dark:from-secondary-900 dark:via-accent-900 dark:to-obsidian-black">
        {/* Animated Background Effects - Fixed positioning */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-accent-400/20 blur-3xl animate-pulse-gentle"></div>
          <div className="absolute rounded-full bottom-10 right-10 w-80 h-80 bg-lavender-glow/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-frost-white/5 blur-3xl"></div>
        </div>

        {/* Content Container with proper padding and scrolling */}
        <div className="relative z-10 flex flex-col justify-start w-full min-h-full px-8 py-12 xl:px-16 xl:py-16">
          <div className="w-full max-w-lg mx-auto space-y-8">
            {/* Login Page Header - Enhanced with Animations */}
            <div className="animate-fade-in">
              {/* Logo Section with Advanced Animations */}
              <div className="flex items-center gap-4 mb-8 group">
                <div className="relative">
                  {/* Animated Glow Ring - Reduced size */}
                  <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-frost-white/30 via-lavender-glow/40 to-frost-white/30 rounded-2xl blur-lg animate-pulse-glow group-hover:animate-spin-slow"></div>
                  
                  {/* Main Logo Container - Smaller */}
                  <div className="relative flex items-center justify-center w-16 h-16 transition-all duration-500 border shadow-xl rounded-2xl bg-gradient-to-br from-frost-white/20 to-frost-white/10 backdrop-blur-lg border-frost-white/30 group-hover:scale-110">
                    {/* Inner Glow */}
                    <div className="absolute inset-2 bg-gradient-to-br from-frost-white/30 to-transparent rounded-xl animate-shimmer"></div>
                    
                    {/* Icon */}
                    <CheckSquare className="relative w-8 h-8 transition-all duration-500 text-frost-white group-hover:rotate-12 drop-shadow-lg" />
                  </div>
                  
                  {/* Premium Badge with Animation - Smaller */}
                  <div className="absolute flex items-center justify-center w-6 h-6 rounded-full -top-1 -right-1 bg-gradient-to-r from-warning-400 to-sunset-orange shadow-glow animate-bounce-gentle group-hover:animate-pulse">
                    <Crown className="w-3 h-3 text-frost-white drop-shadow-sm" />
                  </div>
                  
                  {/* Floating Particles - Reduced */}
                  <div className="absolute w-1.5 h-1.5 rounded-full -top-0.5 -left-0.5 bg-frost-white/60 animate-float" style={{animationDelay: '0s'}}></div>
                  <div className="absolute w-1 h-1 rounded-full top-1/2 -right-1 bg-lavender-glow/80 animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute w-0.5 h-0.5 rounded-full -bottom-0.5 left-1/3 bg-frost-white/40 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
                
                {/* Brand Text with Staggered Animation */}
                <div className="flex-1">
                  <h1 className="mb-1 text-4xl font-black tracking-tight xl:text-5xl text-frost-white drop-shadow-xl">
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.2s'}}>N</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.3s'}}>e</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.4s'}}>x</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.5s'}}>T</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.6s'}}>o</span>
                  </h1>
                  <div className="relative">
                    <p className="text-sm font-bold tracking-wider text-cloud-white/90 animate-slide-in-left xl:text-base" style={{animationDelay: '0.8s'}}>
                      PREMIUM TASK MANAGEMENT
                    </p>
                    {/* Animated Underline */}
                    <div className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-frost-white via-lavender-glow to-frost-white animate-expand-width" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Welcome Message with Typewriter Effect */}
              <div className="mb-8 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                <h2 className="mb-3 text-2xl font-bold leading-tight xl:text-3xl text-frost-white">
                  <span className="inline-block animate-typewriter">Welcome to the Future</span>
                  <br />
                  <span className="inline-block animate-typewriter text-lavender-glow" style={{animationDelay: '1.8s'}}>of Productivity</span>
                </h2>
                <p className="text-base font-medium leading-relaxed text-cloud-white/90 xl:text-lg animate-fade-in-up" style={{animationDelay: '2.4s'}}>
                  Experience <span className="font-bold text-frost-white">intelligent task management</span> with 
                  <span className="font-bold text-lavender-glow"> AI-powered insights</span>, beautiful design, and seamless workflows.
                </p>
              </div>

              {/* Premium Stats/Features with Animated Counters */}
              <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up" style={{animationDelay: '2.8s'}}>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-frost-white/10 backdrop-blur-sm border-frost-white/20 group-hover:scale-105 hover:shadow-xl">
                    <div className="text-lg font-black text-frost-white animate-counter xl:text-xl" data-target="99">0</div>
                    <div className="text-xs font-bold tracking-wide text-cloud-white/80">% UPTIME</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-frost-white/10 backdrop-blur-sm border-frost-white/20 group-hover:scale-105 hover:shadow-xl">
                    <div className="text-lg font-black text-frost-white animate-counter xl:text-xl" data-target="24">0</div>
                    <div className="text-xs font-bold tracking-wide text-cloud-white/80">/ 7 SUPPORT</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-frost-white/10 backdrop-blur-sm border-frost-white/20 group-hover:scale-105 hover:shadow-xl">
                    <div className="text-lg font-black text-frost-white animate-counter xl:text-xl" data-target="500">0</div>
                    <div className="text-xs font-bold tracking-wide text-cloud-white/80">K+ USERS</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Features Section - Compact */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-frost-white/10 backdrop-blur-sm group-hover:scale-110">
                  <Sparkles className="w-5 h-5 text-frost-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-frost-white">AI-Powered Insights</h3>
                  <p className="text-sm font-medium text-cloud-white/80">Smart task recommendations and productivity analytics</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-frost-white/10 backdrop-blur-sm group-hover:scale-110">
                  <TrendingUp className="w-5 h-5 text-frost-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-frost-white">Track Your Progress</h3>
                  <p className="text-sm font-medium text-cloud-white/80">Real-time analytics and visual progress tracking</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-frost-white/10 backdrop-blur-sm group-hover:scale-110">
                  <Zap className="w-5 h-5 text-frost-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-frost-white">Lightning Fast</h3>
                  <p className="text-sm font-medium text-cloud-white/80">Optimized performance for seamless productivity</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-frost-white/10 backdrop-blur-sm group-hover:scale-110">
                  <Shield className="w-5 h-5 text-frost-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-frost-white">Secure & Private</h3>
                  <p className="text-sm font-medium text-cloud-white/80">Your data is encrypted and protected</p>
                </div>
              </div>
            </div>

            {/* Testimonial - Compact */}
            <div className="p-4 border rounded-xl bg-frost-white/10 backdrop-blur-sm border-frost-white/20">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 text-warning-400">★</div>
                ))}
              </div>
              <p className="mb-2 text-sm italic font-medium text-frost-white">
                &ldquo;NexTo transformed how I manage my daily tasks. The AI insights are game-changing!&rdquo;
              </p>
              <p className="text-xs font-semibold text-cloud-white/70">— Sarah Chen, Product Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form Section */}
      <div className="flex items-center justify-center w-full min-h-screen p-6 overflow-y-auto lg:w-1/2 xl:w-2/5 lg:p-8">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo - Only show on mobile */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-3xl font-black gradient-text">NexTo</h1>
            <p className="font-semibold text-slate-gray dark:text-cloud-gray">Premium Task Management</p>
          </div>

          {/* Login Card */}
          <div className="p-6 border shadow-xl glass-morphism rounded-2xl border-white/20 dark:border-secondary-700/30 lg:p-8">
            {/* Welcome Text */}
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold lg:text-3xl gradient-text">Welcome Back!</h2>
              <p className="font-medium text-slate-gray dark:text-cloud-gray">
                Sign in to continue your productivity journey
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-3 mb-4 border rounded-lg bg-error-500/10 border-error-500/20 animate-shake">
                <AlertCircle className="w-4 h-4 text-error-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-error-600 dark:text-error-400">{error}</p>
              </div>
            )}

            {/* Demo Info */}
            <div className="flex items-start gap-3 p-3 mb-6 border rounded-lg bg-accent-500/10 border-accent-500/20">
              <CheckCircle className="w-4 h-4 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm font-medium text-accent-700 dark:text-accent-300">
                <p className="mb-1 font-bold">Demo Access</p>
                <p>Email: Any valid email format</p>
                <p>Password: Min 6 characters</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-midnight-blue dark:text-frost-white">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-gray dark:text-cloud-gray" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 text-base font-medium transition-all duration-300 border rounded-xl border-slate-gray/20 dark:border-secondary-700/30 bg-white/80 dark:bg-secondary-800/50 text-midnight-blue dark:text-frost-white placeholder-slate-gray/50 dark:placeholder-cloud-gray/50 focus:outline-none focus:ring-2 focus:ring-midnight-blue dark:focus:ring-accent-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-midnight-blue dark:text-frost-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-gray dark:text-cloud-gray" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 pl-12 pr-12 text-base font-medium transition-all duration-300 border rounded-xl border-slate-gray/20 dark:border-secondary-700/30 bg-white/80 dark:bg-secondary-800/50 text-midnight-blue dark:text-frost-white placeholder-slate-gray/50 dark:placeholder-cloud-gray/50 focus:outline-none focus:ring-2 focus:ring-midnight-blue dark:focus:ring-accent-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 transition-colors text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 transition-all rounded border-slate-gray/30 text-midnight-blue focus:ring-2 focus:ring-midnight-blue focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm font-medium transition-colors text-slate-gray dark:text-cloud-gray group-hover:text-midnight-blue dark:group-hover:text-frost-white">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm font-bold transition-all text-midnight-blue dark:text-accent-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 text-frost-white font-bold text-lg shadow-glow hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 button-premium"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full border-frost-white/30 border-t-frost-white animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to NexTo</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-gray/20 dark:border-secondary-700/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 font-semibold bg-frost-white/80 dark:bg-secondary-800/80 text-slate-gray dark:text-cloud-gray">
                  New to NexTo?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              type="button"
              className="flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-bold transition-all duration-300 border-2 rounded-xl border-midnight-blue dark:border-accent-500 text-midnight-blue dark:text-accent-400 hover:bg-midnight-blue dark:hover:bg-accent-500 hover:text-frost-white"
            >
              <span>Create an Account</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full glass-morphism border-white/20 dark:border-secondary-700/30">
              <Shield className="w-4 h-4 text-success-500" />
              <span className="text-xs font-semibold text-slate-gray dark:text-cloud-gray">256-bit Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
