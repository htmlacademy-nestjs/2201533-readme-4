import {Entity} from "@project/util/util-types";
import {Comment} from "@project/shared/shared-types";

export class CommentEntity implements Entity<CommentEntity>, Comment {
  id?: number;
  authorId: string
  createDate?: Date;
  idPost: number;
  text: string;

  constructor(dto: Comment) {
    this.fillEntity(dto)
  }

  fillEntity(entity: Comment) {
    this.authorId = entity.authorId;
    this.createDate = entity.createDate;
    this.idPost = entity.idPost;
    this.text = entity.text;
  }

  toObject(): CommentEntity {
    return {...this,};
  }



}
