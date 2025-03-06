import { registerAs } from '@nestjs/config';

export type DatabaseConfig = {
  host?: string;
  port?: number;
  password?: string;
  database?: string;
  username?: string;
};

export default registerAs<DatabaseConfig>('database', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
  };
});
