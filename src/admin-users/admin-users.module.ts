import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersResolver } from './admin-users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUsersService, AdminUsersResolver],
})
export class AdminUsersModule {}
