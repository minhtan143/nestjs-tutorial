import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidationErrorResponseDto } from './dto/validation-error.dto';

@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: 'Bad Request',
  type: ValidationErrorResponseDto,
})
export abstract class BaseController {}
