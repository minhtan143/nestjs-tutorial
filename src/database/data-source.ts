import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

export const AppDataSource = new DataSource({
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  synchronize: false,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/**/*-migration{.ts,.js}'],
  migrationsRun: false,
  logging: true,
});
