import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@ObjectType()
@Entity()
@Index(['ancestorId', 'descendantId'], { unique: true })
export class CategoryPath {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'bigint',
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

  @Column({
    type: 'bigint',
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
  depth: number;

  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;

  @DeleteDateColumn({ comment: '削除日時' })
  readonly deletedAt?: Date;
}
