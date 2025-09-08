import OpenAI from 'openai'

// Initialize OpenAI client (for demo purposes, we'll use a mock implementation)
// In production, you would use: const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface AITaskAnalysis {
  priority: 'low' | 'medium' | 'high'
  category: string
  estimatedTime: string
  suggestions: string[]
  dueDate?: string
}

export interface AIInsight {
  type: 'productivity' | 'scheduling' | 'focus' | 'completion'
  title: string
  description: string
  action?: string
}

// Mock AI analysis for demo purposes
export async function analyzeTaskWithAI(taskTitle: string, taskDescription?: string): Promise<AITaskAnalysis> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const input = (taskTitle + ' ' + (taskDescription || '')).toLowerCase()
  
  // Simple rule-based analysis (in production, this would use actual AI)
  let priority: 'low' | 'medium' | 'high' = 'medium'
  let category = 'General'
  let estimatedTime = '30 minutes'
  let suggestions: string[] = []
  
  // Priority analysis
  if (input.includes('urgent') || input.includes('asap') || input.includes('important')) {
    priority = 'high'
  } else if (input.includes('later') || input.includes('someday') || input.includes('maybe')) {
    priority = 'low'
  }
  
  // Category detection
  if (input.includes('meeting') || input.includes('call') || input.includes('interview')) {
    category = 'Meetings'
    estimatedTime = '60 minutes'
  } else if (input.includes('email') || input.includes('message') || input.includes('reply')) {
    category = 'Communication'
    estimatedTime = '15 minutes'
  } else if (input.includes('code') || input.includes('develop') || input.includes('programming')) {
    category = 'Development'
    estimatedTime = '2 hours'
  } else if (input.includes('design') || input.includes('ui') || input.includes('ux')) {
    category = 'Design'
    estimatedTime = '90 minutes'
  } else if (input.includes('research') || input.includes('study') || input.includes('learn')) {
    category = 'Research'
    estimatedTime = '45 minutes'
  }
  
  // Smart suggestions
  if (category === 'Meetings') {
    suggestions = [
      'Schedule for morning when energy is highest',
      'Prepare agenda beforehand',
      'Set clear time limits'
    ]
  } else if (category === 'Development') {
    suggestions = [
      'Break into smaller subtasks',
      'Use pomodoro technique',
      'Test thoroughly before completing'
    ]
  } else if (priority === 'high') {
    suggestions = [
      'Consider doing this first today',
      'Block calendar time for focus',
      'Minimize distractions'
    ]
  } else {
    suggestions = [
      'Consider batching with similar tasks',
      'Schedule during low-energy periods',
      'Set a realistic deadline'
    ]
  }
  
  return {
    priority,
    category,
    estimatedTime,
    suggestions,
    dueDate: priority === 'high' ? 'today' : undefined
  }
}

export async function generateAIInsights(tasks: any[]): Promise<AIInsight[]> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const insights: AIInsight[] = []
  
  if (tasks.length === 0) {
    insights.push({
      type: 'productivity',
      title: 'Ready to Start!',
      description: 'Create your first task to begin your productivity journey.',
      action: 'Add a task'
    })
    return insights
  }
  
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  
  // Productivity insights
  if (completionRate > 80) {
    insights.push({
      type: 'productivity',
      title: 'Excellent Progress!',
      description: `You've completed ${completionRate.toFixed(0)}% of your tasks. Keep up the momentum!`,
      action: 'Review completed tasks'
    })
  } else if (completionRate < 30) {
    insights.push({
      type: 'focus',
      title: 'Focus Opportunity',
      description: 'Consider breaking large tasks into smaller, manageable chunks.',
      action: 'Break down tasks'
    })
  }
  
  // Scheduling insights
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length
  if (highPriorityTasks > 3) {
    insights.push({
      type: 'scheduling',
      title: 'Priority Balance',
      description: `You have ${highPriorityTasks} high-priority tasks. Consider spreading them across multiple days.`,
      action: 'Reschedule tasks'
    })
  }
  
  // Completion insights
  const overdueTasks = tasks.filter(t => {
    if (!t.dueDate || t.completed) return false
    return new Date(t.dueDate) < new Date()
  }).length
  
  if (overdueTasks > 0) {
    insights.push({
      type: 'completion',
      title: 'Overdue Tasks',
      description: `${overdueTasks} task${overdueTasks > 1 ? 's are' : ' is'} overdue. Consider updating deadlines or priorities.`,
      action: 'Review overdue tasks'
    })
  }
  
  return insights
}

export async function enhanceTaskWithAI(taskText: string): Promise<{
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  category?: string
  dueDate?: string
}> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // Simple natural language processing
  const input = taskText.toLowerCase()
  
  // Extract potential due dates
  let dueDate: string | undefined
  const today = new Date()
  
  if (input.includes('today')) {
    dueDate = today.toISOString().split('T')[0]
  } else if (input.includes('tomorrow')) {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    dueDate = tomorrow.toISOString().split('T')[0]
  } else if (input.includes('next week')) {
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    dueDate = nextWeek.toISOString().split('T')[0]
  }
  
  // Determine priority
  let priority: 'low' | 'medium' | 'high' = 'medium'
  if (input.includes('urgent') || input.includes('asap') || input.includes('critical')) {
    priority = 'high'
  } else if (input.includes('when you have time') || input.includes('eventually') || input.includes('someday')) {
    priority = 'low'
  }
  
  // Clean up the title
  let title = taskText
    .replace(/\b(today|tomorrow|next week|urgent|asap|critical|when you have time|eventually|someday)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
  
  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1)
  
  return {
    title,
    priority,
    dueDate
  }
}
