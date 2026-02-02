import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  CheckSquare,
  Info,
  Settings,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "About", path: "/about", icon: Info },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col shadow-xl`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Priorify
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Task Manager</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className={`${sidebarOpen ? "block" : "hidden"} mb-4`}>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">
              General
            </p>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    }`}
                  />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <User className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">user@priorify.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Left side - Menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Center - App Title */}
            <div className="flex-1 mx-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Priorify
              </h2>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:shadow-xl transition">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}