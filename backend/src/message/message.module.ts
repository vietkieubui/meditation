import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SchemaName} from 'src/common/constants/schema';
import { GatewayModule } from 'src/gateway/gateway.module';
import {MessageController} from './message.controller';
import {MessageService} from './message.service';
import {MessageSchema} from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: SchemaName.MESSAGE, schema: MessageSchema},
    ]),
    GatewayModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
