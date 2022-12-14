import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TransformObjectId } from '../../common/decorators';
import { SchemaName } from '../../common/constants/schema';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Message {
  @TransformObjectId()
  _id: string;

  @Prop({ length: 225, type: String })
  content: string;

  @TransformObjectId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.CONVERSATION,
  })
  conversation: string;

  @TransformObjectId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.USER,
    autopopulate: { select: 'name phoneNumber' },
  })
  sentBy: string;

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}

export const MessageSchema = SchemaFactory.createForClass(Message);
