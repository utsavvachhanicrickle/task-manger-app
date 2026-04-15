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


this is my parent componnets and there where this chnages needs and there are colum have such as the 

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import Button from "../../Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskColumn({
  title,
  desc,
  tasks,
  project,
  projectId,
  handleEditTask,
  handleDeleteTask,
  handleEditProject,
  handleDeleteProject,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: projectId,
  });
  return (
    <div
      ref={setNodeRef}
      className={`w-80 h-[70vh] p-3 shrink-0 rounded-xl border flex flex-col overflow-hidden
      ${isOver ? "bg-blue-50 border-blue-400" : "bg-(--bg-secondary)"}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="font-semibold text-base text-(--text-primary) leading-snug">
            {title}
          </h2>

          <p className="text-xs text-(--text-muted) mt-1 line-clamp-2">
            {desc}
          </p>
        </div>

        <div
          className="flex items-center gap-2 shrink-0"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Button
            variant="other"
            className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-(--btn-outline-hover) transition"
            onClick={() => handleEditProject(project)}
          >
            <EditIcon fontSize="small" />
          </Button>

          <Button
            variant="other"
            className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-red-500 transition"
            onClick={() => handleDeleteProject(project._id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-(--text-muted) border border-dashed rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;

and card have such as the 
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardSub from "./TaskCardSub.jsx";
import TaskModal from "./TaskModal";

function TaskCard({ index, task, handleEditTask, handleDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const [selectedTask, setSelectedTask] = useState(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : undefined,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="pp-3 mb-2 shadow cursor-grab active:cursor-grabbing"
      >
        <TaskCardSub index={index} task={task} onOpen={setSelectedTask} />
      </div>

      <TaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default TaskCard;

import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "../../Button";
import { getTaskSchemaColor } from "../../../utils/schema";

function TaskCardSub({ task, onOpen }) {
  const isExpired = task.expiredAt && new Date(task.expiredAt) < new Date();

  return (
    <div
      className={`
        rounded-xl flex flex-col gap-3 border transition-all duration-300
        hover:shadow-lg 
        ${isExpired ? "border-red-500" : "border-(--border)"}
      `}
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >

      <div className="p-4 flex flex-col gap-3 bg-(--bg-primary) rounded-xl">
        <div className="flex justify-between items-start gap-2 ">
          <div>
            <h2 className="font-semibold text-sm sm:text-base wrap-break-word">
              {task.title}
            </h2>

            <p className="text-xs text-(--text-secondary) line-clamp-2">
              {task.desc}
            </p>
          </div>

          <Button
            variant="other"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(task);
            }}
            className="p-1 rounded hover:bg-(--bg-secondary)"
          >
            <VisibilityIcon fontSize="small" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 text-xs">
          <span
            className={`px-2 py-1 text-xs text-white rounded ${getTaskSchemaColor(
              "statusBar",
              task.status,
            )}`}
          >
            {task.status}
          </span>

          <span
            className={`px-2 py-1 text-xs text-white rounded ${getTaskSchemaColor(
              "priorityBar",
              task.priority,
            )}`}
          >
            {task.priority}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded  ${getTaskSchemaColor(
              "categoryBar",
              task.category,
            )}`}
          >
            {task.category}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded  ${getTaskSchemaColor(
              "phaseBar",
              task.phase,
            )}`}
          >
            {task.phase}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskCardSub;
