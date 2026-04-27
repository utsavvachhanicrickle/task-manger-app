import fetch from "node-fetch";

export const LLMService = {
  generateResponse: async (message, history = []) => {
    const systemPrompt = `
You are a helpful AI assistant.
- Keep answers short and clear
- Use bullet points where helpful
- Use simple language
- Format output for chat UI (spacing, headings)
- If user does not ask for detail, keep answer under 150 words
- Use line breaks between each bullet point
- Each bullet must be on a new line
- Use "-" for bullets
- Add empty line before lists
`;

    const context = history
      .map((h) => `User: ${h.query}\nAssistant: ${h.response}`)
      .join("\n\n");

    const prompt = `
${systemPrompt}

${context}

User: ${message}
Assistant:
`;

    const res = await fetch(process.env.LLM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL,
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    let output = data.response.trim();

    output = output.replace(/ - /g, "\n- ");

    return output;
  },
};
