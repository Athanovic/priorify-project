import { CheckCircle2, Circle, Trash2, Edit2 } from "lucide-react";

function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex justify-between items-center transition hover:shadow-lg ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      {/* Task Info */}
      <div className="flex items-center gap-4">
        {/* Completion Icon */}
        <button onClick={() => onToggleComplete(task.id)} className="focus:outline-none">
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>

        <div>
          <h3 className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
            {task.title}
          </h3>
          {task.priority && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                task.priority.toLowerCase() === "high"
                  ? "bg-red-100 text-red-600"
                  : task.priority.toLowerCase() === "medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
          title="Edit Task"
        >
          <Edit2 className="w-5 h-5 text-blue-600" />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
