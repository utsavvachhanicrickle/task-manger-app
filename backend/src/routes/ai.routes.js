import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { aiController } from "../controller/ai.controller.js";


const router = express.Router();

router.post("/chat", authMiddleware, aiController.chatController);
router.get("/history", authMiddleware, aiController.getHistoryController);

export default router;
