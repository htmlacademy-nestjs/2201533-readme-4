import {BadRequestException} from '@nestjs/common';

export class NotExistsPostException extends BadRequestException {
  constructor(idPost: number) {
    super(`Publication with id: ${idPost} does not exists`);
  }
}
