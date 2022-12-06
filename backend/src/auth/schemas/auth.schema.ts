import { Document } from 'mongoose';

export interface Auth extends Document {
  phoneNumber: string;
  name: string;
  password: string;
  refreshToken: string;
}
