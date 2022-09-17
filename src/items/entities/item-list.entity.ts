import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { Item } from './item.entity';

@ObjectType()
export class ItemList extends PaginateResult(Item) {}
