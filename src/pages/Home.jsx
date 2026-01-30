import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Zap, Filter, Search, ArrowRight, Star, TrendingUp } from "lucide-react";

function Home() {
  // Ensure theme applied consistently when this page mounts
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const features = [
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Task Management",
      description: "Add, edit, delete, and complete tasks with ease",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Priority Levels",
      description: "Assign and manage priority levels for your tasks",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Smart Filters",
      description: "Quickly find tasks based on their priority",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Dynamic Search",
      description: "Search tasks by title in real-time",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-indigo-200 dark:border-indigo-800">
            <Star className="w-4 h-4" />
            #1 Task Management Solution
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Organize Your Work,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Prioritize Your Life
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stay focused on what matters most. Priorify helps you manage tasks efficiently
            with a clear and structured workflow that adapts to your needs.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/tasks"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all text-lg font-semibold flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-50 px-8 py-4 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-lg font-semibold"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Tasks Completed" },
              { number: "99%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powerful features designed to boost your productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-indigo-900/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-12 text-center text-white shadow-2xl dark:shadow-indigo-900/50 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        
        <div className="relative">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already managing their tasks more efficiently with Priorify
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl"
            >
              View Dashboard
            </Link>
            <Link
              to="/tasks"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-indigo-600 transition-all font-semibold text-lg"
            >
              Start Creating Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;