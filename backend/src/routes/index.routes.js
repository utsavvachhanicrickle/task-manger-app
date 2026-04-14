import express from "express";
import authRoute from "./auth.routes.js";
import taskRoute from "./task.routes.js";
import projectRoute from "./project.routes.js";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";

const router = express.Router();

router.use(APIENDPOINTS.AUTH.ROOT, authRoute);
router.use(APIENDPOINTS.TASK.ROOT, taskRoute);
router.use(APIENDPOINTS.PROJECT.ROOT, projectRoute);

export default router;
