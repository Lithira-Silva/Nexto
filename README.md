# NexTo - Modern To-Do List Application

A feature-rich, modern to-do list application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

✨ **Modern UI/UX**
- Clean, responsive design with Tailwind CSS
- Custom color palette with NexTo branding
- Smooth transitions and animations

📝 **Task Management**
- Create, read, update, and delete tasks
- Task descriptions and due dates
- Priority levels (Low, Medium, High)
- Task completion tracking

🔍 **Advanced Filtering & Search**
- Search tasks by title or description
- Filter by status (All, Active, Completed)
- Sort by creation date, due date, priority, or alphabetically
- Real-time task statistics

🚀 **Modern Architecture**
- Next.js 15 with App Router
- TypeScript for type safety
- Zustand for state management
- RESTful API routes for data operations
- Component-based architecture

## Prerequisites

Before running this project, ensure you have:

- **Node.js**: Version 18.18.0 or higher, or version 19.8.0 or higher, or version 20.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

### Checking Your Node.js Version

```bash
node --version
npm --version
```

If your Node.js version is outdated, please update it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. **Clone or download the project**
   ```bash
   cd NextTo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
NextTo/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   └── tasks/      # Task CRUD operations
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── Header.tsx      # App header
│   │   ├── TaskCard.tsx    # Individual task display
│   │   ├── TaskForm.tsx    # Task creation form
│   │   └── TaskList.tsx    # Task list with filtering
│   └── store/              # State management
│       └── taskStore.ts    # Zustand task store
├── public/                 # Static assets
├── .github/               # GitHub configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## API Endpoints

The application includes RESTful API routes:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## Color Palette

NexTo uses a custom color palette defined in Tailwind config:

- Primary: `#2B3A67` (nexto-primary)
- Secondary: `#3E4A73` (nexto-secondary)
- Accent: `#5A67BA` (nexto-accent)
- Light: `#F8F9FA` (nexto-light)
- Dark: `#1A2040` (nexto-dark)

## Development Features

### Component Architecture

- **TaskCard**: Displays individual tasks with editing capabilities
- **TaskForm**: Handles task creation with validation
- **TaskList**: Manages task display with filtering and sorting
- **Header**: Application branding and navigation

### State Management

Uses Zustand for lightweight, efficient state management:
- Task CRUD operations
- Loading states
- Error handling
- Local storage persistence (can be added)

### Styling

- Responsive design with mobile-first approach
- Custom color palette
- Consistent spacing and typography
- Smooth animations and transitions

## Future Enhancements

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Drag and drop reordering
- [ ] Task reminders/notifications
- [ ] Data persistence with database
- [ ] Team collaboration features
- [ ] Export/import functionality
- [ ] Progressive Web App (PWA) features

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies
