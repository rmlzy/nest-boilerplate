import { ApiProperty } from '@nestjs/swagger';

export class SimpleAccessVo {
  @ApiProperty({ description: '资源ID' })
  id: number;

  @ApiProperty({ description: '资源名称' })
  name: string;
}
