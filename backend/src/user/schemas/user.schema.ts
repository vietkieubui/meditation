import { Document, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    phoneNumber: String,
    password: String,
    refreshToken: String,
  },
  {
    collection: 'users',
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  // count: true,
  match: {
    categories: { $size: 2 },
  },
});

export { UserSchema };

export interface User extends Document {
  name: string;
  phoneNumber: string;
  refreshToken: string;
}
