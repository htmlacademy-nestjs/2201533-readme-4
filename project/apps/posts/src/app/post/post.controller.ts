import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus, Logger,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards, UseInterceptors, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {PostService} from './post.service';
import {apiAuthHeader, created, CreatePostDto, pubSuccessful, unauthorized} from '@project/shared/shared-dto';
import {fillObject} from '@project/util/util-core';
import {PostRdo} from '@project/shared/shared-dto';
import {UpdatePostDto} from '@project/shared/shared-dto';
import {PostFilter, GetPostsFilter} from "./helpers/posts-filter.interface";
import {getSortNames, getTypeNames, SortFieldsEnum, TokenPayload} from '@project/shared/shared-types';
import {Difference} from '@project/util/util-types';
import {PostUpdateInterceptor} from './helpers/post-update.interceptor';
import {PostDeleteInterceptor} from './helpers/post-delete.interceptor';
import {JwtAuthGuard, User, UserId} from '@project/shared/shared-mediators';
import {PostCreateInterceptor} from './helpers/post-create.interceptor';
import {PostAuthorGuard} from './helpers/post-author.guard';
import {NotifyService} from '../notify/notify.service';
import {EmailPostRdo} from './rdo/email-post.rdo';
import {ApiHeader, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(created('post'))
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PostCreateInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  @Post('/')
  async create(@User() {name}: TokenPayload, @Body() dto: CreatePostDto) {
    console.log(dto);
    const newPost = await this.postService.createPost(dto);
    await this.notifyService.sendNewPost(fillObject(EmailPostRdo, {...newPost, userName: name}))
    return fillObject(PostRdo, newPost);
  }

  @ApiQuery({ name: 'title', type: 'string', description: 'find string'})
  @Get('/find')
  @ApiResponse(pubSuccessful)
  async findByTitle(@Query() title: {title: string}) {
    Logger.log('findByTitle');
    const posts = await this.postService.findByTitle(title.title);
    Logger.log(posts);
    return fillObject(PostRdo, posts);
  }

  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @Get('/draft')
  async showDraft(@UserId() userId: string) {
    return this.postService.getDrafts(userId);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @Post('/draft/:id')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async setDraft(@Param('id', ParseIntPipe) id: number) {
    return this.postService.setPublished(id, false);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/draft/:id')
  async deleteDraft(@Param('id', ParseIntPipe) id: number) {
    return this.postService.setPublished(id, true);
  }

  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  @Get('/tape')
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  async showTape(@UserId() id: string, @Query() filters: PostFilter) {
    return this.postService.getTape(id, filters);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Post('/repost/:id')
  async repost(@UserId() idUser: string, @Param('id', ParseIntPipe) id: number) {
    return this.postService.repost(idUser, id);
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Get('/:id')
  @ApiResponse(pubSuccessful)
  async show(@Param('id', ParseIntPipe) postId: number) {
    // const postId = parseInt(id, 10);
    const post = await this.postService.getPost(postId);
    return fillObject(PostRdo, post);
  }

  @ApiResponse(pubSuccessful)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  @ApiQuery({ name: 'userId', type: 'string', description: 'user id', required: false})
  @ApiQuery({ name: 'type', type: 'string', description: 'type of post content', enum: getTypeNames(), required: false})
  @ApiQuery({ name: 'tags', type: 'string', description: 'tags', required: false})
  @Get('/')
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Query() filters: GetPostsFilter) {
    const posts = await this.postService.getPosts(filters);
    return fillObject(PostRdo, posts);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(PostDeleteInterceptor)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.postService.deletePost(id);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, PostAuthorGuard)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Patch('/:id')
  @UseInterceptors(PostUpdateInterceptor)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillObject(PostRdo, updatedPost)
  }

  @Post('/:id/comment')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async addComment(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, SortFieldsEnum.commentCount, Difference.up);
  }

  @Delete('/:id/comment')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, SortFieldsEnum.commentCount, Difference.down);
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Post('/:id/like')
  async addLike(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, SortFieldsEnum.likeCount, Difference.up);
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/:id/like')
  async deleteLike(@Param('id', ParseIntPipe) id: number) {
    return this.postService.changeCount(id, SortFieldsEnum.likeCount, Difference.down);
  }
}
