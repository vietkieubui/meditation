import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { SchemaName } from '../../common/constants/schema';
import { User } from '../../user/schemas/user.schema';

@Schema({
  versionKey: false,
  _id: false,
})
export class ConversationMember {
  @Type(() => User)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.USER,
    required: true,
    autopopulate: true,
  })
  user: User;
  

  constructor(partial: Partial<ConversationMember>) {
    Object.assign(this, partial);
  }
}
