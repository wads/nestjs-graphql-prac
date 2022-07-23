import { Field, InputType } from '@nestjs/graphql';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateAdminUserInput } from './create-admin-user.input';

@InputType()
export class UpdateAdminUserInput {
  @Field()
  @IsBoolean()
  isActive?: boolean;
}
