import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards, ValidationPipe
} from '@nestjs/common';
import {fillObject} from '@project/util/util-core';
import {UserService} from './user.service';
import {
  apiAuthHeader,
  apiRefreshHeader,
  ChangePasswordDto,
  created,
  CreateUserDto,
  unauthorized,
  wrongLoginPass,
  wrongRefresh
} from '@project/shared/shared-dto';
import {UserRdo} from './rdo/user.rdo';
import {NotifyService} from '../notify/notify.service';
import {JwtAuthGuard, JwtRefreshGuard, User} from '@project/shared/shared-mediators';
import {CreateSubscriberDto} from "../notify/dto/create-subscriber.dto";
import {LocalAuthGuard} from './local-auth-guard';
import {UserType} from '@project/shared/shared-types';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FullUserRdo} from './rdo/full-user.rdo';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse(created('user'))
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto){
    return fillObject(UserRdo, await this.userService.register(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse(wrongLoginPass)
  @Post('login')
  public async login(@User() user: UserType ){
    return await this.userService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has successfully subscribed to the email newsletter'
  })
  @ApiResponse(unauthorized)
  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  public async subscribe(@User() user: CreateSubscriberDto) {
    await this.notifyService.registerSubscriber(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @ApiResponse(wrongRefresh)
  @ApiHeader(apiRefreshHeader)
  public async refreshToken(@User() user: UserType) {
    return this.userService.createUserToken(user);
  }

  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'Get user by id'
  })
  @Get(':id')
  public async getUser(@Param('id') id: string){
    return fillObject(FullUserRdo, this.userService.getUser(id));
  }


  @ApiHeader(apiAuthHeader)
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  public async setPassword(@User() user: UserType, @Body(ValidationPipe) dto: ChangePasswordDto){
    await this.userService.verifyUser({email: user.email, password: dto.oldPassword});
    return fillObject(UserRdo, this.userService.setPassword(user.id, dto.newPassword));
  }
}
