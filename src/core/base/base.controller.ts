import { HttpStatus } from '@nestjs/common';

export class BaseController {
  success(data) {
    return { statusCode: HttpStatus.OK, message: 'OK', data };
  }
}
