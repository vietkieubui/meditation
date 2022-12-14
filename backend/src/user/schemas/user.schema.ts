import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, plainToInstance, Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { TransformObjectId } from 'src/common/decorators/transform-objectId.decorator';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;


// const UserSchema = new Schema(
//   {
//     name: String,
//     phoneNumber: String,
//     password: String,
//     refreshToken: String,
//   },
//   {
//     collection: 'users',
//   },
// );

// UserSchema.virtual('posts', {
//   ref: 'Post',
//   localField: '_id',
//   foreignField: 'user',
//   justOne: false,
//   // count: true,
//   match: {
//     categories: { $size: 2 },
//   },
// });

// export { UserSchema };

// export interface User extends Document {
//   name: string;
//   phoneNumber: string;
//   refreshToken: string;
// }
@Schema({ timestamps: true, versionKey: false })
export class User {
  @TransformObjectId()
  _id: string;

  @Prop({ length: 10, required: true, unique: true, index: true, type: String })
  phoneNumber: string;

  @Prop({ length: 100, required: true, type: String })
  @Exclude()
  private _password: string;

  @Prop({ length: 100, required: true, type: String })
  name: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  setPassword(password: string): void {
    this._password = bcrypt.hashSync(password, 10);
  }
  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this._password);
  }
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = User.prototype.comparePassword;

UserSchema.methods.setPassword = User.prototype.setPassword;

UserSchema.methods.toJSON = function () {
  return plainToInstance(User, this.toObject());
};