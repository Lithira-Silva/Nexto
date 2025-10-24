import { useState } from 'react'

export default function SimpleTaskForm() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    setResult('Submitting...')

    try {
      console.log('Making POST request to /api/tasks')
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          priority: 'medium',
          completed: false
        }),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        setResult(`Error: ${response.status} - ${errorText}`)
        return
      }

      const newTask = await response.json()
      console.log('Created task:', newTask)
      setResult(`Success: Created task "${newTask.title}" with ID ${newTask.id}`)
      setTitle('')
    } catch (error) {
      console.error('Request failed:', error)
      setResult(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', background: '#f9f9f9' }}>
      <h3>Simple Task Form Test</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            style={{ padding: '8px', width: '300px' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !title.trim()}
          style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none' }}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#e9ecef' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  )
}
