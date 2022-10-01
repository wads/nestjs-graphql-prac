import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateMakerInput } from './create-maker.input';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMakerInput extends PartialType(CreateMakerInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}
