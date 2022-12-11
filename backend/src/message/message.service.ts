import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SchemaName } from '../common/constants/schema';
import { BaseService } from '../common/services/base.service';
import { User } from '../user/schemas/user.schema';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageQuery } from './dto/message.query';
import { Message, MessageDocument } from './schemas/message.schema';
import { SocketService } from '../gateway/socket.service';
import { HttpException } from '../common/exceptions';
import { ERROR } from '../common/constants';
import { formatSortQuery } from 'src/common/utils/format-sort-query.util';


@Injectable()
export class MessageService extends BaseService<Message> {
  private readonly logger = new Logger(MessageService.name);
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel(SchemaName.MESSAGE)
    private readonly messageModel: Model<MessageDocument>,
    private readonly socketService: SocketService,
  ) {
    super(messageModel);
  }

  async getListMessages(user: User, query: MessageQuery): Promise<Message[]> {
    const { page = 0, pageSize = 20, conversation, sort = null } = query;
    const messages = await this.messageModel
      .find({ conversation })
      .limit(pageSize)
      .skip(page * pageSize)
      .sort(formatSortQuery(sort));

    return messages;
  }

  async createMessage(
    requestUser: User,
    dto: SendMessageDto,
  ): Promise<Message> {
    let message = null;
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      message = new this.messageModel({
        ...dto,
        sentBy: requestUser,
      });      
      await message.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw HttpException.internalServerError(error);
    }
    session.endSession();
    return message;
  }

  async sendMessage(
    requestUser: User,
    dto: SendMessageDto,
  ): Promise<Message> {
    const message = await this.createMessage(requestUser, dto);
    await this.socketService.emitMessage(message);
    return message;
  }
}
