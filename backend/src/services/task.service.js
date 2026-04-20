import mongoose from "mongoose";
import Task from "../modules/Task.modules.js";
import { TaskValidation } from "../validations/TaskValidation.js";
import { AuthValidation } from "../validations/AuthValidtion.js";

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

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      console.log("Invalid project ID");
    }

    const lastTask = await Task.findOne({ projectId }).sort({ order: 1 });

    const order = lastTask ? lastTask.order - 1000 : 100000;

    const newTask = await Task.create({
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
      userId,
      order,
      projectId: new mongoose.Types.ObjectId(projectId),
    });
    return newTask;
  },
  updateTaskService: async (data, _id, userId) => {
    const { title, desc, status, category, priority, phase, expiredAt } = data;
    TaskValidation.notExistesData(data);
    const existingTask = await Task.findById(_id);

    TaskValidation.taskExistes(existingTask);
    AuthValidation.accessChecking(existingTask.userId, userId);

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
    return existingTask;
  },
  dargeAndDrop: async (data, userId) => {
    AuthValidation.userExists(userId);

    const { currentTaskId, prevTaskId, nextTaskId, newProjectId } = data;

    const currentTask = await Task.findById(currentTaskId);
    if (!currentTask) throw new Error("Task not found");

    const nextTask = nextTaskId ? await Task.findById(nextTaskId) : null;
    const prevTask = prevTaskId ? await Task.findById(prevTaskId) : null;

    const pastProjectId = currentTask.projectId;

    let order;

    // CASE 1: only item
    if (!prevTask && !nextTask) {
      order = 100000;
    }

    // CASE 2: at bottom
    else if (prevTask && !nextTask) {
      order = prevTask.order - 1000;
    }

    // CASE 3: at top
    else if (!prevTask && nextTask) {
      order = nextTask.order + 1000;
    }

    // CASE 4: middle
    else {
      order = Math.floor((prevTask.order + nextTask.order) / 2);
    }

    currentTask.order = order;
    currentTask.projectId = newProjectId;

    await currentTask.save();

    return {
      currentTask,
      newProjectId,
      pastProjectId,
      order,
    };
  },
};
