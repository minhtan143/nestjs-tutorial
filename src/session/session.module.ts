import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionRepository } from './infrastructure/persistence/repositories/session.repository';

@Module({
  providers: [SessionService, SessionRepository],
})
export class SessionModule {}
