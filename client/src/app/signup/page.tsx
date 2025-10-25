'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles, Shield, CheckSquare } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function SignUpPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' })

  useEffect(() => {
    setMounted(true)
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  // Password strength checker
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength({ score: 0, feedback: '' })
      return
    }

    let score = 0
    let feedback = ''

    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (score <= 2) feedback = 'Weak'
    else if (score === 3) feedback = 'Fair'
    else if (score === 4) feedback = 'Good'
    else feedback = 'Strong'

    setPasswordStrength({ score, feedback })
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to create account
      await new Promise(resolve => setTimeout(resolve, 1500))

      // In a real app, you'd call your API here
      // const response = await fetch('/api/auth/signup', { ... })

      setSuccess('Account created successfully! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500'
    if (passwordStrength.score === 3) return 'bg-yellow-500'
    if (passwordStrength.score === 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="flex max-h-screen min-h-screen overflow-hidden passionate-scroll smooth-scroll bg-gradient-to-br from-slate-100 via-purple-50 to-purple-100">
      {/* Left Panel - Brand Section */}
      <div className="relative hidden overflow-y-auto lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-white/10 blur-3xl animate-pulse-gentle"></div>
          <div className="absolute rounded-full bottom-10 right-10 w-80 h-80 bg-purple-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-purple-500/15 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center w-full min-h-full px-8 py-12 xl:px-16 xl:py-16">
          <div className="w-full max-w-lg mx-auto space-y-8">
            {/* Logo and Brand */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-white/20 via-purple-300/30 to-purple-400/30 rounded-2xl blur-lg animate-pulse-glow group-hover:animate-spin-slow"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 transition-all duration-500 border shadow-xl rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border-white/20 group-hover:scale-110">
                    <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl animate-shimmer"></div>
                    <CheckSquare className="relative w-8 h-8 text-white transition-all duration-500 group-hover:rotate-12 drop-shadow-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white xl:text-4xl">NexTo</h1>
                  <div className="relative">
                    <p className="text-sm font-bold tracking-wider text-white/90 xl:text-base">
                      PREMIUM TASK MANAGEMENT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="mb-3 text-2xl font-bold leading-tight text-white xl:text-3xl">
                Join NexTo Today
              </h2>
              <p className="text-base font-medium leading-relaxed text-purple-100 xl:text-lg">
                Create your account and start organizing your tasks like a pro. Experience the future of productivity.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Secure & Private</h3>
                  <p className="text-sm font-medium text-purple-100">Your data is encrypted and protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Premium Features</h3>
                  <p className="text-sm font-medium text-purple-100">Access all features for free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="flex items-center justify-center w-full min-h-screen p-6 overflow-y-auto lg:w-1/2 xl:w-2/5 lg:p-8 bg-gradient-to-br from-slate-50/80 via-stone-50/70 to-purple-50/60 backdrop-blur-sm">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">NexTo</h1>
            <p className="font-semibold text-slate-600">Premium Task Management</p>
          </div>

          {/* Sign Up Card */}
          <div className="p-6 transition-all duration-300 border shadow-2xl bg-slate-50/60 backdrop-blur-lg rounded-2xl border-gray-200/30 lg:p-8 hover:shadow-3xl">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-transparent lg:text-3xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">Create Account</h2>
              <p className="font-medium text-slate-600">
                Fill in your details to get started
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 border border-red-200 rounded-lg animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm font-medium text-green-800 bg-green-100 border border-green-200 rounded-lg animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 pl-10 pr-3 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-slate-50/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">Password Strength</span>
                      <span className={`text-xs font-bold ${
                        passwordStrength.score <= 2 ? 'text-red-500' :
                        passwordStrength.score === 3 ? 'text-yellow-500' :
                        passwordStrength.score === 4 ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        {passwordStrength.feedback}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-3 pl-10 pr-12 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-lg bg-slate-50/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 transition-colors text-slate-400 hover:text-slate-600 focus:outline-none focus:text-purple-500"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 transition-all duration-200" />
                    ) : (
                      <Eye className="w-5 h-5 transition-all duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-xs font-medium text-slate-600">
                  I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-800 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:text-purple-800 hover:underline">Privacy Policy</Link>
                </label>
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 font-semibold bg-slate-50/60 text-slate-600">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link href="/login">
              <button
                type="button"
                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-lg"
              >
                <span>Sign In Instead</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
