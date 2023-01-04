import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {UserSchema} from 'src/user/schemas/user.schema';
import {UserModule} from 'src/user/user.module';
import {ConversationController} from './conversation.controller';
import {ConversationService} from './conversation.service';
import {ConversationSchema} from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchemaName.CONVERSATION,
        schema: ConversationSchema,
      },
      {name: SchemaName.USER, schema: UserSchema},
    ]),
    UserModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
