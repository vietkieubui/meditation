export class ResponseDto<T = null> {
  message: string;
  data: T;
  meta: {
    total?: number;
    [props: string]: unknown;
  };
  errorCode: string;
  time: Date;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
  }

  public static ok<T>(
    data?: T,
    total?: number,
    meta?: Record<string, unknown>,
  ): ResponseDto<T> {
    return new ResponseDto<T>({
      message: 'Success',
      data,
      meta: {
        ...meta,
        total,
      },
      time: new Date(),
    });
  }

  public static error(
    err: string | Record<string, unknown> | ResponseErrorDto,
    meta?: Record<string, unknown>,
  ): ResponseDto {
    if (typeof err === 'string') {
      return new ResponseDto({
        message: `${err}`,
        meta: meta,
        time: new Date(),
      });
    } else {
      return new ResponseDto({
        message: `${err?.message}`,
        errorCode: err?.code as string,
        meta: meta,
        time: new Date(),
      });
    }
  }
}

export class ResponseErrorDto {
  code?: string;
  message?: string;
}
