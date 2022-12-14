import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LoginReqDto } from './login.dto';

export class RegisterDto extends LoginReqDto {  
  @MinLength(0)
  @MaxLength(100)
  @IsString()
  name: string;

}
