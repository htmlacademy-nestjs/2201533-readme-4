import {Entity} from '@project/util/util-types';
import {Follower} from '@project/shared/shared-types';

export class FollowerEntity implements Entity<FollowerEntity>, Follower{
  followed: string;
  follower: string;

  constructor(dto: Follower) {
    this.fillEntity(dto);
  }
  fillEntity(entity: Follower) {
    this.follower = entity.follower;
    this.followed = entity.followed;
  }

  toObject(): FollowerEntity {
    return {...this};
  }

}
