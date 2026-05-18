import { MESSAGES } from "../utils/messages/index.js";
import { authServices } from "../services/auth.service.js";

export const authController = {
  signUp: async (req, res) => {
    try {
      await authServices.signUp(req.body);
      return res.status(201).json({
        message: MESSAGES.USER_CREATED,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  signIn: async (req, res) => {
    try {
      const existingUser = await authServices.signIn(req.body, res);
      return res.status(200).json({
        message: MESSAGES.SIGNIN_SUCCESSFULLY,
        result: existingUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  logout: async (req, res) => {
    try {
      await authServices.logout(req.cookies, res);
      return res.status(200).json({ message: MESSAGES.LOGOUT_SUCCESS });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      await authServices.refreshToken(req.cookies,res);
      return res.status(200).json({ message: MESSAGES.REFRESH_TOKEN });
    } catch (error) {
      console.log(error);
      
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
};
