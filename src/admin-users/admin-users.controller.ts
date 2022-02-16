import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminUsersService } from './admin-users.service';
import { ListAdminUserDto } from './dto/listAdminUser.dto';
import { UpdateAdminUserDto } from './dto/updateAdminUser.dto';

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
  async show(@Param('id') id: number) {
    // TODO: 権限チェック
    return this.adminUsersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAdminUserDto) {
    // TODO: 権限チェック
    return this.adminUsersService.update(id, dto);
  }
}
