import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/core';

@Entity({ name: 'sys_user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 15, comment: '登录账号' })
  username: string;

  @Column({ length: 64, select: false, comment: '密码' })
  password: string;

  @Column({ length: 15, comment: '真实姓名' })
  realname: string;

  @Column({ length: 200, comment: '电子邮件' })
  email: string;
}
