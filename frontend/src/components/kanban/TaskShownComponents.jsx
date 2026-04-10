import { DndContext, closestCenter } from "@dnd-kit/core";
import { useKanbanDnd } from "./useKanbanDnd";
import TaskColumn from "./TaskColumn";

function TaskShownComponents({ task = [], project = [] }) {
  const { tasks, handleDragEnd } = useKanbanDnd(task);

  const groupedTasks = tasks.reduce((acc, t) => {
    const key = t.projectId?.$oid || "no-project";
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="flex gap-4 overflow-x-auto p-4">

        {project.map((proj) => {
          const projectId = proj._id.$oid;
          const projectTasks = groupedTasks[projectId] || [];

          return (
            <TaskColumn
              key={projectId}
              title={proj.title}
              desc={proj.desc}
              projectId={projectId}
              tasks={projectTasks}
            />
          );
        })}

      </div>
    </DndContext>
  );
}

export default TaskShownComponents;