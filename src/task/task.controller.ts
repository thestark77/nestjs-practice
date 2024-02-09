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
} from '@nestjs/common'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks()
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') taskId: string): Task {
    return this.taskService.getTaskById(taskId)
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto): Task {
    return this.taskService.createTask(newTask)
  }

  @Patch(':taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Task | string {
    return this.taskService.updateTask(taskId, updatedTask)
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string): boolean {
    return this.taskService.deleteTask(taskId)
  }
}
