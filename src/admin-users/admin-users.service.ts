import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { ListAdminUserDto } from './dto/list-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import * as bcrypt from 'bcryptjs';
import { CreateAdminUserInput } from './dto/create-admin-user.input';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) {}

  async create(dto: CreateAdminUserDto | CreateAdminUserInput) {
    const adminUser = this.adminUsersRepository.create({
      ...dto,
      password: await this.hassingString(dto.password),
    });
    return await this.adminUsersRepository.save(adminUser);
  }

  async count() {
    return await this.adminUsersRepository.count();
  }

  async findAll(dto: ListAdminUserDto) {
    const skip = dto.page * dto.page_size;
    return await this.adminUsersRepository.find({
      order: { id: 'DESC' },
      take: dto.page_size,
      skip: skip,
    });
  }

  async findOne(id: number) {
    const adminUser = await this.adminUsersRepository.findOne({
      where: { id: id },
    });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string) {
    const adminUser = await this.adminUsersRepository.findOne({
      where: { email: email },
    });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'AdminUser with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, dto: UpdateAdminUserDto) {
    const adminUser = await this.findOne(id);
    this.adminUsersRepository.merge(adminUser, dto);
    return await this.adminUsersRepository.save(adminUser);
  }

  async delete(id: number) {
    await this.adminUsersRepository.softDelete(id);
    return;
  }

  private async hassingString(str: string) {
    return await bcrypt.hash(str, 10);
  }
}
