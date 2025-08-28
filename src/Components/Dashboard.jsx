import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { TasksContext } from "./TasksContext";

const Dashboard = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) {
    return <h2>No user logged in</h2>;
  }

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard">
      <h1 className="welcome">Welcome back, {user.username}! 👋</h1>

      <div className="stats">
        <div className="card blue">
          <h2>Total Tasks</h2>
          <p>{totalTasks}</p>
        </div>
        <div className="card green">
          <h2>Completed</h2>
          <p>{completedTasks}</p>
        </div>
        <div className="card red">
          <h2>Pending</h2>
          <p>{pendingTasks}</p>
        </div>
      </div>

      <div className="recent">
        <h2>Recent Activity</h2>
        <ul>
          {tasks
            .slice() // create a copy
            .reverse() // most recent first
            .map((task) => (
              <li
                 key={task.id}
                className="task"
                onClick={() => toggleTask(task.id)}
             >
                <span >{task.text}</span>
                <span className={task.completed ? "completed" : "pending"}>{task.completed ? "Completed" : "Pending"}</span>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
