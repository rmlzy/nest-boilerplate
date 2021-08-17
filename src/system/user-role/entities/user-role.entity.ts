import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/core';

@Entity('sys_user_role')
export class UserRoleEntity extends BaseEntity {
  @Column({ type: 'int', comment: '用户ID' })
  userId: number;

  @Column({ type: 'int', comment: '角色ID' })
  roleId: number;
}
