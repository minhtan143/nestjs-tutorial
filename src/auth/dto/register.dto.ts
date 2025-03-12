import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'admin@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    example: 'password@123',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    example: 'admin',
  })
  username: string;
}
