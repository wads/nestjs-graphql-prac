import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TargetAgesService } from './target-ages.service';
import { TargetAge } from './entities/target-age.entity';
import { CreateTargetAgeInput } from './dto/create-target-age.input';
import { UpdateTargetAgeInput } from './dto/update-target-age.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';
import { TargetAgeList } from './entities/target-age-list.entity';

@Resolver(() => TargetAge)
export class TargetAgesResolver {
  constructor(private readonly targetAgesService: TargetAgesService) {}

  @Mutation(() => TargetAge)
  @UseGuards(JwtAuthGuard)
  createTargetAge(
    @Args('createTargetAgeInput') createTargetAgeInput: CreateTargetAgeInput,
  ) {
    // TODO: 権限チェック
    return this.targetAgesService.create(createTargetAgeInput);
  }

  @Query(() => TargetAgeList, { name: 'targetAges' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('query', { nullable: true }) input?: OffsetLimitPaginationInput,
  ) {
    return {
      offset: input.offset,
      limit: input.limit,
      total: await this.targetAgesService.count(),
      items: await this.targetAgesService.findAll(input),
    };
  }

  @Query(() => TargetAge, { name: 'targetAge' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.targetAgesService.findOne(id);
  }

  @Mutation(() => TargetAge)
  @UseGuards(JwtAuthGuard)
  updateTargetAge(
    @Args('updateTargetAgeInput') updateTargetAgeInput: UpdateTargetAgeInput,
  ) {
    // TODO: 権限チェック
    return this.targetAgesService.update(
      updateTargetAgeInput.id,
      updateTargetAgeInput,
    );
  }

  @Mutation(() => TargetAge, { nullable: true })
  @UseGuards(JwtAuthGuard)
  removeTargetAge(@Args('id', { type: () => Int }) id: number) {
    return this.targetAgesService.remove(id);
  }
}
