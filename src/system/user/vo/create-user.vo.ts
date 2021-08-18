import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVo {
  @ApiProperty({ description: '用户ID' })
  id: number;
}
