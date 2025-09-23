import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";
import pdfParse from "pdf-parse";
import { summarizeText } from "@/lib/labReport";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { filePath, userId } = req.body;
  if (!filePath || !userId) return res.status(400).json({ error: "Missing filePath or userId" });

  try {
    const { data: fileData, error :downloadErr} = await supabase.storage
      .from("lab-tests")
      .download(filePath);

    if(downloadErr) throw downloadErr;
    if (!fileData) throw new Error("Failed to download PDF");

    const pdfBuffer = await fileData.arrayBuffer();
    const pdfText = (await pdfParse(Buffer.from(pdfBuffer))).text;
    console.log("PDF Text",pdfText.length)

    // Summarize using Gemini
    const summary = await summarizeText(pdfText);

    // Save summary in Supabase table
    await supabase.from("report_summaries").upsert({
      user_id: userId,
      file_path: filePath,
      summary,
    },{ onConflict: "user_id,file_path" });

    return res.status(200).json({ summary });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
