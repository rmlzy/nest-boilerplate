import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';

export class PaginateUserVo extends UpdaterVo {
  @ApiProperty({ description: '用户ID' })
  id: number;

  @ApiProperty({ description: '登录账号' })
  username: string;

  @ApiProperty({ description: '真实姓名' })
  realname: string;

  @ApiProperty({ description: '电子邮件' })
  email: string;
}
