import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpException as DefaultHttpException,
} from '@nestjs/common';
import { ResponseDto } from '../dto';
import { Response, Request } from 'express';
import { HttpException } from '../exceptions';

@Catch(DefaultHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(e: HttpException & any, host: ArgumentsHost) {
    this.logger.error(e, e.stack);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = e.getStatus();
    const res = ResponseDto.error(e.getResponse(), { path: request?.url });
    response.status(status).json(res);
  }
}
