import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core/base/base.vo';
import { AccessSimpleVo } from '~/system/access/vo/access.vo';

export class RoleBaseVo extends UpdaterVo {
  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  description: string;
}

export class RoleVo extends RoleBaseVo {
  accesses: AccessSimpleVo[];
}
