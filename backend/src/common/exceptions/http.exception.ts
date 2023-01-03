import {
  HttpException as DefaultHttpException,
  HttpStatus,
} from '@nestjs/common';
import {ResponseErrorDto} from '../dto';
import {ERROR} from '../constants';

export class HttpException extends DefaultHttpException {
  public static badRequest(
    error: ResponseErrorDto = {message: 'Bad request!', code: null},
  ): HttpException {
    return new HttpException(error, HttpStatus.BAD_REQUEST);
  }

  public static forbidden(
    error: ResponseErrorDto = ERROR.DO_NOT_HAVE_PERMISSIONS,
  ): HttpException {
    return new HttpException(error, HttpStatus.FORBIDDEN);
  }

  public static notFound(
    error: ResponseErrorDto = ERROR.RESOURCES_NOT_FOUND,
  ): HttpException {
    return new HttpException(error, HttpStatus.NOT_FOUND);
  }

  public static internalServerError(
    error: ResponseErrorDto = {
      message: 'Internal server error, please try later!',
      code: null,
    },
  ): HttpException {
    return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
