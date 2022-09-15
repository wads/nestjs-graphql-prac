import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

@ObjectType('AdminUser')
export class AdminUserModel {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  userName: string;

  password: string;

  @Field(() => GraphQLBoolean)
  isActive: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  deletedAt?: Date;
}
