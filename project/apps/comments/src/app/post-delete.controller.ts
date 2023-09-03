import {Controller} from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {CommentService} from './comment/comment.service';
import {LikeService} from './like/like.service';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/shared/modules-options';

@Controller('postDelete')
export class PostDeleteController {
  constructor(
    private readonly commentService: CommentService,
    private readonly likeService: LikeService
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.DeleteCommentsByPost))
  public async deleteComments(idPost: number) {
    await this.commentService.deleteByPost(idPost);
  }

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.DeleteLikesByPost))
  public async deleteLikes(idPost: number) {
    await this.likeService.deleteByPost(idPost);
  }

}
