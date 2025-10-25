import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NexTo - Modern Task Management',
  description: 'A beautiful and intuitive to-do list application built with Next.js, featuring modern design, dark mode support, and powerful task management capabilities.',
  keywords: 'todo, task management, productivity, next.js, modern design, dark mode',
  authors: [{ name: 'NexTo Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-modern-gradient dark:bg-dark-gradient relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 z' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`
               }}>
          </div>
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-frost-white/80 via-transparent to-frost-white/40 dark:from-obsidian-black/80 dark:via-transparent dark:to-obsidian-black/40 pointer-events-none"></div>
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
        </AuthProvider>
      </body>
    </html>
  )
}
