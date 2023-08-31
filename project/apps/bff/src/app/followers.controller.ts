import {
  Body,
  Controller,
  Delete, HttpCode, HttpStatus,
  Inject,
  Param,
  Post, UseFilters,
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared/shared-mediators';
import {FollowDto} from '@project/shared/shared-dto';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {apiAuthHeader, authHeader, unauthorized} from "@project/shared/shared-api-consts";

@ApiTags('users')
@Controller('followers')
@UseFilters(AxiosExceptionFilter)
export class FollowersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  @Post('/')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  public async add(@Token() token: string, @Body() dto: FollowDto){
    const {data} = await this.httpService.axiosRef.post(`${this.config.followers}`, dto, authHeader(token));
    return data;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  public async delete(@Token() token: string, @Param('id') id: string) {
    await this.httpService.axiosRef.delete(`${this.config.followers}/${id}`, authHeader(token));
  }
}
