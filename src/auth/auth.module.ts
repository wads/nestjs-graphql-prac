import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [AdminUsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthenticationModule {}
