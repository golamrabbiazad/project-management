import { validateJWT } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof process.env.COOKIE_NAME === 'undefined') {
    throw new Error('COOKIE_NOT_FOUND')
  }

  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME] as string)

  if (!user) {
    return 'User not found'
  }

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  })

  res.status(200).json({ data: { message: 'ok' } })
}
