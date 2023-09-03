import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {PostService} from '../post.service';
import {TagService} from '../../tag/tag.service';
import {Observable, tap} from 'rxjs';

@Injectable()
export class PostDeleteInterceptor implements NestInterceptor {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const id = parseInt(context.switchToHttp().getRequest().params.id, 10);
    const post = await this.postService.getPost(id);
    const tags = post.tags;
    return next
      .handle()
      .pipe(
        tap(() => {
          if (tags.length) {
            this.tagService.clearTags(tags);
          }
        })
      )
   }
}
