import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );



  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  app.useStaticAssets('uploads', {
    prefix: '/uploads/',
  });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(3000);
}

bootstrap();