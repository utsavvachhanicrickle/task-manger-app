import Task from "../models/Task.js";
import { MESSAGES } from "../utils/messages/index.js";
import AppError from "../utils/AppError.js";
import { TaskValidation } from "../utils/validations/TaskValidation.js";
import { AuthValidation } from "../utils/validations/AuthValidtion.js";

export const taskServices = {
  createTask: async (data, userId) => {
    AuthValidation.userExistes(userId);
    TaskValidation.notExistesData(data);
    const { title, desc, expiredAt, status, category, priority, phase } = data;
    const newTask = await Task.create({
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
      userId,
    });
    return newTask;
  },
  updateTask: async (data, _id, userId) => {
    const { title, desc, status, category, priority, phase, expiredAt } = data;
    TaskValidation.notExistesData(data);
    const existingTask = await Task.findById(_id);

    TaskValidation.taskExistes(existingTask);
    TaskValidation.accessChecking(existingTask.userId, userId);

    const updateData = { updatedAt: new Date() };

    if (title) updateData.title = title;
    if (desc) updateData.desc = desc;
    if (status) updateData.status = status;
    if (expiredAt) updateData.expiredAt = expiredAt;
    if (category) updateData.category = category;
    if (priority) updateData.priority = priority;
    if (phase) updateData.phase = phase;

    const updatedTask = await Task.findByIdAndUpdate(_id, updateData, {
      returnDocument: "after",
    });
    return updatedTask;
  },
  deleteTask: async (_id, userId) => {
    const existingTask = await Task.findById(_id);
    TaskValidation.taskExistes(existingTask);
    TaskValidation.accessChecking(existingTask.userId, userId);
    await Task.deleteOne({ _id });
  },
  getUserTask: async (userId) => {
    AuthValidation.userExistes(userId);
    const tasks = await Task.find({ userId: userId });
    return tasks;
  },
};
