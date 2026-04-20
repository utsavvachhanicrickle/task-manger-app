import { MESSAGES } from "../utils/messages/index.js";
import { aiServices } from "../services/ai.service.js";

export const aiController = {
  chatController: async (req, res) => {
    try {
      const data = await aiServices.chatServices(req.body, req.userId);
      return res
        .status(201)
        .json({ message: MESSAGES.AIGENRATESMESSAGE, aiChat: data });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
  getHistoryController: async (req, res) => {
    try {
      const data = await aiServices.getHistoryServices(req.userId);
      res
        .status(201)
        .json({ message: MESSAGES.HISTERFETCHSUCCESSFULLY, aiChat: data });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
};
