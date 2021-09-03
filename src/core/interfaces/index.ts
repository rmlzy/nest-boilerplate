import { HttpStatus } from '@nestjs/common';

export class Resp<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export class PageResp<T> {
  total: number;
  items: T[];
}

export class IJwtPayload {
  id: number;
  username: string;
}
