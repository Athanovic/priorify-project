# Priorify✅

Priorify is a modern task management web application designed to help users organize, prioritize, and track tasks efficiently.  
It focuses on clarity, productivity, and clean UI while demonstrating strong React fundamentals.

---

## Features

- Create, edit, and delete tasks
- Assign task priorities (High, Medium, Low)
- Mark tasks as completed
- Filter and search tasks
- Dashboard with statistics and charts
- Persistent data using localStorage
- Light / Dark mode support
- Import and export task data
- Responsive and user-friendly UI

---

## Tech Stack

- **React (Vite)**
- **React Router**
- **Tailwind CSS**
- **Recharts**
- **Lucide Icons**
- **LocalStorage API**

---

## Setup Instructions
Follow these steps to run the project locally:

1. **Clone the repository**
git clone https://github.com/your-username/priorify-project.git

2. **Navigate into the project folder**
cd priorify-project

3. **Install dependencies**
npm install

4. **Start the development server**
npm run dev

5. **Open in your browser**
http://localhost:5173


## Custom Hooks Overview

### `useTasks`

Manages all task-related logic in the application:

- Add new tasks
- Update existing tasks
- Delete tasks
- Toggle task completion status
- Persist tasks in localStorage for data retention

---

### `useLocalStorage`

A reusable custom hook that synchronizes React state with the browser’s `localStorage` to ensure data persistence across page reloads and sessions.

---

### `useSettings`

Handles application-wide user preferences:

- Theme switching (Light / Dark mode)
- Notification toggling
- Resetting all application data

---

### `useTaskFilters`

Provides task filtering, searching, and statistics logic:

- Search tasks by title or description
- Filter tasks by priority level
- Toggle visibility of completed tasks
- Compute task statistics (total, completed, high-priority tasks)


## Component Tree

App
└── Layout
    ├── Navbar
    ├── Outlet
    │   ├── Home
    │   ├── Dashboard
    │   │   ├── StatCard
    │   │   └── Charts
    │   ├── Tasks
    │   │   ├── FilterBar
    │   │   ├── TaskCard
    │   │   └── TaskForm
    │   ├── Settings
    │   └── About
    └── Footer


## Team Roles

### 🎨 Frontend Architect & UX Strategist
Responsible for designing the user interface, defining layout structure, and building a scalable component architecture that ensures a clean and intuitive user experience.


### Stateflow Engineer
Implemented the core application logic, developed custom React hooks, and managed state flow and data persistence throughout the application.


### Integration & Quality Engineer (QA)
Ensured smooth integration between components, verified routing correctness, validated data persistence, and maintained overall application stability and quality.


## Live Demo
priorify-project-rkkr-r6jmqike2-athanas-mochama-projects.vercel.app