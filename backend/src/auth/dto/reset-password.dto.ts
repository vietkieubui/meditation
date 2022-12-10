import { PickType } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterDto } from './register.dto';

export class ResetPasswordDto extends PickType(RegisterDto, [
  'password',
] as const) {
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
