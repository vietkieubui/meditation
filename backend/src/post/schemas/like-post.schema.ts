import {Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {TransformObjectId} from 'src/common/decorators';

export type LikePostDocument = LikePost & Document;

@Schema({timestamps: true, versionKey: false})
export class LikePost {
  @TransformObjectId()
  user: string;

  @TransformObjectId()
  post: string;

  constructor(partial: Partial<LikePost>) {
    Object.assign(this, partial);
  }
}

export const LikePostSchema = SchemaFactory.createForClass(LikePost);
