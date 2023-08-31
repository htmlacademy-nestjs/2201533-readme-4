import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilters,
  Param,
  ParseIntPipe, Delete, Patch, UseInterceptors,
} from '@nestjs/common';
import {
  apiAuthHeader,
  authHeader,
  created,
  CreatePostDto, pubSuccessful,
  unauthorized,
  UpdatePostDto
} from '@project/shared/shared-dto';
import {appsConfig} from '@project/util/util-core';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {Token} from '@project/shared/shared-mediators';
import {QueryRaw} from '@project/shared/shared-mediators';
import {PhotoFilter} from './photo-filter.interceptor';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiHeader, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {getSortNames, getTypeNames} from '@project/shared/shared-types';

@ApiTags('posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private postUrl = this.config.posts;
  private commentUrl = this.config.comments;
  private likeUrl = this.config.likes;

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  // @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), PhotoFilter)
  @ApiResponse(created('post'))
  @Post('/')
  async create(@Body() dto: CreatePostDto, @Token() token: string) {
    const post = await this.httpService.axiosRef.post(
      `${this.postUrl}/`, dto, authHeader(token));
    return post.data;
  }

  @ApiQuery({ name: 'title', type: 'string', description: 'find string'})
  @ApiResponse(pubSuccessful)
  @Get('/find')
  async findByTitle(@QueryRaw() query: Request) {
    const posts = await this.httpService.axiosRef.get(`${this.postUrl}/find${query}`);
    return posts.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(pubSuccessful)
  @Get('/draft')
  async showDraft(@Token() token: string) {
    const posts =
      await this.httpService.axiosRef.get(`${this.postUrl}/draft`,authHeader(token))
    return posts.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Post('/draft/:id')
  async setDraft(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const post =
      await this.httpService.axiosRef.post(`${this.postUrl}/${id}`,'', authHeader(token));
    return post.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/draft/:id')
  async deleteDraft(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const post =
      await this.httpService.axiosRef.delete(`${this.postUrl}/${id}`, authHeader(token))
    return post.data;
  }

  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  @Get('/tape')
  async showTape(@Token() token: string, @QueryRaw() filters: string) {
    const posts =
      await this.httpService.axiosRef.get(`${this.postUrl}/tape${filters}`, authHeader(token))
    return posts.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Post('/repost/:id')
  async repost(@Token() token: string, @Param('id', ParseIntPipe) id: number) {
    const post =
      await this.httpService.axiosRef.post(`${this.postUrl}/repost/${id}`, authHeader(token));
    return post.data;
  }

  @ApiParam({name: 'id', description: 'post id', example: 17})
  @ApiResponse(pubSuccessful)
  @Get('/:id')
  async show(@Param('id') id: string) {
    const post =
      await this.httpService.axiosRef.get(`${this.postUrl}/${id}`);
    return post.data;
  }

  @ApiResponse(pubSuccessful)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  @ApiQuery({ name: 'userId', type: 'string', description: 'user id', required: false})
  @ApiQuery({ name: 'type', type: 'string', description: 'type of post content', enum: getTypeNames(), required: false})
  @ApiQuery({ name: 'tags', type: 'string', description: 'tags', required: false})
  @Get('/')
  async index(@QueryRaw() filters: string) {
    const posts = await this.httpService.axiosRef.get(`${this.postUrl}${filters}`);
    return posts.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Delete('/:id')
  async destroy(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    await this.httpService.axiosRef.delete(`${this.postUrl}/${id}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.commentUrl}/post/${id}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.likeUrl}/post/${id}`, authHeader(token));
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseInterceptors(FileInterceptor('file'), PhotoFilter)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @Patch('/:id')
  async update(@Body() dto: UpdatePostDto, @Token() token: string, @Param('id', ParseIntPipe) id: number) {
    const post =
      await this.httpService.axiosRef.patch(`${this.postUrl}/${id}`, dto, authHeader(token));
    return post.data;
  }
}
