import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();
    const timestamp = new Date().toISOString();
    try {
      const statusCode = exception.getStatus();
      const r = {
        statusCode,
        message: exception.message,
        timestamp,
      };
      res.status(200).send(r);
    } catch (e) {
      console.log(exception);
      const r = {
        statusCode: 500,
        message: e.message || '未知错误',
        timestamp,
      };
      Logger.error(JSON.stringify(r), ctx);
      res.status(200).send(r);
    }
  }
}
