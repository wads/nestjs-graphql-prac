import { CreateTargetAgeInput } from './create-target-age.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class UpdateTargetAgeInput extends PartialType(CreateTargetAgeInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
