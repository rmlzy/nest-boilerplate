import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { SimpleAccessVo } from '~/system/access/vo';

export class FindRoleVo extends UpdaterVo {
  @ApiProperty({ description: '角色ID' })
  id: number;

  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  description: string;

  accesses: SimpleAccessVo[];
}
