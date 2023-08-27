import {BadRequestException} from "@nestjs/common";

export class FileWrongSystemException extends BadRequestException {
  constructor() {
    super(`The file you have on the wrong system (jpg or png)`);
  }
}
