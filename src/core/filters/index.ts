import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

export const setupFilters = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
