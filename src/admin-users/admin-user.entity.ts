import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, comment: 'ユーザー名' })
  userName: string;

  @Column({ nullable: false, comment: 'パスワード' })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
