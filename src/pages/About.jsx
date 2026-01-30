import { useEffect } from "react";
import { CheckSquare, Target, Users, Zap, Heart, Shield, Code, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
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
      icon: <Target className="w-6 h-6" />,
      title: "Goal-Oriented",
      description: "Stay focused on what truly matters with priority-based task management",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built with performance in mind for seamless task management",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data stays local in your browser, ensuring complete privacy",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User Friendly",
      description: "Intuitive interface designed for productivity and ease of use",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const techStack = [
    { name: "React", color: "from-cyan-500 to-blue-600" },
    { name: "Tailwind CSS", color: "from-teal-500 to-cyan-600" },
    { name: "Recharts", color: "from-purple-500 to-pink-600" },
    { name: "Lucide Icons", color: "from-orange-500 to-red-600" },
  ];

  const developers = [
    { 
      name: "Lydia Buchichi", 
      initials: "LB", 
      color: "from-pink-600 to-rose-600",
      role: "Frontend Experience (UI/UX) Architect"
    },
    { 
      name: "Edwin Bururgu", 
      initials: "EB", 
      color: "from-purple-600 to-indigo-600",
      role: "State & Logic Systems Engineer"
    },
    { 
      name: "Athanas Mochama", 
      initials: "AM", 
      color: "from-indigo-600 to-blue-600",
      role: "System Integration & Debugging Engineer"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" />
            About Priorify
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Task Management
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Made Simple & Powerful
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Priorify is a modern task management application designed to help you organize,
            prioritize, and complete your tasks efficiently. Built with the latest web
            technologies, it offers a seamless and intuitive experience.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-12 text-white shadow-2xl dark:shadow-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        
        <div className="relative text-center max-w-3xl mx-auto">
          <CheckSquare className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed opacity-95">
            To empower individuals and teams to achieve their goals by providing a simple,
            yet powerful task management solution that adapts to their workflow and helps
            them stay focused on what matters most.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Why Choose Priorify?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Designed with your productivity in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-indigo-900/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-10">
          <Code className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">Built With Modern Technology</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Powered by industry-leading tools and frameworks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="text-center group">
              <div className={`bg-gradient-to-br ${tech.color} rounded-2xl p-6 mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all`}>
                <p className="text-white font-bold text-lg">{tech.name.charAt(0)}</p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-50">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 border border-gray-100 dark:border-gray-700/50">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Meet Our Development Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Priorify is a student project created with passion and dedication to learning
            modern web development technologies and building practical solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {developers.map((dev, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-indigo-900/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2"
            >
              <div className={`w-24 h-24 bg-gradient-to-br ${dev.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                {dev.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 text-center">
                {dev.name}
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold text-center mb-3">
                {dev.role}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-3"></div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {index === 0 && "Crafting beautiful and intuitive user experiences"}
                {index === 1 && "Building robust state management and application logic"}
                {index === 2 && "Ensuring seamless integration and bug-free performance"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Start organizing your tasks today and boost your productivity
        </p>
        <Link
          to="/tasks"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all text-lg font-semibold"
        >
          <CheckSquare className="w-5 h-5" />
          Start Using Priorify
        </Link>
      </div>
    </div>
  );
}

export default About;