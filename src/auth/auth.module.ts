import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { AuthService } from './auth.service';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from 'src/auth/auth.resolver';

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
  providers: [
    AdminUsersService,
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
