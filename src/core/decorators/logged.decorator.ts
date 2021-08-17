import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoggedGuard } from '~/core';

export const Logged = () => {
  return applyDecorators(
    UseGuards(LoggedGuard),
    ApiBearerAuth('token'),
    ApiUnauthorizedResponse({ description: '登录过期' }),
  );
};
