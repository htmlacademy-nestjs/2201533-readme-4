import {Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, UseFilters, UseGuards} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared/shared-mediators';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {apiAuthHeader, authHeader, created, unauthorized} from '@project/shared/shared-api-consts';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {NotExistPost} from "./guards/not-exist-post.guard";

@ApiTags('likes')
@Controller('likes')
@UseFilters(AxiosExceptionFilter)
export class LikesController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private postUrl = this.config.posts;
  private likeUrl = this.config.likes;

  @Post('/:id')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(created('like'))
  @UseGuards(NotExistPost)
  async create(@Token() token: string, @Param('id', ParseIntPipe) idPost: number) {
    await this.httpService.axiosRef.post(`${this.likeUrl}/${idPost}`, '', authHeader(token));
    await this.httpService.axiosRef.post(`${this.postUrl}/${idPost}/like`);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Delete('/:id')
  async delete(@Token() token: string, @Param('id', ParseIntPipe) idPost: number) {
    await this.httpService.axiosRef.delete(`${this.likeUrl}/${idPost}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.postUrl}/${idPost}/like`);
  }

  @Get('/:id')
  async isLike(@Token() token: string,@Param('id', ParseIntPipe) idPost: number) {
    const {data} = await this.httpService.axiosRef.get(`${this.likeUrl}/${idPost}`, authHeader(token));
    return data;
  }

}
