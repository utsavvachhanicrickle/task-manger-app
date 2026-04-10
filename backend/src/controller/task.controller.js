import { taskServices } from "../services/task.services.js";
import { MESSAGES } from "../utils/messages/index.js";

export const taskController = {
  createTask: async (req, res) => {
    try {
      const data = await taskServices.createTask(req.body, req.userId);
      return res.status(201).json({ message: MESSAGES.TASK_ADD, task: data });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  updateTask: async (req, res) => {
    try {
      const updatedTask = await taskServices.updateTask(
        req.body,
        req.params.id,
        req.userId,
      );
      return res.status(200).json({
        message: MESSAGES.TASK_UPDATE,
        task: updatedTask,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  deleteTask: async (req, res) => {
    try {
      await taskServices.deleteTask(req.params.id, req.userId);
      return res.status(200).json({ message: MESSAGES.TASK_DELETE });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  getUserTask: async (req, res) => {
    try {
      const tasks = await taskServices.getUserTask(req.userId);
      return res.status(200).json({
        message: MESSAGES.FETCHED_SUCCESSFULY,
        tasks : tasks,
      });
    } catch (error) {
      console.log(error);
      
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
};
