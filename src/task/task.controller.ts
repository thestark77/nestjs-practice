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

  @Get()
  getTasksFromPage(@Query('page') page?: number) {
    return this.taskService.getTasks(page)
  }

  @Get(':taskId')
  getTaskById(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.getTaskById(taskId)
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
