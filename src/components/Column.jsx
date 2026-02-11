import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ title, status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const filtered = tasks.filter(t => t.status === status);

  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? "drag-over" : ""}`}
    >
      <h2 className="column-title">{title}</h2>
      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
