import {Entity} from "@project/util/util-types";
import {Like} from "@project/shared/shared-types";

export class LikeEntity implements Entity<LikeEntity>, Like {
  idPost: number;
  idUser: string

  constructor(dto: Like) {
    this.fillEntity(dto)
  }

  fillEntity(entity: Like) {
    this.idPost = entity.idPost;
    this.idUser = entity.idUser;
  }

  toObject(): LikeEntity {
    return {...this,};
  }



}
