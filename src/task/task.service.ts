import type { HttpReturn } from '../utils/interfaces'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Task } from './task.entity'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { errorHandler } from '../utils/errorHandler'
import { deleteItem, getItem, getItems, updateItem } from '../utils/db.queries'
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(page?: number): Promise<Task[]> {
    return await getItems(this.taskRepository, page)
  }

  async getTaskById(id: string): HttpReturn<Task> {
    const task = await this.searchTask(id)

    if (!task) {
      return errorHandler('Task not found', HttpStatus.NOT_FOUND)
    }

    return task
  }

  createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const newTask = new Task(title, description)
    this.taskRepository.create(newTask)
    return this.taskRepository.save(newTask)
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto): HttpReturn<true> {
    const updateResult = await updateItem(
      this.taskRepository,
      { id },
      updatedFields,
    )
    return this.validateDBchange(updateResult)
  }

  async deleteTask(id: string): HttpReturn<true> {
    const deleteResult = await deleteItem(this.taskRepository, { id })
    return this.validateDBchange(deleteResult)
  }

  private validateDBchange(result: DeleteResult | UpdateResult) {
    if (result.affected === 0) {
      return errorHandler('Task not found', HttpStatus.NOT_FOUND)
    }

    return true
  }

  private async searchTask(id: string): Promise<Task> {
    return await getItem(this.taskRepository, { id })
  }
}
