'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-frost-white via-cloud-white to-lavender-glow/20 dark:from-obsidian-black dark:via-secondary-900 dark:to-accent-900/10">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-midnight-blue/30 border-t-midnight-blue animate-spin"></div>
        <p className="font-medium text-slate-gray dark:text-cloud-gray">Redirecting...</p>
      </div>
    </div>
  )
}
