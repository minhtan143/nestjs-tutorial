import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { JwtPayloadType } from 'src/auth/strategies/type/jwt-payload.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(currentUser: JwtPayloadType) {
    return await this.userRepository.findOne({ where: { id: currentUser.id } });
  }
}
