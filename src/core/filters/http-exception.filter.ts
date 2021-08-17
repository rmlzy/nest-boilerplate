import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const timestamp = new Date().toISOString();
    try {
      const statusCode = exception.getStatus();
      const r = {
        statusCode,
        message: exception.message,
        timestamp,
      };
      response.status(200).json(r);
    } catch (e) {
      console.log(exception);
      const r = {
        statusCode: 500,
        message: e.message || '未知错误',
        timestamp,
      };
      Logger.error(JSON.stringify(r), ctx);
      response.status(200).json(r);
    }
  }
}
