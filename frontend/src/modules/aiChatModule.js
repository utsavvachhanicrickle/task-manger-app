import API from "../services";
import { APIENDPOINTS } from "../utils/apiEndPoints";

export const aiChatModules = {
  aiChat: (formData) => API.post(APIENDPOINTS.AICHATSTART, formData),
  getAiChatHistory: () => API.get(APIENDPOINTS.GETAICHATHISTORY),
};
