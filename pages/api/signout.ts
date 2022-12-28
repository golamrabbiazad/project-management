import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME as string, '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
      })
    )

    res.status(201).end()
  } else {
    res.status(402).end()
  }
}
