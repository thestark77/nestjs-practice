import type { RecordsAndPages } from '../utils/interfaces'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Task } from '@prisma/client'
import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { handleError } from '../utils/errorHandler'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TaskService.name)

  private RESULTS_LIMIT = 20

  private getOffsetFromPage(page: number) {
    return (page - 1) * this.RESULTS_LIMIT
  }

  async totalRecords() {
    try {
      return await this.prisma.task.count()
    } catch (error) {
      return handleError(
        this.logger,
        this.totalRecords.name,
        undefined,
        'Query failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      )
    }
  }

  async totalPagesAndRecords(): Promise<RecordsAndPages | HttpException> {
    const queryResult = await this.totalRecords()

    if (queryResult instanceof HttpException) return queryResult

    const totalPages = Math.ceil(queryResult / this.RESULTS_LIMIT)
    return { totalRecords: queryResult, totalPages }
  }

  async getTasks(page?: number): Promise<Task[] | HttpException> {
    try {
      return await this.prisma.task.findMany({
        skip: this.getOffsetFromPage(page),
        take: this.RESULTS_LIMIT,
      })
    } catch (error) {
      return handleError(
        this.logger,
        this.getTasks.name,
        { page },
        'Query failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      )
    }
  }

  async getTaskById(id: number): Promise<Task | HttpException> {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      })
    } catch (error) {
      return handleError(
        this.logger,
        this.getTaskById.name,
        { id },
        'Task not found',
        HttpStatus.NOT_FOUND,
        error,
      )
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
      return handleError(
        this.logger,
        this.createTask.name,
        {
          title,
          description,
        },
        'Query failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      )
    }
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      })
    } catch (error) {
      return handleError(
        this.logger,
        this.updateTask.name,
        { id, data },
        'Task not found',
        HttpStatus.NOT_FOUND,
        error,
      )
    }
  }

  async deleteTask(id: number) {
    try {
      return await this.prisma.task.delete({ where: { id } })
    } catch (error) {
      return handleError(
        this.logger,
        this.deleteTask.name,
        { id },
        'Task not found',
        HttpStatus.NOT_FOUND,
        error,
      )
    }
  }
}
