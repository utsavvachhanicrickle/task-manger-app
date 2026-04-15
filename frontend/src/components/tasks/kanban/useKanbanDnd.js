import { useState, useEffect } from "react";

export function useKanbanDnd({ initialTasks, handleDragTask }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;
  //   console.log(active, over);

  //   setTasks((prev) => {
  //     const activeTask = prev.find((t) => t._id === activeId);

  //     if (!activeTask) return prev;

  //     const isColumnDrop = prev.every((t) => t._id !== overId);

  //     if (isColumnDrop) {
  //       return prev.map((t) => {
  //         if (t._id === activeId) {
  //           return {
  //             ...t,
  //             projectId: overId,
  //           };
  //         }
  //         return t;
  //       });
  //     }

  //     const overTask = prev.find((t) => t._id === overId);

  //     if (overTask) {
  //       return prev.map((t) => {
  //         if (t._id === activeId) {
  //           return {
  //             ...t,
  //             projectId: overTask.projectId,
  //           };
  //         }
  //         return t;
  //       });
  //     }

  //     return prev;
  //   });
  // };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t._id === activeId);
      const overIndex = prev.findIndex((t) => t._id === overId);

      const activeTask = prev[activeIndex];
      if (!activeTask) return prev;

      let newTasks = [...prev];
      let newProjectId = activeTask.projectId;

      // CASE 1: column drop
      if (overIndex === -1) {
        newProjectId = over.id;

        newTasks = newTasks.map((t) =>
          t._id === activeId ? { ...t, projectId: newProjectId } : t,
        );
      }

      // CASE 2: task drop
      else {
        const overTask = prev[overIndex];
        newProjectId = overTask.projectId;

        const [moved] = newTasks.splice(activeIndex, 1);
        newTasks.splice(overIndex, 0, {
          ...moved,
          projectId: newProjectId,
        });
      }

      // get correct project list
      const projectTasks = newTasks
        .filter((t) => t.projectId === newProjectId)
        .sort((a, b) => b.order - a.order);

      const newIndex = projectTasks.findIndex((t) => t._id === activeId);

      const prevTask = projectTasks[newIndex - 1] || null;
      const nextTask = projectTasks[newIndex + 1] || null;

      handleDragTask({
        currentTaskId: activeId,
        prevTaskId: prevTask?._id,
        nextTaskId: nextTask?._id,
        newProjectId,
      });

      return newTasks;
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
