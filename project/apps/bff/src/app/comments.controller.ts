import {
  Body,
  Controller,
  Delete, Get, HttpStatus,
  Inject, Param, ParseIntPipe,
  Post,
} from '@nestjs/common';
import {QueryRaw, Token} from '@project/shared/shared-mediators';
import {apiAuthHeader, authHeader, CreateCommentDto, created, unauthorized} from "@project/shared/shared-dto";
import {appsConfig, fillObject} from '@project/util/util-core';
import {HttpService} from "@nestjs/axios";
import {ConfigType} from "@nestjs/config";
import {ApiHeader, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private postUrl = this.config.posts;
  private commentUrl = this.config.comments;

  @ApiResponse(created('comment'))
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Post('/')
  async create(@Body() dto: CreateCommentDto, @Token() token: string) {
    const comment =
      await this.httpService.axiosRef.post(`${this.commentUrl}`, dto, authHeader(token));
    await this.httpService.axiosRef.post(`${this.postUrl}/${dto.idPost}/comment`);
    return comment.data;
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Delete('/:id')
  async delete(@Token() token: string, @Param('id', ParseIntPipe) id: number) {
    await this.httpService.axiosRef.delete(`${this.commentUrl}/${id}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.postUrl}/${id}/comment`);
  }

  @Get('/:id')
  async index(@Param('id', ParseIntPipe) idPost: number, @QueryRaw() filters: string) {
    const comments = await this.httpService.axiosRef.get(`${this.commentUrl}/${idPost}${filters}`)
    return comments.data;
  }

}
