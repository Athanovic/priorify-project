import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  TrendingUp,
  ListTodo,
  Clock,
  Target,
  Award,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const { tasks } = useTasks();

  // Ensure theme applied consistently when this page mounts
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;

    const highPriority = tasks.filter(
      (t) => t.priority === "high" && !t.completed
    ).length;

    const mediumPriority = tasks.filter(
      (t) => t.priority === "medium" && !t.completed
    ).length;

    const lowPriority = tasks.filter(
      (t) => t.priority === "low" && !t.completed
    ).length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      highPriority,
      mediumPriority,
      lowPriority,
      completionRate,
    };
  }, [tasks]);

  const pieData = [
    { name: "Completed", value: stats.completed, color: "#10b981" },
    { name: "Pending", value: stats.pending, color: "#6366f1" },
  ];

  const priorityData = [
    { name: "High", value: stats.highPriority },
    { name: "Medium", value: stats.mediumPriority },
    { name: "Low", value: stats.lowPriority },
  ];

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.id).getTime() -
          new Date(a.updatedAt || a.id).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  const StatCard = ({ title, value, icon, gradient, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-indigo-900/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">{title}</p>
        <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your task overview</p>
        </div>
        <Link
          to="/tasks"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all font-semibold flex items-center gap-2"
        >
          View All Tasks
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<ListTodo className="w-7 h-7 text-white" />}
          gradient="from-blue-500 to-cyan-500"
          trend="+12%"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="w-7 h-7 text-white" />}
          gradient="from-green-500 to-emerald-500"
          trend="+8%"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="w-7 h-7 text-white" />}
          gradient="from-indigo-500 to-purple-500"
        />
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={<AlertCircle className="w-7 h-7 text-white" />}
          gradient="from-red-500 to-pink-500"
        />
      </div>

      {/* Completion Rate Card */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-2xl p-8 text-white shadow-2xl dark:shadow-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-indigo-100 dark:text-indigo-200 mb-2 font-medium">Completion Rate</p>
            <p className="text-6xl font-bold mb-2">{stats.completionRate}%</p>
            <p className="text-indigo-100 dark:text-indigo-200">Keep up the great work!</p>
          </div>
          <div className="hidden md:block">
            <Award className="w-32 h-32 opacity-20" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Completion Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 hover:shadow-2xl dark:hover:shadow-indigo-900/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Task Status</h2>
            <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>

          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <ListTodo className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No tasks to display</p>
              </div>
            </div>
          )}
        </div>

        {/* Priority Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 hover:shadow-2xl dark:hover:shadow-indigo-900/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Priority Levels</h2>
            <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>

          {stats.pending > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={priorityData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.name === "High"
                          ? "#ef4444"
                          : entry.name === "Medium"
                          ? "#f59e0b"
                          : "#9CA3AF" // changed low priority color to grey
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No pending tasks</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 hover:shadow-2xl dark:hover:shadow-indigo-900/30 transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Recent Tasks</h2>
          <Link
            to="/tasks"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {recentTasks.length > 0 ? (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-gray-50"
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {task.description.substring(0, 50)}
                        {task.description.length > 50 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </div>
                {task.priority && (
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        : task.priority === "medium"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ListTodo className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">No tasks yet</p>
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all font-semibold"
            >
              Create Your First Task
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;