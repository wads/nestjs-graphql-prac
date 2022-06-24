import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import TokenPayload from './tokenPayload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // TODO: 一般ユーザーではないのでregisterは不要
  // public async register(adminUserData: CreateAdminUserDto) {
  //   try {
  //     const createdAdminUser = await this.adminUsersService.create(
  //       adminUserData,
  //     );
  //     return createdAdminUser;
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(
  //       'Something went wrong',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const adminUser = await this.adminUsersService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, adminUser.password);
      this.verifyAdminUser(adminUser);
      return adminUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private verifyAdminUser(adminUser: AdminUser) {
    if (!adminUser.isActive) {
      throw new HttpException('Invalid admin user', HttpStatus.BAD_REQUEST);
    }
  }
}
