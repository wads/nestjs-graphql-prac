import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MakersService } from './makers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMakerInput } from './dto/create-maker.input';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';
import { UpdateMakerInput } from './dto/update-maker.input';
import { Maker } from './entities/maker.entity';
import { MakerList } from './entities/maker-list.entity';

@Resolver(() => Maker)
export class MakersResolver {
  constructor(private readonly makersService: MakersService) {}

  @Mutation(() => Maker)
  @UseGuards(JwtAuthGuard)
  async createMaker(
    @Args('createMakerInput') createMakerInput: CreateMakerInput,
  ) {
    // TODO: 権限チェック
    return await this.makersService.create(createMakerInput);
  }

  @Query(() => MakerList, { name: 'makers' })
  @UseGuards(JwtAuthGuard)
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

  @Query(() => Maker, { name: 'maker' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.makersService.findOne(id);
  }

  @Mutation(() => Maker)
  @UseGuards(JwtAuthGuard)
  async updateMaker(
    @Args('updateMakerInput') updateMakerInput: UpdateMakerInput,
  ) {
    // TODO: 権限チェック
    return this.makersService.update(updateMakerInput.id, updateMakerInput);
  }

  @Mutation(() => Maker, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async removeMaker(@Args('id', { type: () => ID }) id: string) {
    // TODO: 権限チェック
    return this.makersService.delete(id);
  }
}
