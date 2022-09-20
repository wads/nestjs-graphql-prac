import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdateAdminUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsBoolean()
  isActive?: boolean;
}
