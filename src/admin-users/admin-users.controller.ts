import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { ListAdminUserDto } from './dto/list-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateAdminUserDto) {
    // TODO: 権限チェック
    try {
      return await this.adminUsersService.create(dto);
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityException({
          message: `Duplicate entry ${dto.email}`,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: ListAdminUserDto) {
    // TODL: pagination service作る
    if (!query.page) {
      query.page = 0;
    }
    if (!query.page_size) {
      query.page_size = 30;
    }

    return {
      data: await this.adminUsersService.findAll(query),
      total_count: await this.adminUsersService.count(),
      page: query.page,
      page_size: query.page_size,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // TODO: 権限チェック
    return this.adminUsersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdminUserDto) {
    // TODO: 権限チェック
    return this.adminUsersService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminUsersService.delete(+id);
  }
}
