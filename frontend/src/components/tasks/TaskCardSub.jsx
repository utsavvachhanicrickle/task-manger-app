import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../Button";
import { buttonVariants } from "../../utils/schema";

function TaskCardSub({ task, index, handleEdit, handleDeleteTask }) {
  const isExpired = task.expiredAt && new Date(task.expiredAt) < new Date();

  const priorityColors = {
    low: "bg-[var(--text-muted)]",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    urgent: "bg-red-600",
  };

  const statusColors = {
    completed: "bg-green-500",
    rejected: "bg-red-500",
    "in-progress": "bg-blue-500",
    pending: "bg-yellow-500",
    reviewing: "bg-purple-500",
    "on-hold": "bg-gray-500",
    blocked: "bg-black",
    cancelled: "bg-pink-500",
    archived: "bg-indigo-500",
  };

  return (
    <div
      className={`
        rounded-xl flex flex-col gap-3
        border transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
        ${isExpired ? "border-red-500" : "border-(--border)"}
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >
      {/* PRIORITY BAR */}
      <div
        className={`h-1 w-full rounded-t-xl ${
          priorityColors[task.priority] || "bg-gray-300"
        }`}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-semibold text-lg wrap-break-word">
            {task.title}
          </h2>

          {/* STATUS */}
          <span
            className={`
              px-2 py-1 text-xs rounded-full text-white
              ${statusColors[task.status] || "bg-gray-400"}
            `}
          >
            {task.status.charAt(0).toUpperCase() +
              task.status.slice(1).toLowerCase()}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-(--text-secondary) wrap-break-word">
          {task.desc.charAt(0).toUpperCase() }
        </p>

        {/* META */}
        <div className="flex flex-wrap gap-2 text-xs">
          {task.category && (
            <span className="px-2 py-1 rounded-full bg-(--primary) text-(--btn-primary-text)">
              {task.category}
            </span>
          )}

          {task.phase && (
            <span className="px-2 py-1 rounded-full bg-(--bg-secondary) text-(--text-primary) border border-(--border)">
              {task.phase}
            </span>
          )}

          {task.priority && (
            <span
              className={`px-2 py-1 text-white rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>

        {/* DATES */}
        <div className="text-xs text-(--text-muted) flex flex-col gap-1">
          <p>
            📅 <strong>Created:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>

          <p className={isExpired ? "text-red-500 font-semibold" : ""}>
            ⏳ <strong>Expires:</strong>{" "}
            {task.expiredAt ? new Date(task.expiredAt).toLocaleString() : "N/A"}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-2 flex-wrap">
          <Button
            variant="other"
            className="flex items-center gap-1 text-sm"
            onClick={() => handleEdit(task)}
          >
            <EditIcon fontSize="small" />
            Edit
          </Button>
          <div onPointerDown={(e) => e.stopPropagation()}>
            <Button
              variant={buttonVariants.DANGER}
              className="flex items-center gap-1 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task._id);
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCardSub;
