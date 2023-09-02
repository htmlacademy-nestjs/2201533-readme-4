import {Expose} from "class-transformer";

export class FollowRdo {
  @Expose()
  follower: string;
  @Expose()
  followed: string;
}
