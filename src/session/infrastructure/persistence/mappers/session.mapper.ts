import { Session } from 'src/session/domain/session.domain';
import { UserMapper } from 'src/user/infrastrusture/persistence/mappers/user.mapper';
import { SessionEntity } from '../entities/session.entity';

export class SessionMapper {
  static toDomain(entity: SessionEntity): Session {
    const session = new Session();
    session.id = entity.id;
    session.hash = entity.hash;

    if (entity.user) {
      session.user = UserMapper.toDomain(entity.user);
    }

    return session;
  }

  static toEntity(domain: Session): SessionEntity {
    const entity = new SessionEntity();
    entity.id = domain.id;
    entity.hash = domain.hash;

    if (domain.user) {
      entity.user = UserMapper.toEntity(domain.user);
    }

    return entity;
  }
}
