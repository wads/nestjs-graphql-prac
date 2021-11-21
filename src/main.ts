import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
