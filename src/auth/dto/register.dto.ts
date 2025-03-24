import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/utils/validators/unique-email.validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'admin@example.com',
  })
  @IsUnique({ tableName: 'user', column: 'email' })
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
  @IsUnique({ tableName: 'user', column: 'username' })
  username: string;
}
