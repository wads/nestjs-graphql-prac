import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { Category } from './category.entity';

@ObjectType()
export class CategoryList extends PaginateResult(Category) {}
