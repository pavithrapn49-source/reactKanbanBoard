import React, { useState, useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // DELETE FUNCTION
  const deleteTask = () => {
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
  };

  // SAVE EDIT
  const saveEdit = () => {
    const updated = tasks.map((t) =>
      t.id === task.id
        ? { ...t, title: editedTitle, description: editedDescription }
        : t
    );
    setTasks(updated);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="task-card">
      
      {/* Drag Handle */}
      <div className="task-header" {...listeners} {...attributes}>
        <span>☰</span>
      </div>

      {isEditing ? (
        <div className="edit-section">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="edit-buttons">
            <button onClick={saveEdit} className="save-btn">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <div className="task-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={deleteTask} className="delete-btn">
              Delete
            </button>
          </div>
        </>
      )}

      <style>{`
        .task-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .task-header {
          cursor: grab;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .task-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .edit-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .save-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .cancel-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .edit-section input,
        .edit-section textarea {
          width: 100%;
          margin-bottom: 8px;
          padding: 6px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        .edit-buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
