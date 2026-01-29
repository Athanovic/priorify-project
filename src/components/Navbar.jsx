import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  CheckSquare,
  Info,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">Priorify</h1>

        {/* Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClasses}>
            <Home className="w-4 h-4" />
            Home
          </NavLink>

          <NavLink to="/dashboard" className={linkClasses}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className={linkClasses}>
            <CheckSquare className="w-4 h-4" />
            Tasks
          </NavLink>

          <NavLink to="/about" className={linkClasses}>
            <Info className="w-4 h-4" />
            About
          </NavLink>

          <NavLink to="/settings" className={linkClasses}>
            <Settings className="w-4 h-4" />
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
