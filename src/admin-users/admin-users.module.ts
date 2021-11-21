import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin-user.entity';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUsersService],
  controllers: [AdminUsersController],
})
export class AdminUsersModule {}
