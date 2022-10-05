import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => Int)
  @IsNotEmpty()
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
}
