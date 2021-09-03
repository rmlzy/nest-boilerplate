import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/core';

@Entity('sys_user_token')
export class UserTokenEntity extends BaseEntity {
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ type: 'varchar', length: 100, comment: 'TOKEN' })
  token: string;

  @Column({ type: 'timestamp', comment: '过期时间' })
  expireAt: Date;
}
