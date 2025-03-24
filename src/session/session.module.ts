import { Module } from '@nestjs/common';
import { SessionRepository } from './infrastructure/persistence/repositories/session.repository';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService, SessionRepository],
})
export class SessionModule {}
