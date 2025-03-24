import { BaseEntity } from '@common/infrastructure/persistence/entities/base.entity';
import { UserEntity } from 'src/user/infrastrusture/persistence/entities/user.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity('session')
export class SessionEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @Index()
  user: UserEntity;

  @Column()
  hash: string;
}
