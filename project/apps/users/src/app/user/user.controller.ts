import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {fillObject} from '@project/util/util-core';
import {UserService} from './user.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '@project/shared/shared-dto';
import {UserRdo} from './rdo/user.rdo';
import {NotifyService} from '../notify/notify.service';
import {JwtAuthGuard, JwtRefreshGuard, User, UserId} from '@project/shared/shared-mediators';
import {CreateSubscriberDto} from "../notify/dto/create-subscriber.dto";
import {LocalAuthGuard} from './local-auth-guard';
import {Counters, UserType} from '@project/shared/shared-types';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FullUserRdo} from './rdo/full-user.rdo';
import {Difference} from '@project/util/util-types';
import {
  apiAuthHeader,
  apiRefreshHeader,
  created,
  unauthorized,
  wrongLoginPass,
  wrongRefreshToken
} from '@project/shared/shared-api-consts';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly notifyService: NotifyService,
  ) {}

  @Post('register')
  @ApiResponse(created('user'))
  public async register(@Body() createUserDto: CreateUserDto){
    return fillObject(UserRdo, await this.userService.register(createUserDto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse(wrongLoginPass)
  public async login(@User() user: UserType ){
    return await this.userService.createUserToken(user);
  }

  @Post('subscribe')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has successfully subscribed to the email newsletter'
  })
  @ApiResponse(unauthorized)
  @UseGuards(JwtAuthGuard)
  public async subscribe(@User() user: CreateSubscriberDto) {
    await this.notifyService.registerSubscriber(user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @ApiResponse(wrongRefreshToken)
  @ApiHeader(apiRefreshHeader)
  public async refreshToken(@User() user: UserType) {
    return this.userService.createUserToken(user);
  }

  @Get(':id')
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'Get user by id'
  })
  public async getUser(@Param('id') id: string){
    return fillObject(FullUserRdo, this.userService.getUser(id));
  }


  @Patch('password')
  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  public async setPassword(@User() user: UserType, @Body(ValidationPipe) dto: ChangePasswordDto){
    await this.userService.verifyUser({email: user.email, password: dto.oldPassword});
    return fillObject(UserRdo, this.userService.setPassword(user.id, dto.newPassword));
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  public async update(@UserId() id: string, @Body(ValidationPipe) dto: UpdateUserDto) {
    return fillObject(UserRdo, this.userService.update(id, dto));
  }

  @Post('/post')
  @UseGuards(JwtAuthGuard)
  async addPost(@UserId() id: string) {
    return this.userService.changeCount(id, Counters.postsCount, Difference.up);
  }

  @Delete('/post')
  @UseGuards(JwtAuthGuard)
  async subPost(@UserId() id: string) {
    return this.userService.changeCount(id, Counters.postsCount, Difference.down);
  }

  @Post('/:id/follower')
  async addFollower(@Param('id') id: string) {
    return this.userService.changeCount(id, Counters.followersCount, Difference.up);
  }

  @Delete('/:id/follower')
  async subFollower(@Param('id') id: string) {
    return this.userService.changeCount(id, Counters.followersCount, Difference.down);
  }
}
