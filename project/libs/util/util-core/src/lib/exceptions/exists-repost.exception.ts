import {ConflictException} from "@nestjs/common";

export class ExistsRepostException extends ConflictException {
  constructor() {
    super('No need to repost your own publication');
  }
}
