import { BaseDomain } from '@common/domain/base.domain';
import { Session } from 'src/session/domain/session.domain';

export class User extends BaseDomain {
  email: string;
  password: string;
  username: string;
  sessions: Session[];
}
