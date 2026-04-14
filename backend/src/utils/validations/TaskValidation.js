import { MESSAGES } from "../messages/index.js";
import { Task as TaskSchema } from "../schema/index.js";
import AppError from "../AppError.js";

export const TaskValidation = {
  notExistesData: (data) => {
    const {
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
    } = data;

    if (!title || !desc || !expiredAt) {
      throw new AppError(MESSAGES.DATA_NOT_EXISTES, 400);
    }

    if (
      (status && !TaskSchema.statusBar.includes(status)) ||
      (category && !TaskSchema.categoryBar.includes(category)) ||
      (priority && !TaskSchema.priorityBar.includes(priority)) ||
      (phase && !TaskSchema.phaseBar.includes(phase))
    ) {
      throw new AppError(MESSAGES.DATA_NOT_EXISTES, 400);
    }
  },
  taskExistes: (existingTask) => {
    if (!existingTask) throw new AppError(MESSAGES.TASK_NOT_EXISTES, 404);
  },
};
