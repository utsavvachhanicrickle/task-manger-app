import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../Button";
import { buttonVariants } from "../../../utils/schema";
import { getTaskSchemaColor } from "../../../utils/schema";

function TaskModal({ task, onClose, onEdit, onDelete }) {
  if (!task) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-6 w-[90%] max-w-lg transition-all border"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TITLE */}
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>

        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          {task.desc}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* DATES */}
        <div
          className="text-xs flex flex-col gap-1"
          style={{ color: "var(--text-muted)" }}
        >
          <p>📅 Created: {new Date(task.createdAt).toLocaleString()}</p>
          <p>🔄 Updated: {new Date(task.updatedAt).toLocaleString()}</p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5 flex-wrap">
          <Button
            onClick={() => onEdit(task)}
            className="flex items-center gap-1"
          >
            <EditIcon fontSize="small" />
            Edit
          </Button>

          <Button
            variant={buttonVariants.DANGER}
            onClick={() => onDelete(task._id)}
            className="flex items-center gap-1"
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>

          <Button variant="other" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
