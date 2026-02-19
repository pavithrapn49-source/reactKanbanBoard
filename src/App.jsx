import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1 className="app-title">Kanban Board</h1>
        <TaskForm />
        <Board />
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #f5f7fa, #e4ecf7);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
.app-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 35px;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

      `}</style>
    </TaskProvider>
  );
}

export default App;
