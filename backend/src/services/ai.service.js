import AIChatModel from "../modules/AiChat.modules.js";
import { AuthValidation } from "../validations/AuthValidtion.js";
import { LLMService } from "./llm.service.js";

export const aiServices = {
  chatServices: async (data, userId) => {
    AuthValidation.userExists(userId);

    const { message } = data;

    if (!message) {
      throw new Error("Message is required");
    }

    const history = await AIChatModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const reply = await LLMService.generateResponse(message, history);

    const chat = await AIChatModel.create({
      query: message,
      response: reply,
      userId,
    });
    return chat;
  },
  getHistoryServices: async (userId) => {
    AuthValidation.userExists(userId);
    const chat = await AIChatModel.find({ userId: userId }).sort({
      createdAt: 1,
    });
    return chat;
  },
};
