import {BadRequestException} from "@nestjs/common";

export class NotExistsCommentException extends BadRequestException {
  constructor(idComment: number) {
    super(`Comment with id: ${idComment} does not exists`);
  }
}
