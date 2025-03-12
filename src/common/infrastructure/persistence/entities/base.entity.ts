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
  readonly id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ update: false })
  readonly createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  readonly deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: string;
}
