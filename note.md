import Button from "../../Button";
import { buttonVariants } from "../../../utils/schema";

function TaskModal({ task, onClose, onEdit, onDelete }) {
  if (!task) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-6 w-[90%] max-w-lg shadow-xl transition-all"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>

        <p
          className="text-sm mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {task.desc}
        </p>

        {/* DETAILS */}
        <div
          className="text-sm flex flex-col gap-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>📌 <strong>Status:</strong> {task.status}</p>
          <p>⚡ <strong>Priority:</strong> {task.priority}</p>
          <p>📂 <strong>Category:</strong> {task.category || "N/A"}</p>
          <p>🧩 <strong>Phase:</strong> {task.phase || "N/A"}</p>

          <p>
            📅 <strong>Created:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>

          <p>
            🔄 <strong>Updated:</strong>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </p>

          <p>
            ⏳ <strong>Expiry:</strong>{" "}
            {task.expiredAt
              ? new Date(task.expiredAt).toLocaleString()
              : "N/A"}
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-5 flex-wrap">
          <Button onClick={() => onEdit(task)}>Edit</Button>

          <Button
            variant={buttonVariants.DANGER}
            onClick={() => onDelete(task._id)}
          >
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
here i needs chnages such as the added the border to whole card and also this andinga and al the statues have shwon accordings to the 
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
 
 and als have the perfectly workisng also added this edit infrontes the mui cons and makes the perfectly responsived desinds 


 function TaskCardSub({ task, index, onOpen }) {
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
        cursor-pointer rounded-xl flex flex-col gap-3
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
          <h2 className="font-semibold text-lg wrap-break-word">{task.title}</h2>

          <span
            className={`px-2 py-1 text-xs rounded-full text-white ${
              statusColors[task.status] || "bg-gray-400"
            }`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-sm text-(--text-secondary) wrap-break-word">
          {task.desc}
        </p>

        {/* ACTION BUTTON */}
        <div
          className="flex justify-end mt-2 "
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onOpen(task);
            }}
            className="text-xs px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCardSub;
herein this seconds componnets your task to creates the all shwon the basic hngs in line such as the  title,desc right side view only mui cons nclick it oes to modules 

belowed this this four all 

status cayegory piority phashe 
export const Task = {
  statusBar: [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "inprogress" },
    { label: "Reviewing", value: "reviewing" },
    { label: "Completed", value: "completed" },
    { label: "Rejected", value: "rejected" },
    { label: "On Hold", value: "onhold" },
    { label: "Blocked", value: "blocked" },
  ],

  categoryBar: [
    { label: "Development", value: "development" },
    { label: "Design", value: "design" },
    { label: "Support", value: "support" },
    { label: "Marketing", value: "marketing" },
    { label: "QA", value: "qa" },
    { label: "Documentation", value: "documentation" },
    { label: "Other", value: "other" },
  ],

  priorityBar: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
  ],

  phaseBar: [
    { label: "Planning", value: "planning" },
    { label: "Implementation", value: "implementation" },
    { label: "Review", value: "review" },
    { label: "Done", value: "done" },
  ],
};

