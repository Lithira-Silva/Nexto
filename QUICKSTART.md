# 🚀 Quick Start Guide - NexTo

## ✅ Your Project is Now Separated!

Your NexTo application is now split into **two independent folders**:

```
NextTo/
├── client/     ← Frontend (Next.js)
└── backend/    ← Backend API (Express.js)
```

---

## 🎯 Running the Application

### Method 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on: **http://localhost:5000**

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend runs on: **http://localhost:3000**

### Method 2: PowerShell One-Liner
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"
```

---

## 📁 Project Structure

### **Client** (Frontend)
```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main task page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskCalendar.tsx
│   │   ├── AIInsights.tsx
│   │   ├── TaskAnalytics.tsx
│   │   └── Header.tsx
│   ├── store/
│   │   └── taskStore.ts    # Zustand state management
│   └── lib/                # Utilities
├── .env.local              # Environment variables
└── package.json
```

### **Backend** (API Server)
```
backend/
├── src/
│   ├── server.ts           # Express server
│   ├── routes/
│   │   └── tasks.ts        # Task routes
│   ├── controllers/
│   │   └── taskController.ts  # Business logic
│   ├── utils/
│   │   └── taskData.ts     # Data storage
│   └── config/
│       └── supabase.ts     # Supabase config
├── .env                    # Environment variables
└── package.json
```

---

## 🔧 Environment Variables

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Optional: Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### Client (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main application UI |
| **Backend** | http://localhost:5000 | API server |
| **Health Check** | http://localhost:5000/health | Server status |
| **API Tasks** | http://localhost:5000/api/tasks | Task endpoints |

---

## 🧪 Testing the API

### Using cURL (PowerShell)

**Get all tasks:**
```powershell
curl http://localhost:5000/api/tasks
```

**Create a task:**
```powershell
curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d '{\"title\":\"Test Task\",\"priority\":\"high\"}'
```

**Check server health:**
```powershell
curl http://localhost:5000/health
```

---

## 📦 Available Scripts

### Backend
```bash
cd backend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Client
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🛠️ Common Issues & Solutions

### ❌ Port 5000 already in use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### ❌ Client can't connect to backend
1. Ensure backend is running on port 5000
2. Check `.env.local` in client folder:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Verify CORS is enabled in backend

### ❌ npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🎨 Key Features

✅ **Separate Client & Backend** - Easy to deploy independently  
✅ **TypeScript** - Full type safety  
✅ **RESTful API** - Standard HTTP endpoints  
✅ **CORS Enabled** - Client-server communication  
✅ **File Storage Fallback** - Works without database  
✅ **Supabase Integration** - Optional cloud database  
✅ **Hot Reload** - Both servers support live reload  

---

## 🚢 Deployment

### Backend
- Deploy to: Heroku, Railway, Render, AWS, etc.
- Set environment variables on hosting platform
- Build command: `npm run build`
- Start command: `npm start`

### Frontend
- Deploy to: Vercel, Netlify, AWS Amplify, etc.
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Build command: `npm run build`
- Start command: `npm start`

---

## 📚 API Documentation

### Endpoints

**GET `/api/tasks`**
- Returns: Array of all tasks
- Example: `curl http://localhost:5000/api/tasks`

**POST `/api/tasks`**
- Body: `{ title, description, priority, dueDate }`
- Returns: Created task object

**PUT `/api/tasks/:id`**
- Body: Partial task object
- Returns: Updated task

**DELETE `/api/tasks/:id`**
- Returns: 204 No Content

---

## 💡 Tips

1. **Always start backend FIRST**, then frontend
2. **Check backend logs** for API debugging
3. **Use browser DevTools** Network tab to see API calls
4. **Backend changes** auto-reload with ts-node-dev
5. **Frontend changes** auto-reload with Next.js Fast Refresh

---

## ✨ What Changed?

### Before (Monolithic)
- All code in one `src/` folder
- API routes in `src/app/api/`
- Hard to separate concerns

### After (Separated)
- ✅ **client/** - Pure frontend (Next.js)
- ✅ **backend/** - Pure API server (Express)
- ✅ Independent deployment
- ✅ Clear separation of concerns
- ✅ Easier to scale and maintain

---

## 🎉 You're All Set!

Your NexTo application is now running with a proper client-server architecture!

**Frontend**: http://localhost:3000  
**Backend**: http://localhost:5000

Happy coding! 🚀

---

**Need help?** Check the main README.md for more detailed documentation.
