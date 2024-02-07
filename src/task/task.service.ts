import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.entity'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: '1234',
      title: 'First task',
      description: 'Go to yoga at 7pm',
      status: TaskStatus.PENDING,
    },
  ]

  getAllTasks() {
    return this.tasks
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id)
  }

  createTask({ title, description }: CreateTaskDto) {
    // const newTask = {
    //   id: v4(),
    //   title,
    //   description,
    //   status: TaskStatus.PENDING,
    // }
    const newTask = new Task(title, description)
    this.tasks.push(newTask)

    return newTask
  }

  updateTask(id: string, updatedFields: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      Object.assign(task, updatedFields)
      return task
    }
    return 'Error: task not found'
  }

  deleteTask(id: string) {
    const lastLength = this.tasks.length
    console.log(id)
    this.tasks = this.tasks.filter((task) => task.id !== id)
    const newLength = this.tasks.length

    if (newLength < lastLength) {
      return true
    }
    return false
  }
}
