import { registerAs } from '@nestjs/config';

export type AuthConfig = {
  passwordSalt: string;
  jwtSecret: string;
  jwtExpiresIn: string;
};

export default registerAs<AuthConfig>('auth', () => {
  return {
    passwordSalt: process.env.PASSWORD_SALT || 'passwordSalt',
    jwtSecret: process.env.JWT_SECRET || 'jwtSecretKey',
    jwtExpiresIn: process.env.JWT_EXPIRATION || '1d',
  };
});
