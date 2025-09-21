import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { insightPrompt } from "@/lib/prompts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { profile, wearable, summary } = req.body;
    if (!wearable) return res.status(400).json({ error: "Missing wearable data" });

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not set" });
    }
    const prompt = insightPrompt({ profile, wearable, summary });
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(prompt);

    console.log("Gemini raw result:", JSON.stringify(result, null, 2));

    const text = result?.response?.text?.() ?? "No insight generated.";


    res.status(200).json({ insight: text });
  } catch (err: any) {
    console.error("Insight generation failed:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}