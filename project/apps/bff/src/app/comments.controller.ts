import {
  Body,
  Controller,
  Delete, Get, HttpCode, HttpStatus,
  Inject, Param, ParseIntPipe,
  Post, UseFilters, UseGuards,
} from '@nestjs/common';
import {QueryRaw, Token} from '@project/shared/shared-mediators';
import {CommentRdo, CreateCommentDto} from '@project/shared/shared-dto';
import {appsConfig, fillObject} from '@project/util/util-core';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotExistPost} from './guards/not-exist-post.guard';
import {apiAuthHeader, authHeader, created, unauthorized} from '@project/shared/shared-api-consts';
import {BffService} from './bff.service';
import {BigCommentRdo} from './rdo/big-comment.rdo';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService
  ) {}

  private postUrl = this.config.posts;
  private commentUrl = this.config.comments;

  private async fillAuthor(data: CommentRdo) {
    const user = await this.bffService.getUser(data.authorId);
    return fillObject(BigCommentRdo, {...data, author: user});
  }

  @Post('/')
  @ApiResponse(created('comment'))
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(NotExistPost)
  async create(@Body() dto: CreateCommentDto, @Token() token: string) {
    const {data} =
      await this.httpService.axiosRef.post(`${this.commentUrl}`, dto, authHeader(token));
    await this.httpService.axiosRef.post(`${this.postUrl}/${dto.idPost}/comment`);
    return this.fillAuthor(data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  async delete(@Token() token: string, @Param('id', ParseIntPipe) id: number) {
    await this.httpService.axiosRef.delete(`${this.commentUrl}/${id}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.postUrl}/${id}/comment`);
  }

  @Get('/:id')
  async index(@Param('id', ParseIntPipe) idPost: number, @QueryRaw() filters: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.commentUrl}/${idPost}${filters}`)
    const promises = data.map((item: CommentRdo) => this.fillAuthor(item))
    return await Promise.all(promises);
  }

}
