import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

@ObjectType()
@Entity()
export class AdminUser {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Field()
  @Column({
    unique: true,
    nullable: false,
    comment: 'メールアドレス',
  })
  email: string;

  @Field()
  @Column({
    unique: true,
    nullable: false,
    comment: 'ユーザー名',
  })
  userName: string;

  @Exclude()
  @Column({ nullable: false, comment: 'パスワード' })
  password: string;

  @Field(() => GraphQLBoolean)
  @Column({ default: true })
  isActive: boolean;

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
