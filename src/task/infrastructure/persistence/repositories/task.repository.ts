import { BaseRepository } from '@common/infrastructure/persistence/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/task.domain';
import { DataSource } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity, Task> {
  constructor(dataSource: DataSource) {
    super(dataSource, TaskEntity);
  }

  protected toDomain(entity: TaskEntity): Task {
    return TaskMapper.toDomain(entity);
  }

  protected toEntity(domain: Task): TaskEntity {
    return TaskMapper.toPersistence(domain);
  }
}
