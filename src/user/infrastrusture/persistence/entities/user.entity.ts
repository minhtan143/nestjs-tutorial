import { BaseEntity } from '@common/infrastructure/persistence/entities/base.entity';
import { SessionEntity } from 'src/session/infrastructure/persistence/entities/session.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
