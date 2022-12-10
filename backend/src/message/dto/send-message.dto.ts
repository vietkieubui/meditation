import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsOptional, IsString} from 'class-validator';

export class SendMessageDto {
  @IsString()
  content: string;

  @IsMongoId()
  conversation: string;
}
