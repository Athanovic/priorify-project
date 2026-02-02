import { useState } from "react";
import { X } from "lucide-react";

export function TaskForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel,
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(
    initialData?.priority || "medium"
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");

  // Determine the button label
  const buttonLabel = submitLabel || (initialData ? "Update Task" : "Add Task");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id: initialData?.id || Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      completed: initialData?.completed || false,
    });

    // Reset form only for new tasks (not when editing)
    if (!initialData) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
  }

  function handleCancel() {
    // Reset form state
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    
    // Call onCancel if provided
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {buttonLabel}
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Task Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition outline-none resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              data-testid="add-task-button"
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-500/30 transition-all font-semibold"
            >
              {buttonLabel}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;