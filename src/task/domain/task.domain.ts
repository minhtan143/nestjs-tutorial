import { BaseDomain } from '@common/domain/base.domain';
import { TaskStatus } from '@common/enums/task.enum';

export class Task extends BaseDomain {
  title: string;
  description: string;
  status: TaskStatus;
}
