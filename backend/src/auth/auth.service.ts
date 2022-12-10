import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthResDto, LoginReqDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ERROR } from 'src/common/constants';
import { HttpException } from 'src/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResDto> {
    // check phone already registed
    if (await this.userService.checkPhoneNumberIsValid(dto.phoneNumber))
      throw HttpException.badRequest(ERROR.PHONE_NUMBER_EXISTED);

    
    // create user and generate accessToken
    const user = await this.userService.createUser(dto);
    const accessToken = this.generateAccessToken(user);
    return AuthResDto.ok(accessToken, user);
  }

  async login(dto: LoginReqDto): Promise<AuthResDto> {
    const user = await this.userService.findOne({
      phoneNumber: dto.phoneNumber,
    });
    if (!(user && user.comparePassword(dto.password)))
      throw HttpException.badRequest(ERROR.AUTHENTICATE_FAIL);    

    await user.save();
    const accessToken = this.generateAccessToken(user);
    return AuthResDto.ok(accessToken, user);
  }

  private generateAccessToken(user: User): string {
    const payload = {
      id: user._id,
    };
    return this.jwtService.sign(payload);
  }
  
  async getUserFromJwt(accessToken: string): Promise<User> {
    try {
      const { id } = this.jwtService.decode(accessToken) as Record<string, any>;
      return this.userService.findByIdOrFail(id);
    } catch (e) {
      return null;
    }
  }
}
