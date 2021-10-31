import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: false, comment: 'パスワード' })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
