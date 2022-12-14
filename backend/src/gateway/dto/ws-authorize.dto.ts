import { IsString } from 'class-validator';

export class WsAuthorizeDto {
  @IsString()
  accessToken: string;
}
