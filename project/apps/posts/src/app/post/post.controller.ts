import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {fillObject} from '@project/util/util-core';
import {PostRdo} from './rdo/post.rdo';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostsFilterDto} from "./dto/posts-filter.dto";

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    console.log(dto);
    const newPost = await this.postService.createPost(dto);
    return fillObject(PostRdo, newPost);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    const post = await this.postService.getPost(postId);
    return fillObject(PostRdo, post);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({transform: true}))
  async index(
    @Query() filters: PostsFilterDto
  ) {
    const posts = await this.postService.getPosts(filters);
    return fillObject(PostRdo, posts);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    await this.postService.deletePost(postId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const postId = parseInt(id, 10);
    const updatedPost = await this.postService.updatePost(postId, dto);
    return fillObject(PostRdo, updatedPost)
  }

}
