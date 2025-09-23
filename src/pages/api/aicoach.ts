import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ reply: "Method not allowed" });

  try {
    const { messages } = req.body as {
      messages: { role: "user" | "model"; content: string }[];
    };
    if (!messages || messages.length === 0) {
      return res.status(400).json({ reply: "No messages provided" });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Gemini API key not set" });
    }

    // Build a simple conversation transcript
    const history = messages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(history);
    const reply =
      result?.response && typeof result.response.text === "function"
        ? await result.response.text()
        : "No reply generated.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("AI Coach failed:", err);
    res.status(500).json({
      reply: "AI is temporarily unavailable. Please try again later. Until then, have proper sleep, good nutricious food, and regular exercises.",
    });
  }
}
