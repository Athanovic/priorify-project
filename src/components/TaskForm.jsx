import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();
 
    if (!title) return;

    onAdd({
      id: Date.now(),
      title,
      priority,
      completed: false,
    });

    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button>Add Task</button>
    </form>
  );
}

export default TaskForm;