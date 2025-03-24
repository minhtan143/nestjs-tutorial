import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from './validators/unique-email.validator';

@Module({
  providers: [IsUniqueConstraint],
})
export class SharedModule {}
