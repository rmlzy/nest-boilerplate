import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('监控')
@Controller()
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiOperation({ description: '健康检查' })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @HealthCheck()
  async health(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.db.pingCheck('database', { timeout: 1500 }),
    ]);
  }
}
