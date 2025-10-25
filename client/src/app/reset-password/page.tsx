'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowRight, ArrowLeft, AlertCircle, CheckCircle, CheckSquare, Eye, EyeOff, Shield } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' })

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    setToken(tokenParam)

    if (tokenParam) {
      verifyToken(tokenParam)
    } else {
      setIsVerifying(false)
      setError('No reset token provided')
    }
  }, [searchParams])

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

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(`/api/auth/reset-password?token=${tokenToVerify}`)
      const data = await response.json()

      if (response.ok && data.valid) {
        setTokenValid(true)
      } else {
        setError(data.error || 'Invalid or expired reset token')
        setTokenValid(false)
      }
    } catch (err) {
      setError('Failed to verify reset token')
      setTokenValid(false)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!token) {
      setError('Invalid reset token')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      setSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
                Create New Password
              </h2>
              <p className="text-base font-medium leading-relaxed text-purple-100 xl:text-lg">
                Your new password must be different from previously used passwords. Make it strong and secure.
              </p>
            </div>

            {/* Security Info */}
            <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center mt-0.5">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-white">Password Requirements</h3>
                  <ul className="space-y-1 text-sm font-medium leading-relaxed text-purple-100">
                    <li>• At least 6 characters long</li>
                    <li>• Mix of uppercase and lowercase letters</li>
                    <li>• Include numbers and special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="flex items-center justify-center w-full min-h-screen p-6 overflow-y-auto lg:w-1/2 xl:w-2/5 lg:p-8 bg-gradient-to-br from-slate-50/80 via-stone-50/70 to-purple-50/60 backdrop-blur-sm">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">NexTo</h1>
            <p className="font-semibold text-slate-600">Premium Task Management</p>
          </div>

          {/* Reset Password Card */}
          <div className="p-6 transition-all duration-300 border shadow-2xl bg-slate-50/60 backdrop-blur-lg rounded-2xl border-gray-200/30 lg:p-8 hover:shadow-3xl">
            {isVerifying ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-medium text-slate-600">Verifying reset token...</p>
              </div>
            ) : !tokenValid ? (
              <>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-red-600">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">
                    Invalid Token
                  </h2>
                  <p className="mb-6 font-medium text-slate-600">
                    {error || 'This reset link is invalid or has expired.'}
                  </p>

                  <Link href="/forgot-password">
                    <button
                      type="button"
                      className="w-full py-3 px-4 mb-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
                    >
                      <span>Request New Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

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
            ) : success ? (
              <>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">
                    Password Reset Complete!
                  </h2>
                  <p className="mb-6 font-medium text-slate-600">
                    Your password has been successfully reset. You can now login with your new password.
                  </p>

                  <div className="p-4 mb-6 border rounded-lg bg-purple-50 border-purple-200">
                    <p className="text-sm font-medium text-purple-900">
                      Redirecting to login page in a few seconds...
                    </p>
                  </div>

                  <Link href="/login">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
                    >
                      <span>Go to Login Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-transparent lg:text-3xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text">
                    Reset Password
                  </h2>
                  <p className="font-medium text-slate-600">
                    Enter your new password below
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
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-slate-700">
                      New Password
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
                      Confirm New Password
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-purple-900"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                        <span>Resetting Password...</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
