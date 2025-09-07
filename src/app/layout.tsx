import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
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
  viewport: 'width=device-width, initial-scale=1',
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
        <div className="min-h-screen bg-modern-gradient dark:bg-dark-gradient relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating orbs */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-lavender-glow/10 dark:bg-accent-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-green/10 dark:bg-success-400/10 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-sunset-orange/10 dark:bg-warning-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-midnight-blue/5 dark:bg-primary-400/5 rounded-full blur-2xl animate-float" style={{animationDelay: '0.5s'}}></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 z' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`
                 }}>
            </div>
          </div>
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-frost-white/80 via-transparent to-frost-white/40 dark:from-obsidian-black/80 dark:via-transparent dark:to-obsidian-black/40 pointer-events-none"></div>
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
