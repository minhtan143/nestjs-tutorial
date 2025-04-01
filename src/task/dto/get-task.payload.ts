import { PaginationPayload } from '@common/dto/pagination.payload';
import { TaskStatus } from '@common/enums/task.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskPaginationPayload extends PaginationPayload {
  @ApiProperty({ required: false })
  filter: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  status: TaskStatus;
}
