import { useState, useMemo, useEffect } from "react";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { Plus, Search, Filter, ListFilter, CheckCircle2, Clock, AlertCircle, CheckCircle } from "lucide-react";

const Tasks = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  // Ensure theme applied consistently when this page mounts
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);

  // Toast / success message state
  const [showSuccess, setShowSuccess] = useState(false);

  const showSuccessMessage = (message = "Action completed successfully!") => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  /* ---------------- FILTER + SEARCH ---------------- */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!showCompleted && task.completed) return false;

      if (priorityFilter !== "all" && task.priority !== priorityFilter)
        return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [tasks, searchQuery, priorityFilter, showCompleted]);

  /* ---------------- HANDLERS ---------------- */
  const handleAddTask = (formData) => {
    addTask(formData);
    setShowForm(false);
    showSuccessMessage("Task created successfully!");
  };

  const handleUpdateTask = (formData) => {
    if (!editingTask) return;
    updateTask(editingTask.id, formData);
    setEditingTask(null);
    showSuccessMessage("Task updated successfully!");
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
      showSuccessMessage("Task deleted");
    }
  };

  /* ---------------- STATS ---------------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "high" && !t.completed
  ).length;

  const priorityButtons = [
    { value: "all", label: "All Tasks", color: "indigo" },
    { value: "high", label: "High", color: "red" },
    { value: "medium", label: "Medium", color: "yellow" },
    { value: "low", label: "Low", color: "gray" }, // changed low priority color to grey
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <p className="font-semibold">{showSuccess}</p>
        </div>
      )}

      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-2xl p-8 text-white shadow-2xl dark:shadow-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
              <p className="text-indigo-100 dark:text-indigo-200">Manage and organize your tasks efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <ListFilter className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                  <p className="text-sm text-indigo-100 dark:text-indigo-200">Total</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                  <p className="text-sm text-indigo-100 dark:text-indigo-200">Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{highPriorityTasks}</p>
                  <p className="text-sm text-indigo-100 dark:text-indigo-200">High Priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Search Tasks
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
            />
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Filter by Priority
            </label>
            <div className="flex gap-2">
              {priorityButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setPriorityFilter(btn.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    priorityFilter === btn.value
                      ? btn.color === "indigo"
                        ? "bg-indigo-500 text-white shadow-lg"
                        : btn.color === "red"
                        ? "bg-red-500 text-white shadow-lg"
                        : btn.color === "yellow"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "bg-gray-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Show Completed */}
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition w-full">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Show completed tasks
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-16 text-center">
          <Clock className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {tasks.length === 0
              ? "Create your first task to get started with organizing your work"
              : "Try adjusting your filters to see more tasks"}
          </p>
          {tasks.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={(id) => {
                toggleComplete(id);
                showSuccessMessage("Task status updated");
              }}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Forms */}
      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
          submitLabel="Add Task"
        />
      )}

      {editingTask && (
        <TaskForm
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          initialData={{
            title: editingTask.title,
            description: editingTask.description,
            priority: editingTask.priority,
            dueDate: editingTask.dueDate,
          }}
          submitLabel="Update Task"
        />
      )}
    </div>
  );
};

export default Tasks;