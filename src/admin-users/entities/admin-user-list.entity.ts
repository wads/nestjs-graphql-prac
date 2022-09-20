import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/common/models/paginate-result.model';
import { AdminUser } from './admin-user.entity';

@ObjectType()
export class AdminUserList extends PaginateResult(AdminUser) {}
