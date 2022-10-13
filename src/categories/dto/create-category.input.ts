import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Matches,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches('^[a-z0-9-_]+$', undefined)
  slug: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  parentCategoryId?: number;
}
