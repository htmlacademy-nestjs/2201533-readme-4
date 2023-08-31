import {Injectable} from '@nestjs/common';
import {FollowerRepository} from './follower.repository';
import {Follower} from '@project/shared/shared-types';
import {FollowerEntity} from './follower-enttity';
import {fillObject} from '@project/util/util-core';
import {FollowDto} from '@project/shared/shared-dto';

@Injectable()
export class FollowerService {
  constructor(
    private readonly followerRepository: FollowerRepository,
  ) {}
  async follow(dto: Follower): Promise<Follower> {
    const entity = new FollowerEntity(dto);
    const rec = await this.followerRepository.create(entity);
    return fillObject(Follower, rec);
  }

  async dontFollow(dto: Follower) {
    const entity = new FollowerEntity(dto);
    await this.followerRepository.delete(entity);
  }

  async count(dto: FollowDto) {
    return this.followerRepository.count(dto.followed);
  }

}
