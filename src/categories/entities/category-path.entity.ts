import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category } from './category.entity';

/*
  カテゴリーのツリー構造を表現するテーブル
  Closure Table方式を採用
  https://www.slideshare.net/billkarwin/models-for-hierarchical-data
 */
@ObjectType()
@Entity()
export class CategoryPath {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    nullable: false,
    comment: '先祖ID',
  })
  ancestorId: number;

  @ManyToOne(() => Category, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'ancestorId' })
  ancestor: Category;

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    nullable: false,
    comment: '子孫ID',
  })
  descendantId: number;

  @ManyToOne(() => Category, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'descendantId' })
  descendant: Category;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: false,
    default: 0,
    comment: '階層の深さ',
  })
  length: number;

  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;
}
