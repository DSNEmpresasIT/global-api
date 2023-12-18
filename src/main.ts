import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: [
      (process.env.LOCAL === 'true') && "http://localhost:3000",
      'https://estudiojuridicojauregui.com.ar',
      'http://estudiojuridicojauregui.com.ar',
      'https://aluplast.com.ar',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
