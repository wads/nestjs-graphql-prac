import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('Maker')
export class MakerModel {
  @Field()
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  deletedAt?: Date;
}
