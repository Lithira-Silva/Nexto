'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
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

  // Check if OAuth is configured
  const isGoogleConfigured = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === 'true'
  const isFacebookConfigured = process.env.NEXT_PUBLIC_FACEBOOK_OAUTH_ENABLED === 'true'

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

  const handleGoogleSignIn = async () => {
    try {
      setError('')
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      })
      
      if (result?.error) {
        setError('Google sign-in failed. Please try again.')
      } else if (result?.url) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.')
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      setError('')
      const result = await signIn('facebook', {
        callbackUrl: '/dashboard',
        redirect: false,
      })
      
      if (result?.error) {
        setError('Facebook sign-in failed. Please try again.')
      } else if (result?.url) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Facebook sign-in failed. Please try again.')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex max-h-screen min-h-screen overflow-hidden passionate-scroll smooth-scroll bg-gradient-to-br from-slate-100 via-purple-50 to-purple-100 dark:from-purple-900 dark:via-purple-800 dark:to-purple-950">
      {/* LEFT SIDE - Brand & Header Section */}
      <div className="relative hidden overflow-y-auto lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-900 dark:via-purple-800 dark:to-purple-950">
        {/* Animated Background Effects - Fixed positioning */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-white/10 blur-3xl animate-pulse-gentle"></div>
          <div className="absolute rounded-full bottom-10 right-10 w-80 h-80 bg-purple-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-purple-500/15 blur-3xl"></div>
        </div>

        {/* Content Container with proper padding and scrolling */}
        <div className="relative z-10 flex flex-col justify-start w-full min-h-full px-8 py-12 xl:px-16 xl:py-16">
          <div className="w-full max-w-lg mx-auto space-y-8">
            {/* Login Page Header - Enhanced with Animations */}
            <div className="animate-fade-in">
              {/* Logo Section with Advanced Animations */}
              <div className="flex items-center gap-4 mb-8 group">
                <div className="relative">
                  {/* Animated Glow Ring - Enhanced colors */}
                  <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-white/20 via-purple-300/30 to-purple-400/30 rounded-2xl blur-lg animate-pulse-glow group-hover:animate-spin-slow"></div>
                  
                  {/* Main Logo Container - Enhanced colors */}
                  <div className="relative flex items-center justify-center w-16 h-16 transition-all duration-500 border shadow-xl rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border-white/20 group-hover:scale-110">
                    {/* Inner Glow */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl animate-shimmer"></div>
                    
                    {/* Icon */}
                    <CheckSquare className="relative w-8 h-8 text-white transition-all duration-500 group-hover:rotate-12 drop-shadow-lg" />
                  </div>
                  
                  {/* Premium Badge - Enhanced colors */}
                  <div className="absolute flex items-center justify-center w-6 h-6 rounded-full -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 shadow-glow animate-bounce-gentle group-hover:animate-pulse">
                    <Crown className="w-3 h-3 text-white drop-shadow-sm" />
                  </div>
                  
                  {/* Floating Particles - Enhanced colors */}
                  <div className="absolute w-1.5 h-1.5 rounded-full -top-0.5 -left-0.5 bg-white/60 animate-float" style={{animationDelay: '0s'}}></div>
                  <div className="absolute w-1 h-1 rounded-full top-1/2 -right-1 bg-blue-300/80 animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute w-0.5 h-0.5 rounded-full -bottom-0.5 left-1/3 bg-purple-300/60 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
                
                {/* Brand Text with Staggered Animation */}
                <div className="flex-1">
                  <h1 className="mb-1 text-4xl font-black tracking-tight text-white xl:text-5xl drop-shadow-xl">
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.2s'}}>N</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.3s'}}>e</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.4s'}}>x</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.5s'}}>T</span>
                    <span className="inline-block animate-slide-in-left" style={{animationDelay: '0.6s'}}>o</span>
                  </h1>
                  <div className="relative">
                    <p className="text-sm font-bold tracking-wider text-blue-100 animate-slide-in-left xl:text-base" style={{animationDelay: '0.8s'}}>
                      PREMIUM TASK MANAGEMENT
                    </p>
                    {/* Animated Underline - Enhanced colors */}
                    <div className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-white via-purple-300 to-purple-400 animate-expand-width" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Welcome Message with Typewriter Effect */}
              <div className="mb-8 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                <h2 className="mb-3 text-2xl font-bold leading-tight text-white xl:text-3xl">
                  <span className="inline-block animate-typewriter">Welcome to the Future</span>
                  <br />
                  <span className="inline-block text-purple-200 animate-typewriter" style={{animationDelay: '1.8s'}}>of Productivity</span>
                </h2>
                <p className="text-base font-medium leading-relaxed text-purple-100 xl:text-lg animate-fade-in-up" style={{animationDelay: '2.4s'}}>
                  Experience <span className="font-bold text-white">intelligent task management</span> with 
                  <span className="font-bold text-blue-200"> AI-powered insights</span>, beautiful design, and seamless workflows.
                </p>
              </div>

              {/* Premium Stats/Features with Animated Counters */}
              <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up" style={{animationDelay: '2.8s'}}>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 group-hover:scale-105 hover:shadow-xl hover:bg-white/15">
                    <div className="text-lg font-black text-white animate-counter xl:text-xl" data-target="99">0</div>
                    <div className="text-xs font-bold tracking-wide text-blue-100">% UPTIME</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 group-hover:scale-105 hover:shadow-xl hover:bg-white/15">
                    <div className="text-lg font-black text-white animate-counter xl:text-xl" data-target="24">0</div>
                    <div className="text-xs font-bold tracking-wide text-blue-100">/ 7 SUPPORT</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="flex flex-col items-center justify-center w-full transition-all duration-300 border shadow-lg h-14 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 group-hover:scale-105 hover:shadow-xl hover:bg-white/15">
                    <div className="text-lg font-black text-white animate-counter xl:text-xl" data-target="500">0</div>
                    <div className="text-xs font-bold tracking-wide text-blue-100">K+ USERS</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Features Section - Compact */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/15">
                  <Sparkles className="w-5 h-5 text-white transition-colors group-hover:text-yellow-200" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">AI-Powered Insights</h3>
                  <p className="text-sm font-medium text-blue-100">Smart task recommendations and productivity analytics</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/15">
                  <TrendingUp className="w-5 h-5 text-white transition-colors group-hover:text-green-200" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Track Your Progress</h3>
                  <p className="text-sm font-medium text-blue-100">Real-time analytics and visual progress tracking</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/15">
                  <Zap className="w-5 h-5 text-white transition-colors group-hover:text-orange-200" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Lightning Fast</h3>
                  <p className="text-sm font-medium text-blue-100">Optimized performance for seamless productivity</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/15">
                  <Shield className="w-5 h-5 text-white transition-colors group-hover:text-emerald-200" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Secure & Private</h3>
                  <p className="text-sm font-medium text-blue-100">Your data is encrypted and protected</p>
                </div>
              </div>
            </div>

            {/* Testimonial - Compact */}
            <div className="p-4 transition-colors border rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 text-yellow-300">★</div>
                ))}
              </div>
              <p className="mb-2 text-sm italic font-medium text-white">
                &ldquo;NexTo transformed how I manage my daily tasks. The AI insights are game-changing!&rdquo;
              </p>
              <p className="text-xs font-semibold text-blue-200">— Sarah Chen, Product Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form Section */}
      <div className="flex items-center justify-center w-full min-h-screen p-6 overflow-y-auto lg:w-1/2 xl:w-2/5 lg:p-8 bg-gradient-to-br from-slate-50/80 via-stone-50/70 to-purple-50/60 backdrop-blur-sm">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo - Only show on mobile */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">NexTo</h1>
            <p className="font-semibold text-slate-600">Premium Task Management</p>
          </div>

          {/* Login Card */}
          <div className="p-6 transition-all duration-300 border shadow-2xl bg-slate-50/60 backdrop-blur-lg rounded-2xl border-gray-200/30 lg:p-8 hover:shadow-3xl">
            {/* Welcome Text */}
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-transparent lg:text-3xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">Welcome Back!</h2>
              <p className="font-medium text-slate-600">
                Sign in to continue your productivity journey
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-3 mb-4 border border-red-200 rounded-lg bg-red-50 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* Demo Info */}
            <div className="flex items-start gap-3 p-3 mb-6 border border-blue-200 rounded-lg bg-blue-50">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm font-medium text-blue-800">
                <p className="mb-1 font-bold">Demo Access</p>
                <p>Email: Any valid email format</p>
                <p>Password: Min 6 characters</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 pl-10 pr-3 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-slate-50/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-12 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-slate-50/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 transition-colors text-slate-400 hover:text-slate-600 focus:outline-none focus:text-purple-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 transition-all duration-200" />
                    ) : (
                      <Eye className="w-5 h-5 transition-all duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-2 font-medium transition-colors text-slate-600 group-hover:text-slate-800">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="font-bold text-purple-600 transition-all hover:text-purple-800 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to NexTo</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* OAuth Buttons - Only show if configured */}
            {(isGoogleConfigured || isFacebookConfigured) && (
              <div className="mt-6 space-y-3">
                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 font-medium bg-slate-50/60 text-slate-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Sign In */}
                {isGoogleConfigured && (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-white/70 text-slate-700 hover:bg-white hover:shadow-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <FaGoogle className="w-4 h-4 text-red-500" />
                    <span>Continue with Google</span>
                  </button>
                )}

                {/* Facebook Sign In */}
                {isFacebookConfigured && (
                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-white/70 text-slate-700 hover:bg-white hover:shadow-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <FaFacebook className="w-4 h-4 text-blue-600" />
                    <span>Continue with Facebook</span>
                  </button>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 font-semibold bg-white text-slate-600">
                  New to NexTo?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              type="button"
              className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-lg"
            >
              <span>Create an Account</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full bg-white/60 backdrop-blur-sm">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-semibold text-slate-600">256-bit Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
