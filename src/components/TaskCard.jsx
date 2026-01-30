import React from "react";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityBadgeClass = (priority) => {
    if (priority === "high") {
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    }
    if (priority === "medium") {
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
    }
    // LOW priority -> use gray (changed from green)
    return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300";
  };

  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all group"
      aria-label={`task-${task.id}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggleComplete && onToggleComplete(task.id)}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          className="flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-medium truncate ${
              task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-gray-50"
            }`}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-2">
            {task.priority && (
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${priorityBadgeClass(
                  task.priority
                )}`}
              >
                {task.priority.toUpperCase()}
              </span>
            )}

            {task.dueDate && (
              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={() => onEdit && onEdit(task)}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition"
          aria-label="Edit task"
        >
          <Pencil className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </button>

        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;