import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AdminUser from './admin-user.entity';
import CreateAdminUserDto from './dto/createAdminUser.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) {}

  async getById(id: number) {
    const adminUser = await this.adminUsersRepository.findOne({ id });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string) {
    const adminUser = await this.adminUsersRepository.findOne({ email });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'AdminUser with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(adminUserData: CreateAdminUserDto) {
    const newUser = await this.adminUsersRepository.create(adminUserData);
    await this.adminUsersRepository.save(newUser);
    return newUser;
  }
}
