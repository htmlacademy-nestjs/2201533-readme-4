import {ConflictException} from '@nestjs/common';

export class ExistFollowException extends ConflictException {
  constructor() {
    super(`Ыuch a subscription already exists`);
  }
}
