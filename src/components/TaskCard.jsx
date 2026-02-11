import React, { useState, useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
  const { setTasks } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const deleteTask = (e) => {
    e.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`task-card ${isDragging ? "dragging" : ""}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="task-card-title">{task.title}</h3>
            <p className="task-card-desc">{task.description}</p>
          </div>
          <button
            onClick={deleteTask}
            className="task-card-delete"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default TaskCard;
