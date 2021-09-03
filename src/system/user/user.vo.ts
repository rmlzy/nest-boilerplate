import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { SimpleRoleVo } from '~/system/role/role.vo';

export class CreateUserVo {
  @ApiProperty({ description: '用户ID' })
  id: number = 0;
}

export class FindUserVo extends UpdaterVo {
  @ApiProperty({ description: '用户ID' })
  id: number = 0;

  @ApiProperty({ description: '登录账号' })
  username: string = '';

  @ApiProperty({ description: '真实姓名' })
  realname: string = '';

  @ApiProperty({ description: '电子邮件' })
  email: string = '';

  @ApiProperty({ description: '用户角色ID列表' })
  roles: SimpleRoleVo[] = [];
}

export class PageUserVo extends UpdaterVo {
  @ApiProperty({ description: '用户ID' })
  id: number = 0;

  @ApiProperty({ description: '登录账号' })
  username: string = '';

  @ApiProperty({ description: '真实姓名' })
  realname: string = '';

  @ApiProperty({ description: '电子邮件' })
  email: string = '';
}
