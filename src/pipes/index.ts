import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

export const setupPipes = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};
