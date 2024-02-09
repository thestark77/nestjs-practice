import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'tasks',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
