import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CommentRdo {
  @Expose()
  @ApiProperty({
    description: 'id comment',
    example: '17',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'comment text',
    example: 'Это минимальный комментарий',
  })
  text: string;

  @Expose()
  @ApiProperty({
    description: 'date of creation',
    example: '2023-08-30T06:29:50.645Z',
  })
  createDate: Date;

  @Expose()
  @ApiProperty({
    description: 'author id',
    example: '64dc5587c629908ca140a166',
  })
  authorId: string;

  @Expose()
  @ApiProperty({
    description: 'publication id',
    example: '17',
  })
  idPost: number;
}
