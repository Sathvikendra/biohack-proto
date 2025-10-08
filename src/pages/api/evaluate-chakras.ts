import type { NextApiRequest, NextApiResponse } from "next";
import { evaluateAndUpdateChakras, getUserProfile } from "@/utils/chakraEvaluation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : null;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    // Fetch profile directly from Supabase
    const profile = await getUserProfile(userId);
    if (!profile) return res.status(404).json({ error: "User profile not found" });

    // Evaluate chakras
    const evaluation = await evaluateAndUpdateChakras(userId, profile);
    if (!evaluation) return res.status(500).json({ error: "Failed to evaluate chakras" });

    return res.status(200).json(evaluation);

  } catch (err) {
    console.error("Chakra evaluation API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
