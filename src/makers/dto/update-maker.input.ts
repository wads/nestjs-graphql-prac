import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateMakerInput } from './create-maker.input';

@InputType()
export class UpdateMakerInput extends PartialType(CreateMakerInput) {
  @Field()
  id: string;
}
