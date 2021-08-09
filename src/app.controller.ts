import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { code: HttpStatus.OK, message: 'OK' };
  }
}
