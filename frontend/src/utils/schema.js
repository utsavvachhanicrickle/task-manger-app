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
