import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Item {
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

  @Field()
  @Column({
    type: 'text',
    nullable: false,
    comment: '説明',
  })
  description: string;

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
