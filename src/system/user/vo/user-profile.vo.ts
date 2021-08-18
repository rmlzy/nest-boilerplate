import { ApiProperty } from '@nestjs/swagger';

export class UserProfileVo {
  @ApiProperty({ description: '用户ID' })
  id: number = 0;

  @ApiProperty({ description: '登录账号' })
  username: string = '';

  @ApiProperty({ description: '真实姓名' })
  realname: string = '';

  @ApiProperty({ description: '电子邮件' })
  email: string = '';
}
