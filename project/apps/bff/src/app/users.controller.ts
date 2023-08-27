import {
  Body,
  Controller, Get,
  HttpStatus,
  Inject,
  Logger, MaxFileSizeValidator, Param,
  ParseFilePipe, Patch,
  Post, Req,
  UploadedFile, UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {
  apiAuthHeader, apiRefreshHeader, authHeader,
  ChangePasswordDto,
  created,
  LoginUserDto,
  unauthorized,
  wrongLoginPass, wrongRefresh
} from '@project/shared/shared-dto';
import {ConfigType} from '@nestjs/config';
import {appsConfig, fillObject} from '@project/util/util-core';
import {ApiConsumes, ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '@project/shared/shared-dto';
import {FileInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import {JpgPngValidator, Token} from '@project/shared/shared-mediators';
import {MAX_SIZE_AVATAR,} from '@project/shared/shared-consts';
import {JsonPipe} from '@project/shared/shared-mediators';
import {UserRdo} from './rdo/user.rdo';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {FullUserRdo} from './rdo/full-user.rdo';
import {FilesController} from './files.controller';


@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly fileController: FilesController
  ) {}

  @ApiResponse(wrongLoginPass)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const url = this.config.users;
    const { data } = await this.httpService.axiosRef.post(`${url}/login`, loginUserDto);
    return data;
  }

  @ApiResponse(created('user'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(
    @Body('user', JsonPipe) createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new JpgPngValidator({}),
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_AVATAR }),
        ],
      })
    ) file: Express.Multer.File,){

    const usersUrl = this.config.users;
    const image = await this.fileController.upload(file);
    const { data } = await this.httpService.axiosRef.post(
      `${usersUrl}/register`, {...createUserDto, avatarId: image.id}
    )

    Logger.log(data);
    return fillObject(UserRdo, {...data, avatarPath: image.path})
  }

  @Get(':id')
  public async getUser(@Param('id') id: string){
    const uploadUrl = this.config.files;
    const usersUrl = this.config.users;
    const followUrl =this.config.followers;
    const user = await this.httpService.axiosRef.get(`${usersUrl}/${id}`);
    const avatar = await this.httpService.axiosRef.get(`${uploadUrl}/${user.data.avatarId}`)
    const follow = await this.httpService.axiosRef.get(`${followUrl}/${id}`)
    return fillObject(FullUserRdo, {...user.data, avatarPath: avatar.data.path, followersCount: follow.data});
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Patch('password')
  public async setPassword(@Body() dto: ChangePasswordDto, @Token() token: string) {
    const usersUrl = this.config.users;
    const { data } =
      await this.httpService.axiosRef.patch(`${usersUrl}/password`, dto, authHeader(token));
    return data;
  }

  @ApiResponse(wrongRefresh)
  @ApiHeader(apiRefreshHeader)
  @Post('refresh')
  public async refreshToken(@Token() token: string) {
    const usersUrl = this.config.users;
    const { data } = await this.httpService.axiosRef.post(`${usersUrl}/refresh`, null, authHeader(token));

    return data;
  }
}
