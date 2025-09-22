import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotPrompt } from "@/lib/prompts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ reply: "Method not allowed" });

  try {
    const { question, profile, wearable, summary } = req.body;

    if (!question) return res.status(400).json({ reply: "Missing question" });

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Gemini API key not set" });
    }

    const prompt = chatbotPrompt({
      profile: profile ?? {},
      wearable: wearable ?? {},
      summary: summary ?? "",
      question, 
    });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(prompt);

    console.log("Gemini raw result:", JSON.stringify(result, null, 2));

    const reply = result?.response?.text?.() ?? "No reply generated.";

    res.status(200).json({ reply });

  } catch (err: any) {
  console.error("AI Coach failed:", err);

  res.status(200).json({
    reply: "AI is temporarily unavailable, try again later. Till then sit back, stay hydrated and get 7–8 hours of sleep."
  });
}

}
