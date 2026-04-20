import toast from "../utils/Toast";
import { MESSAGES } from "../utils/messages";
import { aiChatModules } from "../modules/aiChatModule";

export const aiChatPresenters = {
  aiChat: async (input, aiChatData, setAiChatData) => {
    try {
      const { data } = await aiChatModules.aiChat({message : input});
      
      setAiChatData([...aiChatData, data.aiChat]);
      // console.log(data);
      // console.log(aiChatData);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  fetchAiChatData: async (shownToast, setAiChatData) => {
    try {
      const { data } = await aiChatModules.getAiChatHistory();
      setAiChatData(data.aiChat);
      if (shownToast) {
        toast.success(MESSAGES.FETCHED_SUCCESSFULY);
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
};
