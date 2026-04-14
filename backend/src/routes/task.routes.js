import express from "express";

import { taskController } from "../controller/task.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";

const router = express.Router();

router.post(APIENDPOINTS.TASK.CREATETASK, authMiddleware, taskController.createTask);
router.put(`${APIENDPOINTS.TASK.UPDATETASK}:id`, authMiddleware, taskController.updateTask);
router.delete(`${APIENDPOINTS.TASK.DELETETASK}:id`, authMiddleware, taskController.deleteTask);


export default router;
