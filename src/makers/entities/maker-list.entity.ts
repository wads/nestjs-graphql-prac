import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { Maker } from './maker.entity';

@ObjectType()
export class MakerList extends PaginateResult(Maker) {}
