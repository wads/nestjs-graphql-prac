import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    comment: 'スラグ',
  })
  slug: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
    comment: '名前',
  })
  name: string;

  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;
}
