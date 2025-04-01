import { BaseController } from '@common/base.controller';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController extends BaseController {
  @Get('health-check')
  @ApiOkResponse({ description: 'Health check endpoint', type: String })
  healthCheck() {
    return 'OK';
  }
}
