import {ApiProperty} from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {Type} from 'class-transformer';

class ConversationMemberDto {
  @IsString()
  user: string;
}

export class CreateConversationDto {
  // @IsString()
  // @MinLength(1)
  // @MaxLength(225)
  // name: string;

  @ValidateNested({each: true})
  @Type(() => ConversationMemberDto)
  @ApiProperty({
    description: `Conversation members`,
    required: false,
  })
  @IsOptional()
  members: ConversationMemberDto[];
}
export class CreateConversationByPhoneNumberDto {
  @IsString()
  @MinLength(1)
  @MaxLength(225)
  phoneNumber: string;
}
