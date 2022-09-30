import { InputType, Int, Field, ID } from '@nestjs/graphql';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Matches,
  Max,
  MaxLength
} from 'class-validator';
import { ItemTargetGender } from '../entities/item.entity';
import { TargetGender } from '../../common/interfaces/target-gender.interface';

@InputType()
export class CreateItemInput {
  @Field(() => ID)
  @IsNotEmpty()
  makerId: string;

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

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(10000000)
  price: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsIn(Object.values(ItemTargetGender))
  targetGender: TargetGender;
}
