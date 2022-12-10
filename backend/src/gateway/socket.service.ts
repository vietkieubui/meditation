import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketEvent } from '../common/constants';
import { Message } from '../message/schemas/message.schema';
import { SetServer } from './interfaces/set-server.interface';
import { getRoomId, RoomType } from './room';

@Injectable()
export class SocketService extends Server implements SetServer {
  server: Server;

  setServer(server: Server): void {
    this.server = server;
  }

  async emitMessage(message: Message): Promise<void> {
    const roomId = getRoomId(RoomType.Conversation, message.conversation);
    this.server.to([roomId]).emit(SocketEvent.message, message);
  }
}
