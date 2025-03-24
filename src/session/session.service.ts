import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as bcrypt from 'bcrypt';
import { SessionRepository } from './infrastructure/persistence/repositories/session.repository';
import { User } from 'src/user/domain/user.domain';
import { Session } from './domain/session.domain';

@Injectable()
export class SessionService {
  private readonly saltRounds: number = 16;

  constructor(private readonly sessionRepository: SessionRepository) {}

  async createSession(user: User): Promise<Session> {
    const hash = await bcrypt.hash(randomStringGenerator(), this.saltRounds);

    const session = await this.sessionRepository.add({
      user,
      hash,
    });

    return session;
  }

  async getById(id: string): Promise<Session> {
    const session = await this.sessionRepository.findOne({ where: { id } });

    if (!session) {
      throw new Error('Session not found.');
    }

    return session;
  }
}
