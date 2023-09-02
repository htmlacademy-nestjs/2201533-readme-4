import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable, tap} from 'rxjs';
import {PostService} from '../post.service';
import {fillUpdateDto} from '@project/shared/shared-dto';
import {Type} from '@project/shared/shared-types';
import {TagService} from '../../tag/tag.service';

@Injectable()
export class PostUpdateInterceptor implements NestInterceptor {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const id = parseInt(context.switchToHttp().getRequest().params.id, 10);
    const post = await this.postService.getPost(id);
    const body = context.switchToHttp().getRequest().body;
    body.type = post.type;
    body.contentId = post.contentId;
    if (body.content){
      body.content = fillUpdateDto[Type[post.type]](body.content);
    }
    const tags = post.tags;
    return next
      .handle()
      .pipe(
        tap(()=> {
          if (tags.length) {
            this.tagService.clearTags(tags);
          }
        })
      );
  }
}
