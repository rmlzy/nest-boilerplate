import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
   * md5 密码盐
   */
  @Column({ length: 64, select: false })
  salt: string;

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
   * 创建时间
   */
  @Column({ unsigned: true, default: 0 })
  created: number;

  /**
   * 上次登录时间
   */
  @Column({ unsigned: true, default: 0 })
  logged: number;

  /**
   * Token
   */
  @Column({ length: 500, default: '', select: false })
  token: string;
}
