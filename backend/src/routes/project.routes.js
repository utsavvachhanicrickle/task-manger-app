import express from "express";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";
import { authMiddleware } from "../middleware/auth.js";
import { projectController } from "../controller/project.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, projectController.createProjectControoler);
router.put(
  `/update/:id`,
  authMiddleware,
  projectController.updateProjectController,
);
router.delete(
  `/delete/:id`,
  authMiddleware,
  projectController.deleteProjectController,
);
router.get("/fetch", authMiddleware, projectController.fetchProjectController);

export default router;
