import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

@InputType()
export class CreateMakerInput {
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
