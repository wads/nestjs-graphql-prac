import {
  InternalServerErrorException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './entities/admin-user.entity';
import { AdminUserList } from './entities/admin-user-list.entity';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OffsetLimitPaginationInput } from 'src/common/dto/offset-limit-pagination.input';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => AdminUser)
  @UseGuards(JwtAuthGuard)
  async createAdminUser(
    @Args('createAdminUserInput') createAdminUserInput: CreateAdminUserInput,
  ) {
    // TODO: 権限チェック
    try {
      return await this.adminUsersService.create(createAdminUserInput);
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityException({
          message: `Duplicate entry ${createAdminUserInput.email}`,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  @Query(() => AdminUserList, { name: 'adminUsers' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('query', { nullable: true }) input?: OffsetLimitPaginationInput,
  ) {
    return {
      offset: input.offset,
      limit: input.limit,
      total: await this.adminUsersService.count(),
      items: await this.adminUsersService.findAll(input),
    };
  }

  @Query(() => AdminUser, { name: 'adminUser' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminUsersService.findOne(id);
  }

  @Mutation(() => AdminUser)
  @UseGuards(JwtAuthGuard)
  async updateAdminUser(
    @Args('updateAdminUserInput') updateAdminUserInput: UpdateAdminUserInput,
  ) {
    // TODO: 権限チェック
    return this.adminUsersService.update(
      updateAdminUserInput.id,
      updateAdminUserInput,
    );
  }

  @Mutation(() => AdminUser, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async removeAdminUser(@Args('id', { type: () => Int }) id: number) {
    // TODO: 権限チェック
    return this.adminUsersService.remove(id);
  }
}
