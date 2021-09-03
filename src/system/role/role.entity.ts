import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/core';

@Entity('sys_role')
export class RoleEntity extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 50, comment: '角色名称' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '角色描述' })
  description: string;
}
