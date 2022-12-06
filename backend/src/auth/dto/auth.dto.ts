import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class RegisterDto {
  @IsPhoneNumber('VI')
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(0)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsPhoneNumber('VI')
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
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
