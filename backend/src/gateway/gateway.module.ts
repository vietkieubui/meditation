import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConversationModule } from '../conversation/conversation.module';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [AuthModule, ConversationModule],
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class GatewayModule {}