import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Maker {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    unique: true,
    nullable: false,
    comment: 'スラグ',
  })
  slug: string;

  @Field()
  @Column({
    nullable: false,
    comment: '名前',
  })
  name: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn({ comment: '削除日時' })
  readonly deletedAt?: Date;
}
