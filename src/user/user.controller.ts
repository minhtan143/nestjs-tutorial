import { BaseController } from '@common/base.controller';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtPayloadType } from 'src/auth/strategies/type/jwt-payload.type';
import { ProfileDto } from './dto/profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ProfileDto, description: 'User profile' })
  async getMe(@Req() request) {
    return await this.userService.getMe(request.user as JwtPayloadType);
  }
}
