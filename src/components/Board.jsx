import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import Column from "./Column";
import { DndContext, closestCenter } from "@dnd-kit/core";

const Board = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // Update task status when dropped into a new column
    setTasks(prev =>
      prev.map(task =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="board">
        <Column title="To Do" status="todo" tasks={tasks} />
        <Column title="In Progress" status="inprogress" tasks={tasks} />
        <Column title="Done" status="done" tasks={tasks} />
      </div>
    </DndContext>
  );
};

export default Board;
