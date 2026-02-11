import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-center p-4">Kanban Board</h1>
        <TaskForm />
        <Board />
      </div>
    </TaskProvider>
  );
}

export default App;
