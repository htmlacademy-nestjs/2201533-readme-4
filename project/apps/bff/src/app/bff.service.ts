import {Inject, Injectable} from '@nestjs/common';
import {appsConfig, fillObject} from '@project/util/util-core';
import {FullUserRdo} from './rdo/full-user.rdo';
import {HttpService} from '@nestjs/axios';
import {ConfigType} from '@nestjs/config';
import {FilesController} from './files.controller';

@Injectable()
export class BffService {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly fileController: FilesController
  ) {}
  public async getUser(id: string){
    const user = await this.httpService.axiosRef.get(`${this.config.users}/${id}`);
    const avatar = user.data.avatarId === undefined ? '' : await this.getPath(user.data.avatarId);
    const follow = await this.httpService.axiosRef.get(`${this.config.followers}/${id}`)
    return fillObject(FullUserRdo, {...user.data, avatarPath: avatar, followersCount: follow.data});
  }

  public async getPath(idFile: string) {
    const file = await this.httpService.axiosRef.get(`${this.config.files}/${idFile}`);
    return file.data.path;
  }

  public async findPost(id: number) {
    const {data}= await this.httpService.axiosRef.get(`${this.config.posts}/exist/${id}`);
    return !!data;
  }

}
