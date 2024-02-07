import { v4 } from 'uuid'

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS ',
  DONE = 'DONE',
}

export class Task {
  id: string
  title: string
  description: string
  status: TaskStatus

  constructor(title: string, description: string) {
    this.id = v4()
    this.title = title
    this.description = description
    this.status = TaskStatus.PENDING
  }
}
