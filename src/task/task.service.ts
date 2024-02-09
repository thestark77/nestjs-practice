import { Injectable } from '@nestjs/common'
import { Task } from './task.entity'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find()
  }

  getTaskById(id: string) {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    })
  }

  createTask({ title, description }: CreateTaskDto) {
    const newTask = new Task(title, description)
    this.taskRepository.create(newTask)
    return this.taskRepository.save(newTask)
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    const updateResult = await this.taskRepository.update({ id }, updatedFields)
    return this.validateDBchange(updateResult)
  }

  async deleteTask(id: string) {
    const deleteResult = await this.taskRepository.delete({ id })
    return this.validateDBchange(deleteResult)
  }

  private validateDBchange(result: DeleteResult | UpdateResult) {
    return result.affected === 1 ? true : false
  }
}
