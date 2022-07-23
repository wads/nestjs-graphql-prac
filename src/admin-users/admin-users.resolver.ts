import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './models/admin-user.model';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { ListAdminUserInput } from './dto/list-admin-user.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';

@Resolver((of) => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Query((returns) => [AdminUser], { name: 'adminUsers' })
  async findAll(@Args('query') query: ListAdminUserInput) {
    // TODL: pagination つけて返す
    return await this.adminUsersService.findAll(query);
  }

  @Query((returns) => AdminUser, { name: 'adminUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminUsersService.findOne(id);
  }

  @Mutation((returns) => AdminUser, { name: 'createOneAdminUser' })
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

  @Mutation((returns) => AdminUser, { name: 'updateOneAdminUser' })
  async updateOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') inputData: UpdateAdminUserInput,
  ) {
    // TODO: 権限チェック
    return this.adminUsersService.update(id, inputData);
  }

  @Mutation((returns) => AdminUser, {
    nullable: true,
    name: 'deleteOneAdminUser',
  })
  async deleteOne(@Args('id', { type: () => Int }) id: number) {
    // TODO: 権限チェック
    return this.adminUsersService.delete(id);
  }
}
