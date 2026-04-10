import { buttonVariants, Task, buttonInputTypes } from "../schema";
export const taskFormFields = {
  addTaskFields: (editTaskId, task) => [
    {
      type: buttonInputTypes.TEXT,
      name: "title",
      placeholder: "Enter Title",
      value: editTaskId ? task.title : "",
      required: true,
    },
    {
      type: buttonInputTypes.TEXT,
      name: "desc",
      placeholder: "Enter Description",
      value: editTaskId ? task.desc : "",
      required: true,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "status",
      placeholder: "select the status",
      value: editTaskId ? task.status : "",
      options: Task.statusBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "category",
      placeholder: "select the category",
      value: editTaskId ? task.category : "",
      options: Task.categoryBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "priority",
      placeholder: "select the priority",
      value: editTaskId ? task.priority : "",
      options: Task.priorityBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "phase",
      placeholder: "select the phase",
      value: editTaskId ? task.phase : "",
      options: Task.phaseBar,
    },
    {
      type: buttonInputTypes.DATETIME_LOCAL,
      name: "expiredAt",
      value: editTaskId ? task.expiredAt : "",
      placeholder: "select the date & time",
    },
  ],
  addTaskButtons: (handleCancle, editTaskId) => [
    {
      type: buttonInputTypes.CANCLE,
      variant: buttonVariants.OUTLINE,
      label: "cancle",
      onClick: handleCancle,
    },
    {
      type: buttonInputTypes.SUBMIT,
      variant: buttonVariants.PRIMARY,
      label: `${editTaskId ? "Update" : "Add"} Task`,
    },
  ],
  fillterTaskFields: [
    {
      type: buttonInputTypes.SELECT,
      name: "status",
      placeholder: "select the status",
      value: "",
      options: Task.statusBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "category",
      placeholder: "select the category",
      value: "",
      options: Task.categoryBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "priority",
      placeholder: "select the priority",
      value: "",
      options: Task.priorityBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "phase",
      placeholder: "select the phase",
      value: "",
      options: Task.phaseBar,
    },
  ],
};
