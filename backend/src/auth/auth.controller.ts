import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ResponseDto } from 'src/common/dto';
import { AuthService } from './auth.service';
import { AuthResDto, LoginReqDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<ResponseDto<AuthResDto>> {
    const registerResponse = await this.authService.register(dto);
    return ResponseDto.ok(registerResponse);
  }

  @Post('/login')
  async login(@Body() dto: LoginReqDto): Promise<ResponseDto<AuthResDto>> {
    const loginResponse = await this.authService.login(dto);
    return ResponseDto.ok(loginResponse);
  }
}
