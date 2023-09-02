import {ConflictException} from "@nestjs/common";

export class SelfFollowException extends ConflictException {
  constructor() {
    super(`Subscribing to yourself doesn't make sense`);
  }
}
