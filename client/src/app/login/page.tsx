'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Header from '@/components/Header'
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
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }

    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/dashboard')
    }
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
    <div className="min-h-screen passionate-scroll smooth-scroll bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 py-4 pt-8">
          <div className="mx-auto max-w-7xl">
            <Header />
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="relative px-4 py-12">
        <div className="mx-auto max-w-md">
          {/* Login Card */}
          <div className="glass-morphism rounded-3xl border border-white/20 dark:border-secondary-700/30 shadow-2xl p-8 slide-in-bottom">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back!</h2>
              <p className="text-slate-gray dark:text-cloud-gray font-medium">
                Sign in to access your tasks and boost productivity
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-error-500/10 border border-error-500/20 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-error-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error-600 dark:text-error-400 font-medium">{error}</p>
              </div>
            )}

            {/* Demo Info */}
            <div className="mb-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-accent-700 dark:text-accent-300 font-medium">
                <p className="font-bold mb-1">Demo Login</p>
                <p>Email: Any valid email format</p>
                <p>Password: Minimum 6 characters</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-midnight-blue dark:text-frost-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-gray dark:text-cloud-gray" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/20 dark:border-secondary-700/30 bg-white/50 dark:bg-secondary-800/50 text-midnight-blue dark:text-frost-white placeholder-slate-gray/50 dark:placeholder-cloud-gray/50 focus:outline-none focus:ring-2 focus:ring-midnight-blue dark:focus:ring-accent-500 transition-all duration-300 font-medium"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-midnight-blue dark:text-frost-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-gray dark:text-cloud-gray" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-white/20 dark:border-secondary-700/30 bg-white/50 dark:bg-secondary-800/50 text-midnight-blue dark:text-frost-white placeholder-slate-gray/50 dark:placeholder-cloud-gray/50 focus:outline-none focus:ring-2 focus:ring-midnight-blue dark:focus:ring-accent-500 transition-all duration-300 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-gray dark:text-cloud-gray hover:text-midnight-blue dark:hover:text-frost-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-midnight-blue to-accent-500 dark:from-accent-500 dark:to-accent-600 text-frost-white font-bold text-lg shadow-glow hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 button-premium"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-frost-white/30 border-t-frost-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-gray dark:text-cloud-gray">
                New to NexTo?{' '}
                <button className="font-bold text-midnight-blue dark:text-accent-400 hover:underline transition-all">
                  Create an account
                </button>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/20 dark:border-secondary-700/30">
              <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-gray dark:text-cloud-gray">Secure Authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
