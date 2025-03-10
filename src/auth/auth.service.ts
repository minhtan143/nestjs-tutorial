import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.email }, { username: loginDto.email }],
    });

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user?.password ?? '',
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

  async register(registerDto: RegisterDto) {
    const hashPassword = await bcrypt.hash(
      registerDto.password,
      this.saltOrRounds,
    );

    const user = this.userRepository.create({
      ...registerDto,
      password: hashPassword,
      createdBy: 'system',
    });

    return this.userRepository.save(user);
  }
}
