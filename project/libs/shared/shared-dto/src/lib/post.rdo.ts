import {ContentType, Tag} from '@project/shared/shared-types';
import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class PostRdo {
  @Expose()
  @ApiProperty({
    description: 'id post',
    example: '17',
  })
  public id: string;

  @ApiProperty({
    description: 'User id',
    example: '64dc5587c629908ca140a166',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Content type',
    example: 'text',
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Create date',
    example: '2023-08-25T14:52:47.243Z',
  })
  @Expose()
  public createDate: string;

  @ApiProperty({
    description: 'Published date',
    example: '2023-08-25T14:52:47.243Z',
  })
  @Expose()
  public pubDate: string;

  @ApiProperty({
    description: 'Published or not published',
    example: 'true',
  })
  @Expose()
  public isPublished: string;

  @ApiProperty({
    description: 'Number of likes',
    example: '40',
  })
  @Expose()
  public likeCount: number;

  @ApiProperty({
    description: 'Number of comments',
    example: '10',
  })
  @Expose()
  public commentCount: number;

  @ApiProperty({
    description: 'Tags',
    example: [
      {
        "idTag": 1,
        "tag": "холод"
      },
      {
        "idTag": 4,
        "tag": "дрова"
      },
      {
        "idTag": 9,
        "tag": "лес"
      },
      {
        "idTag": 10,
        "tag": "зима"
      }
    ],
  })
  @Expose()
  public tags: Tag[];

  @ApiProperty({
    description: 'Content',
    example: {
      "id": 64,
      "title": "лес валю torans@overlook.net",
      "announcement": "дровосек в зимнем лесу должен, должен torans@overlook.net",
      "text": "Однажды, в студёную зимнюю пору, я из лесу вышел, и снова зашёл. Влез, неспеша, в чью-то тёплую нору..."
    },
  })
  @Expose()
  public content: ContentType;
}
