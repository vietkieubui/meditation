import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {RequestUser} from 'src/common/decorators';
import {ResponseDto} from 'src/common/dto';
import {User} from 'src/user/schemas/user.schema';
import {CreatePostDto} from './dto/create-post.dto';
import {LikePostDto} from './dto/like-post.dto';
import {PostQuery} from './dto/post.query';
import {PostService} from './post.service';
import {Post as PostEntity} from './schemas/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getListPost(
    @Query() query: PostQuery,
  ): Promise<ResponseDto<PostEntity[]>> {
    const posts = await this.postService.getListPost(query);
    return ResponseDto.ok(posts);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);
    return ResponseDto.ok(post);
  }

  @Post('/like')
  async likePost(@RequestUser() user: User, @Body() dto: LikePostDto) {
    const post = await this.postService.likePost(user, dto);
    return ResponseDto.ok(post);
  }
}
