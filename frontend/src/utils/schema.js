export const getTaskSchemaColor = (type, value) => {
  return TaskSchema[type].find((item) => item.value === value)?.color;
};

export const TaskSchema = {
  statusBar: [
    { label: "Pending", value: "pending", color: "bg-yellow-500 text-white" },
    { label: "In Progress", value: "inprogress", color: "bg-blue-500 text-white" },
    { label: "Reviewing", value: "reviewing", color: "bg-purple-500 text-white" },
    { label: "Completed", value: "completed", color: "bg-green-500 text-white" },
    { label: "Rejected", value: "rejected", color: "bg-red-500 text-white" },
    { label: "On Hold", value: "onhold", color: "bg-gray-500 text-white" },
    { label: "Blocked", value: "blocked", color: "bg-black text-white" },
  ],

  categoryBar: [
    { label: "Development", value: "development", color: "bg-blue-100 text-blue-700" },
    { label: "Design", value: "design", color: "bg-pink-100 text-pink-700" },
    { label: "Support", value: "support", color: "bg-green-100 text-green-700" },
    { label: "Marketing", value: "marketing", color: "bg-yellow-100 text-yellow-700" },
    { label: "QA", value: "qa", color: "bg-purple-100 text-purple-700" },
    { label: "Documentation", value: "documentation", color: "bg-indigo-100 text-indigo-700" },
    { label: "Other", value: "other", color: "bg-gray-200 text-gray-700" },
  ],

  priorityBar: [
    { label: "Low", value: "low", color: "bg-[var(--text-muted)] text-white" },
    { label: "Medium", value: "medium", color: "bg-blue-500 text-white" },
    { label: "High", value: "high", color: "bg-orange-500 text-white" },
    { label: "Urgent", value: "urgent", color: "bg-red-600 text-white" },
  ],

  phaseBar: [
    { label: "Planning", value: "planning", color: "bg-orange-100 text-orange-700" },
    { label: "Implementation", value: "implementation", color: "bg-blue-100 text-blue-700" },
    { label: "Review", value: "review", color: "bg-purple-100 text-purple-700" },
    { label: "Done", value: "done", color: "bg-green-100 text-green-700" },
  ],
};


export const buttonInputTypes = {
  CANCLE: "cancle",
  CHECKBOX_GROUP: "checkbox-group",
  DATETIME_LOCAL: "datetime-local",
  EMAIL: "email",
  PASSWORD: "password",
  RADIO: "radio",
  RADIO_GROUP: "radio-group",
  RESET: "reset",
  SELECT: "select",
  SUBMIT: "submit",
  TEXT: "text",
};

export const buttonVariants = {
  OUTLINE: "outline",
  PRIMARY: "primary",
  DANGER: "danger",
};
