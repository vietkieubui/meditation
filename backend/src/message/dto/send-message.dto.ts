import {IsMongoId, IsString} from 'class-validator';

export class SendMessageDto {
  @IsString()
  content: string;

  @IsMongoId()
  conversation: string;
}
