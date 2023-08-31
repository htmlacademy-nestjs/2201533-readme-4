import {Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard, UserId} from '@project/shared/shared-mediators';
import {LikeService} from './like.service';
import {ApiHeader, ApiResponse, ApiTags} from "@nestjs/swagger";
import {apiAuthHeader, created, unauthorized} from "@project/shared/shared-dto";

@ApiTags('likes')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @ApiResponse(created('like'))
  @Post('/:id')
  async create(@UserId() idUser: string, @Param('id', ParseIntPipe) idPost: number) {
    return this.likeService.create({idPost, idUser})
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@UserId() idUser: string, @Param('id', ParseIntPipe) idPost: number) {
    return this.likeService.delete({idPost, idUser})
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async isLike(@UserId() idUser: string, @Param('id', ParseIntPipe) idPost: number) {
    return await this.likeService.find({idPost, idUser}) !== null
  }

  @Delete('/post/:id')
  async deleteByPost(@Param('id', ParseIntPipe) idPost: number) {
    await this.likeService.deleteByPost(idPost);
  }
}
