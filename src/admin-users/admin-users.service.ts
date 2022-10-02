import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { OffsetLimitPaginationInput } from 'src/common/dto/offset-limit-pagination.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) {}

  async create(input: CreateAdminUserInput) {
    const adminUser = this.adminUsersRepository.create({
      ...input,
      password: await this.hashingString(input.password),
    });
    await this.adminUsersRepository.save(adminUser);
    return this.findOne(adminUser.id);
  }

  async findAll(input: OffsetLimitPaginationInput) {
    return await this.adminUsersRepository.find({
      order: { id: 'DESC' },
      take: input.limit,
      skip: input.offset,
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
      'AdminUser with this id does not exist',
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

  async update(id: number, input: UpdateAdminUserInput) {
    const adminUser = await this.findOne(id);
    this.adminUsersRepository.merge(adminUser, input);
    return await this.adminUsersRepository.save(adminUser);
  }

  async remove(id: number) {
    await this.adminUsersRepository.softDelete(id);
    return;
  }

  async count() {
    return await this.adminUsersRepository.count();
  }

  private async hashingString(str: string) {
    return await bcrypt.hash(str, 10);
  }
}
