import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateAdminUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  userName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
