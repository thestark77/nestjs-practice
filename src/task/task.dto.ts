import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description?: string
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status?: TaskStatus
}
