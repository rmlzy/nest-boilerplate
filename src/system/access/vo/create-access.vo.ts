import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessVo {
  @ApiProperty({ description: '资源ID' })
  id: number;
}
