import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Maker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
    comment: 'スラグ',
  })
  slug: string;

  @Column({
    nullable: false,
    comment: '名前',
  })
  name: string;

  @CreateDateColumn({ comment: '作成日時' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn({ comment: '削除日時' })
  readonly deletedAt?: Date;
}
