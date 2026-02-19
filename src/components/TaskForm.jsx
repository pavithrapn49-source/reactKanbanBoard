import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const { setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const addTask = () => {
    if (!title.trim()) return;

    setTasks((prev) => [
      ...prev,
      { id: uuidv4(), title, description, status },
    ]);

    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="task-form-container">
        <h2>Add New Task</h2>

        <div className="form-row">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      <style>{`
        .task-form-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          margin-bottom: 25px;
        }

        .task-form-container h2 {
          margin-bottom: 15px;
          color: #1f2937;
        }

        .form-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .form-row input,
        .form-row select {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
          min-width: 180px;
          transition: 0.2s;
        }

        .form-row input:focus,
        .form-row select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
        }

        .form-row button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.2s;
        }

        .form-row button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
};

export default TaskForm;
