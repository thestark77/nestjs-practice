import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { TaskService } from './task.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('records')
  async getTotalPagesAndRecords() {
    return await this.taskService.totalRecords()
  }

  @Get()
  getTasksFromPage(@Query('page', ParseIntPipe) page?: number) {
    if (page < 1) {
      page = 1
    }

    return this.taskService.getTasks(page)
  }

  @Get(':taskId')
  getTaskById(@Param('taskId', ParseIntPipe) id: number) {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask)
  }

  @Patch(':taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updatedTask: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updatedTask)
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.deleteTask(taskId)
  }
}
