import { Column, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '@/core';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  /**
   * 登录账号
   */
  @Column({ length: 15 })
  username: string;

  /**
   * 密码
   */
  @Column({ length: 64, select: false })
  password: string;

  /**
   * 真实姓名
   */
  @Column({ length: 15 })
  realname: string;

  /**
   * 头像
   */
  @Column({ length: 512 })
  avatar: string;

  /**
   * 电子邮件
   */
  @Column({ length: 256 })
  mail: string;

  /**
   * 电话
   */
  @Column({ length: 15 })
  phone: string;

  /**
   * 上次登录时间
   */
  @UpdateDateColumn({
    type: 'timestamp',
  })
  loggedAt: Date;

  /**
   * Token
   */
  @Column({ length: 500, default: '', select: false })
  token: string;
}
