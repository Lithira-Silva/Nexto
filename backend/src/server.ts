import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import taskRoutes from './routes/tasks'

// Load environment variables
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NexTo Backend API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/tasks', taskRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path
  })
})

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 NexTo Backend API Server Running    ║
║                                           ║
║   Port: ${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}            ║
║   Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}   ║
║                                           ║
║   Endpoints:                              ║
║   - GET    /health                        ║
║   - GET    /api/tasks                     ║
║   - POST   /api/tasks                     ║
║   - PUT    /api/tasks/:id                 ║
║   - DELETE /api/tasks/:id                 ║
╚═══════════════════════════════════════════╝
  `)
})

export default app
