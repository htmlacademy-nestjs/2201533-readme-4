import {PostRdo} from '@project/shared/shared-dto';
import {FullUserRdo} from './full-user.rdo';
import {Exclude, Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class BigPostRdo extends PostRdo {
  @ApiProperty({
    description: 'The user - author of publication',
    example: {
      "id": "64dc5587c629908ca140a166",
      "email": "torans@overlook.net",
      "name": "Jack",
      "avatarPath": "",
      "postsCount": 0,
      "createdAt": "2023-08-16T04:50:15.157Z",
      "updatedAt": "2023-08-25T10:55:14.934Z",
      "followersCount": 0
    }
  })
  @Expose()
  user: FullUserRdo;

  @Exclude()
  public userId: string;
}
