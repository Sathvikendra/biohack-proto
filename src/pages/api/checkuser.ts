import { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) return res.status(400).json({ exists: false });

  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(email);

    if (error) return res.status(200).json({ exists: false });

    return res.status(200).json({ exists: !!data.user });
  } catch (err) {
    return res.status(200).json({ exists: false });
  }
}
