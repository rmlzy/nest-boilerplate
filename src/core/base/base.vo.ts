import { ApiProperty } from '@nestjs/swagger';

export class EmptyVo {}

export class UpdaterVo {
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
