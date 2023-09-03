import {Injectable} from '@nestjs/common';
import {FollowerRepository} from './follower.repository';
import {Follower} from '@project/shared/shared-types';
import {FollowerEntity} from './follower-entity';
import {fillObject} from '@project/util/util-core';
import {FollowRdo} from '@project/shared/shared-dto';

@Injectable()
export class FollowerService {
  constructor(
    private readonly followerRepository: FollowerRepository,
  ) {}
  async follow(dto: Follower): Promise<Follower> {
    const entity = new FollowerEntity(dto);
    const rec = await this.followerRepository.create(entity);
    return fillObject(FollowRdo, rec);
  }

  async unFollow(dto: Follower) {
    const entity = new FollowerEntity(dto);
    await this.followerRepository.delete(entity);
  }

  async count(followed: string) {
    return this.followerRepository.count(followed);
  }

  async check(follower: string, followed: string) {
    const follow = await this.followerRepository.findFollow(follower, followed);
    return follow !== null;
  }

}
