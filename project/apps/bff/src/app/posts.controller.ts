import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {CreatePostDto, UpdatePostDto} from '@project/shared/shared-dto';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {QueryRaw, Token} from '@project/shared/shared-mediators';
import {PhotoFilter} from './guards/photo-filter.interceptor';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiHeader, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {getSortNames, getTypeNames} from '@project/shared/shared-types';
import {PostInterceptor} from './guards/post.interceptor';
import {
  apiAuthHeader,
  authHeader,
  created,
  existsRepost,
  notAuthor,
  pubSuccessful,
  unauthorized
} from '@project/shared/shared-api-consts';
import {RabbitService} from './services/rabbit.service';
import {Difference} from '@project/util/util-types';
import {appsConfig} from '@project/config/config-modules';

@ApiTags('posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
@UseInterceptors(PostInterceptor)
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly notifyService: RabbitService
  ) {}

  @Post('/')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseInterceptors(FileInterceptor('file'), PhotoFilter)
  @ApiResponse(created('post'))
  async create(@Body() dto: CreatePostDto, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.post(
      `${this.config.posts}/`, dto, authHeader(token));
    await this.notifyService.sendPostsCount({idUser: data.userId, difference: Difference.add});
    // await this.httpService.axiosRef.post(`${this.config.users}/post`, '',authHeader(token));
    return data;
  }

  @Get('/find')
  @ApiQuery({ name: 'title', type: 'string', description: 'find string'})
  @ApiResponse(pubSuccessful)
  async findByTitle(@QueryRaw() query: Request) {
    const posts = await this.httpService.axiosRef.get(`${this.config.posts}/find${query}`);
    return posts.data;
  }

  @Get('/draft')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(pubSuccessful)
  async showDraft(@Token() token: string) {
    const posts =
      await this.httpService.axiosRef.get(`${this.config.posts}/draft`,authHeader(token))
    return posts.data;
  }

  @Post('/draft/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async setDraft(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const post =
      await this.httpService.axiosRef.post(`${this.config.posts}/draft/${id}`,'', authHeader(token));
    return post.data;
  }

  @Delete('/draft/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async deleteDraft(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const post =
      await this.httpService.axiosRef.delete(`${this.config.posts}/draft/${id}`, authHeader(token))
    return post.data;
  }

  @Get('/tape')
  @ApiResponse(unauthorized)
  @ApiResponse(pubSuccessful)
  @ApiHeader(apiAuthHeader)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  async showTape(@Token() token: string, @QueryRaw() filters: string) {
    const posts =
      await this.httpService.axiosRef.get(`${this.config.posts}/tape${filters}`, authHeader(token))
    return posts.data;
  }

  @Post('/repost/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(existsRepost)
  @ApiHeader(apiAuthHeader)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async repost(@Token() token: string, @Param('id', ParseIntPipe) id: number) {
    const post =
      await this.httpService.axiosRef.post(`${this.config.posts}/repost/${id}`,'', authHeader(token));
    return post.data;
  }

  @Get('/:id')
  @ApiParam({name: 'id', description: 'post id', example: 17})
  @ApiResponse(pubSuccessful)
  async show(@Param('id') id: string) {
    const post =
      await this.httpService.axiosRef.get(`${this.config.posts}/${id}`);
    return post.data;
  }

  @Get('/')
  @ApiResponse(pubSuccessful)
  @ApiQuery({ name: 'sort', type: 'string', description: 'sort field', enum: getSortNames(), required: false})
  @ApiQuery({ name: 'limit', type: 'number', description: 'number of posts per page', required: false})
  @ApiQuery({ name: 'page', type: 'number', description: 'page number', required: false})
  @ApiQuery({ name: 'userId', type: 'string', description: 'user id', required: false})
  @ApiQuery({ name: 'type', type: 'string', description: 'type of post content', enum: getTypeNames(), required: false})
  @ApiQuery({ name: 'tags', type: 'string', description: 'tags', required: false})
  async index(@QueryRaw() filters: string) {
    const posts = await this.httpService.axiosRef.get(`${this.config.posts}${filters}`);
    return posts.data;
  }

  @Delete('/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async destroy(@Param('id', ParseIntPipe) id: number, @Token() token: string) {
    const {data} = await this.httpService.axiosRef.delete(`${this.config.posts}/${id}`, authHeader(token));
    await this.notifyService.sendPostsCount({idUser: data.userId, difference: Difference.sub});
    await this.notifyService.deleteComments(id);
    await this.notifyService.deleteLikes(id);
    return data;
  }

  @Patch('/:id')
  @ApiResponse(unauthorized)
  @ApiResponse(notAuthor)
  @ApiHeader(apiAuthHeader)
  @UseInterceptors(FileInterceptor('file'), PhotoFilter)
  @ApiParam({name: 'id', description: 'post id', example: 17})
  async update(@Body() dto: UpdatePostDto, @Token() token: string, @Param('id', ParseIntPipe) id: number) {
    const post =
      await this.httpService.axiosRef.patch(`${this.config.posts}/${id}`, dto, authHeader(token));
    return post.data;
  }
}
