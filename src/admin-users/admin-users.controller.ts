import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminUsersService } from './admin-users.service';
import ListAdminUserDto from './dto/listAdminUser.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Query() query: ListAdminUserDto) {
    // TODL: pagination service作る
    if (!query.page) {
      query.page = 0;
    }
    if (!query.page_size) {
      query.page_size = 30;
    }

    return {
      data: await this.adminUsersService.find(query),
      total_count: await this.adminUsersService.count(),
      page: query.page,
      page_size: query.page_size,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param() params) {
    return this.adminUsersService.findById(params.id);
  }
}
