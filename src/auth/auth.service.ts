import { HttpException, HttpStatus } from '@nestjs/common';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import CreateAdminUserDto from 'src/admin-users/dto/createAdminUser.dto';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  public async register(adminUserData: CreateAdminUserDto) {
    const hashedPassword = await bcrypt.hash(adminUserData.password, 10);
    try {
      const createdAdminUser = await this.adminUsersService.create({
        ...adminUserData,
        password: hashedPassword,
      });
      createdAdminUser.password = undefined;
      return createdAdminUser;
    } catch (error) {
      //if (error?.code === PostgresErrorCode.UniqueViolation) {
      //  throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      //}
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const adminUser = await this.adminUsersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, adminUser.password);
      adminUser.password = undefined;
      return adminUser;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
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
}
