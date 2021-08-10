import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const r = {
      code: statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };
    Logger.error(JSON.stringify(r), ctx);

    response.status(200).json(r);
  }
}
