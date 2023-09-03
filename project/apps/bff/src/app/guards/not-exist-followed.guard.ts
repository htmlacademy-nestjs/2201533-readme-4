import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {NotExistsUserException} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {BffService} from '../services/bff.service';
import {FollowDto} from '@project/shared/shared-dto';
import {appsConfig} from '@project/config/config-modules';

@Injectable()
export class NotExistFollowed implements CanActivate {
  constructor(
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService
  ) {}
  async canActivate(context:ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body as FollowDto;
    const idFollowed = body.followed;
    console.log('NotExistFollowed', idFollowed);
    const foundUser = await this.bffService.findUser(idFollowed);
    console.log('NotExistFollowed', foundUser);
    if (!foundUser) {
      throw new NotExistsUserException(idFollowed);
    }

    return true;
  }
}
