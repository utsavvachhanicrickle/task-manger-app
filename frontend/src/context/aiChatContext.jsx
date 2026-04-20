import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { aiChatPresenters } from "../presenters/aiChatPresenters";

export const AiChatContext = createContext();

export const AiChatContextProvider = () => {
  const [aiChatData, setAiChatData] = useState([]);

  useEffect(() => {
    const loadAiChat = async () => {
      await aiChatPresenters.fetchAiChatData(false, setAiChatData);
    };

    loadAiChat();
  }, []);
  return (
    <AiChatContext.Provider value={{ aiChatData, setAiChatData }}>
      <Outlet />
    </AiChatContext.Provider>
  );
};
