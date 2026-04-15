import express from "express";
import authRoute from "./auth.routes.js";
import taskRoute from "./task.routes.js";
import projectRoute from "./project.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/task", taskRoute);
router.use("/project", projectRoute);

export default router;
