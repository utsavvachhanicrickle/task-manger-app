import express from "express";
import authRoute from "./auth.routes.js";
import taskRoute from "./task.routes.js";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";


const router = express.Router();

router.use(APIENDPOINTS.AUTH.ROOT, authRoute);
router.use(APIENDPOINTS.TASK.ROOT, taskRoute);

export default router;