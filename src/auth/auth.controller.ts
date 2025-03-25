import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthDto })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const authToken = await this.authService.login(loginDto);

    res.cookie('access_token', authToken.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json(authToken);
  }

  @Post('refresh')
  @ApiOkResponse({ type: AuthDto })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokenDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('access_token');
    await this.authService.logout(req.user as JwtPayloadType);
    return res.sendStatus(200);
  }
}
