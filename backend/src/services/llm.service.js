import fetch from "node-fetch";

export const LLMService = {
  generateResponse: async (message, history = []) => {
    const context = history
      .map((h) => `User: ${h.query}\nAI: ${h.response}`)
      .join("\n");

    const prompt = `${context}\nUser: ${message}\nAI:`;

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();

    return data.response;
  },
};