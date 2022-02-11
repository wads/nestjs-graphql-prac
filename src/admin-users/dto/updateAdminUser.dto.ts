import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './createAdminUser.dto';

export class UpdateAdminUserDto extends PartialType(
  OmitType(CreateAdminUserDto, ['email', 'password'] as const),
) {}
