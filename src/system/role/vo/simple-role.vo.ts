import { ApiProperty } from '@nestjs/swagger';

export class SimpleRoleVo {
  @ApiProperty({ description: '角色ID' })
  id: number;

  @ApiProperty({ description: '角色名称' })
  name: string;
}
