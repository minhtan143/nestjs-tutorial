import { BaseDomain } from '@common/domain/base.domain';
import { User } from 'src/user/domain/user.domain';

export class Session extends BaseDomain {
  id: string;
  user: User;
  hash: string;
}
