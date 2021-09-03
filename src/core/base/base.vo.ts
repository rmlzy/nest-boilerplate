import { ApiProperty } from '@nestjs/swagger';

export class EmptyVo {}

export class UpdaterVo {
  @ApiProperty({ description: '创建时间' })
  createdAt: string = '';

  @ApiProperty({ description: '更新时间' })
  updatedAt: string = '';
}
