import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class ListAdminUserInput {
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  page = 0;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  page_size = 30;
}
