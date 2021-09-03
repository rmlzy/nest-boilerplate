import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty({ description: '用户 TOKEN' })
  token: string = '';
}
