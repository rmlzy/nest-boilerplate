import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { RoleSimpleVo } from '~/system/role/vo/role.vo';

export class UserProfileVo {
  @ApiProperty({ description: '用户ID' })
  id: number;

  @ApiProperty({ description: '登录账号' })
  username: string;

  @ApiProperty({ description: '真实姓名' })
  realname: string;

  @ApiProperty({ description: '电子邮件' })
  email: string;
}

export class UserBaseVo extends UpdaterVo {}

export class UserVo extends UserBaseVo {
  roles: RoleSimpleVo[];
}
