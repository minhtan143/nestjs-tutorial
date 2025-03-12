import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email or username',
    example: 'admin@example.com',
    nullable: false,
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    example: 'password@123',
    nullable: false,
  })
  password: string;
}
