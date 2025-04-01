import { Pagination } from '@common/domain/pagination.domain';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';
import { GetTaskPaginationPayload } from './dto/get-task.payload';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './infrastructure/persistence/repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(payload: GetTaskPaginationPayload) {
    const queryBuilder = this.taskRepository.createQueryBuilder();

    if (payload.filter) {
      queryBuilder.andWhere([
        { title: ILike(`%${payload.filter}%`) },
        { description: ILike(`%${payload.filter}%`) },
      ]);
    }

    if (payload.status) {
      queryBuilder.andWhere({
        status: payload.status,
      });
    }

    const [items, total] = await this.taskRepository.paginate(
      queryBuilder,
      payload,
    );

    const tasks = items.map(
      (task) =>
        <TaskDto>{
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          createdBy: task.createdBy,
          updatedBy: task.updatedBy,
        },
    );

    return Pagination.from(tasks, total, payload);
  }
}
