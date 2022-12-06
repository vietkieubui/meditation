import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.createUser(registerDto);
    const token = await this._createToken(user);
    return {
      user,
      ...token,
    };
  }

  async login(loginUserDto: LoginDto) {
    const user = await this.findByLogin(loginUserDto);
    const token = await this._createToken(user);

    return {
      user,
      ...token,
    };
  }

  async validateUser(phoneNumber) {
    const user = await this.findByEmail(phoneNumber);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async createUser(registerUserDto: RegisterDto) {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);

    // check exists
    const userInDb = await this.authRepository.findByCondition({
      phoneNumber: registerUserDto.phoneNumber,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.authRepository.create(registerUserDto);
  }

  async findByLogin({ phoneNumber, password }: LoginDto) {
    const user = await this.authRepository.findByCondition({
      phoneNumber: phoneNumber,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async findByEmail(phoneNumber) {
    return await this.authRepository.findByCondition({
      phoneNumber: phoneNumber,
    });
  }

  private async _createToken({ phoneNumber }, refresh = true) {
    const accessToken = this.jwtService.sign({ phoneNumber });
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { phoneNumber },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.update(
        { phoneNumber: phoneNumber },
        {
          refreshToken: refreshToken,
        },
      );
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async refresh(refresh_token) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.getUserByRefresh(
        refresh_token,
        payload.phoneNumber,
      );
      const token = await this._createToken(user, false);
      return {
        phoneNumber: user.phoneNumber,
        ...token,
      };
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: User) {
    await this.update(
      { phoneNumber: user.phoneNumber },
      { refreshToken: null },
    );
  }

  async getUserByRefresh(refresh_token, phoneNumber) {
    const user = await this.findByEmail(phoneNumber);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const is_equal = await bcrypt.compare(
      this.reverse(refresh_token),
      user.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.authRepository.findByConditionAndUpdate(filter, update);
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
