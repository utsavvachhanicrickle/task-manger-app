import Task from "../modules/Task.modules.js";
import { TaskValidation } from "../utils/validations/TaskValidation.js";
import { AuthValidation } from "../utils/validations/AuthValidtion.js";
import mongoose from "mongoose";

export const taskServices = {
  createTaskService: async (data, userId) => {
    AuthValidation.userExists(userId);
    TaskValidation.notExistesData(data);
    const {
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
      projectId,
    } = data;

    console.log(data);
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      console.log("Invalid project ID");
    }
    const newTask = await Task.create({
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
      userId,
      projectId: new mongoose.Types.ObjectId(projectId),
    });
    return newTask;
  },
  updateTaskService: async (data, _id, userId) => {
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
  deleteTaskService: async (_id, userId) => {
    const existingTask = await Task.findById(_id);
    TaskValidation.taskExistes(existingTask);
    AuthValidation.accessChecking(existingTask.userId, userId);
    await Task.deleteOne({ _id });
    return existingTask
  },
};
