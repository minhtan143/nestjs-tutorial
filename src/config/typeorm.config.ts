import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres' as const,
      host: this.configService.get<string>('database.host', '127.0.0.1'),
      port: this.configService.get<number>('database.port', 5432),
      username: this.configService.get<string>('database.username', 'postgres'),
      password: this.configService.get<string>('database.password', '123'),
      database: this.configService.get<string>('database.database', 'nest'),
      synchronize: false,
      entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../**/**/*-migration{.ts,.js}'],
      autoLoadEntities: true,
      migrationsRun: false,
      logging: true,
    };
  }
}
