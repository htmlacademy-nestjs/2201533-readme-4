import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import {FollowDto} from '@project/shared/shared-dto';
import {FollowerService} from './follower.service';
import {JwtAuthGuard, UserId} from '@project/shared/shared-mediators';
import {SelfFollowGuard} from './self-follow.guard';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {apiAuthHeader, unauthorized} from '@project/shared/shared-api-consts';

@ApiTags('users')
@Controller('follower')
export class FollowerController {
  constructor(
    private readonly followerService: FollowerService
  ) {}

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard, SelfFollowGuard)
  @Post('/')
  public async add(@UserId() follower: string, @Body(ValidationPipe) dto: FollowDto){
    return this.followerService.follow({...dto, follower});
  }

  @ApiHeader(apiAuthHeader)
  @ApiResponse(unauthorized)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@UserId() follower: string, @Param('id') dto: FollowDto) {
    await this.followerService.unFollow({...dto, follower});
  }

  @Get('/:id')
  public async count(@Param('id') followed: string) {
    console.log('FollowerController count ', followed);
    return this.followerService.count(followed);
  }
}
