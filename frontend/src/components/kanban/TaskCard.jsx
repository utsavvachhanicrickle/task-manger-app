import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardSub from "../tasks/TaskCardSub.jsx";

function TaskCard({ task,handleDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 mb-2 shadow cursor-grab active:cursor-grabbing"
    >
      <TaskCardSub task={task} handleDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default TaskCard;
