import { Module } from '@nestjs/common';
import {ContentRepository} from './content.repository';

@Module({
  providers: [ContentRepository],
  exports: [ContentRepository]
})
export class ContentModule {}
