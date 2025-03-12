import { BaseRepository } from '@common/infrastructure/persistence/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/user.domain';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, User> {
  protected toDomain(entity: UserEntity): User {
    return UserMapper.toDomain(entity);
  }
  protected toEntity(domain: User): UserEntity {
    return UserMapper.toEntity(domain);
  }

  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity);
  }
}
