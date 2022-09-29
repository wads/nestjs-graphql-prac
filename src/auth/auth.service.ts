import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import TokenPayload from '../common/interfaces/token-payload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getAuthenticatedAdminUser(
    email: string,
    plainTextPassword: string,
  ) {
    const adminUser = await this.adminUsersService.findByEmail(email);
    if (!adminUser) {
      return null;
    }

    if (
      this.verifyPassword(plainTextPassword, adminUser) &&
      this.verifyAdminUser(adminUser)
    ) {
      return adminUser;
    }

    return null;
  }

  public getCookieWithJwtToken(adminUserId: number) {
    const payload: TokenPayload = { adminUserId };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwt.expiration_time',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private verifyPassword(password: string, adminUser: AdminUser): boolean {
    return bcrypt.compareSync(password, adminUser.password);
  }

  private verifyAdminUser(adminUser: AdminUser) {
    return adminUser.isActive;
  }
}
