import {
  Body,
  Controller,
  Delete, Get, HttpCode, HttpStatus,
  Inject, Param, ParseIntPipe,
  Post, UseFilters, UseGuards, ValidationPipe,
} from '@nestjs/common';
import {QueryRaw, Token} from '@project/shared/shared-mediators';
import {CommentRdo, CreateCommentDto} from '@project/shared/shared-dto';
import {appsConfig} from '@project/config/config-modules';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotExistPost} from './guards/not-exist-post.guard';
import {apiAuthHeader, created, unauthorized} from '@project/shared/shared-api-consts';
import {BffService} from './services/bff.service';
import {BigCommentRdo} from './rdo/big-comment.rdo';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {RabbitService} from './services/rabbit.service';
import {Difference} from '@project/util/util-types';
import {fillObject, getAuthHeader} from '@project/util/util-core';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService,
    private readonly notifyService: RabbitService
  ) {}

  private async fillAuthor(data: CommentRdo) {
    const user = await this.bffService.getUser(data.authorId);
    return fillObject(BigCommentRdo, {...data, author: user});
  }

  @Post('/')
  @ApiResponse(created('comment'))
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(NotExistPost)
  async create(@Body(new ValidationPipe({transform: true})) dto: CreateCommentDto, @Token() token: string) {
    const {data} =
      await this.httpService.axiosRef.post(`${this.config.comments}`, dto, getAuthHeader(token));
      await this.notifyService.sendCommentsCount({difference: Difference.add, idPost: dto.idPost});
    return this.fillAuthor(data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  async delete(@Token() token: string, @Param('id', ParseIntPipe) id: number) {
    const {data} = await this.httpService.axiosRef.delete(`${this.config.comments}/${id}`, getAuthHeader(token));
    await this.notifyService.sendCommentsCount({difference: Difference.sub, idPost: data.idPost})
  }

  @Get('/:id')
  async index(@Param('id', ParseIntPipe) idPost: number, @QueryRaw() filters: string) {
    const {data} = await this.httpService.axiosRef.get(`${this.config.comments}/${idPost}${filters}`)
    const promises = data.map((item: CommentRdo) => this.fillAuthor(item))
    return Promise.all(promises);
  }

}
