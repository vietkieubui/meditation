import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {MessageController} from './message.controller';
import {MessageService} from './message.service';
import {MessageSchema} from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: SchemaName.MESSAGE, schema: MessageSchema},
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
