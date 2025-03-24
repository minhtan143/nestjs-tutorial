import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Session } from 'src/session/domain/session.domain';
import { SessionService } from 'src/session/session.service';
import { User } from 'src/user/domain/user.domain';
import { UserRepository } from 'src/user/infrastrusture/persistence/repositories/user.repository';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/type/jwt-refresh-payload.type';

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.username }, { username: loginDto.username }],
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const session = await this.sessionService.createSession(user);

    return await this.genTokens(user, session);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hashPassword = await bcrypt.hash(
      registerDto.password,
      this.saltRounds,
    );

    const user = await this.userRepository.add({
      ...registerDto,
      password: hashPassword,
    });

    return user;
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthDto> {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayloadType>(
        refreshTokenDto.refresh_token,
        {
          secret: this.configService.get<string>('auth.jwtRefreshSecret'),
        },
      );

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      const session = await this.sessionService.getById(payload.sid);

      if (payload.hash != session.hash) {
        throw new HttpException('Invalid session.', HttpStatus.BAD_REQUEST);
      }

      return await this.genTokens(user, session);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Invalid refresh token.', HttpStatus.BAD_REQUEST);
    }
  }

  private async genTokens(user: User, session: Session): Promise<AuthDto> {
    const accessPayload: JwtPayloadType = {
      sid: session.id,
      hash: session.hash,
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const refreshPayload: JwtRefreshPayloadType = {
      sid: session.id,
      hash: session.hash,
      sub: user.id,
    };

    const authToken = new AuthDto();
    authToken.access_token = await this.jwtService.signAsync(accessPayload);
    authToken.expires_in = this.configService.get<number>(
      'auth.jwtExpiresIn',
      0,
    );
    authToken.refresh_token = await this.jwtService.signAsync(refreshPayload, {
      secret: this.configService.get<string>('auth.jwtRefreshSecret'),
      expiresIn: this.configService.get<string>('auth.jwtRefreshExpiresIn'),
    });

    return authToken;
  }
}
