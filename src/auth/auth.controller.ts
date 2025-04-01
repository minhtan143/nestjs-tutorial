import { BaseController } from '@common/base.controller';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ProfileDto } from 'src/user/dto/profile.dto';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, RegisterDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayloadType } from './strategies/type/jwt-payload.type';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login')
  @ApiOkResponse({ type: AuthDto, description: 'Login successful' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const authToken = await this.authService.login(loginDto);

    res.cookie('access_token', authToken.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json(authToken);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOkResponse({ type: AuthDto, description: 'Refresh token successful' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokenDto);
  }

  @Post('register')
  @HttpCode(200)
  @ApiOkResponse({ type: ProfileDto, description: 'Registration successful' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Logout successful',
  })
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('access_token');
    await this.authService.logout(req.user as JwtPayloadType);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
