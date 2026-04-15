import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardSub from "./TaskCardSub.jsx";
import TaskModal from "./TaskModal";

function TaskCard({ task, handleEditTask, handleDeleteTask }) {
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
      <div ref={setNodeRef} style={style} className="mb-2 shadow rounded-xl cursor-default">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
        <TaskCardSub task={task} onOpen={setSelectedTask} />
        </div>
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
