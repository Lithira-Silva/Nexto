'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle, CheckSquare, Send, RefreshCw } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Call the forgot password API
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      // Log development info (remove in production)
      if (data.dev) {
        console.log('🔐 Development Mode - Password Reset Info:')
        console.log('Reset URL:', data.dev.resetUrl)
        console.log('Token:', data.dev.token)
        console.log('Copy this URL to reset your password:')
        console.log(data.dev.resetUrl)
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setIsLoading(true)

    try {
      // Call the forgot password API again
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend email')
      }

      // Show a temporary success message
      setError('Reset email sent again!')
      setTimeout(() => {
        setError('')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend email. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
                Don&apos;t Worry!
              </h2>
              <p className="text-base font-medium leading-relaxed text-purple-100 xl:text-lg">
                It happens to the best of us. Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {/* Security Info */}
            <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center mt-0.5">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-white">Check Your Email</h3>
                  <p className="text-sm font-medium leading-relaxed text-purple-100">
                    After submitting, check your email inbox (and spam folder) for password reset instructions. The link will expire in 1 hour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Forgot Password Form */}
      <div className="flex items-center justify-center w-full min-h-screen p-6 overflow-y-auto lg:w-1/2 xl:w-2/5 lg:p-8 bg-gradient-to-br from-slate-50/80 via-stone-50/70 to-purple-50/60 backdrop-blur-sm">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">NexTo</h1>
            <p className="font-semibold text-slate-600">Premium Task Management</p>
          </div>

          {/* Forgot Password Card */}
          <div className="p-6 transition-all duration-300 border shadow-2xl bg-slate-50/60 backdrop-blur-lg rounded-2xl border-gray-200/30 lg:p-8 hover:shadow-3xl">
            {!success ? (
              <>
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-transparent lg:text-3xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">
                    Forgot Password?
                  </h2>
                  <p className="font-medium text-slate-600">
                    No worries, we&apos;ll send you reset instructions
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 border border-red-200 rounded-lg animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                        <span>Sending Reset Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6">
                  <Link href="/login">
                    <button
                      type="button"
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Login</span>
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">
                    Check Your Email
                  </h2>
                  <p className="mb-6 font-medium text-slate-600">
                    We&apos;ve sent a password reset link to <span className="font-bold text-purple-600">{email}</span>
                  </p>

                  {/* Instructions */}
                  <div className="p-4 mb-6 text-left border border-purple-200 rounded-lg bg-purple-50">
                    <p className="mb-2 text-sm font-bold text-purple-900">Next Steps:</p>
                    <ol className="space-y-1 text-sm font-medium list-decimal list-inside text-slate-700">
                      <li>Check your email inbox</li>
                      <li>Click the reset link (expires in 1 hour)</li>
                      <li>Create your new password</li>
                      <li>Login with your new credentials</li>
                    </ol>
                  </div>

                  {/* Resend Button */}
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    className="w-full py-3 px-4 mb-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                        <span>Resending...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Resend Email</span>
                      </>
                    )}
                  </button>

                  {/* Back to Login */}
                  <Link href="/login">
                    <button
                      type="button"
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Login</span>
                    </button>
                  </Link>
                </div>
              </>
            )}

            {/* Help Text */}
            <div className="p-3 mt-6 text-xs font-medium text-center border border-gray-200 rounded-lg bg-slate-50/70 text-slate-600">
              Having trouble? Contact support at{' '}
              <a href="mailto:support@nexto.com" className="font-bold text-purple-600 hover:text-purple-800 hover:underline">
                support@nexto.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
