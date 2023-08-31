import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PostService} from "../post.service";

@Injectable()
export class SelfRepostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idPost = request.params().id;
    const idUser = request.user.id;
    return !this.postService.checkUser(idPost, idUser);
  }
}
