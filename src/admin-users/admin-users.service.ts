import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './admin-user.entity';
import { CreateAdminUserDto } from './dto/createAdminUser.dto';
import { ListAdminUserDto } from './dto/listAdminUser.dto';
import { UpdateAdminUserDto } from './dto/updateAdminUser.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) {}

  async count() {
    return await this.adminUsersRepository.count();
  }

  async find(dto: ListAdminUserDto) {
    const skip = dto.page * dto.page_size;
    return await this.adminUsersRepository.find({
      order: { id: 'DESC' },
      take: dto.page_size,
      skip: skip,
    });
  }

  async findById(id: number) {
    const adminUser = await this.adminUsersRepository.findOne({ id });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string) {
    const adminUser = await this.adminUsersRepository.findOne({ email });
    if (adminUser) {
      return adminUser;
    }
    throw new HttpException(
      'AdminUser with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(dto: CreateAdminUserDto) {
    const adminUser = this.adminUsersRepository.create(dto);
    return await this.adminUsersRepository.save(adminUser);
  }

  async update(id: number, dto: UpdateAdminUserDto) {
    await this.adminUsersRepository.update(id, dto);
    return;
  }

  async delete(id: number) {
    await this.adminUsersRepository.softDelete(id);
    return;
  }
}
