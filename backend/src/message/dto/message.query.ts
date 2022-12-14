import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId} from 'class-validator';
import {BaseQuery} from '../../common/dto';

export class MessageQuery extends BaseQuery {
  @IsMongoId()
  conversation: string;
}
