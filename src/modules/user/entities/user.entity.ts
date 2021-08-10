import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/core';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 15, comment: '登录账号' })
  username: string;

  @Column({ length: 64, select: false, comment: '密码' })
  password: string;

  @Column({ length: 15, comment: '真实姓名' })
  realname: string;

  @Column({ length: 512, comment: '头像URL' })
  avatar: string;

  @Column({ length: 200, comment: '电子邮件' })
  email: string;

  @Column({ length: 15, comment: '手机号码' })
  phone: string;

  @Column({ comment: '上次登录时间', default: '' })
  loggedAt: string;

  @Column({ length: 500, select: false, comment: 'Token' })
  token: string;
}
