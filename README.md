# NexTo - Modern Task Management Application# NexTo - Modern Task Management Application# NexTo - Modern To-Do List Application



A full-stack task management application with clean separation between frontend and backend.



## 🏗️ Project StructureA full-stack task management application with separate client and backend architecture.A feature-rich, modern to-do list application built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.



```

NextTo/

├── client/              # Frontend Application (Next.js)## 🏗️ Project Structure## Features

├── backend/             # Backend API Server (Express.js)

├── docs/                # Documentation

└── README.md            # This file

``````✨ **Modern UI/UX**



## 🚀 Quick StartNextTo/- Clean, responsive design with Tailwind CSS



### Prerequisites├── client/           # Next.js Frontend Application- Custom color palette with NexTo branding

- Node.js 18.18.0 or higher

- npm or yarn│   ├── src/- Smooth transitions and animations



### Installation & Running│   │   ├── app/         # Next.js App Router pages- Dark/light theme support



**1. Install Dependencies**│   │   ├── components/  # React components



```bash│   │   ├── lib/         # Utilities and helpers📝 **Task Management**

# Install backend dependencies

cd backend│   │   └── store/       # Zustand state management- Create, read, update, and delete tasks

npm install

│   ├── public/          # Static assets- Task descriptions and due dates

# Install frontend dependencies

cd ../client│   └── package.json- Priority levels (Low, Medium, High)

npm install

```│- Task completion tracking



**2. Configure Environment Variables**├── backend/          # Express.js Backend API



**Backend** (`backend/.env`):│   ├── src/� **Calendar Views**

```env

PORT=5000│   │   ├── controllers/ # Business logic- Daily, weekly, and monthly calendar views

NODE_ENV=development

CLIENT_URL=http://localhost:3000│   │   ├── routes/      # API routes- Task visualization by due dates



# Optional: Supabase Configuration│   │   ├── utils/       # Utility functions- Navigation between time periods

SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_anon_key│   │   ├── config/      # Configuration files- Visual task analytics and statistics

```

│   │   └── server.ts    # Express server

**Client** (`client/.env.local`):

```env│   └── package.json�🔍 **Advanced Filtering & Search**

NEXT_PUBLIC_API_URL=http://localhost:5000/api

```│- Search tasks by title or description



**3. Start the Application**└── README.md- Filter by status (All, Active, Completed)



**Terminal 1 - Backend:**```- Sort by creation date, due date, priority, or alphabetically

```bash

cd backend- Real-time task statistics

npm run dev

```## 🚀 Getting Started

✅ Backend runs on: http://localhost:5000

🚀 **Backend & Database**

**Terminal 2 - Frontend:**

```bash### Prerequisites- **Supabase Integration**: PostgreSQL database with real-time capabilities

cd client

npm run dev- **Hybrid Storage**: Automatic fallback to file storage if Supabase unavailable

```

✅ Frontend runs on: http://localhost:3000- Node.js 18.18.0 or higher- **Persistent Storage**: Tasks saved permanently in the cloud



## 📚 Documentation- npm or yarn- **Type Safety**: Full TypeScript integration with database types



- **[Quick Start Guide](./QUICKSTART.md)** - Common commands and troubleshooting- Supabase account (optional, falls back to file storage)- **Row Level Security**: Secure data access patterns

- **[Project Restructuring](./docs/RESTRUCTURING_SUMMARY.md)** - Details about the architecture

- **[Supabase Setup](./docs/SUPABASE_SETUP.md)** - Database configuration guide- **Real-time Updates**: Changes sync instantly across sessions

- **[Important Notes](./docs/IMPORTANT_READ_ME.md)** - Critical information about the structure

### Installation

## 🎯 Features

🏗️ **Modern Architecture**

- ✅ Task Management (Create, Read, Update, Delete)

- ✅ Priority Levels (Low, Medium, High)1. **Clone the repository**- Next.js 14 with App Router

- ✅ Due Date Tracking

- ✅ Calendar View   ```bash- TypeScript for type safety

- ✅ AI-Powered Insights

- ✅ Analytics Dashboard   git clone https://github.com/Lithira-Silva/Nexto.git- Zustand for state management

- ✅ Dark/Light Mode

- ✅ Responsive Design   cd NextTo- Supabase for backend services



## 🛠️ Technology Stack   ```- RESTful API routes with database integration



### Frontend (`client/`)- Component-based architecture

- Next.js 14 (App Router)

- TypeScript2. **Install Client Dependencies**

- Tailwind CSS

- Zustand (State Management)   ```bash## Prerequisites

- Lucide React (Icons)

   cd client

### Backend (`backend/`)

- Express.js   npm installBefore running this project, ensure you have:

- TypeScript

- Supabase (Database)   ```

- CORS enabled

- RESTful API- **Node.js**: Version 18.18.0 or higher, or version 19.8.0 or higher, or version 20.0.0 or higher



## 📡 API Endpoints3. **Install Backend Dependencies**- **npm**: Version 9.0.0 or higher (comes with Node.js)



Base URL: `http://localhost:5000/api`   ```bash



| Method | Endpoint | Description |   cd ../backend### Checking Your Node.js Version

|--------|----------|-------------|

| GET | `/tasks` | Get all tasks |   npm install

| POST | `/tasks` | Create new task |

| GET | `/tasks/:id` | Get task by ID |   ``````bash

| PUT | `/tasks/:id` | Update task |

| DELETE | `/tasks/:id` | Delete task |node --version



## 🧪 Testing the API4. **Configure Environment Variables**npm --version



```bash```

# Health check

curl http://localhost:5000/health   **Backend (.env)**



# Get all tasks   ```bashIf your Node.js version is outdated, please update it from [nodejs.org](https://nodejs.org/).

curl http://localhost:5000/api/tasks

   cd backend

# Create a task

curl -X POST http://localhost:5000/api/tasks \   # Create .env file with:## Getting Started

  -H "Content-Type: application/json" \

  -d '{"title":"My Task","priority":"high"}'   PORT=5000

```

   NODE_ENV=development### Prerequisites

## 📦 Project Organization

   CLIENT_URL=http://localhost:3000

### Client Structure

```   Before running this project, ensure you have:

client/

├── src/   # Optional: Supabase Configuration

│   ├── app/              # Next.js pages and layouts

│   ├── components/       # React components   SUPABASE_URL=your_supabase_url- **Node.js**: Version 18.18.0 or higher

│   ├── store/            # Zustand state management

│   └── lib/              # Utilities and helpers   SUPABASE_ANON_KEY=your_supabase_anon_key- **npm**: Version 9.0.0 or higher (comes with Node.js)

├── public/               # Static assets

├── .env.local            # Environment variables   ```- **Supabase Account**: Free account at [supabase.com](https://supabase.com)

└── package.json          # Dependencies

```



### Backend Structure   **Client (.env.local)**### Quick Setup

```

backend/   ```bash

├── src/

│   ├── server.ts         # Express server   cd ../client1. **Clone or download the project**

│   ├── routes/           # API routes

│   ├── controllers/      # Business logic   # Create .env.local file with:   ```bash

│   ├── utils/            # Utility functions

│   └── config/           # Configuration   NEXT_PUBLIC_API_URL=http://localhost:5000/api   cd NextTo

├── .env                  # Environment variables

└── package.json          # Dependencies   ```   ```

```



## 🔧 Development

### Running the Application2. **Install dependencies**

### Available Commands

   ```bash

**Backend:**

```bashYou need to run both the backend and frontend servers:   npm install

cd backend

npm run dev      # Start development server   ```

npm run build    # Build for production

npm start        # Start production server#### Option 1: Run in Separate Terminals

```

3. **Set up Supabase Backend**

**Frontend:**

```bash**Terminal 1 - Start Backend:**   

cd client

npm run dev      # Start development server```bash   **Option A: Quick Start (Skip backend for now)**

npm run build    # Build for production

npm start        # Start production servercd backend   ```bash

```

npm run dev   # The app will work with mock data initially

## 🚢 Deployment

```   npm run dev

### Backend

- Recommended: Railway, Render, Heroku, AWSBackend will run on: `http://localhost:5000`   ```

- Build command: `npm run build`

- Start command: `npm start`   

- Set environment variables on hosting platform

**Terminal 2 - Start Frontend:**   **Option B: Full Setup with Database**

### Frontend

- Recommended: Vercel, Netlify, AWS Amplify```bash   - Follow the detailed guide in `SUPABASE_SETUP.md`

- Build command: `npm run build`

- Start command: `npm start`cd client   - Create Supabase project and get credentials

- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL

npm run dev   - Update `.env.local` with your Supabase URL and API key

## 🐛 Troubleshooting

```   - Run the SQL schema in Supabase dashboard

### Port already in use

```bashFrontend will run on: `http://localhost:3000`

# Find process

netstat -ano | findstr :50004. **Start the development server**



# Kill process### 🌐 Access the Application   ```bash

taskkill /PID <PID> /F

```   npm install



### Frontend can't connect to backend- **Frontend**: http://localhost:3000   ```

- Ensure backend is running on port 5000

- Check `NEXT_PUBLIC_API_URL` in `client/.env.local`- **Backend API**: http://localhost:5000

- Verify CORS is enabled in backend

- **API Health Check**: http://localhost:5000/health3. **Run the development server**

### Tasks not persisting

- Check Supabase configuration in `backend/.env`   ```bash

- File storage fallback is enabled automatically

- Check backend console for error messages## 📡 API Endpoints   npm run dev



## 📝 License   ```



MIT License### Base URL: `http://localhost:5000/api`



## 👤 Author4. **Open your browser**



**Lithira Silva**| Method | Endpoint | Description |   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

- GitHub: [@Lithira-Silva](https://github.com/Lithira-Silva)

- Repository: [Nexto](https://github.com/Lithira-Silva/Nexto)|--------|----------|-------------|



## 🤝 Contributing| GET | `/tasks` | Get all tasks |## Available Scripts



Contributions, issues, and feature requests are welcome!| GET | `/tasks/:id` | Get task by ID |



1. Fork the repository| POST | `/tasks` | Create new task |- `npm run dev` - Starts the development server

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)| PUT | `/tasks/:id` | Update task |- `npm run build` - Builds the app for production

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request| DELETE | `/tasks/:id` | Delete task |- `npm start` - Runs the built app in production mode



## ⭐ Show your support- `npm run lint` - Runs ESLint to check for code issues



Give a ⭐️ if this project helped you!### Example API Requests



---## Project Structure



**Made with ❤️ using Next.js and Express.js****Create Task:**


```bash```

curl -X POST http://localhost:5000/api/tasks \NextTo/

  -H "Content-Type: application/json" \├── src/

  -d '{│   ├── app/                 # Next.js App Router

    "title": "Complete project",│   │   ├── api/            # API routes

    "description": "Finish the NexTo application",│   │   │   └── tasks/      # Task CRUD operations

    "priority": "high",│   │   ├── globals.css     # Global styles

    "dueDate": "2025-10-30"│   │   ├── layout.tsx      # Root layout

  }'│   │   └── page.tsx        # Home page

```│   ├── components/         # React components

│   │   ├── Header.tsx      # App header

**Get All Tasks:**│   │   ├── TaskCard.tsx    # Individual task display

```bash│   │   ├── TaskForm.tsx    # Task creation form

curl http://localhost:5000/api/tasks│   │   ├── TaskList.tsx    # Task list with filtering

```│   │   └── TaskCalendar.tsx # Calendar views

│   ├── lib/               # Utility libraries

## 🎨 Features│   │   ├── supabase.ts    # Supabase client configuration

│   │   └── taskData.ts    # File storage fallback

- ✅ **Task Management**: Create, read, update, and delete tasks│   └── store/             # State management

- ✅ **Priority Levels**: Low, medium, and high priority tasks│       └── taskStore.ts   # Zustand task store

- ✅ **Due Dates**: Set and track task deadlines├── database/              # Database schema

- ✅ **Calendar View**: Visualize tasks in a calendar format│   └── schema.sql         # PostgreSQL schema for Supabase

- ✅ **AI Insights**: Get intelligent insights about your tasks├── public/                # Static assets

- ✅ **Analytics**: Track task completion and productivity├── .env.local.example     # Environment variables template

- ✅ **Dark/Light Mode**: Toggle between themes├── SUPABASE_SETUP.md      # Backend setup guide

- ✅ **Glass Morphism UI**: Modern, beautiful design├── package.json           # Dependencies and scripts

- ✅ **Responsive**: Works on desktop and mobile devices├── tailwind.config.js     # Tailwind configuration

├── tsconfig.json         # TypeScript configuration

## 🛠️ Technology Stack└── next.config.js        # Next.js configuration

```

### Frontend (Client)

- **Framework**: Next.js 14 with App Router## Technologies Used

- **Language**: TypeScript

- **Styling**: Tailwind CSS### Frontend

- **State Management**: Zustand- **[Next.js 14](https://nextjs.org/)** - React framework with App Router

- **Icons**: Lucide React- **[React 18](https://reactjs.org/)** - UI library

- **Date Handling**: date-fns- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

- **Framework**: Express.js- **[Lucide React](https://lucide.dev/)** - Beautiful icons

- **Language**: TypeScript

- **Database**: Supabase PostgreSQL (with file fallback)### Backend & Database

- **CORS**: Enabled for client communication- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL

- **[PostgreSQL](https://postgresql.org/)** - Robust relational database

## 📦 Build for Production- **Row Level Security** - Database-level security policies

- **Real-time subscriptions** - Live data updates

### Backend

```bash### Development & Tooling

cd backend- **[ESLint](https://eslint.org/)** - Code linting

npm run build- **[Prettier](https://prettier.io/)** - Code formatting

npm start- **File Storage Fallback** - Works without backend during development

```

## API Endpoints

### Client

```bashThe application includes RESTful API routes with hybrid storage:

cd client

npm run build- `GET /api/tasks` - Get all tasks (Supabase or file storage)

npm start- `POST /api/tasks` - Create a new task

```- `GET /api/tasks/[id]` - Get a specific task

- `PUT /api/tasks/[id]` - Update a task

## 🔧 Development- `DELETE /api/tasks/[id]` - Delete a task



### Backend Structure**Storage Strategy**: The API automatically uses Supabase when configured, falling back to file storage for development without a backend.

- `src/server.ts` - Express server setup

- `src/routes/` - API route definitions## Color Palette

- `src/controllers/` - Request handlers and business logic

- `src/utils/` - Utility functions and file storageNexTo uses a custom color palette defined in Tailwind config:

- `src/config/` - Configuration files (Supabase, etc.)

- Primary: `#2B3A67` (nexto-primary)

### Client Structure- Secondary: `#3E4A73` (nexto-secondary)

- `src/app/` - Next.js pages and layouts- Accent: `#5A67BA` (nexto-accent)

- `src/components/` - Reusable React components- Light: `#F8F9FA` (nexto-light)

- `src/store/` - Zustand state management- Dark: `#1A2040` (nexto-dark)

- `src/lib/` - Utility functions and helpers

## Development Features

## 🐛 Troubleshooting

### Component Architecture

### Backend won't start

- Check if port 5000 is already in use- **TaskCard**: Displays individual tasks with editing capabilities

- Verify environment variables in `.env`- **TaskForm**: Handles task creation with validation

- Run `npm install` in backend directory- **TaskList**: Manages task display with filtering and sorting

- **Header**: Application branding and navigation

### Client can't connect to backend

- Ensure backend is running on port 5000### State Management

- Check `NEXT_PUBLIC_API_URL` in client `.env.local`

- Verify CORS is enabled in backendUses Zustand for lightweight, efficient state management:

- Task CRUD operations

### Tasks not persisting- Loading states

- Check Supabase configuration- Error handling

- Verify file permissions for file storage fallback- Local storage persistence (can be added)

- Check backend logs for errors

### Styling

## 📝 License

- Responsive design with mobile-first approach

This project is licensed under the MIT License.- Custom color palette

- Consistent spacing and typography

## 👤 Author- Smooth animations and transitions



**Lithira Silva**## Future Enhancements

- GitHub: [@Lithira-Silva](https://github.com/Lithira-Silva)

- Repository: [NexTo](https://github.com/Lithira-Silva/Nexto)- [ ] User authentication

- [ ] Task categories/tags

## 🤝 Contributing- [ ] Drag and drop reordering

- [ ] Task reminders/notifications

Contributions, issues, and feature requests are welcome!- [ ] Data persistence with database

- [ ] Team collaboration features

## ⭐ Show your support- [ ] Export/import functionality

- [ ] Progressive Web App (PWA) features

Give a ⭐️ if this project helped you!

## Contributing

---

1. Fork the project

**Made with ❤️ using Next.js and Express**2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies
