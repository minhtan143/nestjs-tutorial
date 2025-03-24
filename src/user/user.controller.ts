import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayloadType } from 'src/auth/strategies/type/jwt-payload.type';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Request() request) {
    return await this.userService.getMe(request.user as JwtPayloadType);
  }
}
