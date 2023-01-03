import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {HttpException} from 'src/common/exceptions';
import {User} from 'src/user/schemas/user.schema';
import {CreatePostDto} from './dto/create-post.dto';
import {LikePostDto} from './dto/like-post.dto';
import {PostQuery} from './dto/post.query';
import {LikePost, LikePostDocument} from './schemas/like-post.schema';
import {Post, PostDocument} from './schemas/post.schema';
import {ERROR} from 'src/common/constants/list-errors';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(SchemaName.POST) private postModel: Model<PostDocument>,
    @InjectModel(SchemaName.LIKEPOST)
    private likePostModel: Model<LikePostDocument>,
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

  async likePost(user: User, dto: LikePostDto): Promise<LikePost> {
    let likePost = null;
    const post = await this.postModel.findById(dto.post);
    if (!post) throw HttpException.notFound(ERROR.RESOURCES_NOT_FOUND);
    const toLikePost = {
      user: user._id,
      post: dto.post,
    };
    likePost = await this.likePostModel.findOne(toLikePost);
    if (likePost) {
      likePost.remove();
    } else {
      likePost = new this.likePostModel({
        ...toLikePost,
      });
      await likePost.save();
    }
    return likePost;
  }
  async getListLikePosts(user: User): Promise<Post[]> {
    let posts = [];
    const listLike = await this.likePostModel.find({user});
    if (listLike.length === 0) return posts;

    posts = await this.postModel.find({
      $or: [
        ...listLike.map(like => ({
          _id: like.post,
        })),
      ],
    });
    return posts;
  }
}
