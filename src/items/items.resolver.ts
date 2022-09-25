import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { ItemList } from './entities/item-list.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  @UseGuards(JwtAuthGuard)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => ItemList, { name: 'items' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('query', { nullable: true }) input?: OffsetLimitPaginationInput,
  ) {
    return {
      offset: input.offset,
      limit: input.limit,
      total: await this.itemsService.count(),
      items: await this.itemsService.findAll(input),
    };
  }

  @Query(() => Item, { name: 'item' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  @UseGuards(JwtAuthGuard)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item, { nullable: true })
  @UseGuards(JwtAuthGuard)
  removeItem(@Args('id', { type: () => ID }) id: string) {
    return this.itemsService.remove(id);
  }
}
