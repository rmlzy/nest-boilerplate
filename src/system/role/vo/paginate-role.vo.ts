import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';

export class PaginateRoleVo extends UpdaterVo {
  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  description: string;
}
