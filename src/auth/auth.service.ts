import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token?: string }> {
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

    const payload = {
      sub: user?.id,
      email: user?.email,
      username: user?.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
