import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 Debug Info:')
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('Is configured:', isSupabaseConfigured)
    console.log('Client exists:', !!supabase)

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase not configured',
        configured: isSupabaseConfigured,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      })
    }

    // Test connection
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: error.message
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connected successfully!',
      taskCount: data?.length || 0,
      sampleTask: data?.[0] || null
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
