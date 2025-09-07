import { create } from 'zustand'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface TaskStore {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTask: (id: string) => Promise<void>
  loadTasks: () => Promise<void>
  clearCompleted: () => Promise<void>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  addTask: async (taskData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      
      if (!response.ok) throw new Error('Failed to add task')
      
      const newTask = await response.json()
      set((state) => ({ 
        tasks: [...state.tasks, newTask],
        isLoading: false 
      }))
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add task',
        isLoading: false 
      })
    }
  },

  updateTask: async (id, updates) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) throw new Error('Failed to update task')
      
      const updatedTask = await response.json()
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? updatedTask : task
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update task',
        isLoading: false 
      })
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete task')
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false
      }))
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task',
        isLoading: false 
      })
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return
    
    await get().updateTask(id, { completed: !task.completed })
  },

  loadTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to load tasks')
      
      const tasks = await response.json()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load tasks',
        isLoading: false 
      })
    }
  },

  clearCompleted: async () => {
    const completedTasks = get().tasks.filter(task => task.completed)
    for (const task of completedTasks) {
      await get().deleteTask(task.id)
    }
  }
}))
