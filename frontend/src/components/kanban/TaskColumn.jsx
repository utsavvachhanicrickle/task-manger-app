import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function TaskColumn({ title, desc, tasks, projectId }) {
  const { setNodeRef, isOver } = useDroppable({
    id: projectId, 
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-80 min-h-75 p-3 rounded-xl border flex flex-col
      ${isOver ? "bg-blue-50 border-blue-400" : "bg-(--bg-secondary)"}`}
    >
      <div className="mb-3">
        <h2 className="font-semibold text-(--text-primary)">
          {title}
        </h2>
        <p className="text-xs text-(--text-muted)">{desc}</p>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task._id.$oid} task={task} />
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