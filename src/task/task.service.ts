import type { RecordsAndPages } from '../utils/interfaces'
import { HttpException, Injectable } from '@nestjs/common'
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

  async totalRecords() {
    try {
      return await this.prisma.task.count()
    } catch (error) {
      return errorHandler('Query failed', 500, error)
    }
  }

  async totalPagesAndRecords(): Promise<RecordsAndPages | HttpException> {
    const queryResult = await this.totalRecords()

    if (queryResult instanceof HttpException) return queryResult

    const totalPages = Math.ceil(queryResult / this.RESULTS_LIMIT)
    return { totalRecords: queryResult, totalPages }
  }

  async getTasks(page?: number): Promise<Task[] | HttpException> {
    if (page < 1) {
      page = 1
    }

    try {
      return await this.prisma.task.findMany({
        skip: this.getOffsetFromPage(page),
        take: this.RESULTS_LIMIT,
      })
    } catch (error) {
      return errorHandler('Query failed', 500, error)
    }
  }

  async getTaskById(id: number): Promise<Task | HttpException> {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      })
    } catch (error) {
      return errorHandler('Task not found', 404, error)
    }
  }

  async createTask({
    title,
    description,
  }: CreateTaskDto): Promise<Task | HttpException> {
    try {
      return await this.prisma.task.create({
        data: {
          title,
          description,
        },
      })
    } catch (error) {
      return errorHandler('Task not found', 404, error)
    }
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      })
    } catch (error) {
      return errorHandler('Task not found', 404, error)
    }
  }

  async deleteTask(id: number) {
    try {
      return await this.prisma.task.delete({ where: { id } })
    } catch (error) {
      return errorHandler('Task not found', 404, error)
    }
  }
}
