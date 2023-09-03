import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {PostService} from './post.service';
import {
  CreatePostDto,
  PostRdo,
  UpdatePostDto,
} from '@project/shared/shared-dto';
import {fillObject} from '@project/util/util-core';
import {GetPostsFilter, PostFilter} from './helpers/posts-filter.interface';
import {Counters, getSortNames, getTypeNames, TokenPayload} from '@project/shared/shared-types';
import {Difference} from '@project/util/util-types';
import {PostUpdateInterceptor} from './helpers/post-update.interceptor';
import {PostDeleteInterceptor} from './helpers/post-delete.interceptor';
import {JwtAuthGuard, User, UserId} from '@project/shared/shared-mediators';
import {PostCreateInterceptor} from './helpers/post-create.interceptor';
import {PostAuthorGuard} from './helpers/post-author.guard';
import {NotifyService} from '../notify/notify.service';
import {EmailPostRdo} from './rdo/email-post.rdo';
import {ApiHeader, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ExistsRepostGuard} from './helpers/exists-repost.guard';
import {
  apiAuthHeader,
  created,
  existsRepost,
  notAuthor,
  pubSuccessful,
  unauthorized
} from '@project/shared/shared-api-consts';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly notifyService: NotifyService
  ) {}

  @Post('/')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(created('post'))
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PostCreateInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@User() {name}: TokenPayload, @Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    await this.notifyService.sendNewPost(fillObject(EmailPostRdo, {...newPost, userName: name}))
    return fillObject(PostRdo, newPost);
  }

  @Get('/find')
  @ApiQuery({ name: 'title', type: 'string', description: 'find string'})
  @ApiResponse(pubSuccessful)
  async findByTitle(@Query() title: {title: string}) {
    const posts = await this.postService.findByTitle(title.title);
    return fillObject(PostRdo, posts);
  }

  @Get('/draft')
  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  async showDraft(@UserId() userId: string) {
    return fillObject(PostRdo, this.postService.getDrafts(userId));
  }

  @Post('/draft/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async setIsDraft(@Param('id', ParseIntPipe) id: number) {
    return this.postService.setPublished(id, false);
  }

  @Delete('/draft/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async setIsPublish(@Param('id', ParseIntPipe) id: number) {
    return this.postService.setPublished(id, true);
  }

  @Get('/tape')
  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  async showTape(@UserId() id: string, @Query() filters: PostFilter) {
    return this.postService.getTape(id, filters);
  }

  @Post('/repost/:id')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(existsRepost)
  @UseGuards(JwtAuthGuard, ExistsRepostGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async repost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }

  @Get('exist/:id')
  async check(@Param('id', ParseIntPipe) id: number){
    return this.postService.checkPost(id);
  }

  @Get('/:id')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @ApiResponse(pubSuccessful)
  async show(@Param('id', ParseIntPipe) postId: number) {
    const post = await this.postService.getPost(postId);
    return fillObject(PostRdo, post);
  }

  @Get('/')
  @ApiResponse(pubSuccessful)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  @ApiQuery({ name: 'userId', type: 'string', description: 'user id', required: false})
  @ApiQuery({ name: 'type', type: 'string', description: 'type of post content', enum: getTypeNames(), required: false})
  @ApiQuery({ name: 'tags', type: 'string', description: 'tags', required: false})
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Query() filters: GetPostsFilter) {
    const posts = await this.postService.getPosts(filters);
    return fillObject(PostRdo, posts);
  }

  @Delete('/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @UseInterceptors(PostDeleteInterceptor)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.deletePost(id);
    return fillObject(PostRdo, post);
  }

  @Patch('/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @UseInterceptors(PostUpdateInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillObject(PostRdo, updatedPost)
  }

  @Post('/:id/comment')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async addComment(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, Counters.commentCount, Difference.add);
  }

  @Delete('/:id/comment')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, Counters.commentCount, Difference.sub);
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Post('/:id/like')
  async addLike(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, Counters.likeCount, Difference.add);
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/:id/like')
  async deleteLike(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, Counters.likeCount, Difference.sub);
  }
}
