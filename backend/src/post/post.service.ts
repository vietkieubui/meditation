import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {formatSortQuery} from 'src/common/utils/format-sort-query.util';
import {CreatePostDto} from './dto/create-post.dto';
import {PostQuery} from './dto/post.query';
import {Post, PostDocument} from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(SchemaName.POST) private postModel: Model<PostDocument>,
  ) {}

  async getListPost(query: PostQuery): Promise<Post[]> {
    const {page = 0, pageSize = 20} = query;
    const posts = await this.postModel
      .find()
      .sort({createdAt: -1})
      .limit(pageSize)
      .skip(page * pageSize);
    return posts;
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    let post = null;
    post = new this.postModel({
      ...dto,
    });
    await post.save();

    return post;
  }
}
