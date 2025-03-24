import { SessionMapper } from 'src/session/infrastructure/persistence/mappers/session.mapper';
import { User } from 'src/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    const user = new User();
    user.id = entity.id;
    user.username = entity.username;
    user.email = entity.email;
    user.password = entity.password;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;
    user.deletedAt = entity.deletedAt;
    user.createdBy = entity.createdBy;
    user.updatedBy = entity.updatedBy;
    user.deletedBy = entity.deletedBy;

    if (entity.sessions) {
      user.sessions = entity.sessions.map((session) =>
        SessionMapper.toDomain(session),
      );
    }

    return user;
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.username = domain.username;
    entity.email = domain.email;
    entity.password = domain.password;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    entity.createdBy = domain.createdBy;
    entity.updatedBy = domain.updatedBy;
    entity.deletedBy = domain.deletedBy;

    if (domain.sessions) {
      entity.sessions = entity.sessions.map((session) =>
        SessionMapper.toEntity(session),
      );
    }

    return entity;
  }
}
