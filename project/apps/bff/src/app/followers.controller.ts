import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/config/config-modules';
import {ConfigType} from '@nestjs/config';
import {Token} from '@project/shared/shared-mediators';
import {FollowDto} from '@project/shared/shared-dto';
import {ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {apiAuthHeader, authHeader, unauthorized} from '@project/shared/shared-api-consts';
import {RabbitService} from './services/rabbit.service';
import {Difference} from '@project/util/util-types';
import {NotExistFollowed} from './guards/not-exist-followed.guard';

@ApiTags('users')
@Controller('followers')
@UseFilters(AxiosExceptionFilter)
export class FollowersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly notifyService: RabbitService
  ) {}

  @Post('/')
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  @UseGuards(NotExistFollowed)
  public async add(@Token() token: string, @Body() dto: FollowDto){
    const {data} = await this.httpService.axiosRef.post(`${this.config.followers}`, dto, authHeader(token));
    await this.notifyService.sendFollowersCount({idUser: dto.followed, difference: Difference.add});
    return data;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized)
  @ApiHeader(apiAuthHeader)
  public async delete(@Token() token: string, @Param('id') id: string) {
    await this.httpService.axiosRef.delete(`${this.config.followers}/${id}`, authHeader(token));
    await this.notifyService.sendFollowersCount({idUser: id, difference: Difference.sub});
  }
}
