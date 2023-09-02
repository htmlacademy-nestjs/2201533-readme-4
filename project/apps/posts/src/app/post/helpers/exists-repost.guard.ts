import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import {PostService} from '../post.service';
import {ExistsRepostException, fillObject} from '@project/util/util-core';
import {CreatePostDto, fillCreateDto} from '@project/shared/shared-dto';
import {Type} from '@project/shared/shared-types';
import {YourRepostException} from '@project/util/util-core';

@Injectable()
export class ExistsRepostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idPost = parseInt(request.params.id, 10);
    const post = await this.postService.getPost(idPost);
    const idUser = request.user.id;
    if (await this.postService.checkUser(idPost, idUser)) {
      throw new YourRepostException();
    }
    if ( await this.postService.existsRepost(idUser, idPost)) {
      throw new ExistsRepostException();
    }
    request.body = fillObject(CreatePostDto, {
      ...post,
      content: fillCreateDto[Type[post.type]]({...post.content}),
      isRepost: true,
      originalId: post.id,
      tags: post.tags.map((item) => item.tag),
      userId: idUser
    });
    return true;
  }
}
