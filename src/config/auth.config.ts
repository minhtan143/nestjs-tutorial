import { registerAs } from '@nestjs/config';

export type AuthConfig = {
  jwtSecret: string;
  jwtExpiresIn: string;
};

export default registerAs<AuthConfig>('auth', () => {
  return {
    jwtSecret: process.env.JWT_SECRET || 'jwtSecretKey',
    jwtExpiresIn: process.env.JWT_EXPIRATION || '1d',
  };
});
