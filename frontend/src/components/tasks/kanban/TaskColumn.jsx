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
          tasks.map((task, index) => (
            <TaskCard
              index={index}
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
