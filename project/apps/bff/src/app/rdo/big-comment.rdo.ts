import {CommentRdo} from '@project/shared/shared-dto';
import {ApiProperty} from '@nestjs/swagger';
import {Exclude, Expose} from 'class-transformer';
import {FullUserRdo} from './full-user.rdo';

export class BigCommentRdo extends CommentRdo {
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
  author: FullUserRdo;

  @Exclude()
  authorId: string;
}
