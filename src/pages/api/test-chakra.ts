import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";
import { getChakraStatus } from "@/utils/chakraService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: users, error } = await supabase.from("users").select("id").limit(1);
  if (error || !users?.length) return res.status(400).json({ error: error?.message ?? "No user" });

  const chakraStatus = await getChakraStatus(users[0].id as string);
  res.status(200).json({ chakraStatus });
}



// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getChakraStatus, updateChakraStatus } from '@/utils/chakraService'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const userId = req.query.userId as string
//   try {
//     if (req.method === 'GET') {
//       const data = await getChakraStatus(userId)
//       return res.status(200).json(data)
//     }
//     if (req.method === 'PATCH') {
//       const updates = req.body
//       const data = await updateChakraStatus(userId, updates)
//       return res.status(200).json(data)
//     }
//     res.status(405).end()
//   } catch (e: any) {
//     res.status(500).json({ error: e.message })
//   }
// }
