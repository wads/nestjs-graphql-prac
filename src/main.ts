import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.enableCors(configService.get('cors'));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
