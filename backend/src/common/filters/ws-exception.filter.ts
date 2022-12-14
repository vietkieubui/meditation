import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SocketEvent } from '../constants';
import { WsException } from '../exceptions/ws.exception';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(WsExceptionFilter.name);

  catch(e: WsException, host: ArgumentsHost) {
    this.logger.error(e, e.stack);
    const ctx = host.switchToWs();
    const socket: Socket = ctx.getClient();
    socket.emit(SocketEvent.error, e);
    if (e.shouldDisconnect()) socket.disconnect();
  }
}
