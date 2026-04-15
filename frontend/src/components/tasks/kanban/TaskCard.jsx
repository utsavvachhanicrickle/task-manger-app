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
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className="p-3 mb-2 shadow">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mb-2"
        >
          <TaskCardSub index={index} task={task} onOpen={setSelectedTask} />
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
