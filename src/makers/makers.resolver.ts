import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MakerModel } from './models/maker.model';
import { MakersService } from './makers.service';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';
import { CreateMakerInput } from './dto/create-maker.input';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';
import { MakerListModel } from './models/maker-list.model';
import { UpdateMakerInput } from './dto/update-maker.input';

@Resolver(() => MakerModel)
export class MakersResolver {
  constructor(private readonly makersService: MakersService) {}

  @Query(() => MakerListModel, { name: 'makers' })
  @UseGuards(GqlJwtAuthGuard)
  async findAll(
    @Args('query', { nullable: true }) input?: OffsetLimitPaginationInput,
  ) {
    return {
      offset: input.offset,
      limit: input.limit,
      total: await this.makersService.count(),
      items: await this.makersService.findAll(input),
    };
  }

  @Query(() => MakerModel, { name: 'maker' })
  @UseGuards(GqlJwtAuthGuard)
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.makersService.findOne(id);
  }

  @Mutation(() => MakerModel, { name: 'createOneMaker' })
  @UseGuards(GqlJwtAuthGuard)
  async createOne(@Args('data') inputData: CreateMakerInput) {
    // TODO: 権限チェック
    return await this.makersService.create(inputData);
  }

  @Mutation(() => MakerModel, { name: 'updateOneMaker' })
  @UseGuards(GqlJwtAuthGuard)
  async updateOne(
    @Args('id', { type: () => String }) id: string,
    @Args('data') inputData: UpdateMakerInput,
  ) {
    // TODO: 権限チェック
    return this.makersService.update(id, inputData);
  }

  @Mutation(() => MakerModel, {
    nullable: true,
    name: 'deleteOneMaker',
  })
  @UseGuards(GqlJwtAuthGuard)
  async deleteOne(@Args('id', { type: () => String }) id: string) {
    // TODO: 権限チェック
    return this.makersService.delete(id);
  }
}
