import { Task } from 'src/task/domain/task.domain';
import { TaskEntity } from '../entities/task.entity';

export class TaskMapper {
  static toDomain(entity: TaskEntity): Task {
    const task = new Task();
    task.id = entity.id;
    task.title = entity.title;
    task.description = entity.description;
    task.status = entity.status;
    task.createdAt = entity.createdAt;
    task.updatedAt = entity.updatedAt;
    task.deletedAt = entity.deletedAt;
    task.createdBy = entity.createdBy;
    task.updatedBy = entity.updatedBy;
    task.deletedBy = entity.deletedBy;
    return task;
  }

  static toPersistence(domain: Task): TaskEntity {
    const entity = new TaskEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.status = domain.status;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    entity.createdBy = domain.createdBy;
    entity.updatedBy = domain.updatedBy;
    entity.deletedBy = domain.deletedBy;
    return entity;
  }
}
