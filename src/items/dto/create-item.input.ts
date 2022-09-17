import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches('^[a-z0-9-_]+$', undefined)
  slug: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(65535)
  description: string;
}
