import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleVo {
  @ApiProperty({ description: '角色ID' })
  id: number;
}
