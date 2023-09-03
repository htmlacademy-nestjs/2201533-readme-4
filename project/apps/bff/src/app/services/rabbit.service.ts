import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {rabbitConfig} from '@project/config/config-modules';
import {ConfigType} from '@nestjs/config';
import {PostCounterDto, UserCounterDto} from '@project/shared/shared-dto';
import {RabbitRoutingKeys} from '@project/shared/modules-options';

@Injectable()
export class RabbitService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async sendCommentsCount(dto: PostCounterDto) {
    return this.rabbitClient.publish<PostCounterDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeCommentsCount].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeCommentsCount].binding,
      dto
    )
  }

  public async sendLikeCount(dto: PostCounterDto) {
    return this.rabbitClient.publish<PostCounterDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeLikesCount].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeLikesCount].binding,
      {...dto}
    )
  }

  public async sendPostsCount(dto: UserCounterDto) {
    return this.rabbitClient.publish<UserCounterDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangePostsCount].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangePostsCount].binding,
      dto
    )
  }

  public async sendFollowersCount(dto: UserCounterDto) {
    return this.rabbitClient.publish<UserCounterDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeFollowersCount].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.ChangeFollowersCount].binding,
      dto
    )
  }

  public async deleteComments(idPost: number) {
    return this.rabbitClient.publish<number>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.DeleteCommentsByPost].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.DeleteCommentsByPost].binding,
      idPost
    )
  }

  public async deleteLikes(idPost: number) {
    return this.rabbitClient.publish<number>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.DeleteLikesByPost].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.DeleteLikesByPost].binding,
      idPost
    )
  }
}
