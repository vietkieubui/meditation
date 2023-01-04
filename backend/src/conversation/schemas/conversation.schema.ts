import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {TransformObjectId} from 'src/common/decorators/transform-objectId.decorator';
import {ConversationMember} from './conversation-member.schema';
import {Type} from 'class-transformer';
import mongoose from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {User} from 'src/user/schemas/user.schema';

export type ConversationDocument = Conversation & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Conversation {
  @TransformObjectId()
  _id: string;

  @Prop({length: 225, type: String})
  name: string;

  @Type(() => ConversationMember)
  @Prop([
    {type: mongoose.Types.ObjectId, autopopulate: true, ref: SchemaName.USER},
  ])
  members: ConversationMember[];

  @Prop({type: Date})
  lastSent: Date;

  @TransformObjectId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.MESSAGE,
  })
  lastMessage: string;

  constructor(partial: Partial<Conversation>) {
    Object.assign(this, partial);
  }
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
