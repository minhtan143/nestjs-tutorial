import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/core/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;
}
