import { CreateTaskDto, UpdateTaskDto } from './task.dto'
import { Task } from './task.entity'
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
} from '@nestjs/common'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasksFromPage(@Query('page') page?: number): Promise<Task[]> {
    return this.taskService.getTasks(page)
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId)
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(newTask)
  }

  @Patch(':taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updatedTask: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updatedTask)
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId)
  }
}
