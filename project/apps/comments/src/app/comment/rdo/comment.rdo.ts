import {Expose} from 'class-transformer';

export class CommentRdo {
  @Expose()
  id: number;
  @Expose()
  text: string;
  @Expose()
  createDate: Date;
  @Expose()
  authorId: number;
  @Expose()
  idPost: number;
}
