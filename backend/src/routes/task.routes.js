import express from "express";

import { taskController } from "../controller/task.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, taskController.createTask);
router.put(`/update/:id`, authMiddleware, taskController.updateTask);
router.delete(`/delete/:id`, authMiddleware, taskController.deleteTask);
router.put('/dragdrop',authMiddleware,taskController.dargeAndDrop)

export default router;
