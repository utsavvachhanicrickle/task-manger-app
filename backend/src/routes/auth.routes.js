import express from "express";
import { authController } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);

export default router;
