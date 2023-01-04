import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {TransformObjectId} from 'src/common/decorators';

export type PostDocument = Post & Document;

@Schema({timestamps: true, versionKey: false})
export class Post {
  @TransformObjectId()
  _id: string;

  @Prop({length: 255, required: true, type: String})
  audioUrl: string;

  @Prop({length: 255, required: true, type: String})
  title: string;

  @Prop({length: 255, required: true, type: String})
  artist: string;

  @Prop({length: 255, required: true, type: String})
  imageUrl: string;

  @Prop({length: 255, type: String})
  artwork: string;

  @Prop([{length: 255, type: String}])
  category: string[];

  @Prop([{length: 255, type: String}])
  type: string[];

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);
