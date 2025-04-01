import { Module } from '@nestjs/common';
import { TaskRepository } from './infrastructure/persistence/repositories/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
