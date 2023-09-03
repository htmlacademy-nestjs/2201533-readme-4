import {Controller} from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {Counters} from '@project/shared/shared-types';
import {PostService} from './post.service';
import {PostCounterDto} from '@project/shared/shared-dto';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/shared/modules-options';


@Controller('counter')
export class CounterController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.ChangeCommentsCount))
  public async changeCommentCount(dto: PostCounterDto) {
    await this.postService.changeCount(dto.idPost, Counters.commentCount, dto.difference);
  }

  @RabbitSubscribe(
    getSubscribeOption(RabbitRoutingKeys.ChangeLikesCount))
  public async changeLikeCount(dto: PostCounterDto) {
    await this.postService.changeCount(dto.idPost, Counters.likeCount, dto.difference);
  }

}
