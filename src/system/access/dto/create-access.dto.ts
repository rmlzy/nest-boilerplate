import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccessTypeEnum } from '../access.interface';

export class CreateAccessDto {
  @ApiProperty({ description: '资源名称' })
  @IsNotEmpty({ message: '必须填写资源名称' })
  @MinLength(2, { message: '资源名称至少包含2个字符' })
  @MaxLength(50, { message: '资源名称最多包含50个字符' })
  name: string;

  @ApiProperty({ description: '资源类型' })
  @IsNotEmpty({ message: '必须填写资源类型' })
  @IsEnum(AccessTypeEnum, { message: '不支持此资源类型' })
  type: number;

  @ApiPropertyOptional({ description: '资源描述' })
  @IsOptional()
  @MaxLength(100, { message: '资源描述最多包含100个字符' })
  description: string;
}
