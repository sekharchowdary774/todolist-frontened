import React, { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
import "./list.css";

function List() {
  const { tasks, addTask, toggleTask, deleteTask, clearAll } = useContext(TasksContext);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addTask(input);
    setInput("");
  };

  return (
    <div className="container">
      <h1 className="welcome">Welcome back 👋</h1>
      <h2>Todo App</h2>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add your new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="add-btn" onClick={handleAdd} disabled={!input.trim()}>
          +
        </button>
      </div>

      <ul>
        {[...tasks].reverse().map((task) => (
          <li key={task.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? "checked" : ""}>{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <div className="footer">
        
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default List;
