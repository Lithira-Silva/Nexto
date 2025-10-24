import { Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'
import { getTasks, addTask, updateTask as updateFileTask, deleteTask as deleteFileTask, getTaskById as getFileTaskById } from '../utils/taskData'

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface SupabaseTask {
  id: string
  title: string
  description: string | null
  completed: boolean
  priority: string
  due_date: string | null
  created_at: string
  updated_at: string
}

// Convert Supabase task to frontend format
const convertToFrontendTask = (dbTask: SupabaseTask): Task => ({
  id: dbTask.id,
  title: dbTask.title,
  description: dbTask.description || undefined,
  completed: dbTask.completed,
  priority: dbTask.priority as 'low' | 'medium' | 'high',
  dueDate: dbTask.due_date || undefined,
  createdAt: dbTask.created_at,
  updatedAt: dbTask.updated_at,
})

// GET /api/tasks - Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  console.log('=== Controller: getAllTasks called ===')
  
  try {
    if (isSupabaseConfigured && supabase) {
      console.log('Controller: Using Supabase storage')
      
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Controller: Supabase error:', error)
        console.log('Controller: Falling back to file storage')
        
        const tasks = getTasks()
        return res.json(tasks)
      }

      const frontendTasks = tasks?.map(convertToFrontendTask) || []
      console.log(`Controller: Returning ${frontendTasks.length} tasks from Supabase`)
      return res.json(frontendTasks)
    } else {
      console.log('Controller: Using file storage')
      const tasks = getTasks()
      console.log(`Controller: Returning ${tasks.length} tasks from file storage`)
      return res.json(tasks)
    }
  } catch (error) {
    console.error('Controller: Error getting tasks:', error)
    const tasks = getTasks()
    return res.json(tasks)
  }
}

// GET /api/tasks/:id - Get task by ID
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(`=== Controller: getTaskById called for id: ${id} ===`)
  
  try {
    if (isSupabaseConfigured && supabase) {
      const { data: task, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Controller: Supabase error:', error)
        const task = getFileTaskById(id)
        if (!task) {
          return res.status(404).json({ error: 'Task not found' })
        }
        return res.json(task)
      }

      return res.json(convertToFrontendTask(task))
    } else {
      const task = getFileTaskById(id)
      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }
      return res.json(task)
    }
  } catch (error) {
    console.error('Controller: Error getting task:', error)
    return res.status(500).json({ error: 'Failed to get task' })
  }
}

// POST /api/tasks - Create new task
export const createTask = async (req: Request, res: Response) => {
  console.log('=== Controller: createTask called ===')
  console.log('Controller: Request body:', req.body)
  
  try {
    const { title, description, completed, priority, dueDate } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    if (isSupabaseConfigured && supabase) {
      console.log('Controller: Using Supabase storage')
      
      const taskData = {
        title,
        description: description || null,
        completed: completed || false,
        priority: priority || 'medium',
        due_date: dueDate || null,
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single()

      if (error) {
        console.error('Controller: Supabase error:', error)
        console.log('Controller: Falling back to file storage')
        
        const newTask = addTask({
          title,
          description,
          completed: completed || false,
          priority: priority || 'medium',
          dueDate,
        })
        
        return res.status(201).json(newTask)
      }

      const frontendTask = convertToFrontendTask(data)
      console.log('Controller: Created task:', frontendTask)
      return res.status(201).json(frontendTask)
    } else {
      console.log('Controller: Using file storage')
      
      const newTask = addTask({
        title,
        description,
        completed: completed || false,
        priority: priority || 'medium',
        dueDate,
      })
      
      console.log('Controller: Created task:', newTask)
      return res.status(201).json(newTask)
    }
  } catch (error) {
    console.error('Controller: Error creating task:', error)
    return res.status(500).json({ error: 'Failed to create task' })
  }
}

// PUT /api/tasks/:id - Update task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(`=== Controller: updateTask called for id: ${id} ===`)
  console.log('Controller: Update data:', req.body)
  
  try {
    if (isSupabaseConfigured && supabase) {
      const updateData: any = {}
      
      if (req.body.title !== undefined) updateData.title = req.body.title
      if (req.body.description !== undefined) updateData.description = req.body.description
      if (req.body.completed !== undefined) updateData.completed = req.body.completed
      if (req.body.priority !== undefined) updateData.priority = req.body.priority
      if (req.body.dueDate !== undefined) updateData.due_date = req.body.dueDate
      
      updateData.updated_at = new Date().toISOString()

      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Controller: Supabase error:', error)
        const updatedTask = updateFileTask(id, req.body)
        if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' })
        }
        return res.json(updatedTask)
      }

      return res.json(convertToFrontendTask(data))
    } else {
      const updatedTask = updateFileTask(id, req.body)
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' })
      }
      return res.json(updatedTask)
    }
  } catch (error) {
    console.error('Controller: Error updating task:', error)
    return res.status(500).json({ error: 'Failed to update task' })
  }
}

// DELETE /api/tasks/:id - Delete task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(`=== Controller: deleteTask called for id: ${id} ===`)
  
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Controller: Supabase error:', error)
        const success = deleteFileTask(id)
        if (!success) {
          return res.status(404).json({ error: 'Task not found' })
        }
        return res.status(204).send()
      }

      return res.status(204).send()
    } else {
      const success = deleteFileTask(id)
      if (!success) {
        return res.status(404).json({ error: 'Task not found' })
      }
      return res.status(204).send()
    }
  } catch (error) {
    console.error('Controller: Error deleting task:', error)
    return res.status(500).json({ error: 'Failed to delete task' })
  }
}
