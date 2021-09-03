import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { SimpleAccessVo } from '~/system/access/access.vo';

export class CreateRoleVo {
  @ApiProperty({ description: '角色ID' })
  id: number = 0;
}

export class FindRoleVo extends UpdaterVo {
  @ApiProperty({ description: '角色ID' })
  id: number = 0;

  @ApiProperty({ description: '角色名称' })
  name: string = '';

  @ApiProperty({ description: '角色描述' })
  description: string = '';

  accesses: SimpleAccessVo[] = [];
}

export class PaginateRoleVo extends UpdaterVo {
  @ApiProperty({ description: '角色名称' })
  name: string = '';

  @ApiProperty({ description: '角色描述' })
  description: string = '';
}

export class SimpleRoleVo {
  @ApiProperty({ description: '角色ID' })
  id: number = 0;

  @ApiProperty({ description: '角色名称' })
  name: string = '';
}
