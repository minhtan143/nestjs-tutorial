import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from 'src/auth/strategies/type/jwt-payload.type';
import { UserRepository } from './infrastrusture/persistence/repositories/user.repository';
import { User } from './domain/user.domain';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(currentUser: JwtPayloadType) {
    return (await this.userRepository.findOne({
      where: { id: currentUser.id },
    })) as User;
  }
}
