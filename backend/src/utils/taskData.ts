// Task interface
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

// Helper function to get local date string
const getLocalDateString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// In-memory storage for demo purposes
// In a real app, you'd use a database
export let tasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to NexTo!',
    description: 'This is your first task. You can edit, complete, or delete it.',
    completed: false,
    priority: 'medium',
    dueDate: getLocalDateString(new Date()), // Due today
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export let nextId = 2

export function getTasks(): Task[] {
  return tasks
}

export function getTask(id: string): Task | undefined {
  return tasks.find(t => t.id === id)
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find(t => t.id === id)
}

export function addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
  const newTask: Task = {
    ...task,
    id: nextId.toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  tasks.push(newTask)
  nextId++
  
  return newTask
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const taskIndex = tasks.findIndex(t => t.id === id)
  
  if (taskIndex === -1) {
    return null
  }
  
  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...updates,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  }
  
  tasks[taskIndex] = updatedTask
  return updatedTask
}

export function deleteTask(id: string): boolean {
  const taskIndex = tasks.findIndex(t => t.id === id)
  
  if (taskIndex === -1) {
    return false
  }
  
  tasks.splice(taskIndex, 1)
  return true
}
