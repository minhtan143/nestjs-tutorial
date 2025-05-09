import { BaseController } from '@common/base.controller';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@utils/decorators/paginated-response.decorator';
import { GetTaskPaginationPayload } from './dto/get-task.payload';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController extends BaseController {
  constructor(private readonly taskService: TaskService) {
    super();
  }

  @ApiBearerAuth()
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiPaginatedResponse(TaskDto, {
    description: 'Get list of tasks',
  })
  async getTasks(@Query() payload: GetTaskPaginationPayload) {
    return await this.taskService.getTasks(payload);
  }
}
