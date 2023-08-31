import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {PostService} from '../post.service';
import {
  AnotherAuthorException, NotExistsPostException
} from "@project/util/util-core";

@Injectable()
export class PostAuthorGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idPost = parseInt(request.params.id, 10);
    const idUser = request.user.id;
    const check = await this.postService.checkPost(idPost);
    if (!check) {
      throw new NotExistsPostException(idPost);
    }
    const isAuthor = await this.postService.checkUser(idPost, idUser);
    if (!isAuthor) {
      throw new AnotherAuthorException('publications');
    }
    return true;
  }
}
