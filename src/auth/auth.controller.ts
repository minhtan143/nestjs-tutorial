import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
}
