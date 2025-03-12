import { BaseDomain } from '@common/infrastructure/persistence/domain/base.domain';

export class User extends BaseDomain {
  email: string;
  password: string;
  username: string;
}
