import {ForbiddenException} from '@nestjs/common';

export class YourRepostException extends ForbiddenException {
  constructor() {
    super('No need to repost your own publication');
  }
}
