import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { getTasks, addTask } from '@/lib/taskData'
import type { Database } from '@/lib/supabase'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']

// Convert Supabase task to frontend format
const convertToFrontendTask = (dbTask: Task) => ({
  id: dbTask.id,
  title: dbTask.title,
  description: dbTask.description || undefined,
  completed: dbTask.completed,
  priority: dbTask.priority,
  dueDate: dbTask.due_date || undefined,
  createdAt: dbTask.created_at,
  updatedAt: dbTask.updated_at,
})

export async function GET() {
  try {
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        // Fall back to file storage on error
        const tasks = getTasks()
        return NextResponse.json(tasks)
      }

      const frontendTasks = tasks?.map(convertToFrontendTask) || []
      return NextResponse.json(frontendTasks)
    } else {
      // Use file-based storage
      const tasks = getTasks()
      return NextResponse.json(tasks)
    }
  } catch (error) {
    console.error('API error:', error)
    // Fall back to file storage on any error
    try {
      const tasks = getTasks()
      return NextResponse.json(tasks)
    } catch (fallbackError) {
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      const taskData: TaskInsert = {
        title: body.title,
        description: body.description || null,
        completed: body.completed || false,
        priority: body.priority || 'medium',
        due_date: body.dueDate || null,
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        // Fall back to file storage
        const newTask = addTask({
          title: body.title,
          description: body.description,
          completed: body.completed || false,
          priority: body.priority || 'medium',
          dueDate: body.dueDate,
        })
        return NextResponse.json(newTask, { status: 201 })
      }

      const frontendTask = convertToFrontendTask(data)
      return NextResponse.json(frontendTask, { status: 201 })
    } else {
      // Use file-based storage
      const newTask = addTask({
        title: body.title,
        description: body.description,
        completed: body.completed || false,
        priority: body.priority || 'medium',
        dueDate: body.dueDate,
      })
      
      return NextResponse.json(newTask, { status: 201 })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
