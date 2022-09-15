import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { AdminUserModel } from './admin-user.model';

@ObjectType()
export class AdminUserListModel extends PaginateResult(AdminUserModel) {}
