import {
  Body,
  Controller, Get,
  Inject,
  MaxFileSizeValidator, Param,
  ParseFilePipe, Patch,
  Post,
  UploadedFile, UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {
  ChangePasswordDto,
  LoginUserDto, UpdateUserDto
} from '@project/shared/shared-dto';
import {ConfigType} from '@nestjs/config';
import {fillObject, getAuthHeader} from '@project/util/util-core';
import {ApiConsumes, ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '@project/shared/shared-dto';
import {FileInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import {JpgPngValidator, Token} from '@project/shared/shared-mediators';
import {
  MAX_SIZE_AVATAR,
} from '@project/shared/shared-consts';
import {JsonPipe} from '@project/shared/shared-mediators';
import {UserRdo} from './rdo/user.rdo';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {FilesController} from './files.controller';
import {BffService} from './services/bff.service';
import {
  apiAuthHeader, apiRefreshHeader,
  created,
  unauthorized,
  wrongLoginPass,
  wrongRefreshToken
} from '@project/shared/shared-api-consts';
import {appsConfig} from '@project/config/config-modules';


@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly fileController: FilesController,
    private readonly bffService: BffService
  ) {}

  @Post('login')
  @ApiResponse(wrongLoginPass)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const url = this.config.users;
    const { data } = await this.httpService.axiosRef.post(`${url}/login`, loginUserDto);
    return data;
  }

  @Post('register')
  @ApiResponse(created('user'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
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

    return fillObject(UserRdo, {...data, avatarPath: image.path})
  }

  @Patch('/update')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  public async update(
    @Body('user', JsonPipe) updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new JpgPngValidator({}),
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_AVATAR }),
        ],
      })
    ) file: Express.Multer.File,
    @Token() token: string){

    const image = await this.fileController.upload(file);
    const { data } = await this.httpService.axiosRef.patch(
      `${this.config.users}/update`, {...updateUserDto, avatarId: image.id}, getAuthHeader(token)
    )

    return fillObject(UserRdo, {...data, avatarPath: image.path})
  }

  @Get(':id')
  public async getUser(@Param('id') id: string){
    return this.bffService.getUser(id);
  }

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Patch('password')
  public async setPassword(@Body() dto: ChangePasswordDto, @Token() token: string) {
    const usersUrl = this.config.users;
    const { data } =
      await this.httpService.axiosRef.patch(`${usersUrl}/password`, dto, getAuthHeader(token));
    return data;
  }

  @ApiResponse(wrongRefreshToken)
  @ApiHeader(apiRefreshHeader)
  @Post('refresh')
  public async refreshToken(@Token() token: string) {
    const usersUrl = this.config.users;
    const { data } = await this.httpService.axiosRef.post(`${usersUrl}/refresh`, null, getAuthHeader(token));

    return data;
  }
}
