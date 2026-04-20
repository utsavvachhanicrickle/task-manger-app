import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import SendIcon from "@mui/icons-material/Send";
import InputField from "../components/Forms/InputField";

function AIChatboadPage() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello 👋 How can I help you today?" },
    { role: "user", content: "Show me my tasks" },
    { role: "bot", content: "Here are your tasks for today ✅" },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "bot", content: "This is a dummy response 🤖" },
    ]);

    setInput("");
  };

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          {messages.map((msg, index) => (
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
          ))}

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
