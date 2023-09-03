import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {fillObject} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {PostRdo} from '@project/shared/shared-dto';
import {Type} from '@project/shared/shared-types';
import {BffService} from '../services/bff.service';
import {BigPostRdo} from '../rdo/big-post.rdo';
import {appsConfig} from '@project/config/config-modules';

@Injectable()
export class PostInterceptor implements NestInterceptor{
  constructor(
    private readonly bffService: BffService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  async attachData(post: PostRdo) {
    const user = await this.bffService.getUser(post.userId);
    const bigPost = {...post, user};
    if (post.type === Type[Type.photo]) {
      bigPost.content['path'] = await this.bffService.getPath(post.content['idPhoto'])
    }
    return fillObject(BigPostRdo, bigPost);
  }

  async formatPost(post: PostRdo) {
    if (post.constructor !== Object) {
      return post;
    }
    if (post.userId) {
      return await this.attachData(post)
    }
    return post;
  }

  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (req.method === 'DELETE') {
      return next.handle()
        .pipe(
          map((data) => {
            return data;
          })
        );
    }
    return next.handle()
    .pipe(
      map(async (data) => {
        const promises = data.constructor === Array ?
          data.map((item) => this.formatPost(item)) : [this.formatPost(data)]
        return fillObject(BigPostRdo, await Promise.all(promises));
      })
    );
  }
}
