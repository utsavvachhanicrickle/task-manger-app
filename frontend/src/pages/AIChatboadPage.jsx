import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/Button";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
import InputField from "../components/Forms/InputField";
import { aiChatPresenters } from "../presenters/aiChatPresenters";
import { AiChatContext } from "../context/aiChatContext";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
function AIChatboadPage() {
  const { aiChatData, setAiChatData } = useContext(AiChatContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  // ✅ Send Message
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userInput = input;

    // show instantly
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    setInput("");
    setLoading(true);

    await aiChatPresenters.aiChat(userInput, aiChatData, setAiChatData);

    setLoading(false);
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const handleCopyAll = async () => {
    const text = messages
      .map((m) => `${m.role === "user" ? "You" : "AI"}: ${m.content}`)
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    toast.success("All messages copied!");
  };

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  useEffect(() => {
    const formatted = aiChatData?.flatMap((a) => [
      { role: "user", content: a.query },
      { role: "ai", content: a.response },
    ]);

    if (formatted) setMessages(formatted);
  }, [aiChatData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) px-2">
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-(--bg-primary) border border-(--border) rounded-2xl shadow-(--shadow)">
        {/* HEADER */}
        <div className="p-2 border-b border-(--border) flex justify-between items-center">
          <h2 className="text-(--text-primary) font-semibold text-lg">
            AI Chat
          </h2>

          <button
            onClick={handleCopyAll}
            className="text-sm px-2 py-1 rounded bg-(--bg-secondary)"
          >
            Copy All
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-4">
          {(messages || []).length === 0 ? (
            <div className="h-full flex items-center justify-center text-(--text-secondary)">
              Let’s start the chat 💬
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } group`}
              >
                <div
                  className={`relative max-w-[75%] w-fit wrap-break-word px-4 py-2 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-(--primary) text-(--text-primary)"
                      : "bg-(--bg-secondary) text-(--text-primary)"
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 whitespace-pre-wrap">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-4">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    {/* <ReactMarkdown>{msg.content}</ReactMarkdown> */}
                  </div>
                  <button
                    onClick={() => handleCopy(msg.content)}
                    className="absolute bottom-1 right-1 text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    <ContentCopyIcon />
                  </button>
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

          <Button onClick={handleSend} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : <SendIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AIChatboadPage;
