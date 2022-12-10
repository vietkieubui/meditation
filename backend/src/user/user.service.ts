import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import {User, UserDocument} from './schemas/user.schema'
import { BaseService } from 'src/common/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaName } from 'src/common/constants/schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(SchemaName.USER) private userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async createUser(dto: RegisterDto): Promise<User> {
    const user = new User(dto);
    user.setPassword(dto.password);
    return this.userModel.create(user);
  }

  async checkPhoneNumberIsValid(phoneNumber: string): Promise<boolean> {
    return !!(await this.userModel.findOne({ phoneNumber }));
  }
  
}
