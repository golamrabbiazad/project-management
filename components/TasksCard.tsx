import { getUserFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { Task, TASK_STATUS } from '@prisma/client'
import { cookies } from 'next/headers'
import Card from './Card'
import NewTask from './NewTask'

const getData = async () => {
  const user = await getUserFromCookie(cookies())

  if (!user) {
    throw new Error('User not found')
  }

  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  })

  return tasks
}
const TasksCard = async ({
  title,
  tasks,
}: {
  title: string
  tasks: Task[]
}) => {
  const data = tasks || (await getData())

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>

        <NewTask />
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div key={task.id} className="py-2 ">
                <span className="text-gray-800">{task.name}</span>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  )
}

export default TasksCard
