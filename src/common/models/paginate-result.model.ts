import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function PaginateResult<T>(itemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => Int)
    offset: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    total: number;

    @Field(() => [itemType])
    items: T[];
  }

  return PageClass;
}
