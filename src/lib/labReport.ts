import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarizeText(text: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: `Summarize this lab report in concise points:\n\n${text}`,
  });
  return response.text || "No summary generated";
}
