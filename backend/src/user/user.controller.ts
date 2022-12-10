import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { ResponseDto } from 'src/common/dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/me')
  async getCurrentUser(@RequestUser() user: User): Promise<ResponseDto<User>> {
    return ResponseDto.ok(user);
  }

  @Public()
  @Get()
  async getUserByPhoneNumber(
    @Query('phoneNumber') phoneNumber: string,
  ): Promise<ResponseDto<User>> {
    const user = await this.userService.findOne({ phoneNumber });
    return ResponseDto.ok(user);
  }
}
