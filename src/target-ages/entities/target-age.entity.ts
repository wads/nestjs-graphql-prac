import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@ObjectType()
@Entity()
export class TargetAge {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
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

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.targetAge)
  items: Item[];

  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;
}
