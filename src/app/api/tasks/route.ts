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

let nextId = 2

export async function GET() {
  try {
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newTask: Task = {
      id: nextId.toString(),
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      priority: body.priority || 'medium',
      dueDate: body.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    tasks.push(newTask)
    nextId++
    
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
