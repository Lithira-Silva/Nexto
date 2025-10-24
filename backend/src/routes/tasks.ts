import { Router, Request, Response } from 'express'
import { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController'

const router = Router()

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks)

// GET /api/tasks/:id - Get task by ID
router.get('/:id', getTaskById)

// POST /api/tasks - Create new task
router.post('/', createTask)

// PUT /api/tasks/:id - Update task
router.put('/:id', updateTask)

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', deleteTask)

export default router
