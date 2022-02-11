import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    comment: 'メールアドレス',
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
    comment: 'ユーザー名',
  })
  userName: string;

  @Exclude()
  @Column({ nullable: false, comment: 'パスワード' })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
