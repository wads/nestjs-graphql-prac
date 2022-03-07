import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { XsrfTokenInterceptor } from './common/interceptors/xsrf-token.interceptor';
import { TokenController } from './token/token.controller';
import config from './config/config';
import * as dbConfig from './config/db.config';

// For typeorm cli (migration)
export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(dbConfig);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(dbConfig),
    AdminUsersModule,
    AuthModule,
  ],
  controllers: [AppController, TokenController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: XsrfTokenInterceptor,
    },
  ],
})
export class AppModule {}
