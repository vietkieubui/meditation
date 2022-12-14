import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import * as path from 'path';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
  import { RequestUser } from '../common/decorators';
  import { ResponseDto } from '../common/dto';
  import { User } from '../user/schemas/user.schema';
  import { MessageQuery } from './dto/message.query';
  import { MessageService } from './message.service';
  import { Message } from './schemas/message.schema';
  import { HttpException } from '../common/exceptions';
  import { SendMessageDto } from './dto/send-message.dto';
  
  @ApiBearerAuth()
  @Controller('message')
  export class MessageController {
    constructor(private readonly messageService: MessageService) {}
  
    @Get()
    async getMessages(
      @RequestUser() user: User,
      @Query() query: MessageQuery,
    ): Promise<ResponseDto<Message[]>> {
      const message = await this.messageService.getListMessages(user, query);
      return ResponseDto.ok(message);
    }
  
    @Post()
    @ApiConsumes('multipart/form-data')    
    async sendMessage(
      @RequestUser() user: User,
      @Body() dto: SendMessageDto,
    ): Promise<ResponseDto<Message>> {
      const message = await this.messageService.sendMessage(user, dto);
      return ResponseDto.ok(message);
    }
  }
  