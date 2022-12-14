import {UseFilters, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {AuthService} from '../auth/auth.service';
import {SocketEvent} from '../common/constants';
import {Public} from '../common/decorators';
import {WsException} from '../common/exceptions/ws.exception';
import {WsExceptionFilter} from '../common/filters/ws-exception.filter';
import {SocketIoAuthGuard} from '../common/guards';
import {ConversationService} from '../conversation/conversation.service';
import {SocketUser} from './constants/user-type';
import {WsAuthorizeDto} from './dto/ws-authorize.dto';
import {getRoomId, RoomType} from './room';
import {SocketService} from './socket.service';

@UseGuards(SocketIoAuthGuard)
@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe())
@WebSocketGateway(
  // 3002, {namespace: 'events', transports: ['websocket']}
  )
export class SocketGateway implements OnGatewayInit<Server> {
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
    private readonly conversationService: ConversationService,
  ) {}

  afterInit(server: Server): void {
    this.socketService.setServer(server);
  }


  @Public()
  @SubscribeMessage(SocketEvent.login)
  async handleLogin(
    client: SocketUser,
    message: WsAuthorizeDto,
  ): Promise<void> {
    // Check auth
    client.user = await this.authService.getUserFromJwt(message.accessToken);
    
    if (!client.user) throw WsException.unauthorized();
    // Join all conversation
    const conversations = await this.conversationService.getListConversations(
      client.user,
    );
    for (const conversation of conversations) {
      const roomId = getRoomId(RoomType.Conversation, conversation._id);
      client.join(roomId);
    }
    client.emit(SocketEvent.login, true);
  }
}
