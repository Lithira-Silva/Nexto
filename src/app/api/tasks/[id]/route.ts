import { NextRequest, NextResponse } from 'next/server'
import { Task } from '@/store/taskStore'

// In-memory storage for demo purposes
// In a real app, you'd use a database
let tasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to NexTo!',
    description: 'This is your first task. You can edit, complete, or delete it.',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = tasks.find(t => t.id === params.id)
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskIndex = tasks.findIndex(t => t.id === params.id)
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }
    
    tasks[taskIndex] = updatedTask
    
    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskIndex = tasks.findIndex(t => t.id === params.id)
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }
    
    tasks.splice(taskIndex, 1)
    
    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}
