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

  const project = await db.project.findFirst({
    where: { ownerId: user.id },
    include: {
      tasks: true,
    },
  })

  if (!project) {
    return 'project not found'
  }

  await db.task.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      deleted: Boolean(req.body.deleted),
      status: req.body.status,
      ownerId: user.id,
      projectId: project.id,
    },
  })

  res.status(200).json({ data: { message: 'ok' } })
}
