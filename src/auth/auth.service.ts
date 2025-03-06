import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {}
  async register(registerDto: RegisterDto) {}
}
