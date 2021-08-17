import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/core';
import { AccessTypeEnum } from '../access.interface';

@Entity('sys_access')
export class AccessEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '资源名称' })
  name: string;

  @Column({ type: 'tinyint', comment: '资源类型' })
  type: AccessTypeEnum;

  @Column({ type: 'int', default: 0, comment: '父级ID' })
  parentId: number;

  @Column({ type: 'int', default: 1, comment: '排序' })
  sort: number;

  @Column({ type: 'varchar', length: 100, comment: '资源描述' })
  description: string;
}
