import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export interface IPagination<T> {}

export interface IJwtPayload {
  id: number;
  username: string;
}
