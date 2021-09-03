import { HttpStatus } from '@nestjs/common';

export interface IRes<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export interface IPage<T> {
  total: number;
  items: T[];
}

export interface IJwtPayload {
  id: number;
  username: string;
}
