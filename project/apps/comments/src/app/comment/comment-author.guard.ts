import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {AnotherAuthorException} from "@project/util/util-core";
import {
  NotExistsCommentException
} from "../../../../../libs/util/util-core/src/lib/exceptions/not-exists-comment.exception";

@Injectable()
export class CommentAuthor implements CanActivate {
  constructor(
    private readonly commentService: CommentService
  ) {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const commentId = parseInt(req.params.id, 10);
    const check = await this.commentService.checkComment(commentId)
    if (!check) {
      throw new NotExistsCommentException(commentId);
    }
    if (req.user.id !== await this.commentService.getAuthor(commentId)) {
      throw new AnotherAuthorException('comments');
    }

    return true;
  }
}
