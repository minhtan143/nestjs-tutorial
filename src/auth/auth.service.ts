import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/domain/user.domain';
import { UserRepository } from 'src/user/infrastrusture/persistence/repositories/user.repository';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.username }, { username: loginDto.username }],
    });

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user?.password as string,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: JwtPayloadType = {
      id: user?.id,
      email: user?.email,
      username: user?.username,
    };

    return new AuthDto(await this.jwtService.signAsync(payload));
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hashPassword = await bcrypt.hash(
      registerDto.password,
      this.configService.get('auth.passwordSalt') as string,
    );

    const user = await this.userRepository.add({
      ...registerDto,
      password: hashPassword,
      createdBy: 'system',
    });

    return user as User;
  }
}
