import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { AccessTypeEnum } from '../access.interface';

export class PaginateAccessVo extends UpdaterVo {
  @ApiProperty({ description: '资源ID' })
  id: number;

  @ApiProperty({ description: '资源名称' })
  name: string;

  @ApiProperty({ description: '资源类型' })
  type: AccessTypeEnum;

  @ApiProperty({ description: '父级ID' })
  parentId: number;

  @ApiProperty({ description: '排序' })
  sort: number;
}
