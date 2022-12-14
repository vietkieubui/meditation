import { WsException as WsExceptionDefault } from '@nestjs/websockets';
import { ResponseErrorDto } from '../dto';
import { ERROR } from '../constants';
export class WsException extends WsExceptionDefault {
  private readonly forceClose;

  private constructor(error: ResponseErrorDto, forceClose?: boolean) {
    super(error);
    this.forceClose = forceClose;
    this.message = WsException.name;
  }

  public static of(
    error: ResponseErrorDto = { message: 'Error!', code: null },
    forceClose = false,
  ): WsException {
    return new WsException(error, forceClose);
  }

  public static unauthorized(forceClose = false): WsException {
    return WsException.of(ERROR.WEBSOCKET_UNAUTHENTICATED, forceClose);
  }

  shouldDisconnect(): boolean {
    return this.forceClose;
  }
}
