import {
  InternalServerErrorException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './models/admin-user.model';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { ListAdminUserInput } from './dto/list-admin-user.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Query(() => [AdminUser], { name: 'adminUsers' })
  @UseGuards(GqlJwtAuthGuard)
  async findAll(@Args('query') query: ListAdminUserInput) {
    // TODL: pagination つけて返す
    return await this.adminUsersService.findAll(query);
  }

  @Query(() => AdminUser, { name: 'adminUser' })
  @UseGuards(GqlJwtAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminUsersService.findOne(id);
  }

  @Mutation(() => AdminUser, { name: 'createOneAdminUser' })
  @UseGuards(GqlJwtAuthGuard)
  async createOne(@Args('data') inputData: CreateAdminUserInput) {
    // TODO: 権限チェック
    try {
      return await this.adminUsersService.create(inputData);
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityException({
          message: `Duplicate entry ${inputData.email}`,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  @Mutation(() => AdminUser, { name: 'updateOneAdminUser' })
  @UseGuards(GqlJwtAuthGuard)
  async updateOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') inputData: UpdateAdminUserInput,
  ) {
    // TODO: 権限チェック
    return this.adminUsersService.update(id, inputData);
  }

  @Mutation(() => AdminUser, {
    nullable: true,
    name: 'deleteOneAdminUser',
  })
  @UseGuards(GqlJwtAuthGuard)
  async deleteOne(@Args('id', { type: () => Int }) id: number) {
    // TODO: 権限チェック
    return this.adminUsersService.delete(id);
  }
}
