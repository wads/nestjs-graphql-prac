import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminUsersService } from './admin-users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return this.adminUsersService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param() params) {
    return this.adminUsersService.findById(params.id);
  }
}
