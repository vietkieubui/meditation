import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {RequestUser} from 'src/common/decorators/request-user.decorator';
import {ConversationService} from './conversation.service';
import {User} from '../user/schemas/user.schema';
import {BaseQuery} from 'src/common/dto/base.query';
import {ResponseDto} from 'src/common/dto';
import {Conversation} from './schemas/conversation.schema';
import {
  CreateConversationByPhoneNumberDto,
  CreateConversationDto,
} from './dto/create-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async createConversation(
    @RequestUser() user: User,
    @Body() dto: CreateConversationDto,
  ): Promise<ResponseDto<Conversation>> {
    const conversation = await this.conversationService.createConversation(
      user,
      dto,
    );
    return ResponseDto.ok(conversation);
  }

  @Post('/phonenumber')
  async createConversationByPhoneNumber(
    @RequestUser() user: User,
    @Body() dto: CreateConversationByPhoneNumberDto,
  ): Promise<ResponseDto<Conversation>> {
    const conversation =
      await this.conversationService.createConversationByPhoneNumber(user, dto);
    return ResponseDto.ok(conversation);
  }

  @Get()
  async getConversations(
    @RequestUser() user: User,
    @Query() query: BaseQuery,
  ): Promise<ResponseDto<Conversation[]>> {
    const conversations = await this.conversationService.getListConversations(
      user,
    );
    return ResponseDto.ok(conversations);
  }
}
