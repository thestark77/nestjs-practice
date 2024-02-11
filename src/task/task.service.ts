import type { HttpReturn } from '../utils/interfaces'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { errorHandler } from '../utils/errorHandler'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private RESULTS_LIMIT = 20

  private getOffsetFromPage(page: number) {
    return (page - 1) * this.RESULTS_LIMIT
  }

  private async totalRecords() {
    return await this.prisma.task.count()
  }

  async totalPagesAndRecords() {
    const totalRecords = await this.totalRecords()
    const totalPages = Math.ceil(totalRecords / this.RESULTS_LIMIT)
    return { totalRecords, totalPages }
  }

  async getTasks(page?: number): Promise<Task[]> {
    if (page < 1) {
      page = 1
    }
    return await this.prisma.task.findMany({
      skip: this.getOffsetFromPage(page),
      take: this.RESULTS_LIMIT,
    })
  }

  async getTaskById(id: number): HttpReturn<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } })

    if (!task) {
      return errorHandler('Task not found', HttpStatus.NOT_FOUND)
    }

    return task
  }

  createTask({ title, description }: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
      },
    })
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data,
    })
    //TODO: trycatch
    // return this.validateDBchange(updateResult)
  }

  async deleteTask(id: number) {
    return await this.prisma.task.delete({ where: { id } })

    // return this.validateDBchange(deleteResult)
  }

  // private validateDBchange(result: DeleteResult | UpdateResult) {
  //   if (result.affected === 0) {
  //     return errorHandler('Task not found', HttpStatus.NOT_FOUND)
  //   }

  //   return true
  // }
}
