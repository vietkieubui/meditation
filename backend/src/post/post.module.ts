import {Module} from '@nestjs/common';
import {MongooseModule, Schema} from '@nestjs/mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {PostController} from './post.controller';
import {PostService} from './post.service';
import {PostSchema} from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SchemaName.POST, schema: PostSchema}]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
