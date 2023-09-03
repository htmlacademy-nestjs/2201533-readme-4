import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Type} from '@project/shared/shared-types';
import {fillCreateDto} from '@project/shared/shared-dto';

@Injectable()
export class PostCreateInterceptor implements NestInterceptor {
  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.body.content = fillCreateDto[Type[req.body.type]](req.body.content);
    req.body.userId = req.user.id;
    return next.handle()
  }
}
