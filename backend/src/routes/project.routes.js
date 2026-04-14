import express from "express";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";
import { authMiddleware } from "../middleware/auth.js";
import { projectController } from "../controller/project.controller.js";

const router = express.Router();

router.post(
  APIENDPOINTS.PROJECT.CREATEPROJECT,
  authMiddleware,
  projectController.createProjectControoler,
);
router.put(
  `${APIENDPOINTS.PROJECT.UPDATEPRJECT}:id`,
  authMiddleware,
  projectController.updateProjectController,
);
router.delete(
  `${APIENDPOINTS.PROJECT.DELETEPROJECT}:id`,
  authMiddleware,
  projectController.deleteProjectController,
);
router.get(
  APIENDPOINTS.PROJECT.FETCHDATA,
  authMiddleware,
  projectController.fetchProjectController,
);

export default router;