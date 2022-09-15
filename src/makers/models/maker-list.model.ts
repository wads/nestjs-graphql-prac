import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { MakerModel } from './maker.model';

@ObjectType()
export class MakerListModel extends PaginateResult(MakerModel) {}
