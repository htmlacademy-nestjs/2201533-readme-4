import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {SelfFollowException} from '@project/util/util-core';
import {FollowerService} from './follower.service';
import {ExistFollowException} from "@project/util/util-core";

@Injectable()
export class SelfFollowGuard implements CanActivate {
  constructor(
    private readonly followerService: FollowerService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const followedId = request.body.followed;
    const followerId = request.user.id;
    if (followedId === followerId) {
      throw new SelfFollowException();
    }
    const check = await this.followerService.check(followerId, followedId);
    if (check) {
      throw new ExistFollowException();
    }
    return true;
  }
}
