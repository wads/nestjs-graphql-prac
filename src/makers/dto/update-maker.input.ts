import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Matches, MaxLength } from 'class-validator';

@InputType()
export class UpdateMakerInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  @Matches('^[a-z0-9-_]+$', undefined)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  name?: string;
}
