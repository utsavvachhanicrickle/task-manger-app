import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "../../Button";
import { getTaskSchemaColor } from "../../../utils/schema";

function TaskCardSub({ task, index, onOpen }) {
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
      <div className={`h-1 w-full rounded-t-xl `} />

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
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
