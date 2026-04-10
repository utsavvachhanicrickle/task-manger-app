import express from "express";
import {
  authController
} from "../controller/auth.controller.js";
import { APIENDPOINTS } from "../utils/apiEndPoint.js";

const router = express.Router();

router.post(APIENDPOINTS.AUTH.SIGNUP, authController.signUp);
router.post(APIENDPOINTS.AUTH.SIGNIN, authController.signIn);
router.post(APIENDPOINTS.AUTH.LOGOUT, authController.logout);
router.get(APIENDPOINTS.AUTH.REFRESH, authController.refreshToken);

export default router;
