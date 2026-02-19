import React, { useState, useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
  const { setTasks } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const deleteTask = (e) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="task-card"
        onClick={() => setShowModal(true)}
      >
        <div className="task-card-header">
          <div>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>
          </div>

          <button className="delete-btn" onClick={deleteTask}>
            ✕
          </button>
        </div>
      </div>

      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}

      {/* Internal CSS */}
      <style>{`
        .task-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          cursor: grab;
          transition: all 0.2s ease-in-out;
        }

        .task-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .task-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }

        .task-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          max-height: 40px;
          overflow: hidden;
        }

        .delete-btn {
          background: none;
          border: none;
          color: #e74c3c;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s ease;
        }

        .delete-btn:hover {
          color: #c0392b;
        }
      `}</style>
    </>
  );
};

export default TaskCard;
