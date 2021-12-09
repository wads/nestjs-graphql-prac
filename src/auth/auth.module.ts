import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminUser } from 'src/admin-users/admin-user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: `${configService.get('jwt.expiration_time')}s`,
        },
      }),
    }),
    AdminUsersModule,
    TypeOrmModule.forFeature([AdminUser]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminUsersService],
  controllers: [AuthController],
})
export class AuthModule {}
