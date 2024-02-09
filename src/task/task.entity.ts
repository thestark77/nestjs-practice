import { v4 } from 'uuid'
import { Entity, Column, PrimaryColumn } from 'typeorm'

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS ',
  DONE = 'DONE',
}
@Entity({ name: 'tasks' })
export class Task {
  constructor(title: string, description: string) {
    this.id = v4()
    this.title = title
    this.description = description
    this.status = TaskStatus.PENDING
  }

  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column()
  status: TaskStatus

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
