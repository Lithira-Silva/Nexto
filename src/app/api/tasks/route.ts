import { NextRequest, NextResponse } from 'next/server'
import { getTasks, addTask } from '@/lib/taskData'

export async function GET() {
  try {
    const tasks = getTasks()
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
    
    const newTask = addTask({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      priority: body.priority || 'medium',
      dueDate: body.dueDate,
    })
    
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
