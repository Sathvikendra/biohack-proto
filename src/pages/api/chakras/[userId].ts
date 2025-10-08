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
