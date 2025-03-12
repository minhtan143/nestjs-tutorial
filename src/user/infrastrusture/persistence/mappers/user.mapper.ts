import { User } from 'src/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return entity as User;
  }

  static toEntity(domain: User): UserEntity {
    return domain as UserEntity;
  }
}
