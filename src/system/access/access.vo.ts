import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UpdaterVo } from '~/core';
import { AccessTypeEnum } from './access.interface';

export class CreateAccessVo {
  @ApiProperty({ description: '资源ID' })
  id: number = 0;
}

export class Resp<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export class FindAccessVo extends UpdaterVo {
  @ApiProperty({ description: '资源ID' })
  id: number = 0;

  @ApiProperty({ description: '资源名称' })
  name: string = '';

  @ApiProperty({ description: '资源类型' })
  type: AccessTypeEnum = AccessTypeEnum.DEFAULT;

  @ApiProperty({ description: '父级ID' })
  parentId: number = 0;

  @ApiProperty({ description: '排序' })
  sort: number = 0;

  @ApiProperty({ description: '资源描述' })
  description: string = '';
}

export class PageAccessVo extends UpdaterVo {
  @ApiProperty({ description: '资源ID' })
  id: number = 0;

  @ApiProperty({ description: '资源名称' })
  name: string = '';

  @ApiProperty({ description: '资源类型' })
  type: AccessTypeEnum = AccessTypeEnum.DEFAULT;

  @ApiProperty({ description: '父级ID' })
  parentId: number = 0;

  @ApiProperty({ description: '排序' })
  sort: number = 0;
}

export class SimpleAccessVo {
  @ApiProperty({ description: '资源ID' })
  id: number = 0;

  @ApiProperty({ description: '资源名称' })
  name: string = '';
}
