import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Todo')
    .addBearerAuth()
    .build();
  const documentFactoty = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactoty);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
