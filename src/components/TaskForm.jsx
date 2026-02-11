import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const { setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    if (!title) return;
    setTasks(prev => [
      ...prev,
      { id: uuidv4(), title, description, status: "todo" }
    ]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mr-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
