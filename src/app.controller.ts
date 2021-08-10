import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  health() {
    return { code: HttpStatus.OK, message: 'OK' };
  }
}
