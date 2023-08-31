import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {CommentService} from "./comment.service";

@Injectable()
export class CommentAuthor implements CanActivate {
  constructor(
    private readonly commentService: CommentService
  ) {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.user.id === await this.commentService.getAuthor(parseInt(req.params.id, 10));
  }
}
