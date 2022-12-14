import { IsString, MinLength, MaxLength } from 'class-validator';
import { User } from '../../user/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;  
}

export class checkPhoneRegistedDto {
  @ApiProperty({ description: `Phone number` })
  @IsString()
  phoneNumber: string;
}

export class AuthResDto {
  accessToken: string;
  user: User;

  constructor(partial: Partial<AuthResDto>) {
    Object.assign(this, partial);
  }

  public static ok(accessToken: string, user: User): AuthResDto {
    return new AuthResDto({
      accessToken,
      user,
    });
  }
}
