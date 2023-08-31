import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {SelfFollowException} from "@project/util/util-core";
import {FollowerService} from "./follower.service";

@Injectable()
export class SelfFollowGuard implements CanActivate {
  constructor(
    private readonly followerService: FollowerService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const followedId = request.body.followed;
    const followerId = request.user.id;
    if (followedId === followerId) {
      throw new SelfFollowException()
    }

    return true;
  }
}
