import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { TargetAge } from './target-age.entity';

@ObjectType()
export class TargetAgeList extends PaginateResult(TargetAge) {}
