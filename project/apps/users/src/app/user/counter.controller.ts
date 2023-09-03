import {Controller} from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {Counters} from '@project/shared/shared-types';
import {UserService} from './user.service';
import {UserCounterDto} from '@project/shared/shared-dto';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/shared/modules-options';

@Controller('counter')
export class CounterController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.ChangePostsCount))
  public async changePostsCount(dto: UserCounterDto) {
    await this.userService.changeCount(dto.idUser, Counters.postsCount, dto.difference);
  }

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.ChangeFollowersCount))
  public async changeFollowersCount(dto: UserCounterDto) {
    await this.userService.changeCount(dto.idUser, Counters.followersCount, dto.difference);
  }

}
