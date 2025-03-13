import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/domain/user.domain';
import { UserRepository } from 'src/user/infrastrusture/persistence/repositories/user.repository';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  constructor(
    private readonly jwtService: JwtService,
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
      this.saltRounds,
    );

    const user = await this.userRepository.add({
      ...registerDto,
      password: hashPassword,
      createdBy: 'system',
    });

    return user;
  }
}
