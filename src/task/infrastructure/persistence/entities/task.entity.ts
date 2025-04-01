import { TaskStatus } from '@common/enums/task.enum';
import { BaseEntity } from '@common/infrastructure/persistence/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('task')
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;
}
