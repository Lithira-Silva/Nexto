import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { getTask, updateTask, deleteTask } from '@/lib/taskData'
import type { Database } from '@/lib/supabase'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      const { data: task, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (error || !task) {
        // Try file storage as fallback
        const fileTask = getTask(params.id)
        if (!fileTask) {
          return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }
        return NextResponse.json(fileTask)
      }
      
      const frontendTask = convertToFrontendTask(task)
      return NextResponse.json(frontendTask)
    } else {
      // Use file-based storage
      const task = getTask(params.id)
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      }
      return NextResponse.json(task)
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      const updateData: TaskUpdate = {
        title: body.title,
        description: body.description || null,
        completed: body.completed,
        priority: body.priority,
        due_date: body.dueDate || null,
      }

      const { data: task, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', params.id)
        .select()
        .single()
      
      if (error || !task) {
        // Try file storage as fallback
        const updatedTask = updateTask(params.id, body)
        if (!updatedTask) {
          return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }
        return NextResponse.json(updatedTask)
      }
      
      const frontendTask = convertToFrontendTask(task)
      return NextResponse.json(frontendTask)
    } else {
      // Use file-based storage
      const updatedTask = updateTask(params.id, body)
      if (!updatedTask) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      }
      return NextResponse.json(updatedTask)
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use Supabase if configured, otherwise fall back to file storage
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', params.id)
      
      if (error) {
        // Try file storage as fallback
        const success = deleteTask(params.id)
        if (!success) {
          return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Task deleted successfully' })
      }
      
      return NextResponse.json({ message: 'Task deleted successfully' })
    } else {
      // Use file-based storage
      const success = deleteTask(params.id)
      if (!success) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Task deleted successfully' })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
