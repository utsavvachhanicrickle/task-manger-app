import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/Button";
import SendIcon from "@mui/icons-material/Send";
import InputField from "../components/Forms/InputField";
import { aiChatPresenters } from "../presenters/aiChatPresenters";
import { AiChatContext } from "../context/aiChatContext";

function AIChatboadPage() {
  const { aiChatData, setAiChatData } = useContext(AiChatContext);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("");
    await aiChatPresenters.aiChat(input, aiChatData, setAiChatData);
  };

  useEffect(() => {
    const formatted = aiChatData?.flatMap((a) => [
      { role: "user", content: a.query },
      { role: "ai", content: a.response },
    ]);

    setMessages(formatted);
  }, [aiChatData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg)  px-2">
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-(--bg-primary) border border-(--border) rounded-2xl shadow-(--shadow)">
        {/* HEADER */}
        <div className="p-2 border-b border-(--border)">
          <h2 className="text-(--text-primary) font-semibold text-lg">
            AI Chat
          </h2>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages || []).length == 0 ? (
            <div className="h-full flex items-center justify-center text-(--text-secondary)">
              Let’s start the chat 💬
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-(--primary) text-(--text-primary)"
                      : "bg-(--bg-secondary) text-(--text-primary)"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-(--border) flex gap-2">
          <InputField
            value={input}
            placeholder="Type your message..."
            onChange={(name, value) => setInput(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <Button onClick={handleSend}>
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AIChatboadPage;
