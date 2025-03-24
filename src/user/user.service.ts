import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from 'src/auth/strategies/type/jwt-payload.type';
import { ProfileDto } from './dto/profile.dto';
import { UserRepository } from './infrastrusture/persistence/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(currentUser: JwtPayloadType): Promise<ProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.sub },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const profile = new ProfileDto();
    profile.id = user.id;
    profile.username = user.username;
    profile.email = user.email;
    profile.createdAt = user.createdAt;

    return profile;
  }
}
