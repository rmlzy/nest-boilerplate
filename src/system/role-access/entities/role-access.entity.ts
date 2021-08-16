import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/core';

@Entity('sys_role_access')
export class RoleAccessEntity extends BaseEntity {
  @Column({ type: 'int', comment: '角色ID' })
  roleId: number;

  @Column({ type: 'int', comment: '资源ID' })
  accessId: number;
}
