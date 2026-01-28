import { useMemo } from "react";
import { useTasks } from "../hooks/useTasks"; 
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

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
} from "recharts";

import {
  CheckCircle2,
  Circle,
  AlertCircle,
  TrendingUp,
  ListTodo,
} from "lucide-react";

export function Dashboard() {
  const { tasks } = useTasks();

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
    { name: "High", value: stats.highPriority, color: "#ef4444" },
    { name: "Medium", value: stats.mediumPriority, color: "#f59e0b" },
    { name: "Low", value: stats.lowPriority, color: "#22c55e" },
  ];

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your task management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<ListTodo className="w-8 h-8 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="w-8 h-8 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Circle className="w-8 h-8 text-indigo-600" />}
          color="bg-indigo-50"
        />
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={<AlertCircle className="w-8 h-8 text-red-600" />}
          color="bg-red-50"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Completion Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Task Completion</h2>

          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No tasks to display
            </p>
          )}
        </div>

        {/* Priority Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>

          {stats.pending > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {priorityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No pending tasks
            </p>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
          <Link to="/tasks" className="text-blue-600 font-medium">
            View All →
          </Link>
        </div>

        {recentTasks.length > 0 ? (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <p
                  className={`font-medium ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </p>
                {task.completed ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <Circle className="text-gray-400" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">
              No tasks yet. Start by creating one!
            </p>
            <Link
              to="/tasks"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Create Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

