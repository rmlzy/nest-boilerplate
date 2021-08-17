import type { ExecutionContext } from '@nestjs/common';
import {
  createParamDecorator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Utils } from '~/core';

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['token'];
    if (!token) {
      throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
    }
    const { id } = Utils.decodeToken(token);
    return id;
  },
);
