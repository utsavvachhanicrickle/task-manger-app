import AIChatModel from "../modules/AiChat.modules.js";
import { AuthValidation } from "../validations/AuthValidtion.js";
import { LLMService } from "./llm.service.js";
import pLimit from "p-limit";

// limit concurrency (VERY IMPORTANT)
const limit = pLimit(1);

export const aiServices = {
  chatServices: async (data, userId) => {
    AuthValidation.userExists(userId);

    const { message } = data;

    if (!message) {
      throw new Error("Message is required");
    }

    const history = await AIChatModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3); 

    const reply = await limit(() =>
      LLMService.generateResponse(message, history)
    );

    const chat = await AIChatModel.create({
      query: message,
      response: reply,
      userId,
    });

    return chat;
  },

  getHistoryServices: async (userId) => {
    AuthValidation.userExists(userId);

    const chat = await AIChatModel.find({ userId })
      .sort({ createdAt: 1 })
      .limit(100); 

    return chat;
  },
};