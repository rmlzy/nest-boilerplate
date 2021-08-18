import * as _ from 'lodash';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  public toVo(Class) {
    const vo = new Class();
    return _.pick(this, Object.keys(vo));
  }
}
