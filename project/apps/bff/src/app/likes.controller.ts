import {Controller, Delete, Get, Inject, Param, ParseIntPipe, Post} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared/shared-mediators';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {apiAuthHeader, authHeader, created, unauthorized} from '@project/shared/shared-dto';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private postUrl = this.config.posts;
  private likeUrl = this.config.likes;

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @ApiResponse(created('like'))
  @Post('/:id')
  async create(@Token() token: string, @Param('id', ParseIntPipe) idPost: number) {
    await this.httpService.axiosRef.post(`${this.likeUrl}`, '', authHeader(token));
    await this.httpService.axiosRef.post(`${this.postUrl}/${idPost}/like`);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Delete('/:id')
  async delete(@Token() token: string, @Param('id', ParseIntPipe) idPost: number) {
    await this.httpService.axiosRef.delete(`${this.likeUrl}`, authHeader(token));
    await this.httpService.axiosRef.delete(`${this.postUrl}/${idPost}/like`);
  }

  @Get('/:id')
  async isLike(@Param('id', ParseIntPipe) idPost: number) {
    return await this.httpService.axiosRef.get(`${this.likeUrl}/${idPost}`);
  }

}
