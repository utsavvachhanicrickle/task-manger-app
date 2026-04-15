import { DndContext, closestCenter } from "@dnd-kit/core";
import { useKanbanDnd } from "./useKanbanDnd";
import TaskColumn from "./TaskColumn";

function TaskShownComponents({
  task = [],
  project = [],
  handleDeleteTask,
  handleEditTask,
  handleEditProject,
  handleDeleteProject,
}) {
  const { tasks, handleDragEnd } = useKanbanDnd({ initialTasks: task || [] });
  const groupedTasks = tasks.reduce((acc, t) => {
    if (!t || !t.projectId) return acc; 
    const key = String(t.projectId);
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {project.map((proj) => {
          const projectId = String(proj._id);
          const projectTasks = groupedTasks[projectId] || [];

          return (
            <TaskColumn
              key={projectId}
              title={proj.title}
              desc={proj.desc}
              projectId={projectId}
              project={proj}
              tasks={projectTasks}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleEditProject={handleEditProject}
              handleDeleteProject={handleDeleteProject}
            />
          );
        })}
      </div>
    </DndContext>
  );
}

export default TaskShownComponents;
