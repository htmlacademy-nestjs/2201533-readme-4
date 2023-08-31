import {ConflictException} from "@nestjs/common";

export class AnotherAuthorException extends ConflictException {
  constructor(what: string) {
    super(`Forbidden to change the ${what} of another users`);
  }
}
