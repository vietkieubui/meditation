import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {TransformObjectId} from 'src/common/decorators';

export type LikePostDocument = LikePost & Document;

@Schema({timestamps: true, versionKey: false})
export class LikePost {
  @TransformObjectId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.USER,
    required: true,
    autopopulate: true,
  })
  user: string;

  @TransformObjectId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.POST,
    required: true,
    autopopulate: true,
  })
  post: string;

  constructor(partial: Partial<LikePost>) {
    Object.assign(this, partial);
  }
}

export const LikePostSchema = SchemaFactory.createForClass(LikePost);
