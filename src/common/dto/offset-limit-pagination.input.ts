import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class OffsetLimitPaginationInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  offset = 0;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limit = 30;
}
