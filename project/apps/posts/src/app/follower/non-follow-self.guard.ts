import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class NonFollowSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const followed = request.body.followed;
    const follower = request.user.id;
    return followed !== follower;
  }
}
