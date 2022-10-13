import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  ID,
  Int,
} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Maker } from '../../makers/entities/maker.entity';
import { TargetGender } from '../../common/interfaces/target-gender.interface';
import { TargetAge } from '../../target-ages/entities/target-age.entity';

export const ItemTargetGender: { [key in TargetGender]: number } = {
  unknown: 0,
  unisex: 1,
  woman: 2,
  man: 3,
};

@ObjectType()
@Entity()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
    comment: 'メーカーID',
  })
  @Field(() => ID)
  makerId: string;

  @Field(() => Maker)
  @ManyToOne(() => Maker, (maker) => maker.items, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'makerId' })
  maker: Maker;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    comment: '対象年齢ID',
  })
  @Field(() => Int, { nullable: true })
  targetAgeId: number;

  @Field(() => TargetAge, { nullable: true })
  @ManyToOne(() => TargetAge, (targetAge) => targetAge.items, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'targetAgeId' })
  targetAge: TargetAge;

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

  @Field()
  @Column({
    type: 'text',
    nullable: false,
    comment: '説明',
  })
  description: string;

  @Field(() => Int)
  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    comment: '価格',
  })
  price: number;

  @Field(() => Int)
  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: false,
    comment: '対象性別',
  })
  targetGender: TargetGender;

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
