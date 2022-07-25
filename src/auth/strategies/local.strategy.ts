import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AdminUser> {
    const adminUser = this.authService.getAuthenticatedAdminUser(
      email,
      password,
    );

    if (!adminUser) {
      throw new UnauthorizedException();
    }

    return adminUser;
  }
}
