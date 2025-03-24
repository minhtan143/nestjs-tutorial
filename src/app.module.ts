import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { SharedModule } from './utils/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
