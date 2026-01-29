import { Link } from "react-router-dom";
import { CheckSquare, Zap, Filter, Search } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <CheckSquare className="w-20 h-20 text-blue-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Priorify
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Organize, prioritize, and track your tasks in a clear and structured way.
          Stay focused on what matters most and manage your workflow efficiently.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/tasks"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors text-lg font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <FeatureCard
          icon={<CheckSquare className="w-8 h-8 text-blue-600" />}
          title="Task Management"
          description="Add, edit, delete, and complete tasks with ease"
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-yellow-600" />}
          title="Priority Levels"
          description="Assign and manage priority levels for your tasks"
        />
        <FeatureCard
          icon={<Filter className="w-8 h-8 text-green-600" />}
          title="Filter by Priority"
          description="Quickly find tasks based on their priority"
        />
        <FeatureCard
          icon={<Search className="w-8 h-8 text-purple-600" />}
          title="Dynamic Search"
          description="Search tasks by title in real-time"
        />
      </div>

      {/* CTA */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="text-gray-600 mb-6">
          Your tasks are stored locally in your browser for quick access.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block font-medium"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Home;
