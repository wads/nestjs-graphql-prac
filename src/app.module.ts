import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersController } from './admin-users/admin-users.controller';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
