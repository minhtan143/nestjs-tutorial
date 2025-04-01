import { PaginationPayload } from '@common/dto/pagination.payload';
import { TaskStatus } from '@common/enums/task.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class GetTaskPaginationPayload extends PaginationPayload {
  @IsOptional()
  filter: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
