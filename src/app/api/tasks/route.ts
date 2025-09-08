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
  console.log('=== API GET /api/tasks called ===')
  console.log('Supabase configured:', isSupabaseConfigured)
  console.log('Supabase client exists:', !!supabase)
  
  try {
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      console.log('API GET: Using Supabase storage')
      
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('API GET: Supabase error:', error)
        console.log('API GET: Falling back to file storage')
        
        // Fall back to file storage on error
        const tasks = getTasks()
        console.log('API GET: File storage returned tasks:', tasks)
        return NextResponse.json(tasks)
      }

      const frontendTasks = tasks?.map(convertToFrontendTask) || []
      console.log('API GET: Supabase returned tasks:', frontendTasks)
      return NextResponse.json(frontendTasks)
    } else {
      console.log('API GET: Using file storage (Supabase disabled)')
      
      // Use file-based storage
      const tasks = getTasks()
      console.log('API GET: File storage returned tasks:', tasks)
      return NextResponse.json(tasks)
    }
  } catch (error) {
    console.error('API GET: Error:', error)
    
    // Fall back to file storage on any error
    try {
      const tasks = getTasks()
      console.log('API GET: Fallback file storage returned tasks:', tasks)
      return NextResponse.json(tasks)
    } catch (fallbackError) {
      console.error('API GET: Fallback error:', fallbackError)
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }
  }
}

export async function POST(request: NextRequest) {
  console.log('=== API POST /api/tasks called ===')
  
  try {
    const body = await request.json()
    console.log('API POST: Received body:', body)
    
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      console.log('API POST: Using Supabase storage')
      
      const taskData: TaskInsert = {
        title: body.title,
        description: body.description || null,
        completed: body.completed || false,
        priority: body.priority || 'medium',
        due_date: body.dueDate || null,
      }

      console.log('API POST: Supabase insert data:', taskData)

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single()

      if (error) {
        console.error('API POST: Supabase error:', error)
        console.log('API POST: Falling back to file storage')
        
        // Fall back to file storage
        const newTask = addTask({
          title: body.title,
          description: body.description,
          completed: body.completed || false,
          priority: body.priority || 'medium',
          dueDate: body.dueDate,
        })
        
        console.log('API POST: File storage created task:', newTask)
        return NextResponse.json(newTask, { status: 201 })
      }

      const frontendTask = convertToFrontendTask(data)
      console.log('API POST: Supabase created task:', frontendTask)
      return NextResponse.json(frontendTask, { status: 201 })
    } else {
      console.log('API POST: Using file storage')
      
      // Use file-based storage
      const newTask = addTask({
        title: body.title,
        description: body.description,
        completed: body.completed || false,
        priority: body.priority || 'medium',
        dueDate: body.dueDate,
      })
      
      console.log('API POST: File storage created task:', newTask)
      return NextResponse.json(newTask, { status: 201 })
    }
  } catch (error) {
    console.error('API POST: Error:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
