function TaskCard({ task, onToggle, onDelete }) {
    return (
      <div className={`task-card ${task.completed ? "done" : ""}`}>
        <div>
          <h3>{task.title}</h3>
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
  
        <div className="actions">
          <button onClick={() => onToggle(task.id)}>
            {task.completed ? "Undo" : "Done"}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    );
  } 
  
  export default TaskCard;