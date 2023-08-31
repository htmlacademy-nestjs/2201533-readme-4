import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared/shared-mediators';
import {apiAuthHeader, authHeader, FollowDto, unauthorized} from '@project/shared/shared-dto';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('users')
@Controller('followers')
export class FollowersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  private url = this.config.followers;

  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Post('/')
  public async add(@Token() token: string, @Body() dto: FollowDto){
    return this.httpService.axiosRef.post(`${this.url}`, dto, authHeader(token));
  }
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @Delete('/:id')
  public async delete(@Token() token: string, @Param('id') id: string) {
    await this.httpService.axiosRef.delete(`${this.url}/${id}`, authHeader(token));
  }
}
