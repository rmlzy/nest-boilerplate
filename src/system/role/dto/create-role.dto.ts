import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty({ message: '必须填写角色名称' })
  @MinLength(2, { message: '角色名称至少包含2个字符' })
  @MaxLength(50, { message: '角色名称最多包含50个字符' })
  name: string;

  @ApiPropertyOptional({ description: '角色描述' })
  @IsOptional()
  @MaxLength(100, { message: '角色描述最多包含100个字符' })
  description: string;
}
