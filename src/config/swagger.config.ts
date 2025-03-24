import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Todo API')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addCookieAuth('access_token')
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    withCredentials: true,
    requestInterceptor: (req: Request) => {
      if (req.credentials === 'include' && req.headers['Cookie']) {
        req.headers['Cookie'] = req.headers['Cookie']
          .split('; ')
          .filter((cookie: string) => cookie.startsWith('access_token'))
          .join('; ');
      }
      return req;
    },
  },
};
