import { HttpStatus } from '@nestjs/common';

export class BaseController {
  success(data) {
    return { code: HttpStatus.OK, message: 'OK', data };
  }
}
