import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from './type/jwt-payload.type';

/**
 * Extracts the access token from a cookie
 * @param req Http Request
 */
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies?.access_token;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  public validate(payload: JwtPayloadType) {
    if (!payload.sid) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
