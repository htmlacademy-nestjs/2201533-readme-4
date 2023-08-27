import {
  Body,
  Controller,
  Delete, Get,
  HttpCode, HttpStatus,
  Param,
  ParseIntPipe,
  Post, Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {fillObject} from '@project/util/util-core';
import {CommentService} from './comment.service';
import {apiAuthHeader, CreateCommentDto, created, unauthorized} from '@project/shared/shared-dto';
import {CommentRdo} from './rdo/comment.rdo';
import {JwtAuthGuard, UserId} from '@project/shared/shared-mediators';
import {CommentAuthor} from "./comment-author.guard";
import {CommentsFilterInterface} from '@project/shared/shared-types';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';


@ApiTags('comments')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @ApiResponse(created('comment'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/')
  async create(@UserId() user: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment({
      ...dto,
      authorId: user,
      createDate: new Date()
    });
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, CommentAuthor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@UserId() user: string, @Param('id', ParseIntPipe) id: number) {
    await this.commentService.delete(id);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  async index(@Param('id', ParseIntPipe) idPost: number, @Query() filters: CommentsFilterInterface) {
    return this.commentService.getComments(idPost, filters);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/post/:id')
  async deleteByPost(@Param('id', ParseIntPipe) idPost: number) {
    await this.commentService.deleteByPost(idPost);
  }
}
