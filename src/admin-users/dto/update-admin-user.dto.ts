import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin-user.dto';

export class UpdateAdminUserDto extends PartialType(
  OmitType(CreateAdminUserDto, ['email', 'userName', 'password'] as const),
) {}
