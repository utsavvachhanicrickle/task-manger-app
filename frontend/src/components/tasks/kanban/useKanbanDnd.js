import { useState, useEffect } from "react";

export function useKanbanDnd({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((prev) => {
      const activeTask = prev.find((t) => t._id === activeId);

      if (!activeTask) return prev;

      // 🔥 CASE 1: dropped on COLUMN (EMPTY or NOT EMPTY)
      const isColumnDrop = prev.every((t) => t._id !== overId);

      if (isColumnDrop) {
        return prev.map((t) => {
          if (t._id === activeId) {
            return {
              ...t,
              projectId: overId, // 👈 move to column
            };
          }
          return t;
        });
      }

      // 🔥 CASE 2: dropped on another TASK
      const overTask = prev.find((t) => t._id === overId);

      if (overTask) {
        return prev.map((t) => {
          if (t._id === activeId) {
            return {
              ...t,
              projectId: overTask.projectId,
            };
          }
          return t;
        });
      }

      return prev;
    });
  };

  return {
    tasks,
    setTasks,
    handleDragEnd,
    activeTask,
    setActiveTask,
  };
}
