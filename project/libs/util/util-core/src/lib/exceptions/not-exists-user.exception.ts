import {BadRequestException} from "@nestjs/common";

export class NotExistsUserException extends BadRequestException {
  constructor(idUser: string) {
    super(`User with id: ${idUser} does not exists`);
  }
}
