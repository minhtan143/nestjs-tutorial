import { BaseRepository } from '@common/infrastructure/persistence/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { Session } from 'src/session/domain/session.domain';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { SessionMapper } from '../mappers/session.mapper';

@Injectable()
export class SessionRepository extends BaseRepository<SessionEntity, Session> {
  constructor(dataSource: DataSource) {
    super(dataSource, SessionEntity);
  }

  protected toDomain(entity: SessionEntity): Session {
    return SessionMapper.toDomain(entity);
  }
  protected toEntity(domain: Session): SessionEntity {
    return SessionMapper.toEntity(domain);
  }
}
