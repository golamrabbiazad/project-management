'use client'

import { useState } from 'react'
import Button from './Button'
import Modal from 'react-modal'
import Input from './Input'
import { createNewTask } from '@/lib/api'

const initialTask = {
  name: '',
  description: '',
  deleted: true,
  status: 'NOT_STARTED',
}

export default function NewTask() {
  const [task, setTask] = useState({ ...initialTask })
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(task)

    await createNewTask(task.name, task.description, task.deleted, task.status)
    closeModal()
  }

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={openModal}>+ New Task</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="Task Name"
            value={task.name}
            onChange={(e) => setTask((t) => ({ ...t, name: e.target.value }))}
          />
          <Input
            placeholder="Task Description"
            value={task.description}
            onChange={(e) =>
              setTask((t) => ({ ...t, description: e.target.value }))
            }
          />
          <Input
            placeholder="isTaskDeleted"
            value={`${task.deleted}`}
            onChange={(e) =>
              setTask((t) => ({ ...t, deleted: e.target.value }))
            }
          />
          <Input
            placeholder="Task Status"
            value={task.status}
            onChange={(e) => setTask((t) => ({ ...t, status: e.target.value }))}
          />
          <Button>Create</Button>
        </form>
      </Modal>
    </div>
  )
}
