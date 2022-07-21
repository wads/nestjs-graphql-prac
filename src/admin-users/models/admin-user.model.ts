import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

@ObjectType()
export class AdminUser {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  userName: string;

  password: string;

  @Field((type) => GraphQLBoolean)
  isActive: boolean;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  deletedAt?: Date;
}
