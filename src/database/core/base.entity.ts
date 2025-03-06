import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt?: Date;

  @Column()
  updatedBy?: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @Column()
  deletedBy?: string;
}
